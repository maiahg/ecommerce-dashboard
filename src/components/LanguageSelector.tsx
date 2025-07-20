'use client';
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 cursor-pointer hover:bg-amazon-blue hover:text-white">
          <Globe className="h-4 w-4" />
          {language === 'en' ? 'EN' : 'FR'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className="cursor-pointer focus:bg-amazon-blue focus:text-white"
        >
          <span className="font-medium">{t('lang.english')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('fr')}
          className="cursor-pointer focus:bg-amazon-blue focus:text-white"
        >
          <span className="font-medium">{t('lang.french')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}