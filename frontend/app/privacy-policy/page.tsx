import LegalDocumentContent from '@/src/components/legal/LegalDocumentContent';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[calc(100vh-390px)] bg-[#f6f4f1]">
      <LegalDocumentContent
        documentKey="privacyPolicy"
        title="Privacy Policy"
        showBackToHome
      />
    </main>
  );
}
