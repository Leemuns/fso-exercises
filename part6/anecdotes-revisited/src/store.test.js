import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    update: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [] })
  vi.clearAllMocks()
})

describe('anecdote store hooks', () => {
  it('initialize anecdotes from backend', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test anecdote.', votes: 4 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toStrictEqual(mockAnecdotes)
  })

  it('components receive anecdotes sorted by votes', async () => {
    const anecdotes = [
      { id: 1, content: 'Test anecdote.', votes: 4 },
      { id: 2, content: 'Boring anecdote.', votes: 2 },
      { id: 3, content: 'Interesting anecdote.', votes: 7 }
    ]
    useAnecdoteStore.setState({ anecdotes })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toStrictEqual(anecdotes.toSorted((a, b) => b.votes - a.votes))
  })

  it('voting an anecdote increases its number of votes', async () => {
    const anecdotes = [{ id: 1, content: 'Test anecdote.', votes: 4 }]
    useAnecdoteStore.setState({ anecdotes })
    
    const mockAnecdote = anecdotes[0]
    anecdoteService.update.mockResolvedValue({ ...mockAnecdote, votes: mockAnecdote.votes + 1 })

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.vote(1)
    })
    expect(useAnecdoteStore.getState().anecdotes[0].votes).toStrictEqual(anecdotes[0].votes + 1)

  })

  describe('useAnecdote filtering', () => {
    const anecdotes = [
      { id: 1, content: 'Test anecdote.', votes: 4 },
      { id: 2, content: 'Test Boring anecdote.', votes: 2 },
      { id: 3, content: 'Interesting anecdote.', votes: 7 }
    ]

    beforeEach(() => {
      useAnecdoteStore.setState({ anecdotes })
    })

    it('returns all anecdotes with no filter', () => {
      const { result } = renderHook(() => useAnecdotes())
      expect(result.current).toHaveLength(3)
    })

    it('filters test anecdotes', () => {
      useAnecdoteStore.setState({ filter: 'test' })
      const { result } = renderHook(() => useAnecdotes())
      expect(result.current).toHaveLength(2)
      expect(result.current).toContainEqual(anecdotes[0])
      expect(result.current).toContainEqual(anecdotes[1])
      expect(result.current).not.toContainEqual([anecdotes[2]])
    })
  })
})