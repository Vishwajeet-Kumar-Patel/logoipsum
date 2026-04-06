'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActivityItem {
  text: string;
  time: string;
  dotColor: string;
}

interface Props {
  activityFeed: ActivityItem[];
  insightMessage: string;
  currentProjectionText: string;
  delay?: number;
}

export function InsightAndActivityCards({ activityFeed, insightMessage, currentProjectionText, delay = 0 }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* Recent Activity Card */}
      <div
        className="bg-white rounded-xl p-6 flex flex-col justify-between"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          animation: `cardFadeUp 0.6s ease-out ${delay}ms both`,
        }}
      >
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Recent Activity</h3>

        <div className="space-y-5 flex-1">
          {activityFeed.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.dotColor }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{item.text}</span>
              </div>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{item.time}</span>
            </div>
          ))}
        </div>

        <button
          style={{
            width: '100%',
            padding: '12px 0',
            marginTop: 24,
            background: '#F9FAFB',
            color: '#111827',
            border: 'none',
            borderRadius: 8,
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: 'pointer',
          }}
        >
          View All Alerts
        </button>
      </div>

      {/* Insight Card */}
      <div
        className="rounded-xl p-8 flex flex-col justify-between"
        style={{
          background: '#111827',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          animation: `cardFadeUp 0.6s ease-out ${delay + 50}ms both`,
        }}
      >
        <div>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: 'white', marginBottom: 16 }}>Insight</h3>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, paddingRight: 40 }}>
            {insightMessage}
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>Current Projection</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{currentProjectionText}</span>
          </div>
          <button
            style={{
              width: '100%',
              padding: '12px 0',
              background: 'white',
              color: '#111827',
              border: 'none',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            View Full Report <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
