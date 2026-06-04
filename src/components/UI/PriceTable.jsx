import React from 'react';
import pricesData from '../../../data/prices.json';

export default function PriceTable({ t }) {
  const categories = ['rent', 'food', 'services', 'transport'];

  const getCategoryTitle = (cat) => {
    switch (cat) {
      case 'rent':
        return t ? t("Prices.categories.rent") : "Alquiler y Vivienda";
      case 'food':
        return t ? t("Prices.categories.food") : "Alimentación y Supermercado";
      case 'services':
        return t ? t("Prices.categories.services") : "Servicios Básicos";
      case 'transport':
        return t ? t("Prices.categories.transport") : "Transporte y Combustible";
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-10">
      {categories.map((categoryKey) => {
        const items = pricesData[categoryKey] || [];
        return (
          <div key={categoryKey} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
            {/* Category Banner */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-extrabold text-sm tracking-wide uppercase font-display">
                {getCategoryTitle(categoryKey)}
              </h3>
              <span className="text-[10px] bg-emerald-600 font-bold px-2 py-0.5 rounded text-emerald-50">
                {t ? t("Prices.updated") : "Actualizado: Junio 2026"}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="px-6 py-3.5 w-1/2">
                      {t ? t("Prices.headers.item") : "Concepto / Servicio"}
                    </th>
                    <th className="px-6 py-3.5">
                      {t ? t("Prices.headers.price") : "Precio Promedio (Guaraníes)"}
                    </th>
                    <th className="px-6 py-3.5 text-right">
                      {t ? t("Prices.headers.priceUsd") : "Precio Promedio (USD)"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">{item.item}</td>
                      <td className="px-6 py-4 font-mono font-semibold text-slate-800">
                        {item.pyg.toLocaleString('es-PY')} ₲
                      </td>
                      <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">
                        ${item.usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
