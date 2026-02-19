import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock the dependencies
vi.mock('@/lib/roles', () => ({
  checkRole: vi.fn()
}))

vi.mock('@clerk/nextjs/server', () => ({
  clerkClient: {
    users: {
      getUser: vi.fn(),
      updateUser: vi.fn()
    }
  }
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))

import { checkRole } from '@/lib/roles'
import { clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { setRole } from '../actions'

describe('setRole action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return not authorized message when user is not admin', async () => {
    vi.mocked(checkRole).mockReturnValue(false)

    const result = await setRole('user-123', 'admin')

    expect(result).toEqual({ message: 'Not Authorized' })
    expect(checkRole).toHaveBeenCalledWith('admin')
  })

  it('should update user role to user when moderator is passed', async () => {
    vi.mocked(checkRole).mockReturnValue(true)
    vi.mocked(clerkClient.users.getUser).mockResolvedValue({
      publicMetadata: { role: 'user' }
    } as any)
    vi.mocked(clerkClient.users.updateUser).mockResolvedValue({} as any)

    await setRole('user-123', 'moderator')

    expect(clerkClient.users.updateUser).toHaveBeenCalledWith('user-123', {
      publicMetadata: { role: 'user' }
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })

  it('should update user role when user is admin', async () => {
    vi.mocked(checkRole).mockReturnValue(true)
    vi.mocked(clerkClient.users.getUser).mockResolvedValue({
      publicMetadata: { role: 'user' }
    } as any)
    vi.mocked(clerkClient.users.updateUser).mockResolvedValue({
      publicMetadata: { role: 'admin' }
    } as any)

    const result = await setRole('user-123', 'admin')

    expect(clerkClient.users.updateUser).toHaveBeenCalledWith('user-123', {
      publicMetadata: { role: 'admin' }
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(result).toEqual({ message: { role: 'admin' } })
  })

  it('should handle errors gracefully', async () => {
    vi.mocked(checkRole).mockReturnValue(true)
    vi.mocked(clerkClient.users.getUser).mockRejectedValue(new Error('User not found'))

    const result = await setRole('user-123', 'admin')

    expect(result).toEqual({ message: expect.any(Error) })
  })

  it('should get current user role before updating', async () => {
    vi.mocked(checkRole).mockReturnValue(true)
    vi.mocked(clerkClient.users.getUser).mockResolvedValue({
      publicMetadata: { role: 'moderator' }
    } as any)
    vi.mocked(clerkClient.users.updateUser).mockResolvedValue({
      publicMetadata: { role: 'user' }
    } as any)

    await setRole('user-123', 'moderator')

    expect(clerkClient.users.getUser).toHaveBeenCalledWith('user-123')
  })
})
