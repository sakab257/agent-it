import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Bienvenue sur Agent IT
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Votre assistant intelligent pour trouver les équipements IT parfaitement adaptés à vos besoins
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/configure">Commencer</Link>
              </Button>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-center">Comment ça fonctionne ?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-2">
                    1
                  </div>
                  <CardTitle>Configurez vos besoins</CardTitle>
                  <CardDescription>
                    Indiquez votre budget, l'usage prévu et vos préférences de marques
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-2">
                    2
                  </div>
                  <CardTitle>L'agent analyse</CardTitle>
                  <CardDescription>
                    Notre IA étudie vos critères et recherche les meilleures options du marché
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-2">
                    3
                  </div>
                  <CardTitle>Recevez vos recommandations</CardTitle>
                  <CardDescription>
                    Obtenez une liste personnalisée d'équipements avec justifications détaillées
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-center">Fonctionnalités</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pour particuliers</CardTitle>
                  <CardDescription>
                    Trouvez le téléphone, l'ordinateur ou les accessoires qui correspondent à votre usage quotidien
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Recommandations personnalisées</li>
                    <li>Comparaison détaillée des produits</li>
                    <li>Justification de chaque choix</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pour entreprises</CardTitle>
                  <CardDescription>
                    Équipez votre entreprise avec une sélection complète d'équipements IT professionnels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Solutions complètes pour équipes</li>
                    <li>Infrastructure réseau incluse</li>
                    <li>Optimisation du budget</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Critères */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-2xl">Critères de recommandation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Budget</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous adaptons nos recommandations à votre budget pour maximiser le rapport qualité-prix
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage</h3>
                  <p className="text-sm text-muted-foreground">
                    Gaming, bureautique, création de contenu... chaque usage a ses exigences spécifiques
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Préférences</h3>
                  <p className="text-sm text-muted-foreground">
                    Marques favorites, systèmes d'exploitation, technologies préférées
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/configure">Obtenir mes recommandations</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
