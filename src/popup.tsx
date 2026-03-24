import React from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { Wand2, Settings, ShieldCheck, ZapOff, Globe, Zap } from "lucide-react"

import "~style.css"

function IndexPopup() {
  const [apiProvider] = useStorage("api_provider", "gemini")
  const [anthropicKey] = useStorage("anthropic_api_key", "")
  const [geminiKey] = useStorage("gemini_api_key", "")

  const hasKey = apiProvider === "gemini" ? !!geminiKey : !!anthropicKey

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL("options.html"))
    }
  }

  return (
    <div className="plasmo-w-80 plasmo-p-6 plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-text-center plasmo-bg-white plasmo-text-slate-800">
      <div className="plasmo-bg-blue-100 plasmo-p-3 plasmo-rounded-full plasmo-mb-4">
        < Wand2 className="plasmo-w-8 plasmo-h-8 plasmo-text-blue-600" />
      </div>
      <h1 className="plasmo-text-xl plasmo-font-bold plasmo-mb-2">PromptBoost</h1>
      
      <div className="plasmo-flex plasmo-items-center plasmo-gap-2 plasmo-mb-6">
        {hasKey ? (
          <div className="plasmo-flex plasmo-items-center plasmo-gap-1 plasmo-bg-green-50 plasmo-text-green-600 plasmo-px-2 plasmo-py-1 plasmo-rounded-full plasmo-text-[10px] plasmo-font-bold plasmo-uppercase plasmo-tracking-wider plasmo-border plasmo-border-green-200">
            <ShieldCheck className="plasmo-w-3 plasmo-h-3" />
            {apiProvider === 'gemini' ? 'Gemini (Free)' : 'Claude (Pro)'} Active
          </div>
        ) : (
          <div className="plasmo-flex plasmo-items-center plasmo-gap-1 plasmo-bg-amber-50 plasmo-text-amber-600 plasmo-px-2 plasmo-py-1 plasmo-rounded-full plasmo-text-[10px] plasmo-font-bold plasmo-uppercase plasmo-tracking-wider plasmo-border plasmo-border-amber-200">
            <ZapOff className="plasmo-w-3 plasmo-h-3" />
            Mock Mode
          </div>
        )}
      </div>

      <div className="plasmo-w-full plasmo-bg-slate-50 plasmo-p-4 plasmo-rounded-lg plasmo-text-left plasmo-text-sm plasmo-border plasmo-border-slate-200 plasmo-mb-6">
        <h2 className="plasmo-font-semibold plasmo-mb-2">Configuration:</h2>
        <div className="plasmo-flex plasmo-flex-col plasmo-gap-2">
          <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
            <span className="plasmo-text-slate-500">Provider:</span>
            <span className="plasmo-font-medium plasmo-flex plasmo-items-center plasmo-gap-1">
              {apiProvider === 'gemini' ? <Globe className="plasmo-w-3 plasmo-h-3" /> : <Zap className="plasmo-w-3 plasmo-h-3" />}
              {apiProvider === 'gemini' ? 'Gemini' : 'Claude'}
            </span>
          </div>
          <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
            <span className="plasmo-text-slate-500">Status:</span>
            <span className={hasKey ? "plasmo-text-green-600 plasmo-font-medium" : "plasmo-text-amber-600 plasmo-font-medium"}>
              {hasKey ? "Connected" : "Setup Required"}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={openOptions}
        className="plasmo-w-full plasmo-flex plasmo-items-center plasmo-justify-center plasmo-gap-2 plasmo-bg-white hover:plasmo-bg-slate-50 plasmo-text-slate-700 plasmo-border plasmo-border-slate-300 plasmo-px-4 plasmo-py-2 plasmo-rounded-xl plasmo-text-sm plasmo-font-semibold plasmo-transition-all"
      >
        <Settings className="plasmo-w-4 plasmo-h-4" />
        Settings
      </button>
      
      <p className="plasmo-text-xs plasmo-text-slate-400 plasmo-mt-6">
        v0.0.1 (MVP)
      </p>
    </div>
  )
}

export default IndexPopup
