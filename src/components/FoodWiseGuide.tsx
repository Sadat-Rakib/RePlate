import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FoodWiseGuide = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  const handleCommand = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');

    // Quick commands
    const commands: Record<string, () => void> = {
      'show recipes': () => window.location.href = '/recipes',
      'find donation centers': () => window.location.href = '/donate',
      'my impact': () => window.location.href = '/carbon-impact',
      'upload food': () => window.location.href = '/upload',
      'help': () => setMessages(prev => [...prev, { 
        text: 'I can help you with:\n• Recipe suggestions: "show recipes"\n• Donation centers: "find donation centers"\n• Impact tracking: "my impact"\n• Food upload: "upload food"\n• General food waste tips and guidance!', 
        isUser: false 
      }])
    };

    if (commands[userMessage.toLowerCase()]) {
      commands[userMessage.toLowerCase()]();
      return;
    }

    // Simulate AI response (in production, this would call OpenAI API)
    setTimeout(() => {
      let response = `Hello ${user?.user_metadata?.username || 'there'}! `;
      
      if (userMessage.toLowerCase().includes('recipe')) {
        response += "I'd recommend checking out our recipe database! You can find personalized recipes based on your ingredients.";
      } else if (userMessage.toLowerCase().includes('waste')) {
        response += "Great question about food waste! Did you know that 1/3 of all food produced globally is wasted? Every small action counts in reducing this impact.";
      } else if (userMessage.toLowerCase().includes('donate')) {
        response += "Donating excess food is wonderful! I can help you find nearby donation centers that accept food items.";
      } else {
        response += "I'm here to help you reduce food waste and make sustainable choices. Ask me about recipes, donation centers, or food waste tips!";
      }
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Chat bubble */}
      <motion.button
        className="p-4 rounded-full bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open FoodWise Guide"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 bg-card rounded-2xl shadow-elegant border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="font-dm-serif text-lg">FoodWise Guide</h3>
                  <p className="text-primary-foreground/80 text-sm">Your AI assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Hello {user?.user_metadata?.username || 'there'}! 👋</p>
                  <p className="text-xs mt-1">Ask me about recipes, donation centers, or food waste tips!</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button onClick={handleCommand} size="sm" className="px-3">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FoodWiseGuide;