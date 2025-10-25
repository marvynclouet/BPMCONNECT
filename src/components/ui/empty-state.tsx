import React from 'react'
import { Button } from '@/components/ui/button'
import { EmptyStateIllustration, MessagesIllustration, CollaborationIllustration } from './illustrations'

interface EmptyStateProps {
  type?: 'messages' | 'collaborations' | 'projects' | 'default'
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const EmptyState = ({ 
  type = 'default',
  title, 
  description, 
  actionLabel, 
  onAction,
  className = ""
}: EmptyStateProps) => {
  const getIllustration = () => {
    switch (type) {
      case 'messages':
        return <MessagesIllustration className="text-muted-foreground" size={150} />
      case 'collaborations':
        return <CollaborationIllustration className="text-muted-foreground" size={150} />
      default:
        return <EmptyStateIllustration className="text-muted-foreground" size={150} />
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}>
      <div className="mb-6">
        {getIllustration()}
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
