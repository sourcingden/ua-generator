import { useState, useMemo } from 'react';
import { Copy, Check, Settings2, Users } from 'lucide-react';
import { maleNames, femaleNames } from './data/names';

type Gender = 'male' | 'female' | 'both';

export default function App() {
  const [count, setCount] = useState<number>(10);
  const [gender, setGender] = useState<Gender>('male');
  const [copied, setCopied] = useState(false);

  const generatedString = useMemo(() => {
    let selectedNames: string[] = [];
    
    if (gender === 'male') {
      selectedNames = maleNames.slice(0, count);
    } else if (gender === 'female') {
      selectedNames = femaleNames.slice(0, count);
    } else {
      // For 'both', we take half from each to reach the total count
      const half = Math.ceil(count / 2);
      const otherHalf = count - half;
      
      // Interleave them for a better mix, or just concat
      const m = maleNames.slice(0, half);
      const f = femaleNames.slice(0, otherHalf);
      selectedNames = [...m, ...f];
    }

    if (selectedNames.length === 0) return '';

    const formattedNames = selectedNames.map(name => `"${name}"`);
    return `(${formattedNames.join(' OR\n')})`;
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
        <header className="space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Users size={28} />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
            Name Boolean Generator
          </h1>
          <p className="text-zinc-500 text-lg">
            Generate formatted boolean search strings of top Ukrainian names for sourcing and recruiting.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Controls Panel */}
          <div className="md:col-span-5 space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-zinc-100">
            <div className="flex items-center gap-2 text-zinc-800 font-medium pb-2 border-b border-zinc-100">
              <Settings2 size={20} />
              <h2>Configuration</h2>
            </div>

            {/* Gender Selection */}
            <div className="space-y-3">
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
                className="w-full h-full min-h-[300px] p-5 bg-zinc-900 text-zinc-100 font-mono text-sm rounded-3xl shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
