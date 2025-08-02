import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HarvestGreeter = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const greetings = [
    "Welcome to your food rescue journey! 🌱",
    "Ready to make a difference? Let's save some food! 🥕",
    "Every ingredient has potential - let's unlock it! ✨",
    "Your sustainable kitchen adventure starts here! 🍽️",
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  const getMessage = () => {
    if (user) {
      return `Hey ${user.user_metadata?.username || 'there'}! ${randomGreeting}`;
    }
    return "Hey there! Join RePlate and start your food rescue mission! 🌟";
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Greeting bubble */}
      <motion.button
        className="p-4 rounded-full bg-gradient-nature text-accent-foreground shadow-elegant hover:shadow-glow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open Harvest Greeter"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Greeting window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 left-0 w-80 bg-card rounded-2xl shadow-elegant border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-gradient-nature text-accent-foreground p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-foreground/20 rounded-full flex items-center justify-center">
                  🌾
                </div>
                <div>
                  <h3 className="font-dm-serif text-lg">Harvest Greeter</h3>
                  <p className="text-accent-foreground/80 text-sm">Your welcome guide</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-accent-foreground hover:bg-accent-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-foreground mb-4 leading-relaxed">
                  {getMessage()}
                </p>

                {!user ? (
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/signup')}
                      className="w-full btn-hero"
                    >
                      Start Your Journey
                    </Button>
                    <Button
                      onClick={() => navigate('/login')}
                      variant="outline"
                      className="w-full"
                    >
                      I Already Have an Account
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/upload')}
                      className="w-full btn-hero"
                    >
                      Upload Food Items
                    </Button>
                    <Button
                      onClick={() => navigate('/recipes')}
                      variant="outline"
                      className="w-full"
                    >
                      Browse Recipes
                    </Button>
                  </div>
                )}

                <div className="mt-4 text-xs text-muted-foreground">
                  💡 Tip: Try our AI assistant for personalized recommendations!
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HarvestGreeter;