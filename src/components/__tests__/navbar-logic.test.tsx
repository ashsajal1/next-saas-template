import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn()
}))

// Mock next/link
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>{children}</a>
    )
  }
})

// Mock SheetClose
vi.mock('@/components/ui/sheet', () => ({
  SheetClose: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}))

import { usePathname } from 'next/navigation'
import NavbarLogic from '../navbar-logic'

describe('NavbarLogic component', () => {
  it('should render all navigation links', () => {
    vi.mocked(usePathname).mockReturnValue('/')
    
    render(<NavbarLogic />)
    
    expect(screen.getByText('Products')).toBeDefined()
    expect(screen.getByText('Features')).toBeDefined()
    expect(screen.getByText('Use Cases')).toBeDefined()
    expect(screen.getByText('Pricing')).toBeDefined()
  })

  it('should highlight active link', () => {
    vi.mocked(usePathname).mockReturnValue('/products')
    
    const { container } = render(<NavbarLogic />)
    
    const activeLink = container.querySelector('a[href="/products"]')
    expect(activeLink?.className).toContain('font-semibold')
  })

  it('should apply custom className', () => {
    vi.mocked(usePathname).mockReturnValue('/')
    
    const { container } = render(<NavbarLogic className="custom-class" />)
    
    expect(container.querySelector('.custom-class')).toBeDefined()
  })

  it('should render links with correct hrefs', () => {
    vi.mocked(usePathname).mockReturnValue('/')
    
    const { container } = render(<NavbarLogic />)
    
    expect(container.querySelector('a[href="/products"]')).toBeDefined()
    expect(container.querySelector('a[href="/features"]')).toBeDefined()
    expect(container.querySelector('a[href="/use-cases"]')).toBeDefined()
    expect(container.querySelector('a[href="/pricing"]')).toBeDefined()
  })
})
