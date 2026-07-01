 import { useState } from 'react'
 
 interface QuizQuestion {
   id: number
   character: string
   options: string[]
   correct: number
   pinyin: string
 }
 
 const quizData: QuizQuestion[] = [
   { id: 1, character: '日', options: ['sun', 'moon', 'star', 'cloud'], correct: 0, pinyin: 'rì' },
   { id: 2, character: '山', options: ['river', 'mountain', 'stone', 'tree'], correct: 1, pinyin: 'shān' },
   { id: 3, character: '水', options: ['fire', 'earth', 'wind', 'water'], correct: 3, pinyin: 'shuǐ' },
   { id: 4, character: '人', options: ['person', 'mouth', 'hand', 'eye'], correct: 0, pinyin: 'rén' },
   { id: 5, character: '火', options: ['water', 'wood', 'fire', 'metal'], correct: 2, pinyin: 'huǒ' },
   { id: 6, character: '木', options: ['tree', 'grass', 'flower', 'bamboo'], correct: 0, pinyin: 'mù' },
   { id: 7, character: '马', options: ['cow', 'sheep', 'horse', 'dog'], correct: 2, pinyin: 'mǎ' },
   { id: 8, character: '口', options: ['ear', 'nose', 'mouth', 'eye'], correct: 2, pinyin: 'kǒu' },
 ]
 
 export default function QuizPage() {
   const [currentQ, setCurrentQ] = useState(0)
   const [answers, setAnswers] = useState<Record<number, number>>({})
   const [showResult, setShowResult] = useState(false)
 
   const question = quizData[currentQ]
   const progress = ((currentQ + 1) / quizData.length) * 100
 
   const handleAnswer = (index: number) => {
     if (answers[question.id] !== undefined) return
     setAnswers({ ...answers, [question.id]: index })
   }
 
   const handleNext = () => {
     if (currentQ < quizData.length - 1) {
       setCurrentQ(currentQ + 1)
     } else {
       setShowResult(true)
     }
   }
 
   const score = quizData.filter((q) => answers[q.id] === q.correct).length
   const total = quizData.length
 
   if (showResult) {
     return (
       <div className="quiz-page">
         <div className="quiz-result">
           <div className="result-ornament" />
           <h2 className="section-title">测验结果</h2>
           <div className="result-score">
             <span className="score-number">{score}</span>
             <span className="score-divider">/</span>
             <span className="score-total">{total}</span>
           </div>
           <div className="result-stars">
             {[1, 2, 3].map((s) => (
               <span key={s} className={`star ${s <= Math.ceil(score / (total / 3)) ? 'filled' : ''}`}>★</span>
             ))}
           </div>
           <p className="result-text">
             {score === total ? '完美通关！你对这些汉字掌握得很好！' :
              score >= total * 0.7 ? '很不错！继续加油！' :
              score >= total * 0.5 ? '还行，再练练吧！' : '需要多加练习哦！'}
           </p>
           <button className="restart-btn" onClick={() => { setCurrentQ(0); setAnswers({}); setShowResult(false) }}>
             重新测验
           </button>
         </div>
       </div>
     )
   }
 
   return (
     <div className="quiz-page">
       <h2 className="section-title">复习测验</h2>
       <div className="quiz-progress-bar">
         <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
         <span className="quiz-progress-text">{currentQ + 1} / {total}</span>
       </div>
 
       <div className="quiz-card">
         <div className="quiz-char-display">
           <span className="quiz-char">{question.character}</span>
           <span className="quiz-pinyin">{question.pinyin}</span>
         </div>
         <p className="quiz-prompt">选择这个汉字的意思</p>
         <div className="quiz-options">
           {question.options.map((opt, idx) => {
             const isSelected = answers[question.id] === idx
             const isCorrect = idx === question.correct
             const showFeedback = answers[question.id] !== undefined
 
             let optionClass = 'quiz-option'
             if (showFeedback) {
               if (isCorrect) optionClass += ' correct'
               else if (isSelected && !isCorrect) optionClass += ' wrong'
             } else if (isSelected) {
               optionClass += ' selected'
             }
 
             return (
               <button
                 key={idx}
                 className={optionClass}
                 onClick={() => handleAnswer(idx)}
                 disabled={answers[question.id] !== undefined}
               >
                 <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                 <span className="option-text">{opt}</span>
                 {showFeedback && isCorrect && <span className="option-check">✓</span>}
                 {showFeedback && isSelected && !isCorrect && <span className="option-cross">✕</span>}
               </button>
             )
           })}
         </div>
         {answers[question.id] !== undefined && (
           <button className="next-btn" onClick={handleNext}>
             {currentQ < total - 1 ? '下一题 →' : '查看结果'}
           </button>
         )}
       </div>
     </div>
   )
 }
