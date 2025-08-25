import { Router } from 'express';
import { WebhookController } from '../controllers/webhook.controller';

const router = Router();
const controller = new WebhookController();

router.post('/webhook', (req, res) => controller.handleWebhook(req, res));

export default router; 