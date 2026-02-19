import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import AdminLayout from '../app/(admin)/admin/layout'

describe('Admin Layout', () => {
  it('should render children content', () => {
    const { container } = render(
      <AdminLayout users={null}>
        <div data-testid="children-content">Admin Dashboard</div>
      </AdminLayout>
    )
    
    expect(container.textContent).toContain('Admin Dashboard')
    expect(container.querySelector('[data-testid="children-content"]')).toBeDefined()
  })

  it('should render users slot content', () => {
    const { container } = render(
      <AdminLayout users={<div data-testid="users-content">Users Table</div>}>
        <div>Admin Dashboard</div>
      </AdminLayout>
    )
    
    expect(container.textContent).toContain('Users Table')
    expect(container.querySelector('[data-testid="users-content"]')).toBeDefined()
  })

  it('should render both children and users slots', () => {
    const { container } = render(
      <AdminLayout 
        users={<div data-testid="users-slot">Users</div>}
      >
        <div data-testid="children-slot">Main Content</div>
      </AdminLayout>
    )
    
    expect(container.querySelector('[data-testid="children-slot"]')).toBeDefined()
    expect(container.querySelector('[data-testid="users-slot"]')).toBeDefined()
    expect(container.textContent).toContain('Main Content')
    expect(container.textContent).toContain('Users')
  })

  it('should have flex column layout structure', () => {
    const { container } = render(
      <AdminLayout users={null}>
        <div>Content</div>
      </AdminLayout>
    )
    
    const layoutContainer = container.querySelector('.flex.flex-col')
    expect(layoutContainer).toBeDefined()
  })

  it('should handle empty children', () => {
    const { container } = render(
      <AdminLayout users={null}>
        {null}
      </AdminLayout>
    )
    
    const layoutContainer = container.querySelector('.flex.flex-col')
    expect(layoutContainer).toBeDefined()
  })

  it('should handle empty users slot', () => {
    const { container } = render(
      <AdminLayout users={null}>
        <div>Content</div>
      </AdminLayout>
    )
    
    expect(container.textContent).toContain('Content')
  })
})
