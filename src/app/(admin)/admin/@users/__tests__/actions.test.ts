import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock the dependencies
vi.mock('@/lib/roles', () => ({
  checkRole: vi.fn()
}))

const mockUsersGetUser = vi.fn()
const mockUsersUpdateUser = vi.fn()

vi.mock('@clerk/nextjs/server', () => ({
  clerkClient: vi.fn(() => ({
    users: {
      getUser: mockUsersGetUser,
      updateUser: mockUsersUpdateUser
    }
  }))
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))

import { checkRole } from '@/lib/roles'
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
    mockUsersGetUser.mockResolvedValue({
      publicMetadata: { role: 'user' }
    } as any)
    mockUsersUpdateUser.mockResolvedValue({} as any)

    await setRole('user-123', 'moderator')

    expect(mockUsersUpdateUser).toHaveBeenCalledWith('user-123', {
      publicMetadata: { role: 'user' }
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })

  it('should update user role when user is admin', async () => {
    vi.mocked(checkRole).mockReturnValue(true)
    mockUsersGetUser.mockResolvedValue({
      publicMetadata: { role: 'user' }
    } as any)
    mockUsersUpdateUser.mockResolvedValue({
      publicMetadata: { role: 'admin' }
    } as any)

    const result = await setRole('user-123', 'admin')

    expect(mockUsersUpdateUser).toHaveBeenCalledWith('user-123', {
      publicMetadata: { role: 'admin' }
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(result).toEqual({ message: { role: 'admin' } })
  })

  it('should handle errors gracefully', async () => {
    vi.mocked(checkRole).mockReturnValue(true)
    mockUsersGetUser.mockRejectedValue(new Error('User not found'))

    const result = await setRole('user-123', 'admin')

    expect(result).toEqual({ message: expect.any(Error) })
  })

  it('should get current user role before updating', async () => {
    vi.mocked(checkRole).mockReturnValue(true)
    mockUsersGetUser.mockResolvedValue({
      publicMetadata: { role: 'moderator' }
    } as any)
    mockUsersUpdateUser.mockResolvedValue({
      publicMetadata: { role: 'user' }
    } as any)

    await setRole('user-123', 'moderator')

    expect(mockUsersGetUser).toHaveBeenCalledWith('user-123')
  })
})
