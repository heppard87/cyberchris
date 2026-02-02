import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Theme = 'dark' | 'light' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setThemePreference = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Sun className="w-4 h-4" />
      </Button>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'dark':
        return <Moon className="w-4 h-4 text-cyan-400" />;
      case 'system':
        return <Monitor className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/20 transition-all duration-300"
        >
          {getIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        <DropdownMenuItem
          onClick={() => setThemePreference('light')}
          className={theme === 'light' ? 'bg-primary/20' : ''}
        >
          <Sun className="w-4 h-4 mr-2 text-yellow-500" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setThemePreference('dark')}
          className={theme === 'dark' ? 'bg-primary/20' : ''}
        >
          <Moon className="w-4 h-4 mr-2 text-cyan-400" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setThemePreference('system')}
          className={theme === 'system' ? 'bg-primary/20' : ''}
        >
          <Monitor className="w-4 h-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
