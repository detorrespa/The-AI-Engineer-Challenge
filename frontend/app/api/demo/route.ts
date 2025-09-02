import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface DemoRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
  model?: string
}

export async function POST(req: NextRequest) {
  // Verificar que la key de demo esté configurada
  if (!process.env.DEMO_OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Demo mode is currently disabled' }, 
      { status: 403 }
    )
  }

  try {
    const { messages, model = 'gpt-4o-mini' } = await req.json() as DemoRequest

    // Validaciones de seguridad
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' }, 
        { status: 400 }
      )
    }

    // Limitar número de mensajes y caracteres totales
    if (messages.length > 12) {
      return NextResponse.json(
        { error: 'Too many messages (max 12)' }, 
        { status: 400 }
      )
    }

    const totalChars = messages.reduce((sum, msg) => sum + (msg.content?.length || 0), 0)
    if (totalChars > 2000) {
      return NextResponse.json(
        { error: 'Message too long (max 2000 chars total)' }, 
        { status: 400 }
      )
    }

    // Validar estructura de mensajes
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        return NextResponse.json(
          { error: 'Invalid message format' }, 
          { status: 400 }
        )
      }
    }

    // Llamar a OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEMO_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 1000,
        stream: false
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenAI API error:', data)
      return NextResponse.json(
        { 
          error: data?.error?.message || 'OpenAI API error',
          details: data?.error?.type || 'unknown'
        }, 
        { status: response.status }
      )
    }

    // Retornar respuesta estándar de Chat Completions
    return NextResponse.json(data)

  } catch (error) {
    console.error('Demo API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
