import { z } from "zod";

export const bibleApiResponseSchema = z.object({
  data: z.object({
    reference: z.string(),
    version: z.string(),
    book: z.object({
      id: z.number(),
      name: z.string(),
      abbrev: z.string(),
      testament: z.string(),
    }),
    chapter: z.number(),
    verse: z.number(),
    text: z.string(),
  }),
});

export type BibleApiResponse = z.infer<typeof bibleApiResponseSchema>;

export type DailyVerse = {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
  version: string;
};

export const DAILY_VERSE_CACHE_SECONDS = 24 * 60 * 60;

export function mapBibleApiResponse(payload: BibleApiResponse): DailyVerse {
  return {
    reference: payload.data.reference,
    text: payload.data.text.trim(),
    book: payload.data.book.name,
    chapter: payload.data.chapter,
    verse: payload.data.verse,
    version: payload.data.version,
  };
}
