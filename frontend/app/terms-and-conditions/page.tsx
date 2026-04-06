import LegalDocumentContent from '@/src/components/legal/LegalDocumentContent';

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-[calc(100vh-390px)] bg-[#f6f4f1]">
      <LegalDocumentContent
        documentKey="termsOfService"
        title="Terms and Conditions"
        showBackToHome
      />
    </main>
  );
}
