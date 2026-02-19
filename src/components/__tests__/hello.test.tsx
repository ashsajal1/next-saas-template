import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

function Hello({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}

test('renders greeting', () => {
  render(<Hello name="Vitest" />)
  expect(screen.getByRole('heading', { name: 'Hello, Vitest!' })).toBeDefined()
})
