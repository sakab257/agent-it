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

//   const prompt = `You are an IT equipment expert. Provide personalized recommendations.

// User type: ${userType === 'individual' ? 'Individual' : 'Enterprise'}
// Budget range: ${budgetRange}
// Primary usage: ${usageType}
// Preferred brands: ${brands.length > 0 ? brands.join(', ') : 'No preference'}
// Preferred operating systems: ${os.length > 0 ? os.join(', ') : 'No preference'}
// ${specificNeeds ? `Specific needs: ${specificNeeds}` : ''}

// ${userType === 'enterprise'
//   ? 'Provide a detailed list of IT equipment for an enterprise, including phones, laptops, desktops, accessories if needed.'
//   : 'Recommend the best IT equipment (phone, computer, accessories) suitable for these needs.'}

// For each recommendation, include:
// - Product name and brand
// - Approximate price
// - Main features
// - Why this product matches the needs

// Please respond in French in a clear and structured manner.`;

  const prompt = `You are an IT equipment consultant specializing in technology recommendations. Your mission is to provide personalized and pragmatic advice based on real needs and budget.

# USER CONTEXT

User type: ${userType === 'individual' ? 'Individual' : 'Enterprise'}

Budget: ${budgetRange}

Primary usage: ${usageType}

Preferred brands: ${brands.length > 0 ? brands.join(', ') : 'No preference'}

Preferred operating systems: ${os.length > 0 ? os.join(', ') : 'No preference'}

# RECOMMENDATION SCOPE

${userType === 'enterprise'
  ? `For this enterprise, provide a complete and detailed list including:
- Computers (laptops and/or desktops depending on needs), search this one first
- Professional phones if needed or relevant and if an OS (Android or iOS) is specified, if not, don't specify a phone.
- Essential accessories and peripherals (monitors, keyboards, mice, headsets, etc.) for the team if needed.

Consider scalability, fleet maintainability, professional warranties, and after-sales support.

Prioritize the specific needs mentioned if any.

Suggest alternatives in different price ranges if the budget allows.`

  : `For this individual, recommend essential equipment:
- One main computer (laptop or desktop depending on needs)
- A phone if relevant and if an OS (Android or iOS) is specified, if not, don't specify a phone.
- Truly useful accessories based on the described usage and the speficic needs.

Prioritize the specific needs mentioned if any.

Suggest alternatives in different price ranges if the budget allows.`}

# EXPECTED RESPONSE FORMAT

For each recommendation, structure your response as follows:

**[Equipment Category]**

**Product Name** - Brand
- Price: [Approximate price in €]
- Key Features: [List of key specs]
- Why this choice: [Precise explanation of how it matches the stated needs]
- Considerations: [Any limitations or trade-offs to be aware of]

**Final Budget Summary:**
- Allocated budget: ${budgetRange}
- Estimated configuration budget: [calculated total amount]

# IMPORTANT INSTRUCTIONS

- Prioritize value for money and relevance to the described usage
- Be transparent about necessary trade-offs if the budget is tight
${userType === 'enterprise' ? '- Favor equipment with professional warranties (ideally 3 years minimum)' : ''}
- Base recommendations on products actually available in the French/European market
- Avoid recommending obsolete or end-of-life hardware
- If the budget seems insufficient for the needs, mention it clearly and suggest priorities

Start your response directly with the recommendations without repeating the context.

IMPORTANT: ${specificNeeds ? `Specific needs: ${specificNeeds}` : 'Specific needs: No particular requirements mentioned'}
If the user has specific needs, only address those in your recommendations.

IMPORTANT: Translate your entire response into French. Provide the complete answer in French only.`;

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
