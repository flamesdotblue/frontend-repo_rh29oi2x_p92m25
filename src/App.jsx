import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import ElectionList from './components/ElectionList';
import ResultsPanel from './components/ResultsPanel';
import { languages } from './components/i18n';

function App() {
  const [lang, setLang] = useState('english');
  const [toast, setToast] = useState('');
  const [showResultsFor, setShowResultsFor] = useState(null);

  const t = useMemo(() => {
    const dict = languages[lang] || languages.english;
    return (key) => dict[key] || key;
  }, [lang]);

  const handleVote = (electionId, candidateId) => {
    setToast(t('yourVoteRecorded'));
    setTimeout(() => setToast(''), 2000);
  };

  const onLogin = () => alert(`${t('login')}`);
  const onRegister = () => alert(`${t('register')}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 text-gray-900">
      <Header t={t} onLogin={onLogin} onRegister={onRegister} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">{t('elections')}</h2>
          <LanguageSelector value={lang} onChange={setLang} label={t('selectLanguage')} />
        </div>

        <ElectionList t={t} onVote={handleVote} onViewResults={setShowResultsFor} lang={lang} />
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2">
          <div className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}

      {showResultsFor && (
        <ResultsPanel t={t} election={showResultsFor} onBack={() => setShowResultsFor(null)} />
      )}

      <footer className="border-t border-gray-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} • {t('welcomeTitle')}
        </div>
      </footer>
    </div>
  );
}

export default App;
