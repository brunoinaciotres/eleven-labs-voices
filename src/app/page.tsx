"use client"

import Header from "@/components/Header/Header";
import VoicesList from "@/components/VoicesList/VoicesList";

import { useState } from "react";

export default function Home() {

  const [textAreaFilled, setTextAreaFilled] = useState<boolean>(false)
  const [textAreaValue, setTextAreaValue] = useState<string | null>(null)

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
