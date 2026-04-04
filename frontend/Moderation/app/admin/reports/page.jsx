'use client';

import { useEffect, useState } from 'react';
import api from '@/src/lib/api';

const BAN_OPTIONS = ['1w', '2w', '1m', 'permanent'];

export default function AdminReportsPage() {
  const [status, setStatus] = useState('pending');
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [banDuration, setBanDuration] = useState('1w');
  const [reason, setReason] = useState('Policy violation');

  const load = async () => {
    try {
      const { data } = await api.get('/moderation/sample/reports', { params: { status, page: 1, limit: 30 } });
      setReports(data?.items || []);
    } catch {
      setReports([]);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const openReport = async (id) => {
    try {
      const { data } = await api.get(`/moderation/sample/reports/${id}`);
      setSelected(data);
    } catch {
      setSelected(null);
    }
  };

  const resolve = async (action, duration = undefined) => {
    if (!selected?._id) return;
    await api.patch(`/moderation/admin/reports/${selected._id}/resolve`, {
      action,
      banDuration: duration,
      reason,
    });
    await load();
    setSelected(null);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Report Queue</h1>

      <div className="flex gap-2">
        {['pending', 'under_review', 'resolved', 'dismissed'].map((s) => (
          <button key={s} className={`px-3 py-2 rounded-lg ${status === s ? 'bg-slate-900 text-white' : 'bg-slate-100'}`} onClick={() => setStatus(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((row) => (
                <tr key={row._id} className="border-t">
                  <td className="p-3">{row.targetType}</td>
                  <td className="p-3">{row.reason}</td>
                  <td className="p-3">{row.status}</td>
                  <td className="p-3">
                    <button className="text-blue-600" onClick={() => openReport(row._id)}>Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border p-4">
          {selected ? (
            <>
              <h3 className="font-semibold">Report Detail</h3>
              <p className="text-sm mt-2">Reason: {selected.reason}</p>
              <p className="text-sm">Comment: {selected.reporterComment || 'N/A'}</p>
              <p className="text-sm">Additional reporters: {selected.additionalReportersCount || 0}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selected.targetType === 'post' && selected.targetId ? (
                  <a
                    href={`/user/posts/${selected.targetId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
                  >
                    Open Reported Post
                  </a>
                ) : null}
                {selected.targetType === 'dm' && selected.targetId ? (
                  <a
                    href={`/admin/sample-moderation`}
                    className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm"
                  >
                    Open DM Context
                  </a>
                ) : null}
              </div>

              {selected.targetContent?.title ? (
                <p className="text-sm mt-3 text-slate-700">Reported content: {selected.targetContent.title}</p>
              ) : null}
              {selected.targetContent?.description ? (
                <p className="text-sm mt-1 text-slate-600 line-clamp-3">{selected.targetContent.description}</p>
              ) : null}

              <textarea className="w-full border rounded-lg p-2 mt-3" value={reason} onChange={(e) => setReason(e.target.value)} />

              <div className="grid grid-cols-2 gap-2 mt-3">
                {BAN_OPTIONS.map((duration) => (
                  <button
                    key={duration}
                    className="px-3 py-2 rounded-lg border hover:bg-slate-50"
                    onClick={() => resolve('ban', duration)}
                  >
                    Ban {duration}
                  </button>
                ))}
              </div>

              <button className="mt-3 px-4 py-2 rounded-lg bg-slate-900 text-white" onClick={() => resolve('dismiss')}>
                Dismiss
              </button>
            </>
          ) : (
            <p className="text-sm text-slate-500">Select a report to view detail.</p>
          )}
        </div>
      </div>
    </div>
  );
}
