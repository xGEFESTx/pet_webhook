import { z } from 'zod';

export const WebhookPayloadSchema = z
  .object({
    id: z.string(),
    externalPaymentOrderId: z.string(),
    paymentOrderId: z.number(),
    requestorId: z.string(),
    clientId: z.string(),
    status: z.string(),
    amount: z.string(),
    currency: z.string(),
    payway: z.string(),
    destinationAddress: z.string(),
    direction: z.string(),
    estimatedFee: z.string(),
    actualFee: z.string(),
    ctime: z.number(),
    ftime: z.number(),
    txn: z.object({
      txnId: z.string(),
      txScanUrl: z.string(),
      from: z.string(),
      confirmations: z.number(),
      status: z.string(),
      direction: z.string(),
      origin: z.string().nullable(),
      value: z.string(),
      txEstimatedFee: z.string(),
      txFee: z.string(),
      txcttime: z.number(),
      txftime: z.number(),
    }),
    unpaid_amount: z.string(),
    pay_is_internal: z.boolean(),
    addressFrom: z.string(),
    errorText: z.string().nullable(),
  })
  .passthrough();

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;

export interface WebhookResponse {
  status: 'ok';
  receivedAt: string;
}