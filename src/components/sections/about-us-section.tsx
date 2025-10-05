import { Text } from "../ui/typography";
import {
  ArrowUpRightIcon,
  Clock10Icon,
  PhoneIcon,
  SparklesIcon,
} from "lucide-react";
import { CardItem } from "../ui/card-item";
import { SectionHeader } from "../ui/section-header";
import { AccessibleLink } from "../ui/accesible-link";
import { Button } from "../shadcn-ui/button";

export function AboutUsSection() {
  return (
    <>
      <SectionHeader
        title={
          <>
            Nie masz jeszcze strony? <br />
            Pomogę Ci zacząć od zera
          </>
        }
        subtitle="Tworzenie strony internetowej nie musi być trudne. W prostych krokach
          przeprowadzę Cię przez cały proces – bez technicznych komplikacji i
          zbędnych kosztów."
        subtitleClassName="max-w-3xl mx-auto"
      />

      <div className="mb-6 space-y-4 md:mb-12">
        <Text size="subtitle" className="!text-start">
          Jak to wygląda?
        </Text>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dontHaveWebsiteData.map(({ id, title, text, style, icon }) => (
            <div key={id}>
              <CardItem
                key={id}
                icon={icon}
                title={title}
                description={text}
                iconClassName={style}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <AccessibleLink href="/kontakt" aria-label="Przejdź do strony kontakt">
          <Button size="lg">
            Umów bezpłatną konsultację
            <ArrowUpRightIcon className="text-accent-emerald ml-1 h-4 w-4" />
          </Button>
        </AccessibleLink>
      </div>
    </>
  );
}

const dontHaveWebsiteData = [
  {
    id: "1",
    icon: PhoneIcon,
    title: "Krótka rozmowa",
    text: "W 30 minut opowiesz mi o swoim biznesie – dowiem się, co robisz i czego potrzebujesz.",
    style: "border-accent-cyan text-cyan-600 bg-cyan-100",
  },
  {
    id: "2",
    icon: SparklesIcon,
    title: "Dopasowana propozycja",
    text: "Otrzymasz konkretny projekt strony internetowej dopasowanej do Twoich potrzeb.",
    style: "border-accent-emerald text-emerald-600 bg-emerald-100",
  },
  {
    id: "3",
    icon: Clock10Icon,
    title: "Szybka realizacja",
    text: "Gotową stronę możesz mieć nawet w 14 dni – od projektu po wdrożenie.",
    style: "border-accent-lime text-lime-600 bg-lime-100",
  },
];
