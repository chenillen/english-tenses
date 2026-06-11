import { useState, useEffect, useRef, useCallback } from 'react'

const LANG = 'en-US'

function selectVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  if (voices.length === 0) return null

  const enVoices = voices.filter((v) => v.lang.startsWith('en'))
  if (enVoices.length === 0) return voices[0]

  const preferred = enVoices.find(
    (v) =>
      v.name.includes('Samantha') ||
      v.name.includes('Google US English') ||
      v.name.includes('Daniel') ||
      v.name.includes('Karen'),
  )
  return preferred || enVoices[0]
}

export function useSpeech() {
  const [speakingText, setSpeakingText] = useState<string | null>(null)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    if (!supported) return

    return () => {
      speechSynthesis.cancel()
    }
  }, [supported])

  const speak = useCallback(
    (text: string) => {
      if (!supported) return
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = LANG
      utterance.rate = 0.85

      const voice = selectVoice()
      if (voice) utterance.voice = voice

      utterance.onstart = () => setSpeakingText(text)
      utterance.onend = () => setSpeakingText(null)
      utterance.onerror = () => setSpeakingText(null)

      speechSynthesis.speak(utterance)
    },
    [supported],
  )

  const stop = useCallback(() => {
    if (!supported) return
    speechSynthesis.cancel()
    setSpeakingText(null)
  }, [supported])

  return { speak, stop, speakingText, supported }
}
