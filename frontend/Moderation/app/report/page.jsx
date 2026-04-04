'use client';

import { useEffect, useState } from 'react';
import api from '@/src/lib/api';
import { ReportStatusCard } from '../../components/ReportStatusCard';
import { AppealForm } from '../../components/AppealForm';

export default function ReportDashboardPage() {
  const [tab, setTab] = useState('submitted');
  const [data, setData] = useState({ submitted: [], received: [] });
  const [bans, setBans] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [reportRes, banRes] = await Promise.all([
          api.get('/moderation/report/mine'),
          api.get('/moderation/ban/history'),
        ]);
        setData(reportRes.data || { submitted: [], received: [] });
        setBans(Array.isArray(banRes.data) ? banRes.data : []);
      } catch {
        setData({ submitted: [], received: [] });
        setBans([]);
      }
    };

    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Report Dashboard</h1>
      <div className="flex gap-2">
        <button className={`px-3 py-2 rounded-lg ${tab === 'submitted' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`} onClick={() => setTab('submitted')}>Submitted</button>
        <button className={`px-3 py-2 rounded-lg ${tab === 'received' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`} onClick={() => setTab('received')}>Received</button>
        <button className={`px-3 py-2 rounded-lg ${tab === 'bans' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`} onClick={() => setTab('bans')}>Bans</button>
      </div>

      {tab === 'submitted' ? (
        <div className="grid gap-3 md:grid-cols-2">
          {data.submitted.map((report) => (
            <ReportStatusCard key={report._id} report={report} />
          ))}
        </div>
      ) : null}

      {tab === 'received' ? (
        <div className="grid gap-3 md:grid-cols-2">
          {data.received.map((report) => (
            <ReportStatusCard key={report._id} report={report} />
          ))}
        </div>
      ) : null}

      {tab === 'bans' ? (
        <div className="space-y-4">
          {bans.map((ban) => (
            <div key={ban._id} className="border rounded-2xl p-4 bg-white">
              <p className="font-semibold">{ban.type} ban</p>
              <p className="text-sm text-slate-600 mt-1">Reason: {ban.reason}</p>
              <p className="text-xs text-slate-500 mt-1">Appeal: {ban.appealStatus}</p>
              {ban.appealStatus === 'none' ? <AppealForm banId={ban._id} /> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
