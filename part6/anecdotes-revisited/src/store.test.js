import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.getState().actions.initialize()
})

describe('anecdote store', () => {
  it('initialize anecdotes from backend', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test anecdote.', votes: 4 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toStrictEqual(mockAnecdotes)
  })
})