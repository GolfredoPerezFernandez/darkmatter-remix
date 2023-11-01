
import {

  ConnectButton,
} from '@rainbow-me/rainbowkit';
import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import {  type Container, type Engine } from "tsparticles-engine";
import { makeStyles } from '@material-ui/core/styles';
import OpenAI from 'openai';

import { useMediaQuery } from "react-responsive";
import { TypeAnimation } from 'react-type-animation';

import { useLoaderData, useNavigate } from "@remix-run/react";

import { tsParticles } from "tsparticles-engine";

import { useAccount } from "wagmi";
import { loadHyperspacePreset } from "tsparticles-preset-hyperspace";
import { loadSlim } from "tsparticles-slim";
import { LoaderFunction, json } from '@remix-run/node';

type Env = { OPENAI?: string };
type LoaderData = { data: {message1:any,message2:any,message3:any,message4:any} };

export const loader: LoaderFunction =  async () => {
  const openai = new OpenAI({ apiKey:process.env.OPENAI, dangerouslyAllowBrowser: true })

  const stream:any = await openai.chat.completions.create({ model: 'gpt-3.5-turbo',
  messages:[{role:"system",
  content:"Your task is to answer in a consistent style in less that 24 characters. give you own presentation about Darkmmater a game about universe ",
  }]});



let mess1=stream

const stream2:any = await openai.chat.completions.create({ model: 'gpt-3.5-turbo',
messages:[{role:"system",
content:"Your task is to Invite to play darkmatter web3 space game  in less that 30 characters.",
}]});
let mess2= stream2


const stream3:any = await openai.chat.completions.create({ 
  model: 'gpt-3.5-turbo',
messages:[{role:"system",
content:"Your task is to answer in a consistent style in less that 30 characters. say a good  sentence about  decentralized web3 games",
}]});
let mess3=stream3





const stream4:any =  await openai.chat.completions.create({ 
  model: 'gpt-3.5-turbo',
messages:[{role:"system",
content:" Your task is to answer in a consistent style in less that 30 characters. Give benefits of using blockchain for web3 games",
}]});
let mess4=stream4
 

const data: LoaderData = {
  data:{
    message1:mess1.choices[0].message.content,  
    message2:mess2.choices[0].message.content,
    message3:mess3.choices[0].message.content,
    message4:mess4.choices[0].message.content,
  }

};

  return json(data);

};

export default function Index() {

const options = {
  preset: "hyperspace",
  fullScreen: { enable: true, zIndex: -2 },

};
  const navigate = useNavigate();

   async function customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadHyperspacePreset(engine);
  }
const speed:any=70
const useStyles = makeStyles(theme => ({
  root: {
    width:"100%",
    maxHeight:"100%",
    position: 'absolute',
    '& video': {
      objectFit: 'cover',
    },
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: 'absolute',
    
    bottom:0,
    left: 0,
    width: '100%',
  },
  title: {
    paddingBottom: theme.spacing(0),
  },
}));
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
}, []);
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });

const classes = useStyles();
const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
}, []);

loadHyperspacePreset(tsParticles)

const [hyperspace,setHyperspace]=useState(false)

function handlePlay(){

  setHyperspace(!hyperspace)

setTimeout(async ()=>{
  console.log("entro")
  navigate('/welcome')

},1400)
}

const { address,isConnected } = useAccount()
const { data } = useLoaderData<LoaderData>();

const [history4, setHistory4] = useState<any>([
  {
    role: "assistant",
    content: "",
  },
]);
const [history3, setHistory3] = useState<any>([
  {
    role: "assistant",
    content: "",
  },
]);
const [history2, setHistory2] = useState<any>([
  {
    role: "assistant",
    content: "",
  },
]);
const [history, setHistory] = useState<any>([
  {
    role: "assistant",
    content: "",
  },
]);
async function chatgpt() { 
  


}
useEffect(()=>{
  console.log("data "+JSON.stringify(data))


  
},[data])
  return (
    <div style={{height:"88vh",paddingBottom:40}} className="h-screen  flex justify-center items-center">
    <div  style={{flex:1,paddingLeft:20,paddingRight:20,maxWidth:"100wh",maxHeight:"100vh"}} 
    >
      {hyperspace?        <Particles style={{zIndex: -1}} options={options} init={customInit} />
    :
      <Particles
                  id="tsparticles"
                  init={particlesInit}
                  loaded={particlesLoaded}
                  style={{position:'absolute'}}
                  options={{
                    fullScreen: { enable: true, zIndex: -1 },
                  
                      background: {
                  
                          color: {
                              value: "#000000",
                          },
                      },
                      fpsLimit: 60,
                      interactivity: {
                        events: {
                          onclick: { enable: true, mode: "repulse" },
                          onhover: {
                            enable: true,
                            mode: "bubble",
                            parallax: { enable: false, force: 2, smooth: 10 }
                          },
                          resize: true
                        },
                        modes: {
                          bubble: { distance: 250, duration: 2, opacity: 0, size: 0, speed: 3 },
                          grab: { distance: 400, line_linked: { opacity: 1 } },
                          push: { particles_nb: 4 },
                          remove: { particles_nb: 2 },
                          repulse: { distance: 400, duration: 0.4 }
                        }
                      },
                      particles: {
                        color: { value: "#ffffff" },
                        line_linked: {
                          color: "#ffffff",
                          distance: 150,
                          enable: false,
                          opacity: 0.4,
                          width: 1
                        },
                        move: {
                          size: true,
                          attract: { enable: false, rotateX: 600, rotateY: 600 },
                          bounce: false,
                          direction: "none",
                          enable: true,
                          out_mode: "out",
                          random: true,
                          speed: 0.3,
                          straight: false
                        },
                        number: { density: { enable: true, value_area: 800 }, value: 160 },
                        opacity: {
                          anim: { enable: true, opacity_min: 0, speed: 0.5, sync: false },
                          random: true,
                          value: 1
                        },
                        shape: {
                          character: {
                            fill: false,
                            font: "Verdana",
                            style: "",
                            value: "*",
                            weight: "400"
                          },
                          polygon: { nb_sides: 5 },
                          stroke: { color: "#000000", width: 0 },
                          type: "circle"
                        },
                        size: {
                          anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
                          random: true,
                          value: 3
                        }
                      },
                      polygon: {
                        draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
                        move: { radius: 10 },
                        scale: 1,
                        type: "none",
                        url: ""
                      },
                      detectRetina: true,
                  }}
              />}   
             
              
         <TypeAnimation
                         sequence={[
                          data.message1,
                         ]}
                        
                         wrapper="div"
                         cursor={false}
                         style={{textAlign:"center",
                         fontWeight:"bold",
                         paddingLeft:"15%",
                         paddingRight:"15%",
                         paddingTop:isTabletOrMobile?"0%":"0%",width:"100%",alignItems:"center", textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile?34:48,color:"#F8F8FF",fontFamily:"orbitron",marginBottom:20,}}
                         />       
                        
{data.message2?

     <div style={{flexDirection:'row',height:63,textAlign:"center",width:"100%",justifyContent:'center',alignItems:"center"}}>
                         
                          <TypeAnimation
    sequence={[
      data.message2,2500,
      data.message3,2500,
      data.message4,2500,]}
    wrapper="div"
    cursor={false}
    speed={speed}
  
    style={{
      width: "100%",
      marginTop: 10,
      paddingLeft:"10%",
      paddingRight:'10%',
      alignSelf:"center",
      textShadow: "0px 0px 7px #00FF00",
      fontSize: isTabletOrMobile ? 14 : 28,
      color: "#00FF00",
      fontWeight:"bold",
      fontFamily: "orbitron",
      marginBottom: 5,
      textAlign: 'center'
    }}
  />
                         </div> :null}
                         
                        
  {data.message2?  <div  style={{marginTop:20,flexDirection:'column',textAlign:"center",width:"100%",justifyContent:'center',alignItems:"center"}}>
                         {data.message2?<button
                  style={{
                    textShadow: "0px 0px 7px white",
                    backgroundColor: "#FFD700",
                    color:'white',
                    width:"240px",
                    alignSelf:"center",
                  }}
                  onClick={handlePlay}
                  className="button-855play"
                  role="button"
                >
                 DOCUMENTATION
                </button>:null}
                         {!isConnected?
                    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button      style={{
                    textShadow: "0px 0px 7px white",
                    backgroundColor: "#FFD700",
                    color:'black',
                    fontWeight:'bold',
                    alignSelf:"center",
                    width:"240px",

                    marginTop:20
                  }}    className="button-85"          onClick={openConnectModal} type="button">
                    CONNECT WALLET
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button style={{                    width:"240px",
                }}  className="button-855play"
                  onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                 

                  <button                   className="button-855play"
 onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
     :                <div style={{ display: 'flex',width:"100%",justifyContent:"center",alignSelf:"center" }}>
     <button      style={{
      textShadow: "0px 0px 7px white",
      backgroundColor: "#FFD700",
      color:'black',
      width:"240px",

      fontWeight:'bold',
      alignSelf:"center",
      marginTop:20
    }}    className="button-85"        
      onClick={handlePlay} type="button">
      START TO PLAY!
    </button> 
       </div>}

                         
  
                         </div>:null}
          </div>
            
            </div>
  );
}
