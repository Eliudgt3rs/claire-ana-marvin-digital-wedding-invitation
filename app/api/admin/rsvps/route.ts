import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'rsvps.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wedding2026'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    let rsvps = []
    try {
      const data = await fs.readFile(filePath, 'utf-8')
      rsvps = JSON.parse(data)
    } catch {
      rsvps = []
    }

    return NextResponse.json({ success: true, rsvps })
  } catch (error) {
    console.error('Error in admin API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
