import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { ArrowRight, CheckCircle2, Search, Sparkles, Building2, User, DollarSign, Target, Award } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Projet fait par Yacine-Samy & Salim
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
              Bienvenue sur Opti'Match
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Votre assistant IA pour trouver les équipements IT parfaitement adaptés à vos besoins
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/configure" className="flex items-center gap-2">
                  Commencer
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-center">Comment ça fonctionne ?</h2>
            <div className="grid md:grid-cols-3 gap-6">
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
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-center">Fonctionnalités</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    Pour particuliers
                  </CardTitle>
                  <CardDescription>
                    Trouvez le téléphone, l'ordinateur ou les accessoires qui correspondent à votre usage quotidien
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Recommandations personnalisées
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Comparaison détaillée des produits
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Justification de chaque choix
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    Pour entreprises
                  </CardTitle>
                  <CardDescription>
                    Équipez votre entreprise avec une sélection complète d'équipements IT professionnels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Solutions complètes pour équipes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Infrastructure réseau incluse
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Optimisation du budget
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Critères */}
          <Card className="bg-linear-to-br from-primary/5 to-accent/5 border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Critères de recommandation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Budget</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nous adaptons nos recommandations à votre budget pour maximiser le rapport qualité-prix
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Usage</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gaming, bureautique, création de contenu... chaque usage a ses exigences spécifiques
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Préférences</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Marques favorites, systèmes d'exploitation, technologies préférées
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button asChild size="lg" className="text-lg px-8 shadow-lg">
              <Link href="/configure" className="flex items-center gap-2">
                Obtenir mes recommandations
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
