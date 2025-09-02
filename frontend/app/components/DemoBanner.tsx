'use client'

import React from 'react'
import styled from 'styled-components'

const DemoBannerContainer = styled.div`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #00ff00;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 20px;
  text-align: center;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
`

const DemoBannerTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const DemoBannerText = styled.div`
  opacity: 0.8;
  font-size: 12px;
`

export default function DemoBanner() {
  return (
    <DemoBannerContainer>
      <DemoBannerTitle>Demo Mode Active</DemoBannerTitle>
      <DemoBannerText>
        Using temporary server key • Limited usage • No API key required
      </DemoBannerText>
    </DemoBannerContainer>
  )
}
