'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { useAgent } from '@/lib/agent-context';
import { getPuterRecommendations } from '@/lib/puter-client';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';

export default function RecommendationsPage() {
  const router = useRouter();
  const { config, recommendations, setRecommendations } = useAgent();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si les configurations sont remplies
    if (!config.budgetRange || !config.usageType) {
      router.push('/configure');
      return;
    }

    // Si on n'a pas encore de recommandations, on les génère
    if (!recommendations && !loading) {
      generateRecommendations();
    }
  }, [config, recommendations]);

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPuterRecommendations(
        config.userType,
        config.budgetRange,
        config.usageType,
        config.brands,
        config.os,
        config.specificNeeds
      );
      setRecommendations(result);
    } catch (err) {
      console.error('Error generating recommendations:', err);
      setError(
        'Une erreur est survenue lors de la génération des recommandations. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setRecommendations(null);
    generateRecommendations();
  };

  const handleNewSearch = () => {
    setRecommendations(null);
    router.push('/configure');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Vos recommandations</h1>
            <p className="text-muted-foreground">
              Basées sur vos critères et besoins spécifiques
            </p>
          </div>

          {/* Configuration Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Vos critères</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {config.userType === 'individual' ? 'Particulier' : 'Entreprise'}
                </Badge>
                <Badge variant="outline">{config.budgetRange}</Badge>
                <Badge variant="outline">{config.usageType}</Badge>
              </div>
              {config.brands.length > 0 && (
                <div>
                  <span className="font-semibold text-sm">Marques: </span>
                  <span className="text-sm text-muted-foreground">{config.brands.join(', ')}</span>
                </div>
              )}
              {config.os.length > 0 && (
                <div>
                  <span className="font-semibold text-sm">OS: </span>
                  <span className="text-sm text-muted-foreground">{config.os.join(', ')}</span>
                </div>
              )}
              {config.specificNeeds && (
                <div>
                  <span className="font-semibold text-sm">Besoins spécifiques: </span>
                  <span className="text-sm text-muted-foreground">{config.specificNeeds}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && (
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">L'agent analyse vos besoins...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recherche des meilleures options disponibles sur le marché
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="border-destructive">
              <CardContent className="py-8">
                <div className="text-center space-y-4">
                  <p className="text-destructive font-semibold">{error}</p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleRegenerate} variant="outline">
                      Réessayer
                    </Button>
                    <Button onClick={handleNewSearch}>
                      Nouvelle recherche
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {recommendations && !loading && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommandations de l'agent</CardTitle>
                  <CardDescription>
                    Voici les équipements sélectionnés pour vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{recommendations}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button onClick={handleRegenerate} variant="outline">
                  Régénérer les recommandations
                </Button>
                <Button onClick={handleNewSearch}>
                  Nouvelle recherche
                </Button>
              </div>

              {/* Info */}
              <Card className="bg-muted/50">
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Ces recommandations sont générées par une IA et doivent être considérées comme des suggestions.
                    Nous vous recommandons de vérifier les prix et la disponibilité avant tout achat.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
