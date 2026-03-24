import React, { useState, useEffect } from "react"
import { Wand2, X, Check } from "lucide-react"

import type { EnhancementResult } from "../promptService"

interface EnhancementPanelProps {
  enhancement: EnhancementResult | null
  isLoading: boolean
  onApply: (enhancedText: string) => void
  onDismiss: () => void
}

export const EnhancementPanel: React.FC<EnhancementPanelProps> = ({
  enhancement,
  isLoading,
  onApply,
  onDismiss
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Force close the panel when the enhancement is cleared (e.g., after Apply)
  useEffect(() => {
    if (!enhancement) {
      setIsOpen(false)
    }
  }, [enhancement])

  if (!enhancement && !isLoading) {
    return null
  }

  return (
    <div className="plasmo-absolute plasmo-bottom-full plasmo-mb-2 plasmo-right-0 plasmo-z-50 plasmo-flex plasmo-flex-col plasmo-items-end">
      {isOpen && enhancement && (
        <div className="plasmo-bg-white plasmo-shadow-lg plasmo-rounded-xl plasmo-p-4 plasmo-mb-2 plasmo-w-80 plasmo-border plasmo-border-slate-200 plasmo-text-slate-800">
          <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-mb-2">
            <div className="plasmo-flex plasmo-items-center plasmo-gap-2">
              <Wand2 className="plasmo-w-4 plasmo-h-4 plasmo-text-blue-500" />
              <span className="plasmo-font-semibold plasmo-text-sm">
                Enhance Prompt ({enhancement.category})
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="plasmo-text-slate-400 hover:plasmo-text-slate-600 plasmo-transition-colors">
              <X className="plasmo-w-4 plasmo-h-4" />
            </button>
          </div>
          
          <div className="plasmo-text-sm plasmo-text-slate-600 plasmo-bg-slate-50 plasmo-p-3 plasmo-rounded-lg plasmo-mb-3 plasmo-max-h-40 plasmo-overflow-y-auto">
            {enhancement.enhanced}
          </div>
          
          <div className="plasmo-flex plasmo-gap-2">
            <button
              onClick={() => onApply(enhancement.enhanced)}
              className="plasmo-flex-1 plasmo-bg-blue-600 hover:plasmo-bg-blue-700 plasmo-text-white plasmo-px-3 plasmo-py-2 plasmo-rounded-lg plasmo-text-sm plasmo-font-medium plasmo-transition-colors plasmo-flex plasmo-justify-center plasmo-items-center plasmo-gap-2">
              <Check className="plasmo-w-4 plasmo-h-4" />
              Apply
            </button>
            <button
              onClick={onDismiss}
              className="plasmo-flex-1 plasmo-bg-white hover:plasmo-bg-slate-50 plasmo-text-slate-700 plasmo-border plasmo-border-slate-300 plasmo-px-3 plasmo-py-2 plasmo-rounded-lg plasmo-text-sm plasmo-font-medium plasmo-transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          "plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-10 plasmo-h-10 plasmo-rounded-full plasmo-shadow-md plasmo-transition-all " +
          (isLoading
            ? "plasmo-bg-slate-100 plasmo-text-slate-400 plasmo-animate-pulse"
            : "plasmo-bg-blue-600 hover:plasmo-bg-blue-700 plasmo-text-white")
        }>
        <Wand2 className="plasmo-w-5 plasmo-h-5" />
      </button>
    </div>
  )
}
