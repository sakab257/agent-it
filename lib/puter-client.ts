// Client wrapper for Puter.js AI
declare global {
  interface Window {
    puter: any;
  }
}

export async function getPuterRecommendations(
  userType: 'individual' | 'enterprise',
  budgetRange: string,
  usageType: string,
  brands: string[],
  os: string[],
  specificNeeds?: string
): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('Running in non-browser environment');
  }

  const prompt = `You are an IT equipment expert. Provide personalized recommendations.

User type: ${userType === 'individual' ? 'Individual' : 'Enterprise'}
Budget range: ${budgetRange}
Primary usage: ${usageType}
Preferred brands: ${brands.length > 0 ? brands.join(', ') : 'No preference'}
Preferred operating systems: ${os.length > 0 ? os.join(', ') : 'No preference'}
${specificNeeds ? `Specific needs: ${specificNeeds}` : ''}

${userType === 'enterprise'
  ? 'Provide a detailed list of IT equipment for an enterprise, including phones, laptops, desktops, accessories if needed.'
  : 'Recommend the best IT equipment (phone, computer, accessories) suitable for these needs.'}

For each recommendation, include:
- Product name and brand
- Approximate price
- Main features
- Why this product matches the needs

Please respond in French in a clear and structured manner.`;

  try {
    // Attendre que Puter soit complètement chargé
    const puterLoaded = await new Promise<boolean>((resolve) => {
      if (window.puter && window.puter.ai) {
        resolve(true);
        return;
      }

      let attempts = 0;
      const maxAttempts = 100; // 10 secondes

      const checkPuter = setInterval(() => {
        attempts++;

        if (window.puter && window.puter.ai) {
          clearInterval(checkPuter);
          resolve(true);
        } else if (attempts >= maxAttempts) {
          clearInterval(checkPuter);
          resolve(false);
        }
      }, 100);
    });

    if (!puterLoaded || !window.puter || !window.puter.ai) {
      throw new Error('Puter.js failed to load after 10 seconds. Please refresh the page.');
    }

    const response = await window.puter.ai.chat(prompt, {
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 2000,
    });

    // ChatResponse a un objet message avec content
    if (response && response.message && response.message.content) {
      return response.message.content;
    } else if (typeof response === 'string') {
      return response;
    } else {
      throw new Error('Invalid response format from Puter AI');
    }
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'Une erreur est survenue lors de la génération des recommandations';

    throw new Error(errorMessage);
  }
}
