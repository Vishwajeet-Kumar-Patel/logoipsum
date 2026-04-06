'use client';

import React from 'react';

interface EngagementData {
  avgLikesPerPost: number;
  avgComments: number;
  engagementRate: number;
}

interface Props {
  data: EngagementData;
  delay?: number;
}

export function EngagementStatsCard({ data, delay = 0 }: Props) {
  const progressWidth = Math.max(0, Math.min(100, Math.round(data.engagementRate * 10)));

  return (
    <div
      className="bg-white rounded-xl p-6 flex flex-col justify-between"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        height: '100%',
        animation: `cardFadeUp 0.6s ease-out ${delay}ms both`,
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
        Engagement
      </h3>

      <div className="space-y-6">
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>
            Avg Likes / Post
          </p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>
            {`${data.avgLikesPerPost.toLocaleString('en-IN')}`}
          </p>
        </div>

        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>
            Avg Comments
          </p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>
            {`${data.avgComments.toLocaleString('en-IN')}`}
          </p>
        </div>

        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>
            Engagement Rate
          </p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 12 }}>
            {`${data.engagementRate.toFixed(2)}%`}
          </p>
          {/* Progress bar */}
          <div style={{ width: '100%', height: 4, background: '#E5E7EB', borderRadius: 2 }}>
            <div style={{ width: `${progressWidth}%`, height: '100%', background: '#111827', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
