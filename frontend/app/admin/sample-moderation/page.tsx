import Link from 'next/link';

export default function SampleModerationLandingPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Sample Moderation</h1>
      <p className="text-sm text-slate-600">Standalone moderation sandbox. Existing admin services remain unchanged.</p>
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
        <Link href="/admin/reports" className="border rounded-xl p-4 bg-white hover:bg-slate-50">
          <h3 className="font-semibold">Reports Queue</h3>
          <p className="text-sm text-slate-500 mt-1">Review and resolve reported posts, users, and DMs.</p>
        </Link>
        <Link href="/admin/bans" className="border rounded-xl p-4 bg-white hover:bg-slate-50">
          <h3 className="font-semibold">Ban Manager</h3>
          <p className="text-sm text-slate-500 mt-1">Manage active bans and appeal decisions.</p>
        </Link>
      </div>
    </div>
  );
}
