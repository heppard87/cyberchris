import { useCallback, useRef } from 'react';

// Sound effect URLs - using generated sound effects
const SOUND_URLS = {
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  typing: 'https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3',
  glitch: 'https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3',
  launch: 'https://assets.mixkit.co/active_storage/sfx/2044/2044-preview.mp3',
  switch: 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3',
};

export function useSoundEffects() {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const enabledRef = useRef(true);

  const getAudio = useCallback((sound: keyof typeof SOUND_URLS) => {
    if (!audioRefs.current[sound]) {
      audioRefs.current[sound] = new Audio(SOUND_URLS[sound]);
      audioRefs.current[sound].volume = 0.3;
    }
    return audioRefs.current[sound];
  }, []);

  const play = useCallback((sound: keyof typeof SOUND_URLS) => {
    if (!enabledRef.current) return;
    
    const audio = getAudio(sound);
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [getAudio]);

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  const isEnabled = useCallback(() => enabledRef.current, []);

  return {
    play,
    setEnabled,
    isEnabled,
    sounds: SOUND_URLS,
  };
}

// Hook for hover sound
export function useHoverSound() {
  const { play } = useSoundEffects();
  
  return {
    onMouseEnter: () => play('hover'),
  };
}

// Hook for click sound
export function useClickSound() {
  const { play } = useSoundEffects();
  
  return {
    onClick: () => play('click'),
  };
}
