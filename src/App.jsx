import React, { useState } from 'react'

const App = () => {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  // Transformations
  const handleUpperCase = () => setText(text.toUpperCase())
  const handleLowerCase = () => setText(text.toLowerCase())
  
  const handleTitleCase = () => {
    const updatedText = text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    setText(updatedText)
  }

  const handleSentenceCase = () => {
    const updatedText = text
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, separator, char) => separator + char.toUpperCase())
    setText(updatedText)
  }

  const handleInverseCase = () => {
    const updatedText = text
      .split('')
      .map(char => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
      .join('')
    setText(updatedText)
  }

  const handleAlternateCase = () => {
    const updatedText = text
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join('')
    setText(updatedText)
  }

  const handleClear = () => setText('')

  const handleCopy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Counts
  const charCount = text.length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length
  const paragraphCount = text.trim() === '' ? 0 : text.split(/\n+/).filter(Boolean).length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl bg-slate-900 border border-blue-900/50 rounded-2xl shadow-2xl shadow-blue-950/50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900/50 border-b border-blue-900/30 px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Text Case Converter
            </h1>
            <p className="text-xs text-slate-400 mt-1">Transform your text format instantly</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!text}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
                  : 'bg-slate-800/80 border-blue-900/30 text-blue-400 hover:bg-slate-800 hover:border-blue-700 disabled:opacity-40 disabled:pointer-events-none'
              }`}
            >
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 border border-blue-900/30 text-slate-400 hover:bg-slate-800 hover:text-rose-400 hover:border-rose-900/50 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-64 bg-slate-950 border border-blue-900/40 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 resize-none transition-all duration-200 text-base"
          />

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-2 mt-4 bg-slate-950/50 border border-blue-900/20 rounded-xl p-3 text-center">
            <div>
              <div className="text-base font-semibold text-blue-400">{charCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Characters</div>
            </div>
            <div>
              <div className="text-base font-semibold text-blue-400">{wordCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Words</div>
            </div>
            <div>
              <div className="text-base font-semibold text-blue-400">{sentenceCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Sentences</div>
            </div>
            <div>
              <div className="text-base font-semibold text-blue-400">{paragraphCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Paragraphs</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={handleSentenceCase}
              disabled={!text}
              className="py-2.5 px-4 rounded-xl text-sm font-medium bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500/20 text-white shadow-lg shadow-blue-950/30 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              Sentence case
            </button>
            <button
              onClick={handleLowerCase}
              disabled={!text}
              className="py-2.5 px-4 rounded-xl text-sm font-medium bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500/20 text-white shadow-lg shadow-blue-950/30 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              lower case
            </button>
            <button
              onClick={handleUpperCase}
              disabled={!text}
              className="py-2.5 px-4 rounded-xl text-sm font-medium bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500/20 text-white shadow-lg shadow-blue-950/30 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              UPPER CASE
            </button>
            <button
              onClick={handleTitleCase}
              disabled={!text}
              className="py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 border border-blue-900/40 text-slate-200 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              Title Case
            </button>
            <button
              onClick={handleAlternateCase}
              disabled={!text}
              className="py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 border border-blue-900/40 text-slate-200 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              aLtErNaTiNg CaSe
            </button>
            <button
              onClick={handleInverseCase}
              disabled={!text}
              className="py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 border border-blue-900/40 text-slate-200 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              iNVERSE cASE
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
