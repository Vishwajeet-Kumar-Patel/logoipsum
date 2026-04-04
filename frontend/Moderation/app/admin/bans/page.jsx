'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/src/lib/api';

export default function AdminBansPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get('/moderation/sample/bans', { params: { page: 1, limit: 50 } });
      setItems(data?.items || []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const active = useMemo(() => items.filter((b) => b.isActive), [items]);
  const appeals = useMemo(() => items.filter((b) => b.appealStatus === 'pending'), [items]);

  const decideAppeal = async (banId, decision) => {
    await api.patch(`/moderation/admin/appeal/${banId}`, { decision, note: `${decision} by admin` });
    await load();
  };

  const countdown = (expiresAt) => {
    if (!expiresAt) return 'Permanent';
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Active Bans</h1>

      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Expires In</th>
            </tr>
          </thead>
          <tbody>
            {active.map((ban) => (
              <tr key={ban._id} className="border-t">
                <td className="p-3">{ban.userId}</td>
                <td className="p-3">{ban.type}</td>
                <td className="p-3">{ban.reason}</td>
                <td className="p-3">{countdown(ban.expiresAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold">Appeal Queue</h2>
      <div className="space-y-3">
        {appeals.map((ban) => (
          <div key={ban._id} className="border rounded-xl bg-white p-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{ban.userId}</p>
              <p className="text-sm text-slate-600">{ban.appealNote || 'No note'}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white" onClick={() => decideAppeal(ban._id, 'granted')}>Grant</button>
              <button className="px-3 py-2 rounded-lg bg-red-600 text-white" onClick={() => decideAppeal(ban._id, 'denied')}>Deny</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
