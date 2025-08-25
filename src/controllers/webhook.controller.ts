import { Request, Response } from 'express';
import { WebhookService } from '../services/webhook.service';
import { WebhookPayloadSchema } from '../types/webhook.types';
import logger from '../utils/logger';

export class WebhookController {
  private service: WebhookService;

  constructor() {
    this.service = new WebhookService();
  }

  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      if (req.headers['content-type'] !== 'application/json') {
        res.status(400).json({ error: 'Content-Type must be application/json' });
        return;
      }

      const validationResult = WebhookPayloadSchema.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({ error: 'Invalid payload', details: validationResult.error });
        return;
      }

      const response = await this.service.processWebhook(validationResult.data);

      res.status(200).json(response);
    } catch (error) {
      logger.error('Webhook processing failed', { error });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 