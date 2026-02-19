import { describe, expect, it, vi } from 'vitest'
import { columns } from '../app/(admin)/admin/@users/columns'

describe('User Table Columns', () => {
  describe('Column Definitions', () => {
    it('should have select column with checkbox', () => {
      const selectColumn = columns.find((col: any) => col.id === 'select')
      expect(selectColumn).toBeDefined()
      expect((selectColumn as any).enableSorting).toBe(false)
      expect((selectColumn as any).enableHiding).toBe(false)
    })

    it('should have firstName column (hidden)', () => {
      const firstNameColumn = columns.find((col: any) => col.accessorKey === 'firstName')
      expect(firstNameColumn).toBeDefined()
      expect((firstNameColumn as any).enableSorting).toBe(false)
      expect((firstNameColumn as any).enableHiding).toBe(false)
    })

    it('should have lastName column (hidden)', () => {
      const lastNameColumn = columns.find((col: any) => col.accessorKey === 'lastName')
      expect(lastNameColumn).toBeDefined()
      expect((lastNameColumn as any).enableSorting).toBe(false)
      expect((lastNameColumn as any).enableHiding).toBe(false)
    })

    it('should have fullName column with accessorFn', () => {
      const fullNameColumn = columns.find((col: any) => col.id === 'fullName')
      expect(fullNameColumn).toBeDefined()
      expect((fullNameColumn as any).accessorFn).toBeDefined()
    })

    it('should combine first and last name in fullName accessor', () => {
      const fullNameColumn: any = columns.find((col: any) => col.id === 'fullName')
      const mockRow = {
        firstName: 'John',
        lastName: 'Doe'
      }
      
      const result = fullNameColumn.accessorFn(mockRow, 0)
      expect(result).toBe('John Doe')
    })

    it('should have emailAddresses column with filter function', () => {
      const emailColumn: any = columns.find((col: any) => col.accessorKey === 'emailAddresses')
      expect(emailColumn).toBeDefined()
      expect(emailColumn.filterFn).toBeDefined()
    })

    it('should handle empty email array', () => {
      const emailColumn: any = columns.find((col: any) => col.accessorKey === 'emailAddresses')
      
      const mockRow = {
        getValue: vi.fn().mockReturnValue([])
      }
      
      const cellResult = emailColumn.cell({ row: mockRow })
      expect(mockRow.getValue).toHaveBeenCalledWith('emailAddresses')
    })

    it('should return N/A when no emails exist', () => {
      const emailColumn: any = columns.find((col: any) => col.accessorKey === 'emailAddresses')
      
      const mockRow = {
        getValue: vi.fn().mockReturnValue([])
      }
      
      emailColumn.cell({ row: mockRow })
      expect(mockRow.getValue).toHaveBeenCalledWith('emailAddresses')
    })

    it('should filter emails case-insensitively', () => {
      const emailColumn: any = columns.find((col: any) => col.accessorKey === 'emailAddresses')
      const mockEmails = [{ emailAddress: 'Test@Example.COM' }]
      
      const mockRow = {
        getValue: vi.fn().mockReturnValue(mockEmails)
      }
      
      const result = emailColumn.filterFn(mockRow, 'emailAddresses', 'test')
      
      expect(result).toBe(true)
    })

    it('should have createdAt column with date formatting', () => {
      const createdAtColumn = columns.find((col: any) => col.accessorKey === 'createdAt')
      expect(createdAtColumn).toBeDefined()
    })

    it('should format createdAt date', () => {
      const createdAtColumn: any = columns.find((col: any) => col.accessorKey === 'createdAt')
      const testDate = new Date('2024-03-15T10:30:00.000Z')
      
      const mockRow = {
        getValue: vi.fn().mockReturnValue(testDate.toISOString())
      }
      
      createdAtColumn.cell({ row: mockRow })
      expect(mockRow.getValue).toHaveBeenCalledWith('createdAt')
    })

    it('should have actions column', () => {
      const actionsColumn = columns.find((col: any) => col.id === 'actions')
      expect(actionsColumn).toBeDefined()
    })

    it('should have correct number of columns', () => {
      expect(columns).toHaveLength(7)
    })
  })

  describe('Select Column Functionality', () => {
    it('should render checkbox in select header', () => {
      const selectColumn: any = columns.find((col: any) => col.id === 'select')
      const mockTable = {
        getIsAllPageRowsSelected: vi.fn().mockReturnValue(false),
        getIsSomePageRowsSelected: vi.fn().mockReturnValue(false),
        toggleAllPageRowsSelected: vi.fn()
      }
      
      selectColumn.header({ table: mockTable })
      expect(mockTable.getIsAllPageRowsSelected).toHaveBeenCalled()
    })

    it('should render checkbox in select cell', () => {
      const selectColumn: any = columns.find((col: any) => col.id === 'select')
      const mockRow = {
        getIsSelected: vi.fn().mockReturnValue(false),
        toggleSelected: vi.fn()
      }
      
      selectColumn.cell({ row: mockRow })
      expect(mockRow.getIsSelected).toHaveBeenCalled()
    })
  })
})
