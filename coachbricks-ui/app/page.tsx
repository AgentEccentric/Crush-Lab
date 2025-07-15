'use client'
import {useState}  from 'react'
import LogoCoachBricks from '@/components/LogoCoachBricks'
import CategoryChips from "@/components/CategoryChips";

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Something went wrong')

      setResponse(data.result)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 space-y-4">
      <LogoCoachBricks />
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col items-center space-y-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Coach is standing by... or pick a category first..."
          className="w-full text-sm text-white bg-zinc-900 placeholder:text-center text-center p-3 h-20 rounded-lg focus:outline-none resize-none"
        />
        <button
          type="submit"
          className="bg-[#FF3621] text-white px-4 py-2 rounded-md transition-shadow duration-200 shadow-[0_4px_12px_rgba(255,54,33,0.4)]  hover:shadow-[0_4px_12px_rgba(255,54,33,0.6)]"
        >
          {loading ? 'Thinking...' : 'Ask Coach'}
        </button>
        {error && <p className="text-red-400">{error}</p>}
        {response && <p className="text-green-400">{response}</p>}
        
      </form>
      <CategoryChips onSelect={(label) => setPrompt(`Tell me more about ${label.toLowerCase()}`)} />
    </main>
  )
}
