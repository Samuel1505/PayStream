'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '../theme/theme';
import { StarknetConfig, publicProvider, InjectedConnector } from "@starknet-react/core";
import { sepolia, mainnet } from "@starknet-react/chains";

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
    new InjectedConnector({ options: { id: "argentX" } }),
    new InjectedConnector({ options: { id: "braavos" } }),
  ];

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StarknetConfig 
          chains={chains} 
          provider={publicProvider()}
          connectors={connectors}
        >
          {children}
        </StarknetConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}