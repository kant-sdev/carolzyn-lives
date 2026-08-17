import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DonationGoalCard } from "@/components/donations/DonationGoalCard";
import { DonorsWall } from "@/components/donations/DonorsWall";
import { useDonations } from "@/hooks/use-donations";

export const Route = createFileRoute("/donations")({
  component: DonationsPage,
});

function DonationsPage() {
  const { summary, isLoading, percentage } = useDonations();

  return (
    <div className="min-h-screen bg-[#FFFCF7]">
      <Navbar />

      <main className="container mx-auto px-4 py-12 md:px-8 md:py-20">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* Bloco esquerdo */}
          <div>
            <h1 className="font-serif text-4xl leading-tight text-[#3A2E27] md:text-5xl">
              Apoie o nosso <span className="text-[#E07A5F]">espaço acolhedor</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-neutral-600 md:text-lg">
              Sua contribuição ajuda a manter esse cantinho vivo — luz acesa, café quentinho e um
              lugar seguro para a nossa comunidade de filhotes se encontrar todos os dias.
            </p>

            <DonorsWall donors={summary?.recentDonors ?? []} isLoading={isLoading} />
          </div>

          {/* Bloco direito */}
          <DonationGoalCard summary={summary} percentage={percentage} isLoading={isLoading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}