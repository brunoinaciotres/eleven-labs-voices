import { Card, Text, Badge, Group, Stack } from '@mantine/core';

type Voice = {
    voice_id: string
    name: string
    category: string
    labels: object
    description: string
    preview_url: string
};


type VoiceCardProps = {
    voice: Voice
    playAudio: (voiceId: string) => void
    pauseAudio: (voiceId: string) => void
    textAreaFilled: boolean
    generateCustomVoice: (voiceId: string) => void
    customVoiceAudioSrc: string | null
    customVoiceId: string | null
    isLoadingCustomVoice: boolean
}

function VoiceCardMantine({ voice, playAudio, pauseAudio, textAreaFilled, generateCustomVoice, customVoiceAudioSrc, customVoiceId, isLoadingCustomVoice }: VoiceCardProps) {
    return (
        <Card w={{ base: 300, xs: 500, sm: 700, md: 700, lg: 700 }} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>

                <Group justify='space-between'>
                    <audio id={`preview-${voice.voice_id}`} src={voice.preview_url} />
                    {customVoiceId === voice.voice_id && (
                        <audio id={`custom-voice-${voice.voice_id}`} src={customVoiceAudioSrc ? customVoiceAudioSrc : undefined} />
                    )}
                    <Group>
                        <Text fw={600} > {voice.name} </Text>
                        <div className="circle"></div>
                        <Text > {voice.category}</Text>
                    </Group>
                    <Group>
                        <Group className={`play-group ${textAreaFilled ? null : 'd-none'}`}>
                            <Text className={isLoadingCustomVoice && customVoiceId != voice.voice_id ? "disabled" : "text-blue"}>Ouvir meu texto</Text>
                            {isLoadingCustomVoice && customVoiceId === voice.voice_id
                                ? <div className="spinner blue"></div>
                                : (
                                    <svg
                                        onClick={() => generateCustomVoice(voice.voice_id)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill={`${isLoadingCustomVoice ? "#9b9b9b" : "#007BFF"}`}
                                        className={`bi bi-play-circle-fill ${isLoadingCustomVoice ? 'disabled' : null}`}
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 110 8a8 8 0 0116 0M6.79 5.093A.5.5 0 006 5.5v5a.5.5 0 00.79.407l3.5-2.5a.5.5 0 000-.814z"></path>
                                    </svg>
                                )
                            }
                        </Group>
                        <Group className={`play-group ${isLoadingCustomVoice ? "disabled" : null}`}>
                            <Text>Ouvir preview</Text>
                            <svg
                                id={`audio-play-${voice.voice_id}`}
                                onClick={() => playAudio(voice.voice_id)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-play-circle-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8A8 8 0 110 8a8 8 0 0116 0M6.79 5.093A.5.5 0 006 5.5v5a.5.5 0 00.79.407l3.5-2.5a.5.5 0 000-.814z"></path>
                            </svg>
                            <svg
                                id={`audio-pause-${voice.voice_id}`}
                                onClick={() => pauseAudio(voice.voice_id)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-pause-circle d-none "
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 15A7 7 0 118 1a7 7 0 010 14m0 1A8 8 0 108 0a8 8 0 000 16"></path>
                                <path d="M5 6.25a1.25 1.25 0 112.5 0v3.5a1.25 1.25 0 11-2.5 0zm3.5 0a1.25 1.25 0 112.5 0v3.5a1.25 1.25 0 11-2.5 0z"></path>
                            </svg>
                        </Group>
                    </Group>
                </Group>
                <Group wrap='wrap' mt="sm">
                    {
                        Object.values(voice.labels).map((label, index) => {
                            return (
                                <Badge key={index} color="blue" >{label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}</Badge>
                            )
                        })
                    }

                </Group>
            </Stack>
        </Card>
    );
}

export default VoiceCardMantine;