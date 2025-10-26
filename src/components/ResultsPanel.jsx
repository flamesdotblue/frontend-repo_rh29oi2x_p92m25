import React from 'react';

const Bar = ({ label, value, total }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">{value}</span>
      </div>
      <div className="h-2 w-full rounded bg-gray-200">
        <div className="h-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-gray-500">{pct}%</div>
    </div>
  );
};

const ResultsPanel = ({ t, election, onBack }) => {
  if (!election) return null;

  const totals = election.candidates.map((c, i) => ({
    name: c.name,
    votes: (i + 1) * 137, // demo numbers
  }));
  const totalVotes = totals.reduce((sum, r) => sum + r.votes, 0);

  return (
    <div className="fixed inset-0 z-30 bg-black/40 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{t('results')}: {election.title}</h3>
            <p className="text-sm text-gray-500">{t('totalVotes')}: {totalVotes}</p>
          </div>
          <button
            onClick={onBack}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            {t('back')}
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {totals.map((r) => (
            <Bar key={r.name} label={r.name} value={r.votes} total={totalVotes} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
