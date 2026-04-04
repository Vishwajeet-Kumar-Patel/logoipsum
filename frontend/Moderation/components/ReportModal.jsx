'use client';

import { useMemo, useState } from 'react';
import { REPORT_REASONS } from '../utils/moderationConstants';
import { useReport } from '../hooks/useReport';

export function ReportModal({ targetId, targetType, onClose }) {
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [comment, setComment] = useState('');
  const { loading, error, success, fileReport } = useReport();

  const remaining = useMemo(() => 500 - comment.length, [comment.length]);

  const submit = async () => {
    await fileReport(targetId, targetType, reason, comment);
  };

  return (
    <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-900">Report content</h3>
        <p className="text-sm text-slate-500 mt-1">Help us understand what happened.</p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Reason</label>
            <select
              className="w-full mt-1 border rounded-xl px-3 py-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {REPORT_REASONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Comment</label>
            <textarea
              className="w-full mt-1 border rounded-xl px-3 py-2 min-h-[120px]"
              maxLength={500}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional details"
            />
            <p className="text-xs text-slate-500 mt-1">{remaining} characters remaining</p>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-600">Report submitted successfully.</p> : null}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="px-4 py-2 rounded-xl border" onClick={onClose}>
            Close
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
