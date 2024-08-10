"use client"
import Filtro from "@/components/Filtro/Filtro";
import Header from "@/components/Header/Header";
import VoicesList from "@/components/VoicesList/VoicesList"
import useReduceVoices from "@/hooks/useReduceVoices";
import useRequest from "@/hooks/useRequest";
import { Textarea, Text, Container } from '@mantine/core'
import { useEffect, useState } from "react";

type Voice = {
  voice_id: string
  name: string
  category: string
  labels: Record<string, string>
  description: string
  preview_url: string
}

type FilterOptions = {
  genders: string[];
  ages: string[];
  useCases: string[];
  accents: string[];
  categories: string[];
}

export default function Home() {
  const { data: voices, isLoading } = useRequest<Voice[]>(`${process.env.NEXT_PUBLIC_API_URL}/getVoices`)

  const [textAreaFilled, setTextAreaFilled] = useState<boolean>(false)
  const [textAreaValue, setTextAreaValue] = useState<string | null>(null)
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)

  useEffect(()=> {
    if (voices){
        const options = useReduceVoices(voices)
        setFilterOptions(options)
    }
    
}, [voices])

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
        <Container size="md">
          <section className="text-input-section">
            <Text mb="sm" fw="600">Teste as vozes com seu texto</Text>
            <Textarea
              onChange={(e) => handleUserInput(e)}
              placeholder="Digite seu texto para transformar em voz"
              w={{ base: 300, xs: 500, sm: 700, md: 700, lg: 700 }}
              mb={32}

            />
            {filterOptions && <Filtro filterOptions={filterOptions} />}
            
          </section>
        </Container>
        <section className="voice-list-section">
          <VoicesList
            textAreaFilled={textAreaFilled}
            textAreaValue={textAreaValue}
            voices={voices ?? []}
            isLoading={isLoading}
          />
        </section>
      </main>
    </>
  );
}
