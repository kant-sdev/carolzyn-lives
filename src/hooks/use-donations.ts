import { useEffect, useRef, useState } from "react";

export interface Donor {
  id: string;
  name: string;
  amount: number;
  message: string;
  donatedAt: string;
}

export interface DonationsSummary {
  currentAmount: number;
  goalAmount: number;
  donorsCount: number;
  recentDonors: Donor[];
}

// 10 minutos, conforme solicitado no briefing
const POLL_INTERVAL_MS = 10 * 60 * 1000;

const GOAL_AMOUNT = 3000;

const DONOR_POOL: Array<Omit<Donor, "id" | "donatedAt">> = [
  { name: "Luna", amount: 25, message: "Obrigada por tanto carinho todos os dias 🐾" },
  { name: "Theo", amount: 50, message: "Pra manter o cantinho sempre quentinho!" },
  { name: "Nina", amount: 15, message: "Pouquinho, mas de coração ❤️" },
  { name: "Bento", amount: 100, message: "Vocês merecem muito mais que isso" },
  { name: "Mel", amount: 30, message: "Sempre torcendo por vocês por aqui" },
  { name: "Zeca", amount: 40, message: "Que esse espaço continue existindo por muito tempo" },
];

/**
 * Busca o resumo da campanha de doações.
 *
 * Esta função é uma SIMULAÇÃO local dos dados em tempo real do MidFielder.tv.
 * Para conectar com o backend real, substitua o corpo por algo como:
 *
 *   const res = await fetch("https://api.midfielder.tv.br/v1/campaigns/carolzyn/summary");
 *   return res.json();
 */
async function fetchDonationsSummary(
  previous: DonationsSummary | null,
): Promise<DonationsSummary> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const increment = Math.floor(Math.random() * 180);
  const currentAmount = Math.min(GOAL_AMOUNT, (previous?.currentAmount ?? 1420) + increment);
  const donorsCount = (previous?.donorsCount ?? 47) + Math.floor(Math.random() * 3);

  const recentDonors: Donor[] = [...DONOR_POOL]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((donor, index) => ({
      ...donor,
      id: `${Date.now()}-${index}`,
      donatedAt: new Date(Date.now() - index * 1000 * 60 * 7).toISOString(),
    }));

  return { currentAmount, goalAmount: GOAL_AMOUNT, donorsCount, recentDonors };
}

/**
 * Hook que expõe o estado da campanha de doações, com polling automático
 * a cada 10 minutos para simular atualização em tempo real.
 */
export function useDonations() {
  const [summary, setSummary] = useState<DonationsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const summaryRef = useRef<DonationsSummary | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const next = await fetchDonationsSummary(summaryRef.current);
      if (!isMounted) return;
      summaryRef.current = next;
      setSummary(next);
      setIsLoading(false);
    }

    load();
    const intervalId = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const percentage = summary
    ? Math.min(100, Math.round((summary.currentAmount / summary.goalAmount) * 100))
    : 0;

  return { summary, isLoading, percentage };
}