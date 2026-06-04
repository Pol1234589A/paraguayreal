import React from 'react';
import { Search, MapPin, Share2, Star } from 'lucide-react';

export default function MapSidebar({
  places = [],
  searchQuery = '',
  setSearchQuery,
  selectedCategories = [],
  toggleCategory,
  onPlaceClick,
  categories = {},
  onShareLocation,
  t
}) {
  // Safe default translation function in case it is not provided
  const translate = (key, defaultText) => t ? t(key) : defaultText;

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 border-r border-slate-200 w-full md:w-80 shrink-0">
      {/* Header and Search */}
      <div className="p-4 border-b border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>{translate("Map.sidebarTitle", "Lugares Recomendados")}</span>
          </h2>
          <button
            onClick={onShareLocation}
            title={translate("Map.shareLocation", "Compartir Ubicación")}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={translate("Map.searchPlaceholder", "Buscar en el mapa...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Layer Toggles */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
          {translate("Map.allCategories", "Categorías")}
        </span>
        <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
          {Object.entries(categories).map(([key, { label, color, icon }]) => {
            const isChecked = selectedCategories.includes(key);
            return (
              <label
                key={key}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition select-none ${
                  isChecked
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(key)}
                  className="hidden"
                />
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="truncate">{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Places List */}
      <div className="flex-1 overflow-y-auto division-y divide-slate-100">
        {places.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            No se encontraron lugares en esta zona.
          </div>
        ) : (
          places.map((place) => (
            <button
              key={place.properties.id}
              onClick={() => onPlaceClick(place)}
              className="w-full text-left p-4 hover:bg-slate-50/80 active:bg-slate-100 focus:outline-none border-b border-slate-100 transition flex gap-3"
            >
              {place.properties.photo && (
                <img
                  src={place.properties.photo}
                  alt={place.properties.name}
                  className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-900 truncate">{place.properties.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 mb-1">{place.properties.address}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold capitalize">
                    {place.properties.category}
                  </span>
                  {place.properties.rating && (
                    <div className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>{place.properties.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
