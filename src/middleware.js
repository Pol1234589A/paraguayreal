import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // Supported locales
  locales: ['es', 'en', 'pt'],
 
  // Default locale
  defaultLocale: 'es',

  // Ensure routing keeps the locale prefix
  localePrefix: 'always'
});
 
export const config = {
  // Match all pathnames except API routes, static files, and other internal paths
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
