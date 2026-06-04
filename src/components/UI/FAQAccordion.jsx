'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Compile JSON-LD structure
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="space-y-3">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm transition"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:bg-slate-50/50 transition cursor-pointer"
            >
              <span className="text-sm sm:text-base">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180 text-emerald-600' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
              } overflow-hidden`}
            >
              <p className="p-5 text-sm leading-relaxed text-slate-600 bg-slate-50/20">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
