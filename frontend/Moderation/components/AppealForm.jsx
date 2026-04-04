'use client';

import { useState } from 'react';
import { useAppeal } from '../hooks/useAppeal';

export function AppealForm({ banId, onSuccess, appealStatus = 'none' }) {
  const [note, setNote] = useState('');
  const { loading, error, success, submitAppeal } = useAppeal();

  const disabled = appealStatus !== 'none' || loading;

  const submit = async () => {
    await submitAppeal(banId, note.slice(0, 1000));
    if (onSuccess) onSuccess();
  };

  return (
    <div className="border rounded-xl p-4 bg-white">
      <textarea
        className="w-full border rounded-lg p-3 min-h-[120px]"
        placeholder="Explain why this action should be reviewed"
        maxLength={1000}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        disabled={disabled}
      />
      <p className="text-xs text-slate-500 mt-1">{1000 - note.length} characters remaining</p>
      {error ? <p className="text-sm text-red-600 mt-2">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-600 mt-2">Appeal submitted.</p> : null}
      <button className="mt-3 px-4 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-50" onClick={submit} disabled={disabled}>
        {loading ? 'Submitting...' : 'Submit appeal'}
      </button>
    </div>
  );
}
