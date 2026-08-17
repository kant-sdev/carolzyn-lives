import type { DonationsSummary } from "@/hooks/use-donations";
import { formatCurrencyBRL, MIDFIELDER_CHECKOUT_URL } from "@/lib/donations";

interface DonationGoalCardProps {
  summary: DonationsSummary | null;
  percentage: number;
  isLoading: boolean;
}

export function DonationGoalCard({ summary, percentage, isLoading }: DonationGoalCardProps) {
  return (
    <div className="rounded-3xl border border-[#F3EEE5] bg-white p-6 shadow-sm md:p-8">
      <span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-medium text-[#EF4444]">
        Meta do mês
      </span>

      <div className="mt-4">
        <p className="font-serif text-3xl text-[#3A2E27] md:text-4xl">
          {isLoading ? "—" : formatCurrencyBRL(summary!.currentAmount)}
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          de {isLoading ? "—" : formatCurrencyBRL(summary!.goalAmount)} da nossa meta
        </p>
      </div>

      {/* Barra horizontal nativa em Tailwind, formato pílula */}
      <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-[#F3EEE5]">
        <div
          className="h-full rounded-full bg-[#E07A5F] transition-all duration-700 ease-out"
          style={{ width: `${isLoading ? 0 : percentage}%` }}
        />
      </div>
      <p className="mt-2 text-right text-xs text-neutral-400">
        {isLoading ? "..." : `${percentage}%`}
      </p>

      <p className="mt-5 text-sm text-neutral-600">
        <span className="font-semibold text-[#3A2E27]">
          {isLoading ? "..." : summary!.donorsCount}
        </span>{" "}
        filhotes já apoiaram esse cantinho 🐾
      </p>

      <a
        href={MIDFIELDER_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center rounded-full bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c96a4f]"
      >
        Contribuir via Pix Seguro
      </a>
      <p className="mt-3 text-center text-xs text-neutral-400">
        Você será redirecionado com segurança para o MidFielder.tv para concluir sua doação via
        Pix.
      </p>
    </div>
  );
}