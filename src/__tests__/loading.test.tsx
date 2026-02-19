import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Loading from '../app/loading'

describe('Loading Component', () => {
  it('should render SaaSFlow brand name', () => {
    const { container } = render(<Loading />)
    
    expect(container.textContent).toContain('SaaSFlow')
  })

  it('should render loading message', () => {
    const { container } = render(<Loading />)
    
    expect(container.textContent).toContain('Loading your workspace...')
  })

  it('should render preparing dashboard text', () => {
    const { container } = render(<Loading />)
    
    expect(container.textContent).toContain('Preparing your dashboard')
  })

  it('should render tips section', () => {
    const { container } = render(<Loading />)
    
    expect(container.textContent).toContain('Did you know?')
    expect(container.textContent).toContain('Teams using SaaSFlow save')
  })

  it('should have progress bar structure', () => {
    const { container } = render(<Loading />)
    
    const progressBar = container.querySelector('.animate-loading-bar')
    expect(progressBar).toBeDefined()
  })

  it('should have spinning animation element', () => {
    const { container } = render(<Loading />)
    
    const spinningElement = container.querySelector('[style*="animationDuration"]')
    expect(spinningElement).toBeDefined()
  })

  it('should render with min-h-screen class', () => {
    const { container } = render(<Loading />)
    
    const containerElement = container.querySelector('.min-h-screen')
    expect(containerElement).toBeDefined()
  })

  it('should render Zap icon', () => {
    const { container } = render(<Loading />)
    
    const zapIcon = container.querySelector('[data-lucide="zap"]')
    expect(zapIcon).toBeDefined()
  })

  it('should render Loader2 icon', () => {
    const { container } = render(<Loading />)
    
    const loaderIcon = container.querySelector('[data-lucide="loader-2"]')
    expect(loaderIcon).toBeDefined()
  })
})
