"use client";
import React from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { WorldRevenueChart } from "@/components/WorldRevenueChart";
import { ChartColumnDecreasing } from "lucide-react";
import { AmazonRevenueChart } from "./AmazonRevenueChart";

export function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-subtle mt-3">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amazon-orange to-amazon-blue rounded-lg">
                <ChartColumnDecreasing className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">
                {t("nav.dashboard")}
              </h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {t("dashboard.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("dashboard.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          <div className="w-full">
            <WorldRevenueChart />
          </div>

          <div className="w-full">
            <AmazonRevenueChart />
          </div>
        </div>
      </main>
    </div>
  );
}
