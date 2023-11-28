import { z } from "zod";

export const deckCardSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  deck_id: z.number(),
  front: z.string(),
  back: z.string(),
  example: z.string().nullable(),
});

export const deckSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  author_id: z.number().nullable(),
  description: z.string().nullable(),
  share_id: z.string().nullable(),
  is_public: z.boolean(),
  speak_locale: z.string().nullable(),
  speak_field: z.string().nullable(),
});

export const deckWithCardsSchema = deckSchema.merge(
  z.object({
    deck_card: z.array(deckCardSchema),
  }),
);

export const decksWithCardsSchema = z.array(deckWithCardsSchema);

export type DeckWithCardsDbType = z.infer<typeof deckWithCardsSchema>;
export type DeckCardDbType = z.infer<typeof deckCardSchema>;