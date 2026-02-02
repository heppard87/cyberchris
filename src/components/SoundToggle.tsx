import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SoundToggleProps {
  onToggle?: (enabled: boolean) => void;
}

export default function SoundToggle({ onToggle }: SoundToggleProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('sound-enabled');
    if (saved !== null) {
      setSoundEnabled(saved === 'true');
    }
  }, []);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('sound-enabled', String(newState));
    onToggle?.(newState);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="relative rounded-full hover:bg-primary/20 transition-all duration-300"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-foreground" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            )}
            
            {/* Sound wave animation when enabled */}
            {soundEnabled && (
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{soundEnabled ? 'Sound On' : 'Sound Off'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
