import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProgress } from '../hooks/useProgress'
import LoginPage from './LoginPage'

export default function ProfilePage() {
  const { t } = useTranslation()
  const { progress, resetProgress } = useProgress()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('hellohanzi_logged_in') === 'true')
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hellohanzi_user') || '{}') }
    catch { return {} }
  })

  const handleLogin = (email: string) => { setLoggedIn(true); setUser({ email }) }
  const handleLogout = () => {
    localStorage.removeItem('hellohanzi_logged_in')
    setLoggedIn(false)
    setUser({})
  }

  if (!loggedIn) return <div className='profile-page'><LoginPage onLogin={handleLogin} /></div>

  const userEmail = user.email || 'learner@hanzi.app'
  const today = new Date().getDay()
  const weekDays = ['一','二','三','四','五','六','日']
  const masteryRate = progress.learnedChars.length > 0
    ? Math.round((progress.totalStars / (progress.learnedChars.length * 3)) * 100)
    : 0

  return (
    <div className='profile-page'>
      <div className='profile-header'>
        <div className='profile-avatar'><span className='avatar-char'>汉</span></div>
        <h2 className='profile-name'>{userEmail.split('@')[0]}</h2>
        <p className='profile-email'>{userEmail}</p>
        <div className='profile-level-badge'><span className='badge-text'>HSK 1 · 初学者</span></div>
      </div>

      <div className='profile-stats'>
        <div className='stat-card'><span className='stat-number'>{progress.learnedChars.length}</span><span className='stat-label'>已学汉字</span></div>
        <div className='stat-card'><span className='stat-number'>{masteryRate}%</span><span className='stat-label'>掌握率</span></div>
        <div className='stat-card'><span className='stat-number'>{progress.streakDays}</span><span className='stat-label'>连续天数</span></div>
      </div>

      <div className='profile-streak'>
        <h3 className='profile-section-title'>本周学习</h3>
        <div className='streak-days'>{weekDays.map((d,i)=>
          <div key={i} className={'streak-day ' + (i < today ? 'active' : '')}>
            <div className='streak-circle'>{i < today ? '✓' : ''}</div>
            <span className='streak-label'>{d}</span>
          </div>
        )}</div>
      </div>

      <div className='profile-menu'>
        <button className='menu-item'><span className='menu-icon'>📊</span><span className='menu-text'>学习报告</span><span className='menu-arrow'>→</span></button>
        <button className='menu-item'><span className='menu-icon'>🏆</span><span className='menu-text'>成就徽章</span><span className='menu-arrow'>→</span></button>
        <button className='menu-item'><span className='menu-icon'>🔔</span><span className='menu-text'>学习提醒</span><span className='menu-arrow'>→</span></button>
        <button className='menu-item'><span className='menu-icon'>🌐</span><span className='menu-text'>切换语言</span><span className='menu-arrow'>→</span></button>
        <button className='menu-item'><span className='menu-icon'>❓</span><span className='menu-text'>帮助与反馈</span><span className='menu-arrow'>→</span></button>
        <button className='menu-item logout' onClick={handleLogout}><span className='menu-icon'>🚪</span><span className='menu-text'>退出登录</span><span className='menu-arrow'>→</span></button>
      </div>
    </div>
  )
}