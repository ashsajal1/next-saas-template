import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import HeroSection from '../hero-section'

describe('HeroSection component', () => {
  it('should render without crashing', () => {
    const { container } = render(<HeroSection />)
    expect(container).toBeDefined()
  })

  it('should contain section element', () => {
    const { container } = render(<HeroSection />)
    
    expect(container.querySelector('section')).toBeDefined()
  })

  it('should render main headline text in document', () => {
    const { container } = render(<HeroSection />)
    
    expect(container.textContent).toContain('Streamline Your Workflow')
  })

  it('should render CTA buttons', () => {
    const { container } = render(<HeroSection />)
    
    expect(container.textContent).toContain('Start Free Trial')
    expect(container.textContent).toContain('Watch Demo')
  })
})
