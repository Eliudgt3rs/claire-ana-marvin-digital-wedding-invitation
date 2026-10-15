'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Unlock, Users, CheckCircle2, HelpCircle, XCircle, RefreshCw, Download, ArrowLeft, Send } from 'lucide-react'

interface RsvpItem {
  id: string
  name: string
  email: string
  status: 'attending' | 'maybe' | 'decline'
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [rsvps, setRsvps] = useState<RsvpItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setIsAuthenticated(true)
        setRsvps(data.rsvps)
      } else {
        setError(data.error || 'Invalid password.')
      }
    } catch {
      setError('Failed to connect to server.')
    } finally {
      setLoading(false)
    }
  }

  const fetchRsvps = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setRsvps(data.rsvps)
      }
    } catch {
      console.error('Failed to refresh')
    } finally {
      setLoading(false)
    }
  }

  const downloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(rsvps, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'wedding_rsvps.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const attendingCount = rsvps.filter(r => r.status === 'attending').length
  const maybeCount = rsvps.filter(r => r.status === 'maybe').length
  const declineCount = rsvps.filter(r => r.status === 'decline').length

  return (
    <main className="min-h-screen bg-[#0c090a] text-[#f4efe6] px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between pb-8 border-b border-[#3a282b] mb-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] hover:underline mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Wedding Website
            </a>
            <h1 className="text-3xl font-serif tracking-wide text-[#f4efe6]">Sandra <i>&</i> Marvin Dashboard</h1>
            <p className="text-sm text-[#b3a499] mt-1">Attendance Confirmation & Guest Responses Storage</p>
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchRsvps} 
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider bg-[#221719] hover:bg-[#3a282b] border border-[#3a282b] rounded transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
              <button 
                onClick={downloadJson} 
                className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider bg-[#d4af37] text-[#0c090a] font-semibold hover:bg-[#e6c55c] rounded transition"
              >
                <Download className="w-3.5 h-3.5" /> Export JSON
              </button>
            </div>
          )}
        </header>

        {!isAuthenticated ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-[#171113] border border-[#3a282b] p-8 rounded-xl shadow-2xl mt-16 text-center"
          >
            <div className="w-12 h-12 bg-[#2a1a1d] text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#4a2e33]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif text-[#f4efe6] mb-2">Password Protected</h2>
            <p className="text-sm text-[#b3a499] mb-6">Please enter the admin password to view wedding RSVPs and guest messages.</p>
            
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#b3a499] mb-2">Admin Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-[#0c090a] border border-[#3a282b] rounded px-4 py-3 text-sm text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#d4af37] text-[#0c090a] font-semibold py-3 rounded uppercase text-xs tracking-[0.2em] hover:bg-[#e6c55c] transition"
              >
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#171113] border border-[#3a282b] p-5 rounded-lg">
                <div className="flex items-center justify-between text-[#b3a499] mb-2">
                  <span className="text-xs uppercase tracking-wider">Total Responses</span>
                  <Users className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="text-3xl font-serif text-[#f4efe6]">{rsvps.length}</div>
              </div>

              <div className="bg-[#171113] border border-[#3a282b] p-5 rounded-lg">
                <div className="flex items-center justify-between text-[#b3a499] mb-2">
                  <span className="text-xs uppercase tracking-wider">Attending</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-serif text-emerald-400">{attendingCount}</div>
              </div>

              <div className="bg-[#171113] border border-[#3a282b] p-5 rounded-lg">
                <div className="flex items-center justify-between text-[#b3a499] mb-2">
                  <span className="text-xs uppercase tracking-wider">Maybe</span>
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-serif text-amber-400">{maybeCount}</div>
              </div>

              <div className="bg-[#171113] border border-[#3a282b] p-5 rounded-lg">
                <div className="flex items-center justify-between text-[#b3a499] mb-2">
                  <span className="text-xs uppercase tracking-wider">Declined</span>
                  <XCircle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-3xl font-serif text-rose-400">{declineCount}</div>
              </div>
            </div>

            {/* RSVP Table / List */}
            <div className="bg-[#171113] border border-[#3a282b] rounded-xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-[#3a282b] flex items-center justify-between">
                <h3 className="text-lg font-serif">Guest Attendance Confirmations</h3>
                <span className="text-xs text-[#b3a499]">Stored locally in <code className="text-[#d4af37]">data/rsvps.json</code></span>
              </div>

              {rsvps.length === 0 ? (
                <div className="p-12 text-center text-[#b3a499]">
                  <p>No RSVP responses received yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#3a282b] text-[11px] uppercase tracking-wider text-[#b3a499] bg-[#120d0e]">
                        <th className="p-4">Guest Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Note / Message</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a1a1d] text-sm">
                      {rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-[#1c1416] transition">
                          <td className="p-4 font-medium text-[#f4efe6]">{rsvp.name}</td>
                          <td className="p-4 text-[#b3a499]">{rsvp.email}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                              rsvp.status === 'attending' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              rsvp.status === 'maybe' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                              'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}>
                              {rsvp.status === 'attending' && '● Joyfully accepts'}
                              {rsvp.status === 'maybe' && '● Will let you know'}
                              {rsvp.status === 'decline' && '● Regretfully declines'}
                            </span>
                          </td>
                          <td className="p-4 text-[#b3a499] max-w-xs truncate">{rsvp.message || <span className="italic text-[#665555]">No message</span>}</td>
                          <td className="p-4 text-xs text-[#887777]">{new Date(rsvp.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
