"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { X, Plus, ExternalLink } from "lucide-react";

// Add CSS for shake animation
const shakeAnimation = {
  x: [-10, 10, -10, 10, -5, 5, -2, 2, 0],
  transition: { duration: 0.5 }
};

// Multi-link input component for CP and CTF profiles
interface MultiLinkInputProps {
  links: string[];
  setLinks: (links: string[]) => void;
  placeholder: string;
  hasError: boolean[];
  setHasError: (errors: boolean[]) => void;
}

const MultiLinkInput = ({ 
  links, 
  setLinks, 
  placeholder,
  hasError,
  setHasError
}: MultiLinkInputProps) => {
  const addLink = () => {
    setLinks([...links, '']);
    setHasError([...hasError, false]);
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    
    const newErrors = [...hasError];
    newErrors.splice(index, 1);
    setHasError(newErrors);
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
    
    // Clear error when typing
    if (hasError[index]) {
      const newErrors = [...hasError];
      newErrors[index] = false;
      setHasError(newErrors);
    }
  };



  return (
    <div className="space-y-3">
      {links.map((link, index) => (
        <div key={index} className="flex items-center space-x-3">
          <motion.div 
            className="relative flex-1"
            whileHover={{ scale: 1.02 }}
            animate={hasError[index] ? shakeAnimation : undefined}
          >
            <Input
              type="url" 
              value={link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateLink(index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className={`h-10 sm:h-12 text-sm sm:text-lg pr-12 ${
                hasError[index] 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-white/20 focus:border-[#C540AB] hover:border-[#C540AB]/60'
              } bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 transition-all duration-200`}
            />
            <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            {hasError[index] && (
              <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter a valid URL</p>
            )}
          </motion.div>
          <Button 
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeLink(index)}
            className="flex-shrink-0 h-12 w-12 bg-red-500/10 border-red-500/30 text-red-400 hover:border-red-500/50 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button 
        type="button"
        variant="outline"
        onClick={addLink}
        className="w-full h-12 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-[#C540AB]/50 transition-all duration-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another {placeholder.split(' ')[0]} Link
      </Button>
    </div>
  );
};

export default MultiLinkInput; 