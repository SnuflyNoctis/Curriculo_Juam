import { useCallback } from 'react';

// Mapeamento dos sons (Você precisará baixar arquivos .mp3 curtos)
const SOUNDS = {
  hover: '/assets/sounds/zelda_cursor.mp3',
  click: '/assets/sounds/re4_select.mp3',
  open: '/assets/sounds/zelda_chest.mp3',
  equip: '/assets/sounds/re4_equip.mp3',
  goal: '/assets/sounds/rl_explosion.mp3',
};

export const useSoundEffect = () => {
  const play = useCallback((soundKey: keyof typeof SOUNDS) => {
    const audio = new Audio(SOUNDS[soundKey]);
    audio.volume = 0.3; // Não estourar os ouvidos do recrutador
    audio.play().catch(e => console.log("Audio play failed interaction required", e));
  }, []);

  return { play };
};