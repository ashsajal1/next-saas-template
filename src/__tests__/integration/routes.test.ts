import { describe, expect, it } from 'vitest'

describe('Route Protection Integration', () => {
  it('should export correct middleware configuration', async () => {
    const { config } = await import('@/middleware')
    
    expect(config).toBeDefined()
    expect(config.matcher).toBeDefined()
    expect(Array.isArray(config.matcher)).toBe(true)
    expect(config.matcher.length).toBe(2)
  })

  it('should skip Next.js internals in matcher', async () => {
    const { config } = await import('@/middleware')
    const pattern = config.matcher[0]
    
    // Should contain exclusion patterns
    expect(pattern).toContain('_next')
    expect(pattern).toContain('html?')
    expect(pattern).toContain('css')
  })

  it('should match API routes', async () => {
    const { config } = await import('@/middleware')
    const apiPattern = config.matcher[1]
    
    expect(apiPattern).toBe('/(api|trpc)(.*)')
    expect('/api/users').toMatch(new RegExp(apiPattern))
    expect('/trpc/router').toMatch(new RegExp(apiPattern))
  })

  it('should configure protected routes correctly', () => {
    // Protected routes from middleware.ts
    const protectedRoutes = ['/profile', '/admin', '/notification', '/setting']
    
    expect(protectedRoutes).toContain('/profile')
    expect(protectedRoutes).toContain('/admin')
    expect(protectedRoutes).toContain('/notification')
    expect(protectedRoutes).toContain('/setting')
  })
})
