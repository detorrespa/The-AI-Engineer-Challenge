export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false
  
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('demo') === '1'
}

export function getDemoUrl(): string {
  if (typeof window === 'undefined') return ''
  
  const url = new URL(window.location.href)
  url.searchParams.set('demo', '1')
  return url.toString()
}

export function getNormalUrl(): string {
  if (typeof window === 'undefined') return ''
  
  const url = new URL(window.location.href)
  url.searchParams.delete('demo')
  return url.toString()
}
