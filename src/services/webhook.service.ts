import { WebhookRepository } from '../repositories/webhook.repository';
import { WebhookPayload, WebhookResponse } from '../types/webhook.types';
import logger from '../utils/logger';

export class WebhookService {
  private repository: WebhookRepository;

  constructor() {
    this.repository = new WebhookRepository();
  }

  async processWebhook(payload: WebhookPayload): Promise<WebhookResponse> {
    try {
      await this.repository.createWebhookEvent(payload);

      return {
        status: 'ok',
        receivedAt: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Failed to process webhook', { error, payload });
      throw error;
    }
  }
} 