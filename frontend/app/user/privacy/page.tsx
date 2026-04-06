import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import PrivacyPolicyContent from '@/src/components/UserDashboard/PrivacyPolicyContent';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex">
      <DashboardSidebar />
      <main className="flex-1 md:ml-[240px] pt-20 md:pt-0 min-h-screen overflow-y-auto">
        <PrivacyPolicyContent />
      </main>
    </div>
  );
}
