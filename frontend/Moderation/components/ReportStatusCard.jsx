'use client';

export function ReportStatusCard({ report }) {
  return (
    <div className="border rounded-2xl p-4 bg-white">
      <p className="text-xs uppercase text-slate-500">{report.targetType}</p>
      <h4 className="font-semibold text-slate-900 mt-1">Reason: {report.reason}</h4>
      <div className="mt-2 inline-flex text-xs px-2 py-1 rounded-full bg-slate-100">
        {report.status}
      </div>
      {report.resolution ? <p className="text-sm text-slate-700 mt-3">{report.resolution}</p> : null}
      {report.appealStatus ? (
        <p className="text-xs text-slate-500 mt-2">Appeal: {report.appealStatus}</p>
      ) : null}
    </div>
  );
}
