import { AmazonData, WorldData } from "@/hooks/useDataLoader";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvailableSegments(data: Record<string, unknown>[]) {
  if (!data || data.length === 0) {
    return [];
  }
  const segments = Object.keys(data[0]).filter(key => key !== 'Year');
  return segments;
}

export function getAvailableYears(data: Record<string, unknown>[]) {
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

export function formatWorldRevenueData(data: Record<string, unknown>[]) {
  const segments = getAvailableSegments(data);
  const formattedData = [];
  for (const segment of segments) {
    const segmentData = data.map(item => ({
      segment: segment,
      revenue: item[segment],
    }));
    formattedData.push(...segmentData);
  }
  return formattedData;
}

export function filterAmazonDataByYear(data: AmazonData[], startYear: number, endYear: number) {
  const end = endYear || new Date().getFullYear();
  return data.filter(item => item.year >= startYear && item.year <= end);
}