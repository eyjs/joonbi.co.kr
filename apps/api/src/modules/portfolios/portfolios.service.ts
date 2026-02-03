import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';
import { Portfolio } from '@prisma/client';

@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePortfolioDto): Promise<Portfolio> {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    if (!project.portfolioAgreed) {
      throw new ConflictException('고객의 포트폴리오 동의가 필요합니다');
    }

    const existingPortfolio = await this.prisma.portfolio.findUnique({
      where: { projectId: dto.projectId },
    });

    if (existingPortfolio) {
      throw new ConflictException('이미 포트폴리오로 등록된 프로젝트입니다');
    }

    const existingSlug = await this.prisma.portfolio.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('이미 사용 중인 slug입니다');
    }

    const { images, ...portfolioData } = dto;

    const portfolio = await this.prisma.portfolio.create({
      data: {
        ...portfolioData,
        images: images
          ? {
              create: images,
            }
          : undefined,
      },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    return portfolio;
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Portfolio[]; meta: any }> {
    const where = { isPublic: true };

    const [data, total] = await Promise.all([
      this.prisma.portfolio.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          images: {
            orderBy: { displayOrder: 'asc' },
          },
        },
      }),
      this.prisma.portfolio.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  async findOne(id: string): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
        project: {
          select: {
            projectName: true,
            status: true,
            actualEndDate: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    if (!portfolio.isPublic) {
      throw new NotFoundException('공개되지 않은 포트폴리오입니다');
    }

    return portfolio;
  }

  async update(id: string, dto: UpdatePortfolioDto): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    if (dto.slug && dto.slug !== portfolio.slug) {
      const existingSlug = await this.prisma.portfolio.findUnique({
        where: { slug: dto.slug },
      });

      if (existingSlug) {
        throw new ConflictException('이미 사용 중인 slug입니다');
      }
    }

    const { images, ...portfolioData } = dto;

    const updatedPortfolio = await this.prisma.portfolio.update({
      where: { id },
      data: {
        ...portfolioData,
        images: images
          ? {
              deleteMany: {},
              create: images,
            }
          : undefined,
      },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    return updatedPortfolio;
  }

  async delete(id: string): Promise<void> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    await this.prisma.portfolio.delete({
      where: { id },
    });
  }
}
