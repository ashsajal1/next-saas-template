import { describe, expect, it, vi } from 'vitest'

// Mock the auth function from Clerk
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn()
}))

import { auth } from '@clerk/nextjs/server'
import { checkRole } from '../roles'

describe('checkRole function', () => {
  it('should return true when user has the specified role', () => {
    vi.mocked(auth).mockReturnValue({
      sessionClaims: {
        metadata: {
          role: 'admin'
        }
      }
    } as any)

    const result = checkRole('admin')
    expect(result).toBe(true)
  })

  it('should return false when user has a different role', () => {
    vi.mocked(auth).mockReturnValue({
      sessionClaims: {
        metadata: {
          role: 'user'
        }
      }
    } as any)

    const result = checkRole('admin')
    expect(result).toBe(false)
  })

  it('should return false when sessionClaims is undefined', () => {
    vi.mocked(auth).mockReturnValue({
      sessionClaims: undefined
    } as any)

    const result = checkRole('admin')
    expect(result).toBe(false)
  })

  it('should throw error when metadata is undefined', () => {
    vi.mocked(auth).mockReturnValue({
      sessionClaims: {
        metadata: undefined
      }
    } as any)

    expect(() => checkRole('admin')).toThrow()
  })

  it('should return true for moderator role when user is moderator', () => {
    vi.mocked(auth).mockReturnValue({
      sessionClaims: {
        metadata: {
          role: 'moderator'
        }
      }
    } as any)

    const result = checkRole('moderator')
    expect(result).toBe(true)
  })

  it('should return false when user has no role', () => {
    vi.mocked(auth).mockReturnValue({
      sessionClaims: {
        metadata: {}
      }
    } as any)

    const result = checkRole('admin')
    expect(result).toBe(false)
  })
})
