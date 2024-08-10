import "./VoicesList.css"
import { useEffect, useState } from "react"
import VoiceCard from "../VoiceCard/VoiceCard"
import useRequest from "@/hooks/useRequest"
import useRequestPost from "@/hooks/useRequestPost"
import type { PutBlobResult } from '@vercel/blob';
import VoiceCardMantine from "../VoiceCard/VoiceCardMantine"
import useReduceVoices from "@/hooks/useReduceVoices"
import useAudioControls  from "@/hooks/useAudioControls"

type Voice = {
    voice_id: string
    name: string
    category: string
    labels: Record<string, string>
    description: string
    preview_url: string
  }

type VoicesListProps = {
    textAreaFilled: boolean
    textAreaValue: string | null
    isLoading: boolean
    voices: Voice[] 
}

function VoicesList({ textAreaFilled, textAreaValue, voices, isLoading }: VoicesListProps) {

    
    const { data: generatedCustomVoice, sendPostRequest } = useRequestPost<File>()

    const [customVoiceAudioSrc, setCustomVoiceAudioSrc] = useState<string | null>(null);
    const [customVoiceId, setCustomVoiceId] = useState<string | null>(null)
    // const [lastVoiceAudio, setLastVoiceAudio] = useState<HTMLAudioElement | null>(null)
    // const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null)
    const [isLoadingCustomVoice, setIsLoadingCustomVoice] = useState<boolean>(false);
    const { playAudio, pauseAudio } = useAudioControls()

    const generateCustomVoice = async (voiceId: string) => {
        setIsLoadingCustomVoice(true)
        if (!textAreaValue || !voiceId) return
        setCustomVoiceId(voiceId)

        await sendPostRequest(`${process.env.NEXT_PUBLIC_API_URL}/createVoice`, {
            text: textAreaValue,
            voiceId: voiceId
        })

    }

    const uploadFile = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadFile`, {
                method: "POST",
                headers: {
                    'content-type': "audio/mpeg",
                    'Access-Control-Allow-Origin': '*'
                },
                body: generatedCustomVoice
            })
            const data = await res.json() as PutBlobResult
            setCustomVoiceAudioSrc(data.url)
        } catch (e) {
            console.error("Error uploading file:", e);
        }

    }

    useEffect(() => {

        if (generatedCustomVoice) uploadFile()

        const customAudio = document.querySelector<HTMLAudioElement>(`#custom-voice-${customVoiceId}`)

        customAudio?.addEventListener('canplaythrough', () => {
            setIsLoadingCustomVoice(false)
            customAudio?.play();
        })


    }, [generatedCustomVoice])

    return (
        <ul className="voices-ul">

            {isLoading ?
                (
                    <>
                        <p className="fw-bold">Carregando Vozes</p>
                        <div className="spinner"></div>
                    </>
                )
                : voices?.map(voice => {
                    return (
                        <VoiceCardMantine
                        textAreaFilled={textAreaFilled}
                        voice={voice}
                        key={voice.voice_id}
                        playAudio={playAudio}
                        pauseAudio={pauseAudio}
                        generateCustomVoice={generateCustomVoice}
                        customVoiceAudioSrc={customVoiceAudioSrc}
                        customVoiceId={customVoiceId}
                        isLoadingCustomVoice={isLoadingCustomVoice}
                        />
                    )
                })}

        </ul>
    );
}

export default VoicesList;