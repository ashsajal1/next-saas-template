import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('Server Actions Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('setRole Action', () => {
    it('should have correct action structure', async () => {
      const actions = await import('@/app/(admin)/admin/@users/actions')
      
      expect(actions.setRole).toBeDefined()
      expect(typeof actions.setRole).toBe('function')
    })

    it('should check admin role before updating', async () => {
      vi.doMock('@/lib/roles', () => ({
        checkRole: vi.fn().mockReturnValue(false)
      }))

      const { setRole } = await import('@/app/(admin)/admin/@users/actions')
      const result = await setRole('user-123', 'admin')

      expect(result).toEqual({ message: 'Not Authorized' })
    })

    it('should allow admin to update user role', async () => {
      vi.doMock('@/lib/roles', () => ({
        checkRole: vi.fn().mockReturnValue(true)
      }))

      vi.doMock('@clerk/nextjs/server', () => ({
        clerkClient: vi.fn(() => ({
          users: {
            getUser: vi.fn().mockResolvedValue({
              publicMetadata: { role: 'user' }
            }),
            updateUser: vi.fn().mockResolvedValue({
              publicMetadata: { role: 'admin' }
            })
          }
        }))
      }))

      vi.doMock('next/cache', () => ({
        revalidatePath: vi.fn()
      }))

      const { setRole } = await import('@/app/(admin)/admin/@users/actions')
      const result = await setRole('user-123', 'admin')

      expect(result).toEqual({ message: { role: 'admin' } })
    })

    it('should handle errors gracefully', async () => {
      vi.doMock('@/lib/roles', () => ({
        checkRole: vi.fn().mockReturnValue(true)
      }))

      const error = new Error('User not found')
      vi.doMock('@clerk/nextjs/server', () => ({
        clerkClient: vi.fn(() => ({
          users: {
            getUser: vi.fn().mockRejectedValue(error)
          }
        }))
      }))

      const { setRole } = await import('@/app/(admin)/admin/@users/actions')
      const result = await setRole('user-123', 'admin')

      expect(result).toHaveProperty('message')
    })
  })
})
