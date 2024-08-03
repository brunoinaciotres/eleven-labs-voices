import "./VoicesList.css"
import { useEffect, useState } from "react"
import VoiceCard from "../VoiceCard/VoiceCard"
import useRequest from "@/hooks/useRequest"
import useRequestPost from "@/hooks/useRequestPost"

type Voice = {
    voice_id: string
    name: string
    category: string
    labels: object
    description: string
    preview_url: string
}

type VoicesListProps = {
    textAreaFilled: boolean
    textAreaValue: string | null
    //generateCustomVoice: (voiceId: string)=> void
    //customVoiceAudioSrc: string | null
    //customVoiceId: string | null
    //isLoadingCustomVoice: boolean
}

function VoicesList({ textAreaFilled, textAreaValue }: VoicesListProps) {

    const { data: voices, isLoading } = useRequest<Voice[]>(`${process.env.NEXT_PUBLIC_API_URL}/getVoices`)
    const { data: generatedCustomVoice, sendPostRequest, isLoading: isLoadingCustomVoice } = useRequestPost<File>()
    const [customVoiceAudioSrc, setCustomVoiceAudioSrc] = useState<string | null>(null);
    const [customVoiceId, setCustomVoiceId] = useState<string | null>(null)
    const [lastVoiceAudio, setLastVoiceAudio] = useState<HTMLAudioElement | null>(null)
    const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null)

    const playAudio = (voiceId: string) => {
        const voiceAudio: HTMLAudioElement | null = document.querySelector(`#preview-${voiceId}`) as HTMLAudioElement | null
        if (voiceAudio) {

            if (lastVoiceAudio && lastVoiceAudio != voiceAudio) {
                lastVoiceAudio.pause()
                lastVoiceAudio.currentTime = 0
                currentVoiceId && hidePauseButton(currentVoiceId)
            }

            voiceAudio.play()

            setLastVoiceAudio(voiceAudio)
            setCurrentVoiceId(voiceId)
            showPauseButton(voiceId)


            voiceAudio.addEventListener('ended', () => {
                hidePauseButton(voiceId)

            }, { once: true });
        }
    }

    const pauseAudio = (voiceId: string) => {
        const voiceAudio: HTMLAudioElement | null = document.querySelector(`#preview-${voiceId}`) as HTMLAudioElement | null
        const voiceLi: Element | null = document.querySelector(`#voice-li-${voiceId}`)
        if (voiceAudio) voiceAudio.pause()
        hidePauseButton(voiceId)

    }

    const showPauseButton = (voiceId: string) => {
        const playAudioButton = document.querySelector(`#audio-play-${voiceId}`)
        const pauseAudioButton = document.querySelector(`#audio-pause-${voiceId}`)
        playAudioButton?.classList.add("d-none")
        pauseAudioButton?.classList.remove("d-none")
    }

    const hidePauseButton = (voiceId: string) => {
        const playAudioButton = document.querySelector(`#audio-play-${voiceId}`)
        const pauseAudioButton = document.querySelector(`#audio-pause-${voiceId}`)
        playAudioButton?.classList.remove("d-none")
        pauseAudioButton?.classList.add("d-none")
    }

    const generateCustomVoice = async (voiceId: string) => {
        if (!textAreaValue || !voiceId) return
        setCustomVoiceId(voiceId)

        await sendPostRequest(`${process.env.NEXT_PUBLIC_API_URL}/createVoice`, {
            text: textAreaValue,
            voiceId: voiceId
        })

    }

    useEffect(() => {
        let url: string | null = null;

        if (generatedCustomVoice) {
            url = URL.createObjectURL(generatedCustomVoice);
            setCustomVoiceAudioSrc(url);
        }

        const customAudio = document.querySelector<HTMLAudioElement>(`#custom-voice-${customVoiceId}`)

        customAudio?.addEventListener('canplaythrough', () => {
            customAudio?.play();
        })

        //liberar memoria
        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };

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
                        <VoiceCard
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