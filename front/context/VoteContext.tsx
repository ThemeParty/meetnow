"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface VoteContextType {
  selectedTimes: string[]
  selectedPlaces: string[]
  setSelectedTimes: (times: string[]) => void
  setSelectedPlaces: (places: string[]) => void
  toggleTime: (timeId: string) => void
  togglePlace: (placeId: string) => void
  clearVotes: () => void
}

const VoteContext = createContext<VoteContextType | undefined>(undefined)

export function VoteProvider({ children }: { children: React.ReactNode }) {
  const { meetingId } = useParams() as { meetingId: string }
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([])

  const toggleTime = (timeId: string) => {
    setSelectedTimes((prev) =>
      prev.includes(timeId) ? prev.filter((id) => id !== timeId) : [...prev, timeId],
    )
  }

  const togglePlace = (placeId: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId],
    )
  }

  const clearVotes = () => {
    setSelectedTimes([])
    setSelectedPlaces([])
  }

  // Store votes in localStorage when they change
  useEffect(() => {
    if (!meetingId) return
    
    const saveVotes = () => {
      localStorage.setItem(
        `votes-${meetingId}`,
        JSON.stringify({ times: selectedTimes, places: selectedPlaces })
      )
    }

    saveVotes()
  }, [meetingId, selectedTimes, selectedPlaces])

  // Load votes from localStorage when component mounts
  useEffect(() => {
    if (!meetingId) return

    const savedVotes = localStorage.getItem(`votes-${meetingId}`)
    if (savedVotes) {
      const { times, places } = JSON.parse(savedVotes)
      setSelectedTimes(times)
      setSelectedPlaces(places)
    }
  }, [meetingId])

  return (
    <VoteContext.Provider
      value={{
        selectedTimes,
        selectedPlaces,
        setSelectedTimes,
        setSelectedPlaces,
        toggleTime,
        togglePlace,
        clearVotes,
      }}
    >
      {children}
    </VoteContext.Provider>
  )
}

export function useVote() {
  const context = useContext(VoteContext)
  if (context === undefined) {
    throw new Error('useVote must be used within a VoteProvider')
  }
  return context
}
