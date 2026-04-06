"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { CreatorsHeader } from '@/src/components/admin/creators/CreatorsHeader';
import { StatsGrid } from '@/src/components/admin/creators/StatsGrid';
import { BarChartCard } from '@/src/components/admin/creators/BarChartCard';
import { LineChartCard } from '@/src/components/admin/creators/LineChartCard';
import { DualLineChartCard } from '@/src/components/admin/creators/DualLineChartCard';
import { CreatorsTable } from '@/src/components/admin/creators/CreatorsTable';
import api from '@/src/lib/api';

import {
  type ChartDataPoint,
  type DualChartDataPoint,
  type TabId,
  type StatusFilter,
  type SortOption,
  type Creator,
  formatIndianCurrency,
} from '@/src/data/creatorsData';

const ROWS_PER_PAGE = 7;

interface CreatorsAnalyticsResponse {
  stats: {
    totalCreators: number;
    activeCreators: number;
    verifiedCreators: number;
    topRevenueCreators: number;
  };
  charts: {
    totalCreatorsChartData: ChartDataPoint[];
    activeCreatorsChartData: ChartDataPoint[];
    verifiedCreatorsChartData: DualChartDataPoint[];
    topRevenueChartData: ChartDataPoint[];
  };
  creatorsTableData: Creator[];
}

export default function CreatorsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [sortFilter, setSortFilter] = useState<SortOption>('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<CreatorsAnalyticsResponse | null>(null);

  useEffect(() => {
    const fetchCreatorsAnalytics = async () => {
      try {
        setError(null);
        const res = await api.get<CreatorsAnalyticsResponse>('/admin/creators/analytics');
        setPayload(res.data);
      } catch (fetchError: unknown) {
        console.error(fetchError);
        setError('Failed to load creators analytics data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreatorsAnalytics();
  }, []);

  // Reset page on filter change
  const handleTabChange = (tab: TabId) => { setActiveTab(tab); setCurrentPage(1); };
  const handleStatusChange = (s: StatusFilter) => { setStatusFilter(s); setCurrentPage(1); };
  const handleSortChange = (s: SortOption) => { setSortFilter(s); setCurrentPage(1); };

  // Filtering & sorting logic — single source of truth
  const filteredCreators = useMemo(() => {
    let data: Creator[] = [...(payload?.creatorsTableData || [])];

    // Tab filtering
    switch (activeTab) {
      case 'verified':
        data = data.filter(c => c.verified);
        break;
      case 'top':
        data = data.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
        break;
      case 'suspended':
        data = data.filter(c => c.status === 'Inactive');
        break;
      default:
        break;
    }

    // Status dropdown filtering
    if (statusFilter !== 'All') {
      data = data.filter(c => c.status === statusFilter);
    }

    // Sorting
    switch (sortFilter) {
      case 'Newest':
        data = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'Oldest':
        data = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'Revenue ↑':
        data = [...data].sort((a, b) => a.revenue - b.revenue);
        break;
      case 'Revenue ↓':
        data = [...data].sort((a, b) => b.revenue - a.revenue);
        break;
    }

    return data;
  }, [activeTab, statusFilter, sortFilter, payload]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredCreators.length / ROWS_PER_PAGE));
  const pagedCreators = filteredCreators.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="p-6 w-full min-h-[calc(100vh-64px)] bg-[#F5F5F8] flex items-center justify-center">
        <p className="text-[#6B7280] font-medium animate-pulse">Loading creators data...</p>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="p-6 w-full min-h-[calc(100vh-64px)] bg-[#F5F5F8] flex items-center justify-center">
        <p className="text-[#DC2626] font-medium">{error || 'Unable to fetch creators analytics data.'}</p>
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 'clamp(12px, 2.8vw, 24px)', background: '#F5F5F8', minHeight: 'calc(100vh - 56px)' }}>
        <CreatorsHeader />

        {/* Row 1: Total Creators + Active Creators */}
        <StatsGrid>
          <BarChartCard
            label="Total Creators"
            value={payload.stats.totalCreators.toLocaleString('en-IN')}
            badge="+5%"
            badgeType="positive"
            description="Total Users Growth"
            subDescription="How many user using the website"
            chartData={payload.charts.totalCreatorsChartData}
            barColor="#374151"
            delay={0}
          />
          <LineChartCard
            label="Active Creators"
            value={payload.stats.activeCreators.toLocaleString('en-IN')}
            badge="+5%"
            badgeType="positive"
            description="Active Creators"
            subDescription="How many Creators using the website"
            chartData={payload.charts.activeCreatorsChartData}
            delay={80}
          />
        </StatsGrid>

        {/* Row 2: Verified Creators + Top Revenue */}
        <StatsGrid>
          <DualLineChartCard
            label="Verified Creators"
            value={payload.stats.verifiedCreators.toLocaleString('en-IN')}
            badge="+5%"
            badgeType="positive"
            description="Total Monthly Revenue"
            subDescription="Give you the number of revenue you get"
            chartData={payload.charts.verifiedCreatorsChartData}
            delay={160}
          />
          <BarChartCard
            label="Top Revenue Creators"
            value={formatIndianCurrency(payload.stats.topRevenueCreators)}
            badge="+5%"
            badgeType="positive"
            description="Pending Payouts"
            subDescription="Give us the no of Subscriptions in website"
            chartData={payload.charts.topRevenueChartData}
            barColor="#FB7185"
            delay={240}
          />
        </StatsGrid>

        {/* Creators Table */}
        <CreatorsTable
          creators={pagedCreators}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          statusFilter={statusFilter}
          sortFilter={sortFilter}
          onStatusChange={handleStatusChange}
          onSortChange={handleSortChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
