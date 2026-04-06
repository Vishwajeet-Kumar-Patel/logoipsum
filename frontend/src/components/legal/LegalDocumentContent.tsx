'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import api from '@/src/lib/api';

export type LegalDocumentKey = 'termsOfService' | 'privacyPolicy';

interface LegalDocumentsResponse {
  termsOfService?: string;
  privacyPolicy?: string;
  updatedAt?: string | null;
}

interface LegalDocumentContentProps {
  documentKey: LegalDocumentKey;
  title: string;
  showBackToHome?: boolean;
  containerClassName?: string;
}

const FALLBACK_DOCUMENTS: Record<LegalDocumentKey, string> = {
  termsOfService:
    '## Platform Usage Rules\n1. Users must be 18+...\n2. All content must comply with global standards...',
  privacyPolicy:
    '## Data Privacy\nWe value your data security. This document outlines how we process information...',
};

export default function LegalDocumentContent({
  documentKey,
  title,
  showBackToHome = false,
  containerClassName,
}: LegalDocumentContentProps) {
  const [documents, setDocuments] = useState<LegalDocumentsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchDocuments = async () => {
      try {
        const res = await api.get<LegalDocumentsResponse>('/auth/legal-documents');
        if (cancelled) return;
        setDocuments(res.data);
        setError(null);
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.response?.data?.message || 'Failed to load legal content. Showing fallback content.');
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchDocuments();

    return () => {
      cancelled = true;
    };
  }, []);

  const content = useMemo(() => {
    const raw = documents?.[documentKey];
    if (typeof raw === 'string' && raw.trim().length > 0) {
      return raw;
    }
    return FALLBACK_DOCUMENTS[documentKey];
  }, [documents, documentKey]);

  const formattedUpdatedAt = useMemo(() => {
    if (!documents?.updatedAt) return null;
    const parsed = new Date(documents.updatedAt);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [documents?.updatedAt]);

  return (
    <section className={containerClassName || 'w-full max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-12'}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="font-[family-name:var(--font-fjalla)] text-[34px] md:text-[40px] font-normal tracking-[0.8px] text-[#1a1a1a]">
          {title}
        </h1>

        {showBackToHome ? (
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-[#d8d1c7] bg-[#faf8f5] px-4 py-2 text-[13px] font-semibold text-[#3a3a3a] hover:bg-white transition-colors"
          >
            Back to home
          </Link>
        ) : null}
      </div>

      {error ? (
        <p className="mt-3 rounded-[12px] border border-[#f5c2b7] bg-[#fff6f4] px-4 py-3 text-[13px] font-semibold text-[#9b3f32]">
          {error}
        </p>
      ) : null}

      <article className="mt-6 rounded-[16px] border border-[#e4ded2] bg-[#fcfaf7] p-5 md:p-6">
        {isLoading ? (
          <p className="text-[15px] font-medium text-[#6b7280] animate-pulse">Loading policy content...</p>
        ) : (
          <>
            {formattedUpdatedAt ? (
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#8b8b8b]">
                Last updated: {formattedUpdatedAt}
              </p>
            ) : null}

            <pre className="whitespace-pre-wrap break-words font-[family-name:var(--font-figtree)] text-[15px] leading-[1.75] tracking-[0.3px] text-[#3f3f46]">
              {content}
            </pre>
          </>
        )}
      </article>
    </section>
  );
}
