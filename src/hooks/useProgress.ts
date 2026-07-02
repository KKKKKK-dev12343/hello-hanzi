 import { useState, useCallback, useEffect } from 'react'
 
 const STORAGE_KEY = 'hellohanzi_progress'
 
 export interface LevelProgress {
   stars: number
   bestScore: number
   completed: boolean
 }
 
 export interface GameProgress {
   learnedChars: number[]
   currentLevel: number
   levels: Record<number, LevelProgress>
   totalStars: number
   streakDays: number
   lastPlayedDate: string
 }
 
 function defaultProgress(): GameProgress {
   return {
     learnedChars: [],
     currentLevel: 1,
     levels: {
       1: { stars: 0, bestScore: 0, completed: false },
       2: { stars: 0, bestScore: 0, completed: false },
       3: { stars: 0, bestScore: 0, completed: false },
       4: { stars: 0, bestScore: 0, completed: false },
       5: { stars: 0, bestScore: 0, completed: false },
     },
     totalStars: 0,
     streakDays: 0,
     lastPlayedDate: '',
   }
 }
 
 function loadProgress(): GameProgress {
   try {
     const data = localStorage.getItem(STORAGE_KEY)
     if (data) {
       const parsed = JSON.parse(data) as GameProgress
       return parsed
     }
   } catch { /* ignore */ }
   return defaultProgress()
 }
 
 function saveProgress(progress: GameProgress) {
   try {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
   } catch { /* ignore */ }
 }
 
 export function useProgress() {
   const [progress, setProgress] = useState<GameProgress>(loadProgress)
 
   useEffect(() => {
     saveProgress(progress)
   }, [progress])
 
   const completeLevel = useCallback((levelId: number, score: number) => {
     setProgress(prev => {
       const stars = score <= 2 ? 1 : score <= 4 ? 2 : 3
       const existing = prev.levels[levelId]
       const newStars = Math.max(existing?.stars || 0, stars)
       const newBestScore = Math.max(existing?.bestScore || 0, score)
 
       const today = new Date().toISOString().split('T')[0]
       const isNewDay = prev.lastPlayedDate !== today
       const newStreak = isNewDay ? (prev.streakDays || 0) + 1 : prev.streakDays
 
       // Calculate total stars
       const newLevels = {
         ...prev.levels,
         [levelId]: { stars: newStars, bestScore: newBestScore, completed: true },
       }
       const totalStars = Object.values(newLevels).reduce((sum, l) => sum + l.stars, 0)
 
       // Auto-unlock next level
       let newCurrentLevel = prev.currentLevel
       if (levelId === prev.currentLevel && newStars >= 1) {
         newCurrentLevel = Math.min(levelId + 1, 5)
       }
 
       return {
         ...prev,
         levels: newLevels,
         currentLevel: newCurrentLevel,
         totalStars,
         streakDays: newStreak,
         lastPlayedDate: today,
       }
     })
   }, [])
 
   const learnCharacter = useCallback((charId: number) => {
     setProgress(prev => {
       if (prev.learnedChars.includes(charId)) return prev
       return { ...prev, learnedChars: [...prev.learnedChars, charId] }
     })
   }, [])
 
   const resetProgress = useCallback(() => {
     setProgress(defaultProgress())
   }, [])
 
   const isLevelUnlocked = useCallback((levelId: number): boolean => {
     if (levelId === 1) return true
     const prevLevel = progress.levels[levelId - 1]
     return prevLevel?.completed ?? false
   }, [progress])
 
   return {
     progress,
     completeLevel,
     learnCharacter,
     resetProgress,
     isLevelUnlocked,
   }
 }
