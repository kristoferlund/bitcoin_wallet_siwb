import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SiwbIdentityProvider } from 'ic-use-siwb-identity';
import { _SERVICE as BACKEND_SERVICE } from "../backend/declarations/backend.did";
import type { _SERVICE as SIWB_SERVICE } from '../ic_siwb_provider/declarations/ic_siwb_provider.did';
import {
  createActorHook,
} from "ic-use-actor";
import {
  canisterId as backendCanisterId,
  idlFactory as backendIdlFactory,
} from "../backend/declarations/index"
import { idlFactory as siwbIdlFactory } from '../ic_siwb_provider/declarations/index';

// Mimimize reloading of queries
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryOnMount: false,
      retry: false,
      gcTime: Infinity,
      staleTime: Infinity
    }
  }
});

// Create an actor hook we can use to communicate with the canister backend
export const useBackendActor = createActorHook<BACKEND_SERVICE>({
  canisterId: backendCanisterId,
  idlFactory: backendIdlFactory,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SiwbIdentityProvider<SIWB_SERVICE>
        canisterId={process.env.CANISTER_ID_IC_SIWB_PROVIDER!}
        idlFactory={siwbIdlFactory}
        httpAgentOptions={{ host: process.env.DFX_NETWORK === 'ic' ? 'https://icp0.io' : 'http://127.0.0.1:4943' }} // use only in local canister
      >
        <App />
      </SiwbIdentityProvider>
    </QueryClientProvider>
  </StrictMode>,
)
