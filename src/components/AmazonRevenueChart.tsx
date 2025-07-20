"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { filterAmazonDataByYear } from "@/lib/utils";
import { useDataLoader } from "@/hooks/useDataLoader";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

type TimePeriod = "five_years" | "ten_years" | "all";

export function AmazonRevenueChart() {
  const { t } = useLanguage();
  const { amazonData, isLoading, error } = useDataLoader();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");

  const getFilteredData = () => {
    const currentYear = 2024;
    let startYear = 2004;

    switch (timePeriod) {
      case "five_years":
        startYear = currentYear - 5;
        break;
      case "ten_years":
        startYear = currentYear - 10;
        break;
      case "all":
        startYear = 2004;
        break;
    }

    const filtered = filterAmazonDataByYear(amazonData, startYear, currentYear);

    return filtered;
  };

  const data = getFilteredData();

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`${t("year")}: ${label}`}</p>
          <p className="text-muted-foreground">
            {`${t("tooltip.revenue")}: ${t("tooltip.currency_format").replace(
              "{value}",
              payload[0].value.toFixed(1)
            )}`}
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
              {t("amazon_revenue.title")}
            </CardTitle>
            <CardDescription className="text-md">
              {t("amazon_revenue.subtitle")}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-amazon-orange text-white cursor-default text-sm"
          >
            {t("nav.amazon_revenue")}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-md font-medium">
              {t("amazon_revenue.period")}
            </label>
            <Select
              value={timePeriod}
              onValueChange={(value: TimePeriod) => setTimePeriod(value)}
            >
              <SelectTrigger className="w-45 cursor-pointer mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  className="cursor-pointer focus:bg-amazon-blue focus:text-white"
                  value="five_years"
                >
                  {t("controls.last_five_years")}
                </SelectItem>
                <SelectItem
                  className="cursor-pointer focus:bg-amazon-blue focus:text-white"
                  value="ten_years"
                >
                  {t("controls.last_ten_years")}
                </SelectItem>
                <SelectItem
                  className="cursor-pointer focus:bg-amazon-blue focus:text-white"
                  value="all"
                >
                  {t("controls.all_time")}
                </SelectItem>
              </SelectContent>
            </Select>
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
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border/50"
              />
              <XAxis
                dataKey="year"
                className="text-muted-foreground"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                className="text-muted-foreground"
                tick={{ fontSize: 11 }}
                label={{
                  value: `${t("amazon_revenue.yaxis")}`,
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 14 },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--chart-2))",
                  cursor: "pointer",
                }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
          )}
        </div>

        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("amazon_revenue.description")}
          </p>
        </div>

        <footer className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{t("amazon_revenue.source")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("amazon_revenue.updated")}
            </p>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
