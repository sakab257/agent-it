import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CheckCircle2, Search, Target } from "lucide-react"

export function HowItWorks() {
  return (
    <Carousel className="w-full max-w-xs sm:max-w-xl md:max-w-4xl">
      <CarouselContent>
        <CarouselItem key={1}>
            <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                    1
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Configurez vos besoins
                  </CardTitle>
                  <CardDescription>
                    Indiquez votre budget, l'usage prévu et vos préférences de marques
                  </CardDescription>
                </CardHeader>
              </Card>
        </CarouselItem>
        <CarouselItem key={2}>
            <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                    2
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    L'agent analyse
                  </CardTitle>
                  <CardDescription>
                    Notre IA étudie vos critères et recherche les meilleures options du marché
                  </CardDescription>
                </CardHeader>
              </Card>
        </CarouselItem>
        <CarouselItem key={3}>
            <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                    3
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Recevez vos recommandations
                  </CardTitle>
                  <CardDescription>
                    Obtenez une liste personnalisée d'équipements avec justifications détaillées
                  </CardDescription>
                </CardHeader>
              </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
