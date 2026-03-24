import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export interface EnhancementResult {
  original: string
  enhanced: string
  category: string
}

const SYSTEM_INSTRUCTION = `You are a Prompt Engineering Expert. Your task is to transform vague user drafts into high-fidelity AI prompts using the 6-Layer Framework:
1. Role: Persona & Expertise.
2. Context: Background & Project Goals.
3. Task: Core action with precise verbs.
4. Audience: Target consumer & Tone.
5. Format: Structure & Constraints.
6. Reasoning: (Optional) Step-by-step logic.

Analyze the user's intent and fill in missing layers with professional defaults. 
Return ONLY a valid JSON object: {"enhanced_prompt": "...", "category": "..."}`

export class PromptService {
  static async enhancePrompt(prompt: string): Promise<EnhancementResult | null> {
    if (!prompt || prompt.trim().length < 5) return null

    const apiProvider = await storage.get("api_provider") || "gemini"
    
    if (apiProvider === "gemini") {
      const geminiKey = await storage.get("gemini_api_key")
      if (geminiKey) {
        try {
          return await this.geminiEnhance(prompt, geminiKey)
        } catch (error) {
          console.error("PromptBoost: Gemini API failed", error)
        }
      }
    } else {
      const anthropicKey = await storage.get("anthropic_api_key")
      if (anthropicKey) {
        try {
          return await this.anthropicEnhance(prompt, anthropicKey)
        } catch (error) {
          console.error("PromptBoost: Anthropic API failed", error)
        }
      }
    }

    return this.mockEnhance(prompt)
  }

  private static async geminiEnhance(
    prompt: string,
    apiKey: string
  ): Promise<EnhancementResult> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_INSTRUCTION}\n\nUser Draft: "${prompt}"`
                }
              ]
            }
          ],
          generationConfig: {
            response_mime_type: "application/json"
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.candidates[0].content.parts[0].text
    
    try {
      const parsed = JSON.parse(content)
      return {
        original: prompt,
        enhanced: parsed.enhanced_prompt,
        category: parsed.category
      }
    } catch {
      return {
        original: prompt,
        enhanced: content,
        category: "General"
      }
    }
  }

  private static async anthropicEnhance(
    prompt: string,
    apiKey: string
  ): Promise<EnhancementResult> {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
        "dangerously-allow-browser": "true"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_INSTRUCTION,
        messages: [
          {
            role: "user",
            content: `User Draft: "${prompt}"`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.content[0].text
    
    try {
      const parsed = JSON.parse(content)
      return {
        original: prompt,
        enhanced: parsed.enhanced_prompt,
        category: parsed.category
      }
    } catch {
      return {
        original: prompt,
        enhanced: content,
        category: "General"
      }
    }
  }

  private static async mockEnhance(prompt: string): Promise<EnhancementResult> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const lowerPrompt = prompt.toLowerCase()

    if (lowerPrompt.includes("write an email") || lowerPrompt.includes("email")) {
      return {
        original: prompt,
        enhanced: `Act as a Professional Business Communicator. Write a concise email based on this intent: "${prompt}". Audience: Professional. Tone: Polite, clear, and direct. Format: Subject line + Body (max 150 words).`,
        category: "Email"
      }
    } else if (lowerPrompt.includes("code") || lowerPrompt.includes("function") || lowerPrompt.includes("script")) {
      return {
        original: prompt,
        enhanced: `Act as a Senior Software Engineer. Perform this technical task: "${prompt}". Constraints: Clean code, idiomatic style, and include brief comments. Reasoning: Step-by-step logic.`,
        category: "Code"
      }
    } else if (lowerPrompt.includes("summarize") || lowerPrompt.includes("analyze")) {
      return {
        original: prompt,
        enhanced: `Act as an Expert Data Analyst. Analyze/Summarize the following: "${prompt}". Format: Structured Markdown with Executive Summary and Bulleted Key Takeaways.`,
        category: "Analysis"
      }
    } else {
      return {
        original: prompt,
        enhanced: `Act as a Subject Matter Expert. Provide a comprehensive response to: "${prompt}". Context: General request. Format: Clear headings and actionable steps.`,
        category: "General"
      }
    }
  }
}
