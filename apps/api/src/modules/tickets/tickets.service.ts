import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsService {
  async issueEventTicket(userId: string) {
    return { id: 'mock-ticket-id-' + Date.now() };
  }
}
