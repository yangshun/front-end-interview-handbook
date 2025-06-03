import { useLocalStorage } from 'usehooks-ts';

export default function usePurchaseLastUsedPaymentProvider() {
  const [lastPaymentProvider, setLastPaymentProvider] = useLocalStorage<{
    id: string;
    provider: 'stripe' | 'tazapay';
  } | null>('gfe:payment', null);

  return { lastPaymentProvider, setLastPaymentProvider };
}
