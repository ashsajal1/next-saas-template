import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Error from '../app/error'

describe('Error Boundary Component', () => {
  it('should render error card', () => {
    const { container } = render(<Error />)
    
    expect(container.textContent).toContain('An unexpectd error occurred!')
  })

  it('should render within a card structure', () => {
    const { container } = render(<Error />)
    
    const cardTitle = container.querySelector('h3')
    expect(cardTitle).toBeDefined()
    expect(cardTitle?.textContent).toBe('An unexpectd error occurred!')
  })

  it('should have card element', () => {
    const { container } = render(<Error />)
    
    const card = container.querySelector('[class*="card"]')
    expect(card).toBeDefined()
  })
})
