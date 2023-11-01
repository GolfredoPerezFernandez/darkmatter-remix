
import {

  ConnectButton,
} from '@rainbow-me/rainbowkit';
import { useCallback, useEffect, useRef, useState } from "react";
import Particles from "react-particles";
import {  type Container, type Engine } from "tsparticles-engine";
import { makeStyles } from '@material-ui/core/styles';
import OpenAI from 'openai';

import { useMediaQuery } from "react-responsive";
import { TypeAnimation } from 'react-type-animation';

import { useLoaderData, useNavigate } from "@remix-run/react";

import { tsParticles } from "tsparticles-engine";
import GLOBE from 'vanta/dist/vanta.globe.min'

import { useAccount } from "wagmi";
import { loadHyperspacePreset } from "tsparticles-preset-hyperspace";
import { loadSlim } from "tsparticles-slim";
import { LoaderFunction, json } from '@remix-run/node';

type Env = { OPENAI?: string };

type LoaderData = { ENV: Env };
export const loader: LoaderFunction = () => {
  const data: LoaderData = {
    ENV: {
      OPENAI: process.env.OPENAI || '',
    },
  };

  return json(data);
};
  

export default function Dashboard() {
const myRef = useRef(null);
const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(GLOBE({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xffffff,
        size: 0.50,
        backgroundColor: 0x0
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect])
  return (
    <div ref={myRef} style={{height:"88vh",paddingBottom:40}} className="h-screen  flex justify-center items-center">
          <div className="w-full overflow-y-auto px-4" style={{ width: "100%", textAlign: "center" }}>

            
    </div>
    </div>
  );
}
