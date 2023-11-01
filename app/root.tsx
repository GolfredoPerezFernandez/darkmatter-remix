import { useState } from 'react';
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
  Link,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node';
import { argentWallet, bifrostWallet, bitgetWallet, bitskiWallet, braveWallet, clvWallet, coin98Wallet, coreWallet, dawnWallet, desigWallet, foxWallet, frameWallet, frontierWallet, imTokenWallet, ledgerWallet, mewWallet, oktoWallet, okxWallet, omniWallet, oneKeyWallet, phantomWallet, rabbyWallet, safeheronWallet, safepalWallet, safeWallet, subWallet, tahoWallet, talismanWallet, tokenPocketWallet, trustWallet, uniswapWallet, xdefiWallet, zealWallet, zerionWallet } from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {fantom, okc} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import type { Chain } from 'wagmi';
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import tailwind from './styles/app.css';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import globalStylesUrl from './styles/global.css';
import rainbowStylesUrl from '@rainbow-me/rainbowkit/styles.css';

type Env = { PUBLIC_ENABLE_TESTNETS?: string };

type LoaderData = { ENV: Env };
 
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'RainbowKit Remix Example',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'stylesheet', href: rainbowStylesUrl },
];

// Note: These environment variables are hard coded for demonstration purposes.
// See: https://remix.run/docs/en/v1/guides/envvars#browser-environment-variables
export const loader: LoaderFunction = () => {
  const data: LoaderData = {
    ENV: {
      PUBLIC_ENABLE_TESTNETS: process.env.PUBLIC_ENABLE_TESTNETS || 'false',
    },
  };

  return json(data);
};
export default function App() {
  const { ENV } = useLoaderData<LoaderData>();

  // Remix modules cannot have side effects so the initialization of `wagmi`
  // client happens during render, but the result is cached via `useState`
  // and a lazy initialization function.
  // See: https://remix.run/docs/en/v1/guides/constraints#no-module-side-effects
  const [{ config, chains }] = useState(() => {
    const testChains = ENV.PUBLIC_ENABLE_TESTNETS === 'false' ? [] : [];

    const { chains, publicClient } = configureChains(
      [fantom, ],
      [publicProvider()]
    );

    const connectors = connectorsForWallets([
      {
        groupName: 'Recommended',
        wallets: [
          injectedWallet({ chains }),
          
          rainbowWallet({       projectId: '86f162262f5e6511639c6c19e2210876'
          , chains }),
          uniswapWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),

          walletConnectWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),
          coinbaseWallet({ chains, appName: 'My RainbowKit App' }),
          zerionWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),
          zealWallet({  chains }),
          argentWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),
          bitgetWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),
          braveWallet({ chains }),
          clvWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),
          bitskiWallet({  chains }),
          coin98Wallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          dawnWallet({  chains }),
          desigWallet({  chains }),
          foxWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          frameWallet({  chains }),
          frontierWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          imTokenWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          ledgerWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          oktoWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          oneKeyWallet({  chains }),
          mewWallet({  chains }),
          rabbyWallet({  chains }),
          safeWallet({  chains }),
          xdefiWallet({  chains }),
          trustWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),

          coreWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          omniWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          talismanWallet({  chains }),
          tahoWallet({  chains }),
          subWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          safepalWallet({  projectId: '86f162262f5e6511639c6c19e2210876',chains }),
          safeheronWallet({  chains }),

          tokenPocketWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),
          phantomWallet({  chains }),
          okxWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),
          bifrostWallet({ projectId: '86f162262f5e6511639c6c19e2210876', chains }),

          metaMaskWallet({       projectId: '86f162262f5e6511639c6c19e2210876'
          , chains }),
        ],    
      },
      {
        groupName: 'Others',
        wallets: [
          coinbaseWallet({ chains, appName: 'My RainbowKit App' }),
          walletConnectWallet({       projectId: '86f162262f5e6511639c6c19e2210876'
          , chains }),
        ],
      },
    ]);
    const config = createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    });

    return {
      config,
      chains,
    };
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>

      </head>
      <body>
    
        {config && chains ? (
          <WagmiConfig  config={config}>
            <RainbowKitProvider coolMode  theme={midnightTheme({accentColorForeground:"black",fontStack:"rounded",accentColor:"white"})}
     chains={chains as Chain[]}>
      
      <Link to={'/'}>
                <img
                src="https://bafkreigipz5ucmtvffukgfyppn7gko2nd2nukckqy2cpxwuem45o63l2xi.ipfs.nftstorage.link/"
                alt="Logo"
                width="220px"
                
                height="70px"
              /></Link>
              
            <Outlet />
            </RainbowKitProvider>
          </WagmiConfig>
        ) : null}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
