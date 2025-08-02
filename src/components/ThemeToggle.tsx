import { motion } from 'framer-motion';
import { Sun, Moon, Leaf } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const getNextTheme = () => {
    if (theme === 'light') return 'dark';
    if (theme === 'dark') return 'food';
    return 'light';
  };

  const getIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-5 h-5" />;
      case 'dark': return <Moon className="w-5 h-5" />;
      case 'food': return <Leaf className="w-5 h-5" />;
      default: return <Sun className="w-5 h-5" />;
    }
  };

  return (
    <motion.button
      className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground shadow-lg"
      onClick={toggleTheme}
      aria-label={`Switch to ${getNextTheme()} theme`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : theme === 'food' ? 360 : 0,
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;