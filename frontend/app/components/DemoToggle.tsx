'use client'

import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { isDemoMode, getDemoUrl, getNormalUrl } from '@/lib/demoMode'

const DemoToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const DemoToggleButton = styled.button<{ isDemo: boolean }>`
  background: ${props => props.isDemo ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 0, 0, 0.5)'};
  border: 1px solid ${props => props.isDemo ? '#00ff00' : '#00aa00'};
  color: ${props => props.isDemo ? '#00ff00' : '#00aa00'};
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isDemo ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 255, 0, 0.1)'};
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
`

const DemoBadge = styled.span`
  background: rgba(0, 255, 0, 0.2);
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DemoTooltip = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00ff00;
  border-radius: 6px;
  padding: 10px;
  font-size: 11px;
  color: #00cc00;
  white-space: nowrap;
  z-index: 1000;
  margin-top: 5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #00ff00;
  }
`

const DemoToggleWrapper = styled.div`
  position: relative;
  
  &:hover ${DemoTooltip} {
    opacity: 1;
    visibility: visible;
  }
`

export default function DemoToggle() {
  const router = useRouter()
  const demo = isDemoMode()

  const handleToggle = () => {
    const newUrl = demo ? getNormalUrl() : getDemoUrl()
    router.push(newUrl)
  }

  return (
    <DemoToggleContainer>
      <DemoToggleWrapper>
        <DemoToggleButton 
          onClick={handleToggle}
          isDemo={demo}
        >
          {demo ? 'Exit Demo' : 'Use Demo'}
        </DemoToggleButton>
        <DemoTooltip>
          Demo uses a temporary server key; limited usage
        </DemoTooltip>
      </DemoToggleWrapper>
      
      {demo && <DemoBadge>Demo</DemoBadge>}
    </DemoToggleContainer>
  )
}
