import { useState, useMemo, useEffect } from 'react';
import { Copy, Check, Settings2, Users, Briefcase, User } from 'lucide-react';
import { maleNames, femaleNames } from './data/names';

type Gender = 'male' | 'female' | 'both';

export default function App() {
  const [count, setCount] = useState<number>(10);
  const [gender, setGender] = useState<Gender>('male');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [candidateName, setCandidateName] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const title = [jobTitle, candidateName].filter(Boolean).join(' - ');
    document.title = title || 'Name Boolean Generator';
  }, [jobTitle, candidateName]);

  const generatedString = useMemo(() => {
    let selectedNames: string[] = [];
    
    if (gender === 'male') {
      selectedNames = maleNames.slice(0, count);
    } else if (gender === 'female') {
      selectedNames = femaleNames.slice(0, count);
    } else {
      const half = Math.ceil(count / 2);
      const otherHalf = count - half;
      const m = maleNames.slice(0, half);
      const f = femaleNames.slice(0, otherHalf);
      selectedNames = [...m, ...f];
    }

    if (selectedNames.length === 0) return '';

    const formattedNames = selectedNames.map(name => `"${name}"`);
    return `(${formattedNames.join(' OR ')})`;
  }, [count, gender]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Users size={28} />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 font-exo2">
                {jobTitle || 'Job Title'} {candidateName && `+ ${candidateName}`}
              </h1>
              <p className="text-zinc-500 text-lg">
                Name Boolean Generator
              </p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Controls Panel */}
          <div className="md:col-span-5 space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 h-fit">
            <div className="flex items-center gap-2 text-zinc-800 font-medium pb-2 border-b border-zinc-100">
              <Settings2 size={20} />
              <h2>Configuration</h2>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <Briefcase size={16} className="text-zinc-400" />
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <User size={16} className="text-zinc-400" />
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Olesia Kovalenko"
                  className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-3 pt-4 border-t border-zinc-50">
              <label className="block text-sm font-medium text-zinc-700">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['male', 'female', 'both'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`py-2 px-3 text-sm font-medium rounded-xl border transition-all ${
                      gender === g
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-md'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Count Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-zinc-700">
                  Number of Names
                </label>
                <span className="text-sm font-mono bg-zinc-100 px-2 py-1 rounded-md text-zinc-600">
                  {count}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
              />
              <div className="flex justify-between text-xs text-zinc-400 font-mono">
                <span>1</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="md:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-700">Generated Output</h2>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  copied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md hover:shadow-lg'
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            
            <div className="relative flex-grow">
              <textarea
                readOnly
                value={generatedString}
                className="w-full h-full min-h-[400px] p-5 bg-zinc-900 text-zinc-100 font-mono text-sm rounded-3xl shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
