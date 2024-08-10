import { useState, useCallback } from 'react';

export default function useAudioControls() {
  const [lastVoiceAudio, setLastVoiceAudio] = useState<HTMLAudioElement | null>(null);
  const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null);

  const playAudio = useCallback((voiceId: string) => {
    const voiceAudio = document.querySelector<HTMLAudioElement>(`#preview-${voiceId}`);
    if (voiceAudio) {
      if (lastVoiceAudio && lastVoiceAudio !== voiceAudio) {
        lastVoiceAudio.pause();
        lastVoiceAudio.currentTime = 0;
        hidePauseButton(currentVoiceId || '');
      }

      voiceAudio.play();
      setLastVoiceAudio(voiceAudio);
      setCurrentVoiceId(voiceId);
      showPauseButton(voiceId);

      voiceAudio.addEventListener('ended', () => hidePauseButton(voiceId), { once: true });
    }
  }, [lastVoiceAudio, currentVoiceId]);

  const pauseAudio = useCallback((voiceId: string) => {
    const voiceAudio = document.querySelector<HTMLAudioElement>(`#preview-${voiceId}`);
    if (voiceAudio) {
      voiceAudio.pause();
      hidePauseButton(voiceId);
    }
  }, []);

  const showPauseButton = useCallback((voiceId: string) => {
    const playAudioButton = document.querySelector<HTMLButtonElement>(`#audio-play-${voiceId}`);
    const pauseAudioButton = document.querySelector<HTMLButtonElement>(`#audio-pause-${voiceId}`);
    playAudioButton?.classList.add('d-none');
    pauseAudioButton?.classList.remove('d-none');
  }, []);

  const hidePauseButton = useCallback((voiceId: string) => {
    const playAudioButton = document.querySelector<HTMLButtonElement>(`#audio-play-${voiceId}`);
    const pauseAudioButton = document.querySelector<HTMLButtonElement>(`#audio-pause-${voiceId}`);
    playAudioButton?.classList.remove('d-none');
    pauseAudioButton?.classList.add('d-none');
  }, []);

  return { playAudio, pauseAudio };
}