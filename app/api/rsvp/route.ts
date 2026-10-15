import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'rsvps.json')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, status, message } = body

    if (!name || !email || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let rsvps = []
    try {
      const data = await fs.readFile(filePath, 'utf-8')
      rsvps = JSON.parse(data)
    } catch {
      // If file doesn't exist, start with empty array
      rsvps = []
    }

    const newRsvp = {
      id: Date.now().toString(),
      name,
      email,
      status,
      message: message || '',
      createdAt: new Date().toISOString(),
    }

    rsvps.unshift(newRsvp)

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(rsvps, null, 2), 'utf-8')

    return NextResponse.json({ success: true, rsvp: newRsvp })
  } catch (error) {
    console.error('Error saving RSVP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const rsvps = JSON.parse(data)
    return NextResponse.json(rsvps)
  } catch {
    return NextResponse.json([])
  }
}
