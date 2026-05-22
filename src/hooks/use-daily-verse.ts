import { useQuery } from "@tanstack/react-query";
import type { DailyVerse } from "@/lib/bible";

const DAILY_VERSE_API_PATH = "/api/devotional/verse";

async function fetchDailyVerse(): Promise<DailyVerse> {
  const response = await fetch(DAILY_VERSE_API_PATH);

  if (!response.ok) {
    throw new Error("Não foi possível carregar o versículo do dia.");
  }

  const data = (await response.json()) as DailyVerse;
  return data;
}

export function useDailyVerse() {
  const query = useQuery<DailyVerse, Error, DailyVerse>({
    queryKey: ["daily-verse"],
    queryFn: fetchDailyVerse,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const verse = query.data as DailyVerse | undefined;

  return {
    verse,
    loading: query.isLoading,
    error: query.error ?? null,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
  };
}
