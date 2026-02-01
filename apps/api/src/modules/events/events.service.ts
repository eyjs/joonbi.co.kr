import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TicketsService } from '../tickets/tickets.service';
import {
  CreateEventDto,
  UpdateEventDto,
  ClaimSlotDto,
  EventResponseDto,
} from './dto';
import { EventSlot } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketsService: TicketsService,
  ) {}

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.prisma.eventSlot.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return events.map((event) => this.mapToResponseDto(event));
  }

  async findActive(): Promise<EventResponseDto[]> {
    const events = await this.prisma.eventSlot.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return events.map((event) => this.mapToResponseDto(event));
  }

  async findById(id: string): Promise<EventResponseDto> {
    const event = await this.prisma.eventSlot.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    }

    return this.mapToResponseDto(event);
  }

  async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    const event = await this.prisma.eventSlot.create({
      data: {
        eventType: createEventDto.eventType,
        totalSlots: createEventDto.totalSlots,
        isActive: createEventDto.isActive ?? true,
      },
    });

    return this.mapToResponseDto(event);
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const event = await this.prisma.eventSlot.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    }

    if (
      updateEventDto.totalSlots !== undefined &&
      updateEventDto.totalSlots < event.usedSlots
    ) {
      throw new BadRequestException(
        '총 슬롯 수는 사용된 슬롯 수보다 작을 수 없습니다.',
      );
    }

    const updatedEvent = await this.prisma.eventSlot.update({
      where: { id },
      data: updateEventDto,
    });

    return this.mapToResponseDto(updatedEvent);
  }

  async delete(id: string): Promise<void> {
    const event = await this.prisma.eventSlot.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    }

    if (event.usedSlots > 0) {
      throw new BadRequestException(
        '이미 사용된 슬롯이 있는 이벤트는 삭제할 수 없습니다.',
      );
    }

    await this.prisma.eventSlot.delete({
      where: { id },
    });
  }

  async claimSlot(
    userId: string,
    claimSlotDto: ClaimSlotDto,
  ): Promise<{ event: EventResponseDto; ticketId: string }> {
    const event = await this.prisma.eventSlot.findUnique({
      where: { id: claimSlotDto.eventId },
    });

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    }

    if (!event.isActive) {
      throw new BadRequestException('활성화되지 않은 이벤트입니다.');
    }

    if (event.usedSlots >= event.totalSlots) {
      throw new ConflictException('이벤트 슬롯이 모두 사용되었습니다.');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedEvent = await tx.eventSlot.update({
        where: { id: claimSlotDto.eventId },
        data: {
          usedSlots: {
            increment: 1,
          },
        },
      });

      const ticket = await this.ticketsService.issueEventTicket(userId);

      return {
        event: updatedEvent,
        ticket,
      };
    });

    return {
      event: this.mapToResponseDto(result.event),
      ticketId: result.ticket.id,
    };
  }

  async getSlotStatus(eventId: string): Promise<{
    totalSlots: number;
    usedSlots: number;
    remainingSlots: number;
    isActive: boolean;
    isAvailable: boolean;
  }> {
    const event = await this.findById(eventId);

    return {
      totalSlots: event.totalSlots,
      usedSlots: event.usedSlots,
      remainingSlots: event.remainingSlots,
      isActive: event.isActive,
      isAvailable: event.isActive && event.remainingSlots > 0,
    };
  }

  private mapToResponseDto(event: EventSlot): EventResponseDto {
    return {
      id: event.id,
      eventType: event.eventType,
      totalSlots: event.totalSlots,
      usedSlots: event.usedSlots,
      remainingSlots: event.totalSlots - event.usedSlots,
      isActive: event.isActive,
      createdAt: event.createdAt,
    };
  }
}
