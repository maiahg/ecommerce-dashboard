import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDataLoader } from "@/hooks/useDataLoader";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getAvailableYears,
  getSegmentDataForYear,
} from "@/lib/utils";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

const segments = [
  "beverages",
  "media",
  "diy_hardware_store",
  "otc_pharmaceuticals",
  "tobacco_products",
  "toys_hobby",
  "electronics",
  "beauty_personal_care",
  "food",
  "household_essentials",
  "fashion",
  "furniture",
  "eyewear",
];

export function WorldRevenueChart() {
  const { t } = useLanguage();
  const { worldData, isLoading, error } = useDataLoader();
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedSegments, setSelectedSegments] = useState<string[]>(segments);

  const availableYears = getAvailableYears(worldData);

  const getFilteredData = () => {
    const yearData = getSegmentDataForYear(worldData, selectedYear);
    return yearData
      .filter((item) => selectedSegments.includes(item.segment))
      .map((item) => ({
        segment: t(`segment.${item.segment}`),
        segmentKey: item.segment,
        revenue: item.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  };

  const data = getFilteredData();

  const handleSegmentToggle = (segment: string) => {
    setSelectedSegments((prev) =>
      prev.includes(segment)
        ? prev.filter((s) => s !== segment)
        : [...prev, segment]
    );
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-muted-foreground">
            {`${t("tooltip.revenue")}: ${t("tooltip.currency_format").replace('{value}', payload[0].value.toFixed(1))}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return (
      <Card className="shadow-chart">
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-destructive">Error loading data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-chart">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold">
              {t("world_revenue.title")}
            </CardTitle>
            <CardDescription className="text-md">
              {t("world_revenue.subtitle")}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-amazon-blue text-white cursor-default text-sm"
          >
            {t("nav.world_revenue")}
          </Badge>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex gap-4">
            <div className="space-y-2">
              <label className="text-lg font-medium">
                {t("year")}
              </label>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-32 cursor-pointer mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                      className="cursor-pointer focus:bg-amazon-orange focus:text-white"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mb-2">
            <label className="text-lg font-medium">
              {t("world_revenue.segment")}
            </label>
            <div className="grid grid-cols-4 gap-3 mt-1">
              {segments.map((segmentKey) => (
                <div key={segmentKey} className="flex items-center space-x-2">
                  <Checkbox
                    id={segmentKey}
                    checked={selectedSegments.includes(segmentKey)}
                    onCheckedChange={() => handleSegmentToggle(segmentKey)}
                  />
                  <label
                    htmlFor={segmentKey}
                    className="text-md cursor-pointer select-none"
                  >
                    {t(`segment.${segmentKey}`)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-120 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border/50"
                />
                <XAxis
                  dataKey="segment"
                  className="text-muted-foreground"
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  className="text-muted-foreground"
                  tick={{ fontSize: 11 }}
                  label={{
                    value: `${t("world_revenue.yaxis")}`,
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fontSize: 14 },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                  className="hover:fill-amazon-orange cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-md text-muted-foreground leading-relaxed">
            {t("world_revenue.description")}
          </p>
        </div>

        <footer className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{t('world_revenue.source')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('world_revenue.updated')}
            </p>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
