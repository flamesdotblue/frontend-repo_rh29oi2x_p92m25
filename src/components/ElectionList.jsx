import React, { useMemo, useState } from 'react';
import { Search, CalendarDays, CheckCircle2, Clock } from 'lucide-react';

const statusBadge = (status) => {
  const map = {
    active: 'bg-green-100 text-green-700 border-green-200',
    upcoming: 'bg-amber-100 text-amber-700 border-amber-200',
    ended: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return map[status] || map.active;
};

const ElectionCard = ({ t, election, onVote, onViewResults }) => {
  const Icon = election.status === 'active' ? CheckCircle2 : election.status === 'upcoming' ? Clock : CalendarDays;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{election.title}</h3>
          <p className="text-sm text-gray-500">{election.description}</p>
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${statusBadge(election.status)}`}>
          <Icon size={14} /> {t(election.status)}
        </span>
      </div>
      <div className="mt-4 grid gap-2">
        <p className="text-sm font-medium">{t('candidates')}</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {election.candidates.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white grid place-items-center font-semibold">
                  {c.name.charAt(0)}
                </div>
                <span className="text-sm font-medium">{c.name}</span>
              </div>
              {election.status === 'active' ? (
                <button
                  onClick={() => onVote(election.id, c.id)}
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                  {t('castVote')}
                </button>
              ) : (
                <span className="text-xs text-gray-500">{t(election.status)}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={() => onViewResults(election)} className="text-sm text-blue-600 hover:underline">
          {t('viewResults')}
        </button>
      </div>
    </div>
  );
};

const ElectionList = ({ t, onVote, onViewResults, lang }) => {
  const [query, setQuery] = useState('');

  // Sample elections (frontend only for demo UI)
  const elections = useMemo(() => [
    {
      id: 'e1',
      title: lang === 'hindi' ? 'छात्र संघ चुनाव' : 'Student Council Election',
      description: lang === 'hindi' ? 'अगले सत्र के लिए प्रतिनिधि चुनें।' : 'Choose representatives for the next term.',
      status: 'active',
      candidates: [
        { id: 'c11', name: 'Aarav' },
        { id: 'c12', name: 'Diya' },
      ],
    },
    {
      id: 'e2',
      title: lang === 'marathi' ? 'क्लಬ್ कार्यकारिणी' : 'Club Executive Board',
      description: lang === 'marathi' ? 'क्लबचे नेतृत्व निवडा.' : 'Elect the leadership of the club.',
      status: 'upcoming',
      candidates: [
        { id: 'c21', name: 'Neel' },
        { id: 'c22', name: 'Mira' },
      ],
    },
    {
      id: 'e3',
      title: lang === 'tamil' ? 'நகர்ப்புற கவுன்சில்' : 'Municipal Council',
      description: lang === 'tamil' ? 'உங்கள் பகுதி பிரதிநிதியைத் தேர்வு செய்யவும்.' : 'Select your ward representative.',
      status: 'ended',
      candidates: [
        { id: 'c31', name: 'Karthik' },
        { id: 'c32', name: 'Ananya' },
      ],
    },
  ], [lang]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return elections.filter((e) => e.title.toLowerCase().includes(q));
  }, [elections, query]);

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchElection')}
            className="w-full rounded-md border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">{t('noElections')}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((e) => (
            <ElectionCard key={e.id} t={t} election={e} onVote={onVote} onViewResults={onViewResults} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ElectionList;
