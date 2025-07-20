'use client';
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'E-commerce Data Dashboard',
    'nav.world_revenue': 'Worldwide Revenue',
    'nav.amazon_revenue': 'Amazon Revenue',

    // Tooltip
    'tooltip.revenue': 'Revenue',
    'tooltip.currency_format': 'US${value}B',

    // Language selector
    'lang.english': 'English',
    'lang.french': 'Français',

    // Common
    'year': 'Year',
    
    // Dashboard
    'dashboard.title': 'E-commerce Data Analytics',
    'dashboard.subtitle': 'Interactive visualization of global e-commerce revenue and Amazon revenue as a key player in the North American market',
    
    // World Revenue chart
    'world_revenue.title': 'Retail e-commerce revenue worldwide by segment',
    'world_revenue.subtitle': 'from 2019 to 2029, in billion U.S. dollars',
    'world_revenue.yaxis': 'Revenue in billion U.S. dollars',
    'world_revenue.segment': 'Select Segments',
    'world_revenue.description': 'This bar chart compares estimated e-commerce revenue by segment from 2019 to 2029. Data was converted from local currencies using average exchange rates of the respective year.',
    'world_revenue.source': 'Data sources: Statista Market Insights',
    'world_revenue.updated': 'Last updated: October 2024',

    // Amazon Revenue chart
    'amazon_revenue.title': 'Amazon Revenue',
    'amazon_revenue.subtitle': 'from 2004 to 2024, in billion U.S. dollars',
    'amazon_revenue.yaxis': 'Revenue in billion U.S. dollars',
    'amazon_revenue.period': 'Period',
    'amazon_revenue.description': 'This line chart shows Amazon revenue from 2004 to 2024. From 2004 to 2024, the net revenue of Amazon e-commerce and service sales has increased tremendously.',
    'amazon_revenue.source': 'Data sources: Amazon; U.S. Securities and Exchange Commission',
    'amazon_revenue.updated': 'Last updated: February 2025',

    // Segments
    'segment.total': 'Total',
    'segment.food': 'Food',
    'segment.fashion': 'Fashion',
    'segment.diy_hardware_store': 'DIY & Hardware Store',
    'segment.furniture': 'Furniture',
    'segment.electronics': 'Consumer Electronics',
    'segment.beverages': 'Beverages',
    'segment.beauty_personal_care': 'Beauty & Personal Care',
    'segment.household_essentials': 'Household Essentials',
    'segment.tobacco_products': 'Tobacco Products',
    'segment.toys_hobby': 'Toys & Hobby',
    'segment.otc_pharmaceuticals': 'OTC Pharmaceuticals',
    'segment.media': 'Media',
    'segment.eyewear': 'Eyewear',

    // Controls
    'controls.last_five_years': 'Last 5 Years',
    'controls.last_ten_years': 'Last 10 Years',
    'controls.all_time': 'All Time',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord E-commerce',
    'nav.world_revenue': 'Chiffre d\'affaires Mondial',
    'nav.amazon_revenue': 'Chiffre d\'affaires d\'Amazon',

    // Tooltip
    'tooltip.revenue': 'Chiffre d\'affaires',
    'tooltip.currency_format': '{value} Md $ US',

    // Language selector
    'lang.english': 'English',
    'lang.french': 'Français',

    // Common
    'year': 'Année',
    
    // Dashboard
    'dashboard.title': 'Analyse de données e-commerce',
    'dashboard.subtitle': 'Visualisation interactive des données e-commerce mondiales et des chiffres d\'affaires d\'Amazon comme une grande entreprise dans le marché de l\'Amérique du Nord',
    
    // World Revenue chart
    'world_revenue.title': 'Chiffre d\'affaires du e-commerce mondial par segment',
    'world_revenue.subtitle': 'de 2019 à 2029, en milliards de dollars américains',
    'world_revenue.yaxis': 'Chiffre d\'affaires en milliards de dollars américains',
    'world_revenue.segment': 'Sélectionner les segments',
    'world_revenue.description': 'Ce graphique en barres compare le chiffre d\'affaires e-commerce estimé par segment de 2019 à 2029. Les données ont été converties à partir des devises locales en utilisant les taux de change moyens de l\'année respective.',
    'world_revenue.source': 'Sources de données: Statista Market Insights',
    'world_revenue.updated': 'Dernière mise à jour: octobre 2024',

    // Amazon Revenue chart
    'amazon_revenue.title': 'Chiffre d\'affaires d\'Amazon',
    'amazon_revenue.subtitle': 'de 2004 à 2024, en milliards de dollars américains',
    'amazon_revenue.yaxis': 'Chiffre d\'affaires en milliards de dollars américains',
    'amazon_revenue.period': 'Période',
    'amazon_revenue.description': 'Ce graphique linéaire montre les chiffres d\'affaires d\'Amazon de 2004 à 2024. De 2004 à 2024, le chiffre d\'affaires net des ventes d\'e-commerce et des services d\'Amazon a augmenté considérablement.',
    'amazon_revenue.source': 'Sources de données: Amazon; U.S. Securities and Exchange Commission',
    'amazon_revenue.updated': 'Dernière mise à jour: février 2025',


    // Segments
    'segment.total': 'Total',
    'segment.food': 'Alimentation',
    'segment.fashion': 'Mode',
    'segment.diy_hardware_store': 'Bricolage & Quincaillerie',
    'segment.furniture': 'Meubles',
    'segment.electronics': 'Électronique Grand Public',
    'segment.beverages': 'Boissons',
    'segment.beauty_personal_care': 'Beauté & Soins Personnels',
    'segment.household_essentials': 'Essentiels Ménagers',
    'segment.tobacco_products': 'Produits du Tabac',
    'segment.toys_hobby': 'Jouets & Loisirs',
    'segment.otc_pharmaceuticals': 'Médicaments en Vente Libre',
    'segment.media': 'Médias',
    'segment.eyewear': 'Lunettes',
    
    // Controls
    'controls.last_five_years': 'Dernières 5 Années',
    'controls.last_ten_years': 'Dernières 10 Années',
    'controls.all_time': 'Depuis le Début',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}