import React from 'react';
import { jsonLd } from '../../lib/jsonLd';

export default function SchemaOrg({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
    />
  );
}
