'use client'

import React from 'react'
import styled from 'styled-components'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin: 10px 0;
`

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${props => props.isUser ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 255, 0, 0.05)'};
  border: 1px solid ${props => props.isUser ? '#00ff00' : '#00cc00'};
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 0 10px ${props => props.isUser ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 255, 0, 0.1)'};
  
  &:hover {
    box-shadow: 0 0 15px ${props => props.isUser ? 'rgba(0, 255, 0, 0.5)' : 'rgba(0, 255, 0, 0.2)'};
  }
`

const MessageHeader = styled.div<{ isUser: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: ${props => props.isUser ? '#00cc00' : '#00aa00'};
`

const MessageType = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`

const MessageTime = styled.span`
  opacity: 0.7;
`

const MessageContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  
  /* Matrix-style text effects */
  text-shadow: 0 0 2px #00ff00;
  
  /* Code block styling */
  pre {
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 4px;
    border-left: 3px solid #00ff00;
    margin: 10px 0;
    overflow-x: auto;
  }
  
  code {
    background: rgba(0, 0, 0, 0.3);
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
  
  /* Link styling */
  a {
    color: #00ffff;
    text-decoration: underline;
    
    &:hover {
      color: #ffffff;
      text-shadow: 0 0 5px #00ffff;
    }
  }
`

const TypingIndicator = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #00ff00;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 10px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user'
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getMessageTypeText = () => {
    return isUser ? 'USUARIO' : 'SISTEMA'
  }

  return (
    <MessageContainer isUser={isUser}>
      <MessageBubble isUser={isUser}>
        <MessageHeader isUser={isUser}>
          <MessageType>{getMessageTypeText()}</MessageType>
          <span>|</span>
          <MessageTime>{formatTime(message.timestamp)}</MessageTime>
        </MessageHeader>
        
        <MessageContent>
          {message.content || (
            <span>
              Procesando...
              <TypingIndicator />
            </span>
          )}
        </MessageContent>
      </MessageBubble>
    </MessageContainer>
  )
}
