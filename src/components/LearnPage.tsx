import { useState, useMemo, useCallback, useEffect } from 'react'

import { getCharactersByLevel, getCharacterById, characters, levels as levelData } from '../data/characters'

import { useProgress } from '../hooks/useProgress'



type GameState = 'select' | 'playing' | 'complete'




 interface RoundData {
   characterId: number
   options: number[]
   hint: { char: string; oracleEmoji: string; meaning: string }
 }
 
 export default function LearnPage() {
   const { progress, completeLevel, learnCharacter, isLevelUnlocked } = useProgress()
   const [gameState, setGameState] = useState<GameState>('select')
   const [selectedLevel, setSelectedLevel] = useState(1)
   const [currentRound, setCurrentRound] = useState(0)
   const [score, setScore] = useState(0)
   const [rounds, setRounds] = useState<RoundData[]>([])
   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
   const [showFeedback, setShowFeedback] = useState(false)
   const [combo, setCombo] = useState(0)
 
   const startLevel = useCallback((levelId: number) => {
     const chars = getCharactersByLevel(levelId)
     if (chars.length === 0) return
     const shuffled = [...chars].sort(() => Math.random() - 0.5)
     const allOtherChars = characters.filter(c => !chars.find(lc => lc.id === c.id))
     const generatedRounds: RoundData[] = shuffled.map(target => {
       const wrongOptions = allOtherChars.sort(() => Math.random() - 0.5).slice(0, 3).map(c => c.id)
       const options = [target.id, ...wrongOptions].sort(() => Math.random() - 0.5)
       return { characterId: target.id, options, hint: target }
     })
     setSelectedLevel(levelId)
     setRounds(generatedRounds)
     setCurrentRound(0)
     setScore(0)
     setCombo(0)
     setSelectedAnswer(null)
     setShowFeedback(false)
     setGameState('playing')
   }, [])
 
   const handleAnswer = useCallback((charId: number) => {
     if (showFeedback) return
     setSelectedAnswer(charId)
     setShowFeedback(true)
     const current = rounds[currentRound]
     const isCorrect = charId === current.characterId
     if (isCorrect) {
       const newCombo = combo + 1
       const bonusPoints = Math.min(newCombo - 1, 5)
       setScore(prev => prev + 10 + bonusPoints)
       setCombo(newCombo)
       learnCharacter(current.characterId)
     } else { setCombo(0) }
     setTimeout(() => {
       if (currentRound < rounds.length - 1) {
         setCurrentRound(prev => prev + 1)
         setSelectedAnswer(null)
         setShowFeedback(false)
       } else {
         const finalScore = isCorrect ? score + 10 + Math.min(combo, 5) : score
         completeLevel(selectedLevel, finalScore)
         setGameState('complete')
       }
     }, 1200)
   }, [showFeedback, rounds, currentRound, combo, score, selectedLevel, completeLevel, learnCharacter])
 
   const currentRoundData = rounds[currentRound]
   const character = currentRoundData ? getCharacterById(currentRoundData.characterId) : null
 
   if (gameState === 'select') {
     return (
       <div className="learn-page">
         <div className="level-select">
           <h2 className="section-title">闯关学习</h2>
           <p className="section-subtitle">看甲骨文猜汉字，每关6个字</p>
           <div className="level-list">
             {levelData.map((level) => {
               const unlocked = isLevelUnlocked(level.id)
               const levelProgress = progress.levels[level.id]
               const cur = progress.currentLevel === level.id
               return (
                 <button key={level.id}
                   className={'level-card ' + (unlocked ? 'unlocked' : 'locked') + (cur ? ' current' : '')}
                   onClick={() => unlocked && startLevel(level.id)} disabled={!unlocked}>
                   <div><span className="level-badge">{level.id}</span></div>
                   <div className="level-card-body">
                     <h3 className="level-card-title">{level.name}</h3>
                     <p className="level-card-subtitle">{level.subtitle}</p>
                     <p className="level-card-desc">{level.description}</p>
                   </div>
                   <div className="level-card-right">
                     <div className="level-stars-row">
                       {[1, 2, 3].map((s) => (
                         <span key={s} className={'star ' + (s <= levelProgress.stars ? 'filled' : '')}>★</span>
                       ))}
                     </div>
                     {!unlocked && <span className="lock-icon">🔒</span>}
                   </div>
                 </button>
               )
             })}
           </div>
           <div className="progress-summary">
             <div className="summary-item">
               <span className="summary-number">{progress.totalStars}</span>
               <span className="summary-label">总星数</span>
             </div>
             <div className="summary-item">
               <span className="summary-number">{progress.learnedChars.length}</span>
               <span className="summary-label">已学汉字</span>
             </div>
             <div className="summary-item">
               <span className="summary-number">{progress.streakDays}</span>
               <span className="summary-label">连续天数</span>
             </div>
           </div>
         </div>
       </div>
     )
   }
 
   if (gameState === 'complete') {
     const maxScore = rounds.length * 10 + 15
     const stars = score <= maxScore * 0.4 ? 1 : score <= maxScore * 0.7 ? 2 : 3
     const level = levelData.find(l => l.id === selectedLevel)
     return (
       <div className="learn-page">
         <div className="game-complete">
           <div className="complete-ornament" />
           <h2 className="section-title">关卡完成！</h2>
           <p className="level-name-display">{level?.name}</p>
           <div className="complete-score">
             <span className="complete-score-num">{score}</span>
             <span className="complete-score-unit">分</span>
           </div>
           <div className="complete-stars">
             {[1, 2, 3].map((s) => (
               <span key={s} className={'star-animated ' + (s <= stars ? 'filled' : '')}
                 style={{ animationDelay: s * 0.3 + 's' }}>★</span>
             ))}
           </div>
           <p className="complete-text">
             {stars === 3 ? '完美通关！你对这些汉字掌握得很好！' :
              stars === 2 ? '很不错！继续加油！' : '还不错，再练练吧！'}
           </p>
           <button className="back-btn" onClick={() => setGameState('select')}>返回关卡选择</button>
         </div>
       </div>
     )
   }
 
   if (!currentRoundData || !character) return null
   const isCorrect = selectedAnswer === currentRoundData.characterId
 
   return (
     <div className="learn-page">
       <div className="game-header">
         <button className="game-back-btn" onClick={() => setGameState('select')}>← 退出</button>
         <div className="game-progress">
           <div className="game-progress-bar">
             <div className="game-progress-fill" style={{ width: (currentRound / rounds.length) * 100 + '%' }} />
           </div>
           <span className="game-round-indicator">{currentRound + 1} / {rounds.length}</span>
         </div>
         <div className="game-score-display">
           <span className="game-score">{score}</span>
           {combo >= 2 && <span className="combo-badge">×{combo}</span>}
         </div>
       </div>
 
       <div className="oracle-hints">
         <div className="oracle-emoji">{character.oracleEmoji}</div>
         <p className="oracle-description">{character.oracleDescription}</p>
         <p className="oracle-meaning-hint">{character.meaning}</p>
       </div>
 
       <div className="matching-options">
         {currentRoundData.options.map((charId) => {
           const optChar = getCharacterById(charId)
           if (!optChar) return null
           let cardClass = 'match-card'
           if (showFeedback) {
             if (charId === currentRoundData.characterId) cardClass += ' correct'
             else if (charId === selectedAnswer && charId !== currentRoundData.characterId) cardClass += ' wrong'
             else cardClass += ' dimmed'
           }
           return (
             <button key={charId} className={cardClass}
               onClick={() => handleAnswer(charId)} disabled={showFeedback}>
               <span className="match-char">{optChar.char}</span>
               <span className="match-pinyin">{optChar.pinyin}</span>
             </button>
           )
         })}
       </div>
 
       {showFeedback && (
         <div className={'feedback-banner ' + (isCorrect ? 'correct' : 'wrong')}>
           {isCorrect ? (
             <span>✓ 正确！{combo >= 2 && ' 连击×' + combo}</span>
           ) : (
             <span>✕ 正确答案是 "{getCharacterById(currentRoundData.characterId)?.char}"</span>
           )}
         </div>
       )}
 
       {showFeedback && isCorrect && (
         <div className="culture-story">
           <p>{character.cultureStory}</p>
           <div className="story-words">
             {character.commonWords.map((word, idx) => (
               <span key={idx} className="word-chip">{word}</span>
             ))}
           </div>
         </div>
       )}
     </div>
   )
 }
