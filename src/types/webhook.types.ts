import { z } from 'zod';

export const WebhookPayloadSchema = z.object({
  transaction: z.object({
    id: z.string(),
    type: z.string(),
  }),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
  }),
  payment: z.object({
    amount: z.number(),
    currency: z.string(),
    network: z.string(),
    status: z.string(),
  }),
  metadata: z.object({
    ip: z.string(),
    userAgent: z.string(),
    timestamp: z.string(),
  }),
}).passthrough();

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;

export interface WebhookResponse {
  status: 'ok';
  receivedAt: string;
} 