export default function sitemap() {
  const baseUrl = 'https://paraguayreal.com';
  const locales = ['es', 'en', 'pt'];
  
  const staticPaths = [
    '',
    '/mapa',
    '/precios',
    '/vivir/barrios',
    '/turismo'
  ];

  const cities = ['asuncion', 'ciudad-del-este', 'encarnacion'];
  
  const blogPosts = [
    'cuanto-cuesta-vivir-en-paraguay-2025',
    'como-obtener-residencia-permanente-paraguay',
    'impuestos-extranjeros-paraguay',
    'hacer-negocios-en-paraguay-oportunidades',
    'tramites-con-pasaporte-en-paraguay-guia',
    'aregua-altos-costo-vida-alquileres',
    'turismo-en-asuncion-casco-historico-consejos',
    'paraguay-como-espana-anos-80-demografia-impuestos',
    'servicios-24-7-calidad-de-vida-paraguay',
    'seguridad-infraestructura-paraguay-emigrantes',
    'historia-datos-curiosos-paraguay-curiosidades'
  ];

  const sitemapEntries = [];

  // Generate dynamic URLs for all paths under each supported locale
  locales.forEach((locale) => {
    // 1. Static Pages
    staticPaths.forEach((path) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : 0.8
      });
    });

    // 2. City Pages
    cities.forEach((city) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/ciudades/${city}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7
      });
    });

    // 3. Blog Articles
    blogPosts.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      });
    });
  });

  return sitemapEntries;
}
