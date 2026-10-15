import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'rsvps.json')

export interface RsvpRecord {
  id: string
  name: string
  email: string
  status: string
  message: string
  createdAt: string
}

// In-memory fallback storage for read-only or serverless environments
let memoryRsvps: RsvpRecord[] = []

export async function getRsvps(): Promise<RsvpRecord[]> {
  let fileRsvps: RsvpRecord[] = []
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    fileRsvps = JSON.parse(data)
  } catch {
    fileRsvps = []
  }

  const combined = [...fileRsvps, ...memoryRsvps]
  return Array.from(new Map(combined.map(item => [item.id, item])).values())
}

export async function addRsvp(record: Omit<RsvpRecord, 'id' | 'createdAt'>): Promise<RsvpRecord> {
  const newRsvp: RsvpRecord = {
    id: Date.now().toString(),
    ...record,
    createdAt: new Date().toISOString(),
  }

  const currentRsvps = await getRsvps()
  const updated = [newRsvp, ...currentRsvps]

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8')
  } catch (writeErr) {
    console.warn('Filesystem write failed, storing RSVP in memory:', writeErr)
    memoryRsvps.unshift(newRsvp)
  }

  return newRsvp
}
