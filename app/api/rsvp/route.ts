import { NextResponse } from 'next/server'
import { addRsvp, getRsvps } from '@/lib/rsvp-store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, status, message } = body

    if (!name || !email || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newRsvp = await addRsvp({ name, email, status, message: message || '' })

    return NextResponse.json({ success: true, rsvp: newRsvp })
  } catch (error) {
    console.error('Error saving RSVP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const rsvps = await getRsvps()
    return NextResponse.json(rsvps)
  } catch {
    return NextResponse.json([])
  }
}
