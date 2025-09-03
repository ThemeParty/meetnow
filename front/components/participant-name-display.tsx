'use client'

import { useEffect, useState } from 'react'

interface ParticipantNameDisplayProps {
    meetingId: string
    className?: string
    showEditButton?: boolean
    onNameChange?: (name: string) => void
}

export function ParticipantNameDisplay({
    meetingId,
    className = '',
    showEditButton = false,
    onNameChange
}: ParticipantNameDisplayProps) {
    const [participantName, setParticipantName] = useState<string>('')
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState('')

    useEffect(() => {
        const savedName = localStorage.getItem(`participant-name-${meetingId}`)
        if (savedName) {
            setParticipantName(savedName)
            setEditName(savedName)
        }
    }, [meetingId])

    const handleEdit = () => {
        setIsEditing(true)
        setEditName(participantName)
    }

    const handleSave = () => {
        const trimmedName = editName.trim()
        if (trimmedName) {
            setParticipantName(trimmedName)
            localStorage.setItem(`participant-name-${meetingId}`, trimmedName)
            setIsEditing(false)
            onNameChange?.(trimmedName)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditName(participantName)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault()
            handleSave()
        } else if (e.key === 'Escape') {
            handleCancel()
        }
    }

    if (isEditing) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    autoFocus
                    maxLength={20}
                />
                <button
                    onClick={handleSave}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    저장
                </button>
                <button
                    onClick={handleCancel}
                    className="text-sm text-gray-600 hover:text-gray-800"
                >
                    취소
                </button>
            </div>
        )
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-sm font-medium">
                {participantName || '이름 미입력'}
            </span>
            {showEditButton && (
                <button
                    onClick={handleEdit}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    수정
                </button>
            )}
        </div>
    )
}
