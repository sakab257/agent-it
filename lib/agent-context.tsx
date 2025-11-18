'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AgentConfig {
  userType: 'individual' | 'enterprise';
  budgetRange: string;
  usageType: string;
  brands: string[];
  os: string[];
  specificNeeds?: string;
}

interface AgentContextType {
  config: AgentConfig;
  setConfig: (config: AgentConfig) => void;
  recommendations: string | null;
  setRecommendations: (recommendations: string | null) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AgentConfig>({
    userType: 'individual',
    budgetRange: '',
    usageType: '',
    brands: [],
    os: [],
    specificNeeds: '',
  });
  const [recommendations, setRecommendations] = useState<string | null>(null);

  return (
    <AgentContext.Provider value={{ config, setConfig, recommendations, setRecommendations }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
