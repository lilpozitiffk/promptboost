import React, { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { Key, ShieldCheck, HelpCircle, Zap, Globe } from "lucide-react"

import "~style.css"

function OptionsPopup() {
  const [apiProvider, setApiProvider] = useStorage("api_provider", "gemini")
  const [anthropicKey, setAnthropicKey] = useStorage("anthropic_api_key", "")
  const [geminiKey, setGeminiKey] = useStorage("gemini_api_key", "")
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="plasmo-min-h-screen plasmo-bg-slate-50 plasmo-p-10 plasmo-text-slate-800">
      <div className="plasmo-max-w-2xl plasmo-mx-auto">
        <header className="plasmo-mb-10">
          <h1 className="plasmo-text-3xl plasmo-font-bold plasmo-text-blue-600">PromptBoost Settings</h1>
          <p className="plasmo-text-slate-500">Choose your AI engine and configure your keys.</p>
        </header>

        <div className="plasmo-grid plasmo-grid-cols-1 plasmo-gap-8">
          {/* Provider Selection */}
          <section className="plasmo-bg-white plasmo-p-8 plasmo-rounded-2xl plasmo-shadow-sm plasmo-border plasmo-border-slate-200">
            <h2 className="plasmo-text-xl plasmo-font-semibold plasmo-mb-6 plasmo-flex plasmo-items-center plasmo-gap-2">
              <Zap className="plasmo-w-5 plasmo-h-5 plasmo-text-amber-500" />
              Choose AI Engine
            </h2>
            
            <div className="plasmo-grid plasmo-grid-cols-2 plasmo-gap-4">
              <button
                onClick={() => setApiProvider("gemini")}
                className={`plasmo-p-4 plasmo-rounded-xl plasmo-border-2 plasmo-text-left plasmo-transition-all ${
                  apiProvider === "gemini" 
                    ? "plasmo-border-blue-500 plasmo-bg-blue-50" 
                    : "plasmo-border-slate-100 hover:plasmo-border-slate-200"
                }`}
              >
                <div className="plasmo-font-bold plasmo-flex plasmo-items-center plasmo-gap-2">
                  Google Gemini
                  <span className="plasmo-text-[10px] plasmo-bg-green-100 plasmo-text-green-700 plasmo-px-2 plasmo-py-0.5 plasmo-rounded-full">FREE TIER</span>
                </div>
                <div className="plasmo-text-xs plasmo-text-slate-500 plasmo-mt-1">Best for free, unlimited personal use. (1.5 Flash)</div>
              </button>

              <button
                onClick={() => setApiProvider("anthropic")}
                className={`plasmo-p-4 plasmo-rounded-xl plasmo-border-2 plasmo-text-left plasmo-transition-all ${
                  apiProvider === "anthropic" 
                    ? "plasmo-border-blue-500 plasmo-bg-blue-50" 
                    : "plasmo-border-slate-100 hover:plasmo-border-slate-200"
                }`}
              >
                <div className="plasmo-font-bold plasmo-flex plasmo-items-center plasmo-gap-2">
                  Anthropic Claude
                  <span className="plasmo-text-[10px] plasmo-bg-blue-100 plasmo-text-blue-700 plasmo-px-2 plasmo-py-0.5 plasmo-rounded-full">PRO</span>
                </div>
                <div className="plasmo-text-xs plasmo-text-slate-500 plasmo-mt-1">Best for high-precision, professional engineering.</div>
              </button>
            </div>
          </section>

          {/* Key Configuration */}
          <section className="plasmo-bg-white plasmo-p-8 plasmo-rounded-2xl plasmo-shadow-sm plasmo-border plasmo-border-slate-200">
            {apiProvider === "gemini" ? (
              <>
                <div className="plasmo-flex plasmo-items-center plasmo-gap-3 plasmo-mb-6">
                  <div className="plasmo-bg-green-100 plasmo-p-2 plasmo-rounded-lg">
                    <Globe className="plasmo-w-6 plasmo-h-6 plasmo-text-green-600" />
                  </div>
                  <h2 className="plasmo-text-xl plasmo-font-semibold">Gemini API Key</h2>
                </div>
                <p className="plasmo-text-sm plasmo-text-slate-600 plasmo-mb-4">
                  Google AI Studio offers a free-of-charge tier for Gemini 1.5 Flash.
                </p>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Paste your Gemini API key here..."
                  className="plasmo-w-full plasmo-px-4 plasmo-py-3 plasmo-rounded-xl plasmo-border plasmo-border-slate-300 focus:plasmo-outline-none focus:plasmo-ring-2 focus:plasmo-ring-blue-500 plasmo-mb-4"
                />
                <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" className="plasmo-text-blue-600 hover:plasmo-underline plasmo-text-sm plasmo-flex plasmo-items-center plasmo-gap-1" rel="noreferrer">
                    <HelpCircle className="plasmo-w-4 plasmo-h-4" /> Get Free Gemini Key
                  </a>
                  <button onClick={handleSave} className={`plasmo-px-6 plasmo-py-2 plasmo-rounded-xl plasmo-font-semibold plasmo-transition-all ${isSaved ? "plasmo-bg-green-100 plasmo-text-green-700" : "plasmo-bg-blue-600 plasmo-text-white"}`}>
                    {isSaved ? "Saved!" : "Save Gemini Key"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="plasmo-flex plasmo-items-center plasmo-gap-3 plasmo-mb-6">
                  <div className="plasmo-bg-blue-100 plasmo-p-2 plasmo-rounded-lg">
                    <Key className="plasmo-w-6 plasmo-h-6 plasmo-text-blue-600" />
                  </div>
                  <h2 className="plasmo-text-xl plasmo-font-semibold">Claude API Key</h2>
                </div>
                <input
                  type="password"
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  className="plasmo-w-full plasmo-px-4 plasmo-py-3 plasmo-rounded-xl plasmo-border plasmo-border-slate-300 focus:plasmo-outline-none focus:plasmo-ring-2 focus:plasmo-ring-blue-500 plasmo-mb-4"
                />
                <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                  <a href="https://console.anthropic.com/settings/keys" target="_blank" className="plasmo-text-blue-600 hover:plasmo-underline plasmo-text-sm plasmo-flex plasmo-items-center plasmo-gap-1" rel="noreferrer">
                    <HelpCircle className="plasmo-w-4 plasmo-h-4" /> Get Anthropic Key
                  </a>
                  <button onClick={handleSave} className={`plasmo-px-6 plasmo-py-2 plasmo-rounded-xl plasmo-font-semibold plasmo-transition-all ${isSaved ? "plasmo-bg-green-100 plasmo-text-green-700" : "plasmo-bg-blue-600 plasmo-text-white"}`}>
                    {isSaved ? "Saved!" : "Save Claude Key"}
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default OptionsPopup
