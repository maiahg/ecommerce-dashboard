"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";

export interface WorldData {
  segment: string;
  "2017": number;
  "2018": number;
  "2019": number;
  "2020": number;
  "2021": number;
  "2022": number;
  "2023": number;
  "2024": number;
  "2025": number;
  "2026": number;
  "2027": number;
  "2028": number;
  "2029": number;
}

export interface AmazonData {
  year: number;
  revenue: number;
}

export interface DataLoaderResult {
  amazonData: AmazonData[];
  worldData: WorldData[];
  isLoading: boolean;
  error: string | null;
}

export const useDataLoader = (): DataLoaderResult => {
  const [worldData, setWorldData] = useState<WorldData[]>([]);
  const [amazonData, setAmazonData] = useState<AmazonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCSVFile = async (url: string): Promise<unknown[]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const csvText = await response.text();

      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transform: (value, field) => {
            if (field !== "segment" && value) {
              const num = parseFloat(value);
              return isNaN(num) ? value : num;
            }
            return value;
          },
          complete: (results) => {
            if (results.errors.length > 0) {
              reject(new Error(results.errors[0].message));
            } else {
              resolve(results.data);
            }
          },
          error: (error: Error) => reject(error),
        });
      });
    } catch (error) {
      throw new Error(
        `Error loading CSV file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const worldData = await loadCSVFile("/dataset/ecommerce_revenue.csv");
        setWorldData(worldData as WorldData[]);

        const amazonData = await loadCSVFile("/dataset/amazon_revenue.csv");
        setAmazonData(amazonData as AmazonData[]);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    worldData,
    amazonData,
    isLoading,
    error,
  };
};
