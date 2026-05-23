import { useEffect, useRef, useState } from "react";
import type { DailyVerse } from "@/lib/bible";

const DAILY_VERSE_API_PATH = "/api/devotional/verse";
const DAILY_VERSE_STORAGE_KEY = "carolzyn-daily-verse";

type DailyVerseCache = {
  verse: DailyVerse;
  fetchedAt: string;
};

function isDailyVerse(value: any): value is DailyVerse {
  return (
    value &&
    typeof value.reference === "string" &&
    typeof value.text === "string" &&
    typeof value.book === "string" &&
    typeof value.chapter === "number" &&
    typeof value.verse === "number" &&
    typeof value.version === "string"
  );
}

function getCurrentVerseWindowStart(now = new Date()): Date {
  const current = new Date(now);
  const todaySix = new Date(current);
  todaySix.setHours(6, 0, 0, 0);

  const todayEighteen = new Date(current);
  todayEighteen.setHours(18, 0, 0, 0);

  if (current >= todayEighteen) {
    return todayEighteen;
  }

  if (current >= todaySix) {
    return todaySix;
  }

  const yesterdayEighteen = new Date(todaySix);
  yesterdayEighteen.setDate(yesterdayEighteen.getDate() - 1);
  yesterdayEighteen.setHours(18, 0, 0, 0);

  return yesterdayEighteen;
}

function getNextVerseRefresh(now = new Date()): Date {
  const current = new Date(now);
  const todaySix = new Date(current);
  todaySix.setHours(6, 0, 0, 0);

  const todayEighteen = new Date(current);
  todayEighteen.setHours(18, 0, 0, 0);

  if (current < todaySix) {
    return todaySix;
  }

  if (current < todayEighteen) {
    return todayEighteen;
  }

  const tomorrowSix = new Date(todaySix);
  tomorrowSix.setDate(tomorrowSix.getDate() + 1);
  return tomorrowSix;
}

function readVerseCache(): DailyVerseCache | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(DAILY_VERSE_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as DailyVerseCache;

    if (!parsed || typeof parsed.fetchedAt !== "string") {
      return null;
    }

    if (!isDailyVerse(parsed.verse)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function saveVerseCache(verse: DailyVerse, fetchedAt: Date) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      DAILY_VERSE_STORAGE_KEY,
      JSON.stringify({ verse, fetchedAt: fetchedAt.toISOString() }),
    );
  } catch {
    // Ignore local storage failures.
  }
}

function isCacheValid(cache: DailyVerseCache, now = new Date()) {
  return new Date(cache.fetchedAt) >= getCurrentVerseWindowStart(now);
}

export function useDailyVerse() {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const refreshTimer = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const clearTimer = () => {
      if (refreshTimer.current !== null) {
        window.clearTimeout(refreshTimer.current);
        refreshTimer.current = null;
      }
    };

    const scheduleRefresh = () => {
      clearTimer();
      const nextRefresh = getNextVerseRefresh(new Date());
      const delay = Math.max(0, nextRefresh.getTime() - Date.now());

      refreshTimer.current = window.setTimeout(() => {
        if (!isMounted) return;
        fetchVerse(readVerseCache()?.verse ?? null);
      }, delay);
    };

    const fetchVerse = async (fallbackVerse: DailyVerse | null) => {
      try {
        const response = await fetch(DAILY_VERSE_API_PATH, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Não foi possível carregar o versículo do dia.");
        }

        const data = await response.json();
        if (!isDailyVerse(data)) {
          throw new Error("Resposta inválida da API do versículo.");
        }

        if (!isMounted) return;

        saveVerseCache(data, new Date());
        setVerse(data);
        setError(null);
      } catch (fetchError) {
        if (!isMounted) return;

        if (fallbackVerse) {
          setVerse(fallbackVerse);
          setError(null);
        } else {
          setError(fetchError instanceof Error ? fetchError : new Error("Falha ao carregar o versículo do dia."));
        }
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    const initialize = async () => {
      const cached = readVerseCache();
      const now = new Date();
      const cachedIsValid = cached !== null && isCacheValid(cached, now);

      if (cached) {
        setVerse(cached.verse);
        if (!cachedIsValid) {
          setLoading(true);
        }
      }

      if (!cachedIsValid) {
        await fetchVerse(cached?.verse ?? null);
      } else {
        setLoading(false);
      }

      scheduleRefresh();
    };

    initialize();

    return () => {
      isMounted = false;
      clearTimer();
    };
  }, []);

  return {
    verse,
    loading,
    error,
  };
}
