import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { characters } from '../data/characters'

interface QItem { id: number; char: string; options: string[]; correct: number; pinyin: string }

function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5) }

export default function QuizPage() {
  const { t } = useTranslation()
  const questions: QItem[] = characters.map(c => {
    const wrong = shuffle(characters.filter(x => x.id !== c.id).map(x => x.meaning)).slice(0, 3)
    const options = shuffle([c.meaning, ...wrong])
    return { id: c.id, char: c.char, options, correct: options.indexOf(c.meaning), pinyin: c.pinyin }
  })

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)

  const question = questions[currentQ]
  const progress = ((currentQ + 1) / questions.length) * 100

  const handleAnswer = (index: number) => {
    if (answers[question.id] !== undefined) return
    setAnswers(prev => ({ ...prev, [question.id]: index }))
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1)
    else setShowResult(true)
  }

  const score = questions.filter(q => answers[q.id] === q.correct).length
  const total = questions.length

  if (showResult) {
    return (
      <div className='quiz-page'>
        <div className='quiz-result'>
          <div className='result-ornament' />
          <h2 className='section-title'>{t('quiz.result')}</h2>
          <div className='result-score'>
            <span className='score-number'>{score}</span>
            <span className='score-divider'>/</span>
            <span className='score-total'>{total}</span>
          </div>
          <div className='result-stars'>
            {[1,2,3].map(s => <span key={s} className={'star ' + (s <= Math.ceil(score/(total/3)) ? 'filled' : '')}>★</span>)}
          </div>
          <p className='result-text'>
            {score === total ? '完美通关！' : score >= total * 0.7 ? '很不错！继续加油！' : score >= total * 0.5 ? '还行，再练练吧！' : '需要多加练习哦！'}
          </p>
          <button className='restart-btn' onClick={() => { setCurrentQ(0); setAnswers({}); setShowResult(false) }}>
            {t('quiz.restart')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='quiz-page'>
      <h2 className='section-title'>{t('quiz.title')}</h2>
      <div className='quiz-progress-bar'>
        <div className='quiz-progress-fill' style={{ width: progress + '%' }} />
        <span className='quiz-progress-text'>{currentQ + 1} / {total}</span>
      </div>

      <div className='quiz-card'>
        <div className='quiz-char-display'>
          <span className='quiz-char'>{question.char}</span>
          <span className='quiz-pinyin'>{question.pinyin}</span>
        </div>
        <p className='quiz-prompt'>{t('quiz.prompt')}</p>
        <div className='quiz-options'>
          {question.options.map((opt, idx) => {
            const isSelected = answers[question.id] === idx
            const isCorrect = idx === question.correct
            const showFeedback = answers[question.id] !== undefined
            let cls = 'quiz-option'
            if (showFeedback) {
              if (isCorrect) cls += ' correct'
              else if (isSelected && !isCorrect) cls += ' wrong'
            } else if (isSelected) cls += ' selected'
            return (
              <button key={idx} className={cls} onClick={() => handleAnswer(idx)}
                disabled={answers[question.id] !== undefined}>
                <span className='option-letter'>{String.fromCharCode(65 + idx)}</span>
                <span className='option-text'>{opt}</span>
                {showFeedback && isCorrect && <span className='option-check'>✓</span>}
                {showFeedback && isSelected && !isCorrect && <span className='option-cross'>✕</span>}
              </button>
            )
          })}
        </div>
        {answers[question.id] !== undefined && (
          <button className='next-btn' onClick={handleNext}>
            {currentQ < total - 1 ? t('quiz.next') + ' →' : t('quiz.view_result')}
          </button>
        )}
      </div>
    </div>
  )
}