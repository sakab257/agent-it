'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Header } from '@/components/header';
import { useAgent } from '@/lib/agent-context';

const BRANDS = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Asus', 'MSI', 'Acer', 'Peu importe'];
const OS = ['macOS', 'Windows', 'Linux', 'Android', 'iOS', 'Peu importe'];
const BUDGET_RANGES = [
  { value: '0-500', label: 'Moins de 500€' },
  { value: '500-1000', label: '500€ - 1000€' },
  { value: '1000-1500', label: '1000€ - 1500€' },
  { value: '1500-2000', label: '1500€ - 2000€' },
  { value: '2000-3000', label: '2000€ - 3000€' },
  { value: '3000+', label: 'Plus de 3000€' },
];
const USAGE_TYPES = [
  { value: 'bureautique', label: 'Bureautique (Office, navigation web, emails)' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'creation', label: 'Création de contenu (photo, vidéo, design)' },
  { value: 'developpement', label: 'Développement logiciel' },
  { value: 'multimedia', label: 'Multimédia (streaming, musique)' },
  { value: 'entreprise', label: 'Usage professionnel en entreprise' },
];

export default function ConfigurePage() {
  const router = useRouter();
  const { config, setConfig } = useAgent();
  const [formData, setFormData] = useState(config);

  const handleBrandToggle = (brand: string) => {
    setFormData((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleOsToggle = (os: string) => {
    setFormData((prev) => ({
      ...prev,
      os: prev.os.includes(os)
        ? prev.os.filter((o) => o !== os)
        : [...prev.os, os],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(formData);
    router.push('/recommendations');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Configuration</h1>
            <p className="text-muted-foreground">
              Remplissez le formulaire pour obtenir des recommandations personnalisées
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vos critères de recherche</CardTitle>
              <CardDescription>
                Plus vous serez précis, plus nos recommandations seront adaptées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type d'utilisateur */}
                <div className="space-y-3">
                  <Label htmlFor="userType">Type d'utilisateur</Label>
                  <Select
                    value={formData.userType}
                    onValueChange={(value: 'individual' | 'enterprise') =>
                      setFormData({ ...formData, userType: value })
                    }
                  >
                    <SelectTrigger id="userType">
                      <SelectValue placeholder="Sélectionnez votre profil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Particulier</SelectItem>
                      <SelectItem value="enterprise">Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-3">
                  <Label htmlFor="budgetRange">Budget</Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) =>
                      setFormData({ ...formData, budgetRange: value })
                    }
                  >
                    <SelectTrigger id="budgetRange">
                      <SelectValue placeholder="Sélectionnez votre budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_RANGES.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {formData.userType === 'enterprise'
                      ? 'Budget par employé ou budget total'
                      : 'Votre budget pour l\'équipement'}
                  </p>
                </div>

                {/* Usage */}
                <div className="space-y-3">
                  <Label>Usage principal</Label>
                  <RadioGroup
                    value={formData.usageType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, usageType: value })
                    }
                  >
                    {USAGE_TYPES.map((usage) => (
                      <div key={usage.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={usage.value} id={usage.value} />
                        <Label htmlFor={usage.value} className="font-normal cursor-pointer">
                          {usage.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Préférences de marques */}
                <div className="space-y-3">
                  <Label>Marques préférées (plusieurs choix possibles)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {BRANDS.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={formData.brands.includes(brand)}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <Label
                          htmlFor={`brand-${brand}`}
                          className="font-normal cursor-pointer"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Systèmes d'exploitation */}
                <div className="space-y-3">
                  <Label>Systèmes d'exploitation préférés (plusieurs choix possibles)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {OS.map((os) => (
                      <div key={os} className="flex items-center space-x-2">
                        <Checkbox
                          id={`os-${os}`}
                          checked={formData.os.includes(os)}
                          onCheckedChange={() => handleOsToggle(os)}
                        />
                        <Label
                          htmlFor={`os-${os}`}
                          className="font-normal cursor-pointer"
                        >
                          {os}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Besoins spécifiques (optionnel) */}
                <div className="space-y-2">
                  <Label htmlFor="specificNeeds">Besoins spécifiques (optionnel)</Label>
                  <Textarea
                    id="specificNeeds"
                    placeholder={
                      formData.userType === 'individual'
                        ? 'Ex: Écran tactile obligatoire, besoin d\'une longue autonomie, portable léger...'
                        : 'Ex: Besoin de compatibilité avec nos outils existants, support technique inclus, garantie étendue...'
                    }
                    value={formData.specificNeeds || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, specificNeeds: e.target.value })
                    }
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Contraintes techniques, exigences particulières...
                  </p>
                </div>

                {/* Récapitulatif */}
                {formData.budgetRange && formData.usageType && (
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Récapitulatif</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold">Type: </span>
                        {formData.userType === 'individual' ? 'Particulier' : 'Entreprise'}
                      </div>
                      <div>
                        <span className="font-semibold">Budget: </span>
                        {BUDGET_RANGES.find((r) => r.value === formData.budgetRange)?.label}
                      </div>
                      <div>
                        <span className="font-semibold">Usage: </span>
                        {USAGE_TYPES.find((u) => u.value === formData.usageType)?.label}
                      </div>
                      {formData.brands.length > 0 && (
                        <div>
                          <span className="font-semibold">Marques: </span>
                          {formData.brands.join(', ')}
                        </div>
                      )}
                      {formData.os.length > 0 && (
                        <div>
                          <span className="font-semibold">OS: </span>
                          {formData.os.join(', ')}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => router.push('/')}>
                    Retour
                  </Button>
                  <Button type="submit" className="flex-1">
                    Obtenir mes recommandations
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
