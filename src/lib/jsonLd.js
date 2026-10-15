/** JSON.stringify safe for inline <script type="application/ld+json"> (escapes "<"). */
export function jsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
