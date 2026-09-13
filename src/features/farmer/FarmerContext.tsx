import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Transaction } from '../../types';
import { mockService } from '../../services/mockDataService';

interface FarmerContextType {
  activeTransaction: Transaction | null;
  setActiveTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  refreshDashboard: () => Promise<void>;
  isLoading: boolean;
}

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export function FarmerProvider({ children }: { children: ReactNode }) {
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshDashboard = async () => {
    setIsLoading(true);
    try {
      const dashboard = await mockService.getFarmerDashboard();
      // Only set if not already set or override based on real logic.
      // For this prototype, we'll initialize with the mock upcoming transaction.
      setActiveTransaction(dashboard.upcomingTransaction);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <FarmerContext.Provider value={{ activeTransaction, setActiveTransaction, refreshDashboard, isLoading }}>
      {children}
    </FarmerContext.Provider>
  );
}

export function useFarmerContext() {
  const context = useContext(FarmerContext);
  if (context === undefined) {
    throw new Error('useFarmerContext must be used within a FarmerProvider');
  }
  return context;
}
