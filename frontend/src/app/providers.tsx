'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '../theme/theme';
import { StarknetConfig, publicProvider, voyager, Connector } from "@starknet-react/core";
import { sepolia, mainnet } from "@starknet-react/chains";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { InjectedConnector } from "starknetkit/injected";

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
  const chains = [mainnet, sepolia];
  
  const connectors = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new ArgentMobileConnector(),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
  ];

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StarknetConfig 
          chains={chains} 
          provider={publicProvider()}
          connectors={connectors as Connector[]}
          explorer={voyager}
          autoConnect
        >
          {children}
        </StarknetConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}