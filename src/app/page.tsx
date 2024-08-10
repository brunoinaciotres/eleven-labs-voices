"use client"
import Filtro from "@/components/Filtro/Filtro";
import Header from "@/components/Header/Header";
import VoicesList from "@/components/VoicesList/VoicesList"
import useFormatLabels from "@/hooks/useFormatLabels";
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
  const [voicesFiltered, setVoicesFiltered] = useState<Voice[] | null>(null)
  const [filtersApplied, setFiltersApplied] = useState<FilterOptions | null>(null)

  // const normalizeValue = (value: string): string => {
  //   if (!value) return '';
  //   return value
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]/gi, ' ') // Substituir caracteres especiais por espaço
  //     .trim()
  //     .replace(/\s+/g, ' ') // Substituir múltiplos espaços por um único espaço
  //     .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizar a primeira letra de cada palavra
  // }

  const applyFilters = (obj: FilterOptions) => {
    const voicesFiltered = voices?.filter(voice => {
      const { gender, accent, use_case, age } = voice.labels;
      const formattedGender = useFormatLabels(gender);
      const formattedAccent = useFormatLabels(accent);
      const formattedUseCase = useFormatLabels(use_case);
      const formattedAge = useFormatLabels(age);
      const formattedCategory = useFormatLabels(voice.category);

      const matchesGender = !obj.genders.length || obj.genders.includes(formattedGender);
      const matchesUseCase = !obj.useCases.length || obj.useCases.includes(formattedUseCase);
      const matchesAge = !obj.ages.length || obj.ages.includes(formattedAge);
      const matchesCategory = !obj.categories.length || obj.categories.includes(formattedCategory);
      const matchesAccent = !obj.accents.length || obj.accents.includes(formattedAccent);


      return matchesGender && matchesUseCase && matchesAge && matchesCategory && matchesAccent;
    });


    setVoicesFiltered(voicesFiltered || null)
    setFiltersApplied(obj)
  }

  useEffect(() => {
    if (voices) {
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

            {filterOptions && <Filtro applyFilters={applyFilters} filterOptions={filterOptions} />}

          </section>
        </Container>
        <section className="voice-list-section">
          <VoicesList
            filtersApplied={filtersApplied}
            textAreaFilled={textAreaFilled}
            textAreaValue={textAreaValue}
            voices={voicesFiltered ?? []}
            isLoading={isLoading}
          />
        </section>
      </main>
    </>
  );
}
