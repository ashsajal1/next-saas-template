import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({
    setTheme: vi.fn(),
    theme: 'light'
  }))
}))

import { ModeToggle } from '../mode-toggle'

describe('ModeToggle component', () => {
  it('should render without crashing', () => {
    const { container } = render(<ModeToggle />)
    
    expect(container).toBeDefined()
  })

  it('should render a button', () => {
    render(<ModeToggle />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should contain theme toggle text', () => {
    render(<ModeToggle />)
    
    const toggleTexts = screen.getAllByText('Toggle theme')
    expect(toggleTexts.length).toBeGreaterThan(0)
  })
})
