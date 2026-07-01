 export default function ProfilePage() {
   return (
     <div className="profile-page">
       <div className="profile-header">
         <div className="profile-avatar">
           <span className="avatar-char">汉</span>
         </div>
         <h2 className="profile-name">Chinese Learner</h2>
         <p className="profile-email">learner@example.com</p>
         <div className="profile-level-badge">
           <span className="badge-text">HSK 1 · 初学者</span>
         </div>
       </div>
 
       <div className="profile-stats">
         <div className="stat-card">
           <span className="stat-number">24</span>
           <span className="stat-label">已学汉字</span>
         </div>
         <div className="stat-card">
           <span className="stat-number">85%</span>
           <span className="stat-label">掌握率</span>
         </div>
         <div className="stat-card">
           <span className="stat-number">7</span>
           <span className="stat-label">连续天数</span>
         </div>
       </div>
 
       <div className="profile-streak">
         <h3 className="profile-section-title">本周学习</h3>
         <div className="streak-days">
           {['一', '二', '三', '四', '五', '六', '日'].map((day, idx) => (
             <div key={idx} className={`streak-day ${idx < 5 ? 'active' : ''}`}>
               <div className="streak-circle">
                 {idx < 5 ? '✓' : ''}
               </div>
               <span className="streak-label">{day}</span>
             </div>
           ))}
         </div>
       </div>
 
       <div className="profile-menu">
         <button className="menu-item">
           <span className="menu-icon">📊</span>
           <span className="menu-text">学习报告</span>
           <span className="menu-arrow">→</span>
         </button>
         <button className="menu-item">
           <span className="menu-icon">🏆</span>
           <span className="menu-text">成就徽章</span>
           <span className="menu-arrow">→</span>
         </button>
         <button className="menu-item">
           <span className="menu-icon">🔔</span>
           <span className="menu-text">学习提醒</span>
           <span className="menu-arrow">→</span>
         </button>
         <button className="menu-item">
           <span className="menu-icon">🌐</span>
           <span className="menu-text">语言设置</span>
           <span className="menu-arrow">→</span>
         </button>
         <button className="menu-item">
           <span className="menu-icon">❓</span>
           <span className="menu-text">帮助与反馈</span>
           <span className="menu-arrow">→</span>
         </button>
       </div>
     </div>
   )
 }
