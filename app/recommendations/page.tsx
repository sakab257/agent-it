'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { useAgent } from '@/lib/agent-context';
import { getPuterRecommendations } from '@/lib/puter-client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import ReactMarkdown from 'react-markdown';
import { Sparkles, RefreshCw, Search, AlertCircle, CheckCircle, User, Building2, DollarSign, Target, Loader2, Info } from 'lucide-react';

export default function RecommendationsPage() {
  const router = useRouter();
  const { config, recommendations, setRecommendations } = useAgent();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

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
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const result = await getPuterRecommendations(
        config.userType,
        config.budgetRange,
        config.usageType,
        config.brands,
        config.os,
        config.specificNeeds
      );
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setRecommendations(result);
      }, 300);
    } catch (err) {
      clearInterval(progressInterval);
      console.error('Error generating recommendations:', err);
      setError(
        'Une erreur est survenue lors de la génération des recommandations. Veuillez réessayer.'
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
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
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Recommandations IA
            </div>
            <h1 className="text-4xl font-bold mb-2">Vos recommandations</h1>
            <p className="text-muted-foreground">
              Basées sur vos critères et besoins spécifiques
            </p>
          </div>

          {/* Configuration Summary */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Vos critères
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {config.userType === 'individual' ? <User className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                  {config.userType === 'individual' ? 'Particulier' : 'Entreprise'}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {config.budgetRange}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {config.usageType}
                </Badge>
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
            <div className="space-y-6">
              <Card className="border-2 border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    <CardTitle>L'agent analyse vos besoins...</CardTitle>
                  </div>
                  <div className="space-y-3">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      {progress < 30 && "Analyse de vos critères..."}
                      {progress >= 30 && progress < 60 && "Recherche des meilleures options..."}
                      {progress >= 60 && progress < 90 && "Comparaison des produits..."}
                      {progress >= 90 && "Finalisation des recommandations..."}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="space-y-2 pt-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Card className="border-destructive border-2">
              <CardContent className="py-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-destructive">
                    <AlertCircle className="h-6 w-6" />
                    <p className="font-semibold">{error}</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleRegenerate} variant="outline" className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Réessayer
                    </Button>
                    <Button onClick={handleNewSearch} className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
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
              <Card className="border-2 border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    Recommandations de l'agent
                  </CardTitle>
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
              <div className="flex gap-4 justify-center flex-wrap">
                <Button onClick={handleRegenerate} variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Régénérer les recommandations
                </Button>
                <Button onClick={handleNewSearch} className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Nouvelle recherche
                </Button>
              </div>

              {/* Info */}
              <Card className="bg-linear-to-br from-accent/10 to-primary/10 border-2">
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                    <Info className="h-4 w-4" />
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
