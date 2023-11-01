import { useEffect, useRef, useState } from "react";
import GLOBE from 'vanta/dist/vanta.globe.min'
import { TypeAnimation } from "react-type-animation";
import { TextField, Typography } from "@mui/material";
import { FormField } from "~/components/form-field";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import OpenAI from 'openai';
import { useLoaderData } from "@remix-run/react";
import {  useNavigate } from "@remix-run/react";


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
  
export const action: ActionFunction = async ({ request }) => {
  throw redirect(`/dashboard`)

}
export default function Welcome() {
  const { ENV } = useLoaderData<LoaderData>();
  
  const [message, setMessage] = useState<any>("");
  const [history, setHistory] = useState<any>([
    {
      role: "assistant",
      content: "",
    },
  ]);
const openai = new OpenAI({ apiKey:ENV.OPENAI, dangerouslyAllowBrowser: true })



 async function chatgpt() { 
  console.log("entro")
  let newHistory = [...history, { role: "assistant", content: `
          Your task is to answer in a consistent style in less that 60 characters.
           give the Welcome to the user to darkmatter in a sentence and ask to for the username.
        `}];
   const stream = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: newHistory,
  stream: true,
});
let mess=""
for await (const part of stream) {
        if(part.choices[0]?.delta?.content){
          mess= mess+part.choices[0]?.delta?.content

   }

}

console.log("mess "+mess)

setHistory([...newHistory, {role:"assistant",content:mess}])

return 
}
  const myRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [status, setStatus] = useState("idle");
  const [action, setAction] = useState('setUsername');

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
    
    chatgpt()
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect]);


  const [formData, setFormData] = useState({
    username: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ ...form, [field]: event.target.value }));
  }

  return (
    <div ref={myRef} style={{ minHeight: "88vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
     
     <form method="POST" className="w-full" style={{ marginTop: 0, width: "100%", justifyContent: "center" }}>
        
      <div className="w-full overflow-y-auto px-4" style={{ width: "100%", textAlign: "center" }}>
       
         <div style={{ textAlign:"center", alignSelf: 'center' }}>
         {history.length > 1 && (
          <TypeAnimation
            sequence={[
              history[history.length - 1].content.toUpperCase(), 2500,
            ]}

            wrapper="div"
            cursor={false}
            speed={70}
           style={{textAlign:"center",
                         fontWeight:"bold",
                        paddingLeft:"10%",
                        paddingRight:"10%",

                         paddingTop:"0%",width:"100%",alignItems:"center", textShadow: "0px  0px  7px  #FFD700",fontSize:36,color:"#F8F8FF",fontFamily:"orbitron",marginBottom:20,}}
                       
          />
        )}
            {history.length > 1 && (
                       <div style={{
                        marginTop:30, width:"100%",textAlign:"center", alignSelf: 'center' }}>

              <FormField
                htmlFor="username"
                label="USERNAME"
                onChange={(e: any) => handleInputChange(e, 'username')}
                value={formData.username}
              />
              </div>
            )}
            {history.length > 1 && (
              <button
                style={{
                  textShadow: "0px 0px 7px white",
                  backgroundColor: "#FFD700",
                  color: 'white',
                  width: "234px",
                  marginTop:10,
                  alignSelf: "center",
                }}
                className="button-855play"
                type="submit"
                name="_action"
                value={action}
              >
                {'Empezar'}
              </button>
            )}
          </div>
      </div>
        </form>
    </div>
  );
}