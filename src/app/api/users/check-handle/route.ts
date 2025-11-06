import { NextRequest, NextResponse } from 'next/server'
import * as usersApi from '@/lib/api/users'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const handle = searchParams.get('handle')
    
    if (!handle) {
      return NextResponse.json({ error: 'Handle is required' }, { status: 400 })
    }
    
    const isAvailable = await usersApi.checkHandleAvailability(handle)
    
    return NextResponse.json({ available: isAvailable })
  } catch (error) {
    console.error('Error in GET /api/users/check-handle:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

