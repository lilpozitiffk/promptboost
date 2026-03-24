import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import React, { useEffect, useState, useCallback, useRef } from "react"
import { PromptService, type EnhancementResult } from "./promptService"
import { EnhancementPanel } from "~features/EnhancementPanel"

export const config: PlasmoCSConfig = {
  matches: [
    "https://chat.openai.com/*",
    "https://chatgpt.com/*",
    "https://claude.ai/*",
    "https://gemini.google.com/*"
  ]
}

export const getStyle = (): HTMLStyleElement => {
  const baseFontSize = 16
  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixelsValue = parseFloat(remValue) * baseFontSize
    return `${pixelsValue}px`
  })
  const styleElement = document.createElement("style")
  styleElement.textContent = updatedCssText
  return styleElement
}

// Fixed: Use Overlay Anchor but with precise manual alignment
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  const selectors = [
    "rich-textarea", // Gemini container
    "#prompt-textarea", // ChatGPT
    ".ProseMirror[contenteditable]", // Claude
    "textarea",
    "[contenteditable='true']"
  ]
  
  for (const selector of selectors) {
    const el = document.querySelector(selector)
    if (el) {
      console.log("PromptBoost: Anchored Overlay to", selector)
      return el
    }
  }
  return null
}

export const getShadowHostId = () => "promptboost-overlay"

const PromptBoostOverlay = () => {
  const [enhancement, setEnhancement] = useState<EnhancementResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
  
  const lastAppliedText = useRef<string | null>(null)

  const processInput = useCallback((target: HTMLElement) => {
    const inputEl = target.closest('textarea, [contenteditable="true"]') as HTMLElement
    if (!inputEl) return
    
    setActiveElement(inputEl)
    const text = inputEl.tagName === 'TEXTAREA' 
      ? (inputEl as HTMLTextAreaElement).value 
      : (inputEl.innerText || inputEl.textContent || "")

    if (text === lastAppliedText.current || text.trim().length < 5) {
      if (enhancement && text.trim().length < 5) setEnhancement(null)
      return
    }

    if (lastAppliedText.current && text !== lastAppliedText.current) {
      lastAppliedText.current = null
    }

    setIsLoading(true)
    if ((window as any).pbTimer) clearTimeout((window as any).pbTimer);
    
    (window as any).pbTimer = setTimeout(async () => {
      try {
        const result = await PromptService.enhancePrompt(text)
        if (result) setEnhancement(result)
      } catch (err) {
        console.error("PromptBoost: Error", err)
      } finally {
        setIsLoading(false)
      }
    }, 1500)
  }, [enhancement])

  useEffect(() => {
    const handleEvent = (e: Event) => processInput(e.target as HTMLElement)
    document.addEventListener("input", handleEvent, true)
    document.addEventListener("keyup", handleEvent, true)

    const observer = new MutationObserver(() => {
      const active = document.activeElement as HTMLElement
      if (active && (active.tagName === 'TEXTAREA' || active.contentEditable === 'true')) {
        const text = active.tagName === 'TEXTAREA' 
          ? (active as HTMLTextAreaElement).value 
          : (active.innerText || active.textContent || "")
        if (text.trim().length === 0) {
          setEnhancement(null)
          lastAppliedText.current = null
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      document.removeEventListener("input", handleEvent, true)
      document.removeEventListener("keyup", handleEvent, true)
      observer.disconnect()
    }
  }, [processInput, enhancement])

  const handleApply = (enhancedText: string) => {
    if (!activeElement) return
    lastAppliedText.current = enhancedText
    if (activeElement.tagName === 'TEXTAREA') {
      const textarea = activeElement as HTMLTextAreaElement
      textarea.value = enhancedText
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    } else {
      activeElement.innerHTML = enhancedText
      activeElement.dispatchEvent(new Event('input', { bubbles: true }))
      activeElement.focus()
    }
    setEnhancement(null)
  }

  return (
    <div 
      className="plasmo-relative plasmo-z-[9999]" 
      style={{ 
        position: 'absolute',
        top: '-45px', // Sit exactly above the chat box
        right: '0px',  // Aligned to the right edge of the chat box
        pointerEvents: 'none' // Don't block clicks to the chat box
      }}
    >
      <div style={{ pointerEvents: 'auto' }}> {/* Re-enable clicks for the Wand itself */}
        <EnhancementPanel 
          enhancement={enhancement} 
          isLoading={isLoading} 
          onApply={handleApply} 
          onDismiss={() => setEnhancement(null)} 
        />
      </div>
    </div>
  )
}

export default PromptBoostOverlay
