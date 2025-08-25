import { PrismaClient } from '@prisma/client';
import { WebhookPayload } from '../types/webhook.types';
import logger from '../utils/logger';
import { stat } from 'fs';

interface WebhookEventRecord {
  id: number;
  paymentOrderId: string;
  clientId: string;
  requestorId: string;
  payload: string;
  status: string
  receivedAt: Date;
}

export class WebhookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createWebhookEvent(payload: WebhookPayload): Promise<number> {
    if (!payload) {
      throw new Error('Missing required data payload');
    }

    try {
      const webhookEvent = await this.prisma.webhookEvent.create({
        data: {
          paymentOrderId: payload?.paymentOrderId,
          clientId: payload?.clientId,
          requestorId: payload?.requestorId,
          status: payload?.status,
          payload,
          receivedAt: new Date(),
        },
      });

      logger.info('✅ Webhook event created', { id: webhookEvent.id });
      
      return webhookEvent.id;
    } catch (error) {
      logger.error('Failed to create webhook event', { error });
      throw error;
    }
  }

  // async getWebhookEvents(): Promise<any[]> {
  //   try {
  //     const events = await this.prisma.webhookEvent.findMany();
  //     return events.map((event: WebhookEventRecord) => ({
  //       id: event.id,
  //       payload: event.payload,
  //       receivedAt: event.receivedAt,
  //     }));
  //   } catch (error) {
  //     logger.error('Failed to get webhook events', { error });
  //     throw error;
  //   }
  // }

  // async getWebhookEvent(id: number): Promise<any | null> {
  //   try {
  //     const event = await this.prisma.webhookEvent.findUnique({
  //       where: { id },
  //     });

  //     if (!event) {
  //       return null;
  //     }

  //     return {
  //       id: event.id,
  //       headers: JSON.parse(event.headers),
  //       payload: JSON.parse(event.payload),
  //       receivedAt: event.receivedAt,
  //     };
  //   } catch (error) {
  //     logger.error('Failed to get webhook event', { id, error });
  //     throw error;
  //   }
  // }

  // async updateWebhookEventStatus(id: string, status: 'processed' | 'error'): Promise<void> {
  //   try {
  //     await this.prisma.webhookEvent.update({
  //       where: { id },
  //       data: { status },
  //     });
  //   } catch (error) {
  //     logger.error('Failed to update webhook event status', { id, error });
  //     throw error;
  //   }
  // }
} 