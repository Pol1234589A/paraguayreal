import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

// Date of the last content review (ISO). Update when prices/guides are re-checked.
const LAST_REVIEW = '2026-06-15';

export default function UpdatedBadge({ dateText, label }) {
  const t = useTranslations('Common');
  const locale = useLocale();
  const date = dateText || new Date(LAST_REVIEW).toLocaleDateString(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wide border border-emerald-100 shadow-sm">
      <Calendar className="w-3 h-3 text-emerald-600" aria-hidden="true" />
      <span>{label || t('updated')}: {date}</span>
    </div>
  );
}
