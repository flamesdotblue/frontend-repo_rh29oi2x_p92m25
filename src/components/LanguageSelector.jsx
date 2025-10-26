import React from 'react';
import { languageOptions } from './i18n';

const LanguageSelector = ({ value, onChange, label }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 dark:text-gray-300" htmlFor="lang">
        {label}
      </label>
      <select
        id="lang"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white/70 backdrop-blur px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languageOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
