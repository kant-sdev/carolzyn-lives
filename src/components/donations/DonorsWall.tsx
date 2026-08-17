import type { Donor } from "@/hooks/use-donations";
import { formatCurrencyBRL } from "@/lib/donations";

interface DonorsWallProps {
  donors: Donor[];
  isLoading: boolean;
}

export function DonorsWall({ donors, isLoading }: DonorsWallProps) {
  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-400">
        Últimos filhotes que apoiaram
      </h2>

      <div className="mt-4 space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-3xl border border-[#F3EEE5] bg-white/60 shadow-sm"
              />
            ))
          : donors.map((donor, index) => (
              <div
                key={donor.id}
                className="flex items-start justify-between gap-4 rounded-3xl border border-[#F3EEE5] bg-white p-4 shadow-sm"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#3A2E27]">{donor.name}</span>
                    {index === 0 && (
                      <span className="rounded-full bg-[#FEE2E2] px-2 py-0.5 text-xs font-medium text-[#EF4444]">
                        Novo
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm text-neutral-500">“{donor.message}”</p>
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-[#E07A5F]">
                  {formatCurrencyBRL(donor.amount)}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}