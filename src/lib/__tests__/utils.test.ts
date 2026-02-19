import { describe, expect, it } from 'vitest'
import { cn } from '../utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base active')
  })

  it('should filter out falsy values', () => {
    const result = cn('class1', false && 'hidden', null, undefined, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should merge tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toBe('py-1 px-4')
  })

  it('should handle object syntax', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true
    })
    expect(result).toBe('class1 class3')
  })

  it('should handle empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle nested arrays', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })
})
