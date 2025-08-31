'use client'

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import ChatMessage from './ChatMessage'
import InputArea from './InputArea'
import MatrixBackground from './MatrixBackground'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const TerminalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const TerminalHeader = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #00ff00;
  background: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TerminalTitle = styled.h1`
  color: #00ff00;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 0 10px #00ff00;
`

const TerminalStatus = styled.div`
  color: #00cc00;
  font-size: 12px;
`

const ChatContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const WelcomeMessage = styled.div`
  color: #00ff00;
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
  text-shadow: 0 0 5px #00ff00;
  
  h2 {
    margin-bottom: 10px;
    font-size: 24px;
  }
  
  p {
    margin: 5px 0;
    opacity: 0.8;
  }
`

const LoadingIndicator = styled.div`
  color: #00ff00;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #00ff00;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export default function Terminal() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Check backend connection on mount
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    setConnectionStatus('connecting')
    try {
      const response = await fetch('http://localhost:8000/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        setConnectionStatus('connected')
      } else {
        setConnectionStatus('disconnected')
      }
    } catch (error) {
      setConnectionStatus('disconnected')
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Prepare the request body according to the Pydantic model structure
      const requestBody = {
        developer_message: "Eres un asistente de IA útil y amigable. Responde de manera clara y concisa.",
        user_message: content.trim(),
        model: "gpt-4.1-mini",
        api_key: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "sk-proj-..." // Fallback for demo - replace with your actual key
      }

      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      let accumulatedContent = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        accumulatedContent += chunk

        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        )
      }

    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en http://localhost:8000'}`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return '● CONECTADO'
      case 'connecting':
        return '○ CONECTANDO...'
      case 'disconnected':
        return '○ DESCONECTADO'
      default:
        return '○ DESCONOCIDO'
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#00ff00'
      case 'connecting':
        return '#ffff00'
      case 'disconnected':
        return '#ff0000'
      default:
        return '#888888'
    }
  }

  return (
    <TerminalContainer>
      <MatrixBackground />
      
      <TerminalHeader>
        <TerminalTitle>MATRIX TERMINAL v1.0</TerminalTitle>
        <TerminalStatus style={{ color: getStatusColor() }}>
          {getStatusText()}
        </TerminalStatus>
      </TerminalHeader>

      <ChatContainer ref={chatContainerRef}>
        {messages.length === 0 && (
          <WelcomeMessage>
            <h2>Bienvenido al Matrix Terminal</h2>
            <p>Conectado al sistema de IA...</p>
            <p>Escribe tu mensaje y presiona ENTER para comenzar.</p>
            <p>Presiona CTRL+C para salir.</p>
          </WelcomeMessage>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <LoadingIndicator>
            Procesando respuesta...
          </LoadingIndicator>
        )}
      </ChatContainer>

      <InputArea onSendMessage={sendMessage} disabled={isLoading} />
    </TerminalContainer>
  )
}
