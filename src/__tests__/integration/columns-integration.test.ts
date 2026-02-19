import { describe, expect, it, vi } from 'vitest'

describe('Data Table Columns Integration', () => {
  it('should export columns array', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    expect(columns).toBeDefined()
    expect(Array.isArray(columns)).toBe(true)
    expect(columns.length).toBe(7)
  })

  it('should have select column', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    const selectColumn = columns.find((col: any) => col.id === 'select')
    expect(selectColumn).toBeDefined()
    expect(selectColumn?.enableSorting).toBe(false)
    expect(selectColumn?.enableHiding).toBe(false)
  })

  it('should have fullName column with accessorFn', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    const fullNameColumn: any = columns.find((col: any) => col.id === 'fullName')
    expect(fullNameColumn).toBeDefined()
    expect(fullNameColumn.accessorFn).toBeDefined()
    
    const result = fullNameColumn.accessorFn({ firstName: 'John', lastName: 'Doe' }, 0)
    expect(result).toBe('John Doe')
  })

  it('should have emailAddresses column with filter', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    const emailColumn: any = columns.find((col: any) => col.accessorKey === 'emailAddresses')
    expect(emailColumn).toBeDefined()
    expect(emailColumn.filterFn).toBeDefined()
  })

  it('should filter emails case-insensitively', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    const emailColumn: any = columns.find((col: any) => col.accessorKey === 'emailAddresses')
    
    const mockRow = {
      getValue: vi.fn().mockReturnValue([{ emailAddress: 'Test@Example.COM' }])
    }
    
    const result = emailColumn.filterFn(mockRow, 'emailAddresses', 'test')
    expect(result).toBe(true)
  })

  it('should have createdAt column', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    const createdAtColumn = columns.find((col: any) => col.accessorKey === 'createdAt')
    expect(createdAtColumn).toBeDefined()
  })

  it('should have actions column', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    const actionsColumn = columns.find((col: any) => col.id === 'actions')
    expect(actionsColumn).toBeDefined()
  })

  it('should have firstName and lastName hidden columns', async () => {
    const { columns } = await import('@/app/(admin)/admin/@users/columns')
    
    const firstNameColumn = columns.find((col: any) => col.accessorKey === 'firstName')
    const lastNameColumn = columns.find((col: any) => col.accessorKey === 'lastName')
    
    expect(firstNameColumn).toBeDefined()
    expect(lastNameColumn).toBeDefined()
    expect(firstNameColumn?.enableHiding).toBe(false)
    expect(lastNameColumn?.enableHiding).toBe(false)
  })
})
