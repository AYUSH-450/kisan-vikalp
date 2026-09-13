import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Transaction } from '../../types';
import { mockService } from '../../services/mockDataService';

interface OfficerContextType {
  activeTransaction: Transaction | null;
  setActiveTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const OfficerContext = createContext<OfficerContextType | undefined>(undefined);

export function OfficerProvider({ children }: { children: ReactNode }) {
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // In a real app, the officer might just fetch the queue or wait for scan.
      // For this demo, if they have an active transaction, fetch it to get latest status.
      if (activeTransaction?.id) {
        const latest = await mockService.getTransaction(activeTransaction.id);
        setActiveTransaction(latest);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []); // Only on mount. The officer will typically scan to set the active transaction.

  return (
    <OfficerContext.Provider value={{ activeTransaction, setActiveTransaction, refreshData, isLoading }}>
      {children}
    </OfficerContext.Provider>
  );
}

export function useOfficerContext() {
  const context = useContext(OfficerContext);
  if (context === undefined) {
    throw new Error('useOfficerContext must be used within a OfficerProvider');
  }
  return context;
}
