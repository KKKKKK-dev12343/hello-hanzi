import { useState } from 'react'
import './App.css'
import LearnPage from './components/LearnPage'
import QuizPage from './components/QuizPage'
import CulturePage from './components/CulturePage'
import ProfilePage from './components/ProfilePage'
import { BookOpen, PenTool, Globe, User } from 'lucide-react'

type Tab = 'learn' | 'quiz' | 'culture' | 'profile'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'learn', label: '学习', icon: <BookOpen size={22} /> },
    { id: 'quiz', label: '检测', icon: <PenTool size={22} /> },
    { id: 'culture', label: '扩展', icon: <Globe size={22} /> },
    { id: 'profile', label: '我的', icon: <User size={22} /> },
  ]

  return (
    <div className='app-container'>
      <header className='app-header'>
        <div className='header-deco left-deco' />
        <h1 className='app-title'>
          <span className='title-char'>汉</span>
          <span className='title-char'>字</span>
          <span className='title-char'>说</span>
        </h1>
        <p className='app-subtitle'>· Hello Hanzi ·</p>
        <div className='header-deco right-deco' />
      </header>

      <main className='app-main'>
        {activeTab === 'learn' && <LearnPage />}
        {activeTab === 'quiz' && <QuizPage />}
        {activeTab === 'culture' && <CulturePage />}
        {activeTab === 'profile' && <ProfilePage />}
      </main>

      <nav className='bottom-nav'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item `}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className='nav-icon'>{tab.icon}</span>
            <span className='nav-label'>{tab.label}</span>
            {activeTab === tab.id && <span className='nav-indicator' />}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App