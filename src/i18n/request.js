import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async (context) => {
  let locale = 'es';
  if (context) {
    if (context.locale) {
      locale = context.locale;
    } else if (context.requestLocale) {
      locale = (await context.requestLocale) || 'es';
    }
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
