'use client'

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

interface InputAreaProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #00ff00;
  background: rgba(0, 0, 0, 0.9);
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff00;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  
  &:focus-within {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
    border-color: #00cc00;
  }
`

const Prompt = styled.span`
  color: #00ff00;
  font-weight: bold;
  font-size: 14px;
  user-select: none;
`

const Input = styled.textarea<{ disabled?: boolean }>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  min-height: 20px;
  max-height: 120px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &::placeholder {
    color: #00aa00;
    opacity: 0.7;
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #00cc00;
  }
`

const SendButton = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.1)'};
  border: 1px solid ${props => props.disabled ? '#666666' : '#00ff00'};
  color: ${props => props.disabled ? '#666666' : '#00ff00'};
  padding: 8px 16px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: rgba(0, 255, 0, 0.2);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`

const HelpText = styled.div`
  margin-top: 8px;
  font-size: 11px;
  color: #00aa00;
  opacity: 0.7;
  text-align: center;
`

export default function InputArea({ onSendMessage, disabled = false }: InputAreaProps) {
  const [inputValue, setInputValue] = useState('')
  const [inputHeight, setInputHeight] = useState(20)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 20), 120)
    setInputHeight(newHeight)
    textarea.style.height = `${newHeight}px`
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
    
    // Ctrl+C to clear input
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      setInputValue('')
      setInputHeight(20)
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || disabled) return
    
    onSendMessage(inputValue)
    setInputValue('')
    setInputHeight(20)
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = '20px'
    }
  }

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus()
    }
  }, [disabled])

  return (
    <InputContainer>
      <InputWrapper>
        <Prompt>$</Prompt>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje aquí..."
          disabled={disabled}
          style={{ height: `${inputHeight}px` }}
        />
        <SendButton 
          onClick={handleSendMessage} 
          disabled={disabled || !inputValue.trim()}
        >
          ENVIAR
        </SendButton>
      </InputWrapper>
      
      <HelpText>
        ENTER para enviar • SHIFT+ENTER para nueva línea • CTRL+C para limpiar
      </HelpText>
    </InputContainer>
  )
}
