import { CheckIcon, ClockIcon, SearchIcon, StarIcon } from "lucide-react";
import { Button } from "../shadcn-ui/button";
import Link from "next/link";
import { Badge } from "../shadcn-ui/badge";
import { SectionHeader } from "../ui/section-header";
import { Card, CardContent } from "../shadcn-ui/card";
import { H1 } from "../ui/typography";

export const HeroSection = () => {
  return (
    <>
      <div className="text-center">
        <div>
          <Badge className="bg-primary/60 text-foreground mb-4 rounded-full px-4 py-2 text-sm font-medium">
            ✨ Odblokuj swój potencjał.
          </Badge>
        </div>

        <div>
          <SectionHeader
            title="Osiągaj cele z pełną świadomością i pewnością siebie."
            titleClassName="text-center"
            heading={H1}
            subtitleClassName="text-foreground/80 text-base md:text-base max-w-xl mx-auto"
            subtitle="Coaching, który prowadzi do prawdziwej zmiany – zawodowej, osobistej i emocjonalnej. Odkryj, kim naprawdę jesteś i dokąd chcesz zmierzać."
          />
        </div>
      </div>
      <div>
        <Card className="mb-12 border-0 shadow-md backdrop-blur-sm">
          <CardContent className="mdp-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      Zyskasz większą pewność siebie
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <ClockIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      Nauczysz się podejmować decyzje w zgodzie ze sobą
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                    <SearchIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      Poprawisz relacje osobiste i zawodowe.
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <StarIcon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      Odkryjesz swoje mocne strony i nauczysz się z nich
                      korzystać.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Link href="/uslugi/nowa" aria-label="Przejdź do strony book app">
          <Button>Umów wizytę online</Button>
        </Link>

        <p className="text-foreground/80 mt-4 text-sm">
          Umawiaj online • Wybieraj wygodne terminy
        </p>
      </div>
    </>
  );
};
