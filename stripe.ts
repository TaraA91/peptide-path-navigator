import { z } from "zod";

export function sanitizeString(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export const userSyncSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "id is required")
    .max(128, "id too long")
    .regex(/^[\w\-\.@]+$/, "id contains invalid characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email too long"),
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(100, "Name too long")
    .transform((v) => v.replace(/[<>]/g, "")),
});

export const stripeCheckoutSchema = z.object({
  userId: z
    .string()
    .trim()
    .min(1, "userId is required")
    .max(128, "userId too long")
    .regex(/^[\w\-\.@]+$/, "userId contains invalid characters"),
  priceId: z
    .string()
    .trim()
    .min(1, "priceId is required")
    .max(128, "priceId too long")
    .regex(/^[\w_]+$/, "priceId contains invalid characters"),
  successUrl: z.string().url("Invalid successUrl").optional(),
  cancelUrl: z.string().url("Invalid cancelUrl").optional(),
});

export const stripePortalSchema = z.object({
  userId: z
    .string()
    .trim()
    .min(1, "userId is required")
    .max(128, "userId too long")
    .regex(/^[\w\-\.@]+$/, "userId contains invalid characters"),
  returnUrl: z.string().url("Invalid returnUrl").optional(),
});

export const userIdParamSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "id is required")
    .max(128, "id too long")
    .regex(/^[\w\-\.@]+$/, "id contains invalid characters"),
});
