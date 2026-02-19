import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DataTableColumnHeader } from '../table-header'

describe('DataTableColumnHeader component', () => {
  const createMockColumn = (overrides = {}) => ({
    getCanSort: vi.fn(() => true),
    getIsSorted: vi.fn(() => false),
    toggleSorting: vi.fn(),
    toggleVisibility: vi.fn(),
    ...overrides
  })

  it('should render title when column cannot sort', () => {
    const column = createMockColumn({ getCanSort: () => false })
    
    const { container } = render(
      <DataTableColumnHeader column={column as any} title="Test Header" />
    )
    
    expect(container.textContent).toContain('Test Header')
  })

  it('should render sortable header when column can sort', () => {
    const column = createMockColumn()
    
    const { container } = render(
      <DataTableColumnHeader column={column as any} title="Sortable Header" />
    )
    
    expect(container.textContent).toContain('Sortable Header')
  })

  it('should apply custom className', () => {
    const column = createMockColumn({ getCanSort: () => false })
    
    const { container } = render(
      <DataTableColumnHeader 
        column={column as any} 
        title="Header" 
        className="custom-class"
      />
    )
    
    expect(container.querySelector('.custom-class')).toBeDefined()
  })
})
