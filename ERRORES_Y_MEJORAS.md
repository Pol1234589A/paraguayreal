# 🔍 Auditoría PARAGUAYREAL — Errores y Mejoras Detectados

> **Fecha:** 2026-08-06  
> **Auditor:** Antigravity (análisis de código + navegación en http://localhost:3005)  
> **Alcance:** Página `/es/mapa` + errores colaterales detectados en el resto del sitio  

---

## Resumen Rápido

| Nivel | Cantidad |
|-------|----------|
| 🔴 Crítico (rompe funcionalidad) | 3 |
| 🟠 Alto (funcionalidad degradada) | 4 |
| 🟡 Medio (UX / i18n / consola) | 7 |
| 🟢 Bajo (mejora recomendada) | 4 |
| **TOTAL** | **18** |

---

## 🔴 Errores Críticos

### 1. GeoJSON con polígono sin cerrar — CRASH en `/vivir/barrios`

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/Map/neighborhoodsData.js` |
| **Tipo** | 🔴 Crítico — Runtime Error |
| **Error** | `InvalidValueError: in property "features": at index 55: in property "geometry": in property "coordinates": at index 0: first and last positions are not equal` |
| **Efecto** | La página `/vivir/barrios` muestra el overlay de error de Next.js. El mapa de barrios no se renderiza. Crash completo del componente `NeighborhoodMap.jsx` en la línea 230 (`map.data.addGeoJson(NEIGHBORHOODS_DATA)`). |
| **Causa raíz** | El feature en el índice 55 del array `features` tiene un polígono cuya primera coordenada no coincide con la última (polígono abierto). Google Maps exige polígonos cerrados. |
| **Mejora** | Cerrar el polígono: duplicar la primera coordenada al final del array de coordenadas del feature 55. Además, envolver `addGeoJson` en un `try/catch` para que un dato malo no reviente toda la página. |

### 2. Prop `locale` pasada pero componente espera `t` — Sidebar sin traducciones

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/app/[locale]/mapa/page.jsx` → `InteractiveMap.jsx` → `MapSidebar.jsx` |
| **Tipo** | 🔴 Crítico — Traducciones rotas |
| **Error** | `page.jsx` línea 48 pasa `locale={locale}` al componente `InteractiveMap`, pero este espera `t` (función de traducción). `InteractiveMap` nunca recibe `t`, y por tanto `MapSidebar` tampoco. |
| **Efecto** | Toda la sidebar usa los fallbacks hardcodeados en español ("Lugares Recomendados", "Buscar en el mapa…", "Categorías"). En EN y PT se ve todo en español. |
| **Causa raíz** | Desacople entre la interfaz del componente padre (pasa `locale`) y la del hijo (espera `t`). `InteractiveMap` es un componente client-side con `'use client'`, así que no puede usar `useTranslations()` de `next-intl` directamente si no se configura el provider. |
| **Mejora** | Opción A: Hacer que `InteractiveMap` use `useTranslations()` internamente (como ya hace `NeighborhoodMap`). Opción B: Pasar `t` desde `page.jsx`. La opción A es más limpia y consistente con el resto del proyecto. |

### 3. Firestore — Permisos denegados al leer claves de mapa

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/lib/mapLoader.js` → `src/lib/firebase.js` |
| **Tipo** | 🔴 Crítico — Error de permisos |
| **Error** | `FirebaseError: Missing or insufficient permissions` al hacer `getDoc(db, 'config', 'keys')` |
| **Efecto** | Cada carga de página intenta leer Firestore, falla, y cae al fallback de variables de entorno (`.env.local`). Genera errores en consola en cada navegación. |
| **Causa raíz** | Las reglas de Firestore del proyecto `paraguayreal` no permiten lectura anónima del documento `config/keys`. |
| **Mejora** | Opción A: Añadir regla de Firestore `allow read: if true;` para la colección `config` (dato público, son claves de API del lado cliente). Opción B: Eliminar la lógica de Firestore del `mapLoader` y usar solo las variables de entorno, que es más simple y ya funciona. |

---

## 🟠 Errores Altos

### 4. Google Maps Places API — API legacy no habilitada

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/Map/InteractiveMap.jsx` (función `triggerPlacesSearch`) |
| **Tipo** | 🟠 Alto — Funcionalidad degradada |
| **Error** | `You're calling a legacy API, which is not enabled for your project. Switch to the Places API (New) or Routes API.` |
| **Efecto** | La búsqueda dinámica de Google Places (restaurantes, hospitales, etc. al hacer zoom) no funciona. El buscador dice "No se encontraron lugares" al escribir. Solo se muestran los lugares estáticos de `places.json`. |
| **Causa raíz** | La API key de Google Maps no tiene habilitada la "Places API" en la consola de Google Cloud. |
| **Mejora** | Ir a Google Cloud Console → APIs & Services → habilitar "Places API" para el proyecto. O migrar a la "Places API (New)" que Google recomienda. |

### 5. Textos hardcodeados en español en el popup de lugares

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/Map/PlacePopup.jsx` y `DirectionsButton.jsx` |
| **Tipo** | 🟠 Alto — i18n roto |
| **Error** | Textos fijos: `"Cómo llegar"` (línea 50), `"Ver Guía Geografía Sagrada"` (línea 60), `"N/A"` para rating. No usan el sistema de traducciones. |
| **Efecto** | En EN y PT, los popups del mapa aparecen en español. |
| **Mejora** | Pasar `t` o `locale` al componente `PlacePopup` y usar claves de traducción. |

### 6. Clave de traducción `Footer.securityMatrix` no existe

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/UI/Footer.jsx` (línea 36) + `messages/es.json`, `en.json`, `pt.json` |
| **Tipo** | 🟠 Alto — Texto roto visible |
| **Error** | `MISSING_MESSAGE: Could not resolve 'Footer.securityMatrix'` en los 3 idiomas |
| **Efecto** | En el footer se muestra la clave cruda `Footer.securityMatrix` en lugar de "Portal de Seguridad". Visible en todas las páginas del sitio. |
| **Mejora** | Añadir la clave `"securityMatrix": "Portal de Seguridad"` al objeto `Footer` en `es.json` (y sus traducciones en `en.json` y `pt.json`). |

### 7. Clave de traducción `Navigation.neighborhoods` no existe

| Campo | Detalle |
|-------|---------|
| **Archivo** | Breadcrumbs en `/vivir/barrios` + `messages/*.json` |
| **Tipo** | 🟠 Alto — Texto roto visible |
| **Error** | `MISSING_MESSAGE: Could not resolve 'Navigation.neighborhoods'` |
| **Efecto** | El breadcrumb de la página de barrios muestra la clave cruda `Navigation.neighborhoods` en vez de "Barrios". |
| **Mejora** | Añadir `"neighborhoods": "Barrios"` al objeto `Navigation` en `es.json` (y equivalentes en EN/PT). |

---

## 🟡 Errores Medios

### 8. Clave de traducción `Barrios.compareHeaderCity` no existe

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/app/[locale]/vivir/barrios/BarriosClientPage.jsx` (línea 459) |
| **Tipo** | 🟡 Medio — Warning en consola |
| **Error** | `MISSING_MESSAGE: Could not resolve 'Barrios.compareHeaderCity'` |
| **Efecto** | Warning en consola del servidor. El fallback `"Municipio / Ciudad"` se usa correctamente, pero genera ruido en logs. |
| **Mejora** | Añadir la clave a los 3 archivos de mensajes. |

### 9. Breadcrumb "Inicio" hardcodeado en español en todas las páginas

| Campo | Detalle |
|-------|---------|
| **Archivo** | Componente de breadcrumbs (probablemente en layout o un componente UI compartido) |
| **Tipo** | 🟡 Medio — i18n incompleto |
| **Error** | El enlace de inicio en los breadcrumbs siempre dice "Inicio", incluso en EN ("Home") y PT ("Início"). |
| **Efecto** | Inconsistencia de idioma en la navegación. |
| **Mejora** | Usar `t("Navigation.home")` o equivalente. |

### 10. Breadcrumb con doble prefijo de locale `/en/en/vivir`

| Campo | Detalle |
|-------|---------|
| **Archivo** | Breadcrumbs en la página de barrios |
| **Tipo** | 🟡 Medio — Enlace roto |
| **Error** | El enlace padre en breadcrumbs genera URLs duplicadas: `/en/en/vivir` en vez de `/en/vivir`. |
| **Efecto** | Click en el breadcrumb lleva a una página 404 o ruta incorrecta. |
| **Mejora** | Revisar la lógica de construcción de URLs en los breadcrumbs: el prefijo `locale` se está añadiendo dos veces. |

### 11. Página de Turismo no traducida en EN y PT

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/app/[locale]/turismo/page.jsx` |
| **Tipo** | 🟡 Medio — i18n roto en una sección entera |
| **Error** | Títulos, subtítulos, placeholder de búsqueda y filtros están hardcodeados en español. |
| **Efecto** | `/en/turismo` y `/pt/turismo` muestran todo en español: "Turismo", "Guía Oficial", "Buscar por nombre…", "Todos", "Atracciones Recomendadas". |
| **Mejora** | Migrar todos los textos a claves de `next-intl`. |

### 12. Sidebar del mapa: texto "No se encontraron lugares" hardcodeado

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/Map/MapSidebar.jsx` (línea 83) |
| **Tipo** | 🟡 Medio — i18n incompleto |
| **Error** | El mensaje de lista vacía `"No se encontraron lugares en esta zona."` está fijo en español. |
| **Efecto** | En EN y PT se muestra en español. |
| **Mejora** | Usar `translate("Map.noPlacesFound", "No se encontraron lugares en esta zona.")`. |

### 13. Footer: typo en portugués "derechos" → "direitos"

| Campo | Detalle |
|-------|---------|
| **Archivo** | `messages/pt.json` (clave `Footer.rights` o equivalente) |
| **Tipo** | 🟡 Medio — Error de idioma |
| **Error** | El footer en PT dice `"Todos os derechos reservados"` (español) en vez de `"Todos os direitos reservados"`. |
| **Efecto** | Error gramatical visible para usuarios portugueses/brasileños. |
| **Mejora** | Corregir "derechos" → "direitos" en `pt.json`. |

### 14. Footer: asunto del mailto hardcodeado en español

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/UI/Footer.jsx` |
| **Tipo** | 🟡 Medio — i18n incompleto |
| **Error** | El link "Sugerir Lugar" tiene `subject=Sugerencia de lugar para el Mapa de Paraguay` fijo en español para EN y PT. |
| **Efecto** | Usuarios EN/PT reciben un asunto de correo en español. |
| **Mejora** | Usar el sistema de traducciones para el `subject` del mailto. |

---

## 🟢 Mejoras Recomendadas

### 15. Categorías de la sidebar no traducidas (labels fijos)

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/Map/InteractiveMap.jsx` (objeto `CATEGORIES`, líneas 12-22) |
| **Tipo** | 🟢 Bajo — UX |
| **Error** | Las etiquetas de categorías ("Turismo", "Restaurantes", "Barrios"…) están hardcodeadas en el objeto `CATEGORIES` en español. |
| **Efecto** | Al cambiar idioma, las categorías del sidebar y los badges en los popups siempre se muestran en español. |
| **Mejora** | Usar claves de traducción para las labels: `{ label: t("Map.cat_turismo") }` o mapa locale → labels. |

### 16. Blog: filtros de categoría no traducidos

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/app/[locale]/blog/page.jsx` |
| **Tipo** | 🟢 Bajo — i18n |
| **Error** | "Todos", "Costos", "Residencia", "Negocios", "Guías", "Turismo" y "8 min de lectura" están en español en todos los idiomas. |
| **Efecto** | Inconsistencia de idioma en la página del blog. |
| **Mejora** | Migrar los filtros y metadatos de lectura al sistema de traducciones. |

### 17. Next.js 14.2.35 marcado como desactualizado

| Campo | Detalle |
|-------|---------|
| **Archivo** | `package.json` |
| **Tipo** | 🟢 Bajo — Mantenimiento |
| **Error** | El overlay de error de Next.js muestra: "Next.js (14.2.35) is outdated (learn more)". |
| **Efecto** | Posibles bugs ya corregidos en versiones más recientes. No urgente pero conviene actualizar. |
| **Mejora** | Actualizar Next.js a la última versión estable de la rama 14 o migrar a 15. |

### 18. NeighborhoodMap: falta try/catch alrededor de `addGeoJson`

| Campo | Detalle |
|-------|---------|
| **Archivo** | `src/components/Map/NeighborhoodMap.jsx` (línea 230) |
| **Tipo** | 🟢 Bajo — Robustez |
| **Error** | `map.data.addGeoJson(NEIGHBORHOODS_DATA)` se ejecuta sin protección. Si algún feature tiene geometría inválida, revienta todo el mapa. |
| **Efecto** | Un solo polígono malo (como el #55) destruye la página entera. |
| **Mejora** | Envolver en try/catch y, adicionalmente, sanitizar los features en tiempo de carga (cerrar polígonos automáticamente). |

---

## 📊 Tabla CSV (copiar/pegar)

```csv
ID,Nivel,Tipo,Archivo Principal,Error,Mejora Propuesta
1,CRITICO,GeoJSON crash,neighborhoodsData.js,"Poligono index 55 abierto - crash en /vivir/barrios","Cerrar poligono + try/catch en addGeoJson"
2,CRITICO,Props desacopladas,page.jsx / InteractiveMap.jsx,"Pasa locale pero componente espera t - sidebar sin traducciones","Usar useTranslations() dentro de InteractiveMap"
3,CRITICO,Firestore permisos,mapLoader.js,"Missing or insufficient permissions al leer config/keys","Añadir regla Firestore o usar solo .env.local"
4,ALTO,API deshabilitada,InteractiveMap.jsx,"Places API legacy no habilitada - busqueda no funciona","Habilitar Places API en Google Cloud Console"
5,ALTO,Textos hardcoded,PlacePopup.jsx + DirectionsButton.jsx,"Como llegar y Ver Guia fijos en español","Internacionalizar con t() o claves de traduccion"
6,ALTO,Clave faltante,Footer.jsx + messages/*.json,"Footer.securityMatrix no existe - clave cruda visible","Añadir la clave a los 3 archivos de mensajes"
7,ALTO,Clave faltante,Breadcrumbs + messages/*.json,"Navigation.neighborhoods no existe - clave cruda visible","Añadir la clave a los 3 archivos de mensajes"
8,MEDIO,Clave faltante,BarriosClientPage.jsx,"Barrios.compareHeaderCity no existe - warning consola","Añadir la clave a los 3 archivos de mensajes"
9,MEDIO,i18n hardcoded,Breadcrumbs,"Inicio fijo en español en todas las subpaginas","Usar clave de traduccion para el enlace Home"
10,MEDIO,URL duplicada,Breadcrumbs barrios,"Genera /en/en/vivir (doble locale)","Revisar logica de construccion de URLs"
11,MEDIO,i18n roto,turismo/page.jsx,"Pagina entera sin traducir en EN y PT","Migrar textos a next-intl"
12,MEDIO,Texto hardcoded,MapSidebar.jsx L83,"No se encontraron lugares fijo en español","Usar translate() del sidebar"
13,MEDIO,Typo idioma,messages/pt.json,"derechos en vez de direitos","Corregir en pt.json"
14,MEDIO,mailto hardcoded,Footer.jsx,"Subject del email fijo en español para EN/PT","Usar traduccion para el subject"
15,BAJO,Labels hardcoded,InteractiveMap.jsx CATEGORIES,"Nombres de categorias fijos en español","Usar claves de traduccion"
16,BAJO,i18n filtros,blog/page.jsx,"Filtros Todos/Costos/etc y 8 min lectura en español","Migrar a traducciones"
17,BAJO,Version,package.json,"Next.js 14.2.35 marcado como desactualizado","Actualizar a ultima version estable"
18,BAJO,Robustez,NeighborhoodMap.jsx L230,"addGeoJson sin try/catch - 1 feature malo revienta todo","Envolver en try/catch + sanitizacion"
```
