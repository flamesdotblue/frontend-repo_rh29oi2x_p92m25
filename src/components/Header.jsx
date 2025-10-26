import React from 'react';
import { User } from 'lucide-react';

const Header = ({ t, onLogin, onRegister }) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{t('welcomeTitle')}</h1>
            <p className="text-xs text-gray-500">{t('welcomeSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRegister}
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-3 py-2 text-sm hover:bg-gray-800"
          >
            <User size={16} /> {t('register')}
          </button>
          <button
            onClick={onLogin}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
