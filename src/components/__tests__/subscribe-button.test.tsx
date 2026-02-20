import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SubscribeButton } from '../subscribe-button'

// Mock fetch
global.fetch = vi.fn()

describe('SubscribeButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render button with children', () => {
    render(
      <SubscribeButton plan="professional" interval="month">
        Subscribe Now
      </SubscribeButton>
    )

    expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
  })

  it('should show loading state when clicked', async () => {
    vi.mocked(fetch).mockImplementation(() => 
      new Promise(() => {}) // Never resolves
    )

    render(
      <SubscribeButton plan="professional" interval="month">
        Subscribe Now
      </SubscribeButton>
    )

    const button = screen.getByText('Subscribe Now')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  it('should redirect to Stripe checkout on success', async () => {
    const mockWindowLocation = { href: '' }
    Object.defineProperty(window, 'location', {
      value: mockWindowLocation,
      writable: true,
    })

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'https://checkout.stripe.com/test' }),
    } as Response)

    render(
      <SubscribeButton plan="professional" interval="month">
        Subscribe Now
      </SubscribeButton>
    )

    const button = screen.getByText('Subscribe Now')
    fireEvent.click(button)

    await waitFor(() => {
      expect(window.location.href).toBe('https://checkout.stripe.com/test')
    })
  })

  it('should show alert on API error', async () => {
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Invalid plan' }),
    } as Response)

    render(
      <SubscribeButton plan="professional" interval="month">
        Subscribe Now
      </SubscribeButton>
    )

    const button = screen.getByText('Subscribe Now')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Invalid plan')
    })
  })

  it('should call fetch with correct parameters', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'https://checkout.stripe.com/test' }),
    } as Response)

    render(
      <SubscribeButton plan="business" interval="year">
        Subscribe Now
      </SubscribeButton>
    )

    const button = screen.getByText('Subscribe Now')
    fireEvent.click(button)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: 'business', interval: 'year' }),
      })
    })
  })
})
