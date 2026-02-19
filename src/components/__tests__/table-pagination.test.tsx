import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DataTablePagination } from '../table-pagination'

describe('DataTablePagination component', () => {
  const createMockTable = (overrides = {}) => ({
    getFilteredSelectedRowModel: vi.fn(() => ({ rows: [] })),
    getFilteredRowModel: vi.fn(() => ({ rows: { length: 100 } })),
    getState: vi.fn(() => ({ 
      pagination: { pageIndex: 0, pageSize: 10 } 
    })),
    getPageCount: vi.fn(() => 10),
    setPageSize: vi.fn(),
    setPageIndex: vi.fn(),
    getCanPreviousPage: vi.fn(() => false),
    getCanNextPage: vi.fn(() => true),
    previousPage: vi.fn(),
    nextPage: vi.fn(),
    ...overrides
  })

  it('should render pagination info', () => {
    const table = createMockTable()
    
    const { container } = render(
      <DataTablePagination table={table as any} />
    )
    
    expect(container.textContent).toContain('0 of 100 row(s) selected')
  })

  it('should render page info', () => {
    const table = createMockTable()
    
    const { container } = render(
      <DataTablePagination table={table as any} />
    )
    
    expect(container.textContent).toContain('Page 1 of 10')
  })

  it('should render rows per page selector', () => {
    const table = createMockTable()
    
    const { container } = render(
      <DataTablePagination table={table as any} />
    )
    
    expect(container.textContent).toContain('Rows per page')
  })

  it('should render navigation buttons', () => {
    const table = createMockTable()
    
    const { container } = render(
      <DataTablePagination table={table as any} />
    )
    
    // Check for buttons (first, previous, next, last)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })
})
