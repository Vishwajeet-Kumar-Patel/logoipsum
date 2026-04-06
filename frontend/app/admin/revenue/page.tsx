'use client';

import React, { useState, useEffect } from 'react';
import { RevenueStatCard } from '@/src/components/admin/revenue/RevenueStatCard';
import { RevenueTrendChart } from '@/src/components/admin/revenue/RevenueTrendChart';
import { InsightAndActivityCards } from '@/src/components/admin/revenue/InsightAndActivityCards';
import { TransactionsTable } from '@/src/components/admin/revenue/TransactionsTable';
import type { ChartDataPoint, TransactionListItem } from '@/src/data/revenueData';
import { formatIndianCurrency } from '@/src/data/creatorsData';
import api from '@/src/lib/api';

interface RevenueAnalyticsResponse {
  totals: {
    totalRevenue: number;
    platformCommission: number;
    refundAmount: number;
    pendingPayouts: number;
    monthlyGrowth: number;
  };
  totalRevenueData: ChartDataPoint[];
  platformCommissionData: ChartDataPoint[];
  refundAmountData: ChartDataPoint[];
  pendingPayoutsData: ChartDataPoint[];
  revenueTransactionsData: TransactionListItem[];
  recentActivityFeed: Array<{ text: string; time: string; dotColor: string }>;
  insight: {
    message: string;
    currentProjection: number;
  };
}

export default function RevenuePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<RevenueAnalyticsResponse | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fetchRevenueAnalytics = async () => {
      try {
        setError(null);
        const res = await api.get<RevenueAnalyticsResponse>('/admin/revenue/analytics');
        setPayload(res.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError('Failed to load revenue analytics.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenueAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 w-full min-h-[calc(100vh-64px)] bg-[#F5F5F8] flex items-center justify-center">
        <p className="text-[#6B7280] font-medium animate-pulse">Loading revenue data...</p>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="p-6 w-full min-h-[calc(100vh-64px)] bg-[#F5F5F8] flex items-center justify-center">
        <p className="text-[#DC2626] font-medium">{error || 'Unable to fetch revenue analytics.'}</p>
      </div>
    );
  }

  const growthText = `${payload.totals.monthlyGrowth >= 0 ? '+' : ''}${payload.totals.monthlyGrowth.toFixed(1)}%`;
  const growthTrend = payload.totals.monthlyGrowth >= 0 ? 'positive' : 'negative';
  const projectionText = `${formatIndianCurrency(payload.insight.currentProjection)} / yr`;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes detailFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .detail-animate { opacity: 0; }
        .detail-animate.visible { animation: detailFadeUp 0.6s ease-out forwards; }
      `}</style>

      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 'clamp(12px, 2.8vw, 24px)', background: '#F5F5F8', minHeight: 'calc(100vh - 56px)' }}>
        
        {/* Header */}
        <div className={`detail-animate mb-6 ${mounted ? 'visible' : ''}`} style={{ animationDelay: '0ms' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Revenue
          </h1>
          <p style={{ fontSize: 13, color: '#6B7280' }}>
            Track and optimize creator payment streams across your platform.
          </p>
        </div>

        {/* Row 1: Line Charts */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ${mounted ? 'visible' : 'opacity-0'}`}>
          <RevenueStatCard
            label="Total Revenue"
            value={formatIndianCurrency(payload.totals.totalRevenue)}
            badge={growthText}
            badgeType={growthTrend}
            variant="line"
            chartData={payload.totalRevenueData}
            primaryColor="#FCA5A5" // light pink
            footerText={`${growthText} vs last month`}
            footerTrend={growthTrend}
            delay={50}
          />
          <RevenueStatCard
            label="Platform Commission"
            value={formatIndianCurrency(payload.totals.platformCommission)}
            badge={growthText}
            badgeType={growthTrend}
            variant="line"
            chartData={payload.platformCommissionData}
            primaryColor="#FCA5A5" // light pink
            footerText="+5.2% vs last month"
            footerTrend="positive"
            delay={100}
          />
        </div>

        {/* Row 2: Bar Charts */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ${mounted ? 'visible' : 'opacity-0'}`}>
          <RevenueStatCard
            label="Refund Amount"
            value={formatIndianCurrency(payload.totals.refundAmount)}
            badge="-"
            badgeType="negative"
            variant="bar"
            chartData={payload.refundAmountData}
            primaryColor="#EA580C"
            footerText="-2.1% improvement"
            footerTrend="negative"
            delay={150}
          />
          <RevenueStatCard
            label="Pending Payouts"
            value={formatIndianCurrency(payload.totals.pendingPayouts)}
            badge="+"
            variant="bar"
            chartData={payload.pendingPayoutsData}
            primaryColor="#111827"
            footerText="14 Payouts Pending"
            footerTrend="positive"
            delay={200}
          />
        </div>

        {/* Row 3: Revenue Trend */}
        <div className={`mb-4 ${mounted ? 'visible' : 'opacity-0'}`}>
          <RevenueTrendChart data={payload.totalRevenueData} delay={250} />
        </div>

        {/* Row 4: Insight and Activity */}
        <div className={mounted ? 'visible' : 'opacity-0'}>
          <InsightAndActivityCards
            activityFeed={payload.recentActivityFeed}
            insightMessage={payload.insight.message}
            currentProjectionText={projectionText}
            delay={300}
          />
        </div>

        {/* Row 5: Transactions */}
        <div className={`mt-4 ${mounted ? 'visible' : 'opacity-0'}`}>
          <TransactionsTable transactions={payload.revenueTransactionsData} delay={400} />
        </div>

      </div>
    </>
  );
}
