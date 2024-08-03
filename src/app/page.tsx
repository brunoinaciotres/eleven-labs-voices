"use client"

import Header from "@/components/Header/Header";
import VoicesList from "@/components/VoicesList/VoicesList";
import useRequestPost from "@/hooks/useRequestPost";
import { useEffect, useState } from "react";

export default function Home() {

  //const { data: generatedCustomVoice, sendPostRequest, isLoading: isLoadingCustomVoice } = useRequestPost<File>()
  //const [customVoiceAudioSrc, setCustomVoiceAudioSrc] = useState<string | null>(null);
  //const [customVoiceId, setCustomVoiceId] = useState<string | null>(null)
  const [textAreaFilled, setTextAreaFilled] = useState<boolean>(false)
  const [textAreaValue, setTextAreaValue] = useState<string | null>(null)

  // const generateCustomVoice = async (voiceId: string) => {
  //     if (!textAreaValue || !voiceId) return
  //     setCustomVoiceId(voiceId)
      
  //     await sendPostRequest("http://localhost:3000/api/createVoice", {
  //       text: textAreaValue,
  //       voiceId: voiceId
  //     })

  // }
 
  // useEffect(() => {
  //   let url: string | null = null;

  //   if (generatedCustomVoice) {
  //     url = URL.createObjectURL(generatedCustomVoice);
  //     setCustomVoiceAudioSrc(url);
  //   }

  //   const customAudio = document.querySelector<HTMLAudioElement>(`#custom-voice-${customVoiceId}`)
    
  //   customAudio?.addEventListener('canplaythrough', () => {
  //     customAudio?.play();
  //   })

  //   //liberar memoria
  //   return () => {
  //     if (url) {
  //       URL.revokeObjectURL(url);
  //     }
  //   };

  // }, [generatedCustomVoice])


  const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setTextAreaFilled(true)
      setTextAreaValue(e.target.value)
    } else {
      setTextAreaFilled(false)
      setTextAreaValue(null)
    }
  }
  
  return (
    <>
      <Header />
      <main>
        <section className="text-input-section">
          <label htmlFor="user-text">Teste as vozes com seu texto</label>
          <textarea maxLength={200} onChange={(e) => handleUserInput(e)} placeholder="Digite seu texto para transformar em voz" name="user-text" id="user-text"></textarea>
        </section>
        
        <section className="voice-list-container">
          <VoicesList 
          textAreaFilled={textAreaFilled} 
          textAreaValue={textAreaValue}
          />
        </section>
      </main>
    </>
  );
}
