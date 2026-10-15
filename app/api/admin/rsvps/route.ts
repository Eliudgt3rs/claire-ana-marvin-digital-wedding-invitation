import { NextResponse } from 'next/server'
import { getRsvps } from '@/lib/rsvp-store'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wedding2026'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const rsvps = await getRsvps()

    return NextResponse.json({ success: true, rsvps })
  } catch (error) {
    console.error('Error in admin API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
