import { AmazonData, WorldData } from "@/hooks/useDataLoader";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvailableYears(data: WorldData[]) {
  if (!data || data.length === 0) {
    return [];
  }
  const years = Object.keys(data[0]).filter(key => key !== 'segment');
  return years;
}

export function getSegmentDataForYear(data: WorldData[], year: number) {
  const yearKey = `${year}` as keyof WorldData;
  return data.map(item => ({
    segment: item.segment,
    revenue: item[yearKey] as number
  }));
}

export function filterAmazonDataByYear(data: AmazonData[], startYear: number, endYear: number) {
  const end = endYear || new Date().getFullYear();
  return data.filter(item => item.year >= startYear && item.year <= end);
}