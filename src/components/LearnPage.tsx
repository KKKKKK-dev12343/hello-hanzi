 import { useState } from 'react'
 
 interface CharacterTile {
   id: number
   char: string
   meaning: string
   pinyin: string
   oracle: string
   category: 'nature' | 'human' | 'animal' | 'object'
   collected: boolean
 }
 
 const sampleCharacters: CharacterTile[] = [
   { id: 1, char: '日', meaning: 'sun', pinyin: 'rì', oracle: '☀', category: 'nature', collected: true },
   { id: 2, char: '月', meaning: 'moon', pinyin: 'yuè', oracle: '☽', category: 'nature', collected: true },
   { id: 3, char: '山', meaning: 'mountain', pinyin: 'shān', oracle: '⛰', category: 'nature', collected: true },
   { id: 4, char: '水', meaning: 'water', pinyin: 'shuǐ', oracle: '〰', category: 'nature', collected: false },
   { id: 5, char: '火', meaning: 'fire', pinyin: 'huǒ', oracle: '🔥', category: 'nature', collected: true },
   { id: 6, char: '木', meaning: 'tree', pinyin: 'mù', oracle: '🌳', category: 'nature', collected: false },
   { id: 7, char: '人', meaning: 'person', pinyin: 'rén', oracle: '🚶', category: 'human', collected: true },
   { id: 8, char: '口', meaning: 'mouth', pinyin: 'kǒu', oracle: '👄', category: 'human', collected: true },
   { id: 9, char: '手', meaning: 'hand', pinyin: 'shǒu', oracle: '✋', category: 'human', collected: false },
   { id: 10, char: '目', meaning: 'eye', pinyin: 'mù', oracle: '👁', category: 'human', collected: true },
   { id: 11, char: '心', meaning: 'heart', pinyin: 'xīn', oracle: '❤', category: 'human', collected: false },
   { id: 12, char: '足', meaning: 'foot', pinyin: 'zú', oracle: '🦶', category: 'human', collected: true },
   { id: 13, char: '牛', meaning: 'cow', pinyin: 'niú', oracle: '🐄', category: 'animal', collected: true },
   { id: 14, char: '羊', meaning: 'sheep', pinyin: 'yáng', oracle: '🐑', category: 'animal', collected: false },
   { id: 15, char: '马', meaning: 'horse', pinyin: 'mǎ', oracle: '🐎', category: 'animal', collected: true },
   { id: 16, char: '鱼', meaning: 'fish', pinyin: 'yú', oracle: '🐟', category: 'animal', collected: false },
   { id: 17, char: '门', meaning: 'door', pinyin: 'mén', oracle: '🚪', category: 'object', collected: true },
   { id: 18, char: '车', meaning: 'vehicle', pinyin: 'chē', oracle: '🚗', category: 'object', collected: true },
   { id: 19, char: '田', meaning: 'field', pinyin: 'tián', oracle: '🌾', category: 'nature', collected: false },
   { id: 20, char: '雨', meaning: 'rain', pinyin: 'yǔ', oracle: '🌧', category: 'nature', collected: true },
   { id: 21, char: '云', meaning: 'cloud', pinyin: 'yún', oracle: '☁', category: 'nature', collected: false },
   { id: 22, char: '石', meaning: 'stone', pinyin: 'shí', oracle: '🪨', category: 'nature', collected: true },
   { id: 23, char: '女', meaning: 'woman', pinyin: 'nǚ', oracle: '👩', category: 'human', collected: true },
   { id: 24, char: '子', meaning: 'child', pinyin: 'zǐ', oracle: '🧒', category: 'human', collected: false },
 ]
 
 const levels = [
   { id: 1, name: '自然万象', chars: '日 月 山 水', unlocked: true, stars: 3 },
   { id: 2, name: '人之初', chars: '人 口 手 目', unlocked: true, stars: 2 },
   { id: 3, name: '生灵万物', chars: '牛 羊 马 鱼', unlocked: true, stars: 1 },
   { id: 4, name: '日用之间', chars: '门 车 田 石', unlocked: false, stars: 0 },
   { id: 5, name: '天地气象', chars: '雨 云 火 木', unlocked: false, stars: 0 },
 ]
 
 const categoryColors: Record<string, string> = {
   nature: '#6B8E5A',
   human: '#C87A2C',
   animal: '#8B4513',
   object: '#4A6FA5',
 }
 
 const categoryLabels: Record<string, string> = {
   nature: '自然',
   human: '人',
   animal: '动物',
   object: '器物',
 }
 
 export default function LearnPage() {
   const [selectedLevel, setSelectedLevel] = useState(1)
   const [selectedChar, setSelectedChar] = useState<CharacterTile | null>(null)
 
   return (
     <div className="learn-page">
       <div className="level-selector">
         <h2 className="section-title">闯关学习</h2>
         <div className="level-tabs">
           {levels.map((level) => (
             <button
               key={level.id}
               className={`level-tab ${selectedLevel === level.id ? 'active' : ''} ${!level.unlocked ? 'locked' : ''}`}
               onClick={() => level.unlocked && setSelectedLevel(level.id)}
               disabled={!level.unlocked}
             >
               <span className="level-num">第{level.id}关</span>
               <span className="level-name">{level.name}</span>
               <span className="level-chars">{level.chars}</span>
               <div className="level-stars">
                 {[1, 2, 3].map((s) => (
                   <span key={s} className={`star ${s <= level.stars ? 'filled' : ''}`}>
                     ★
                   </span>
                 ))}
               </div>
             </button>
           ))}
         </div>
       </div>
 
       <div className="game-board">
         <div className="board-header">
           <span className="board-level-name">{levels.find((l) => l.id === selectedLevel)?.name}</span>
           <span className="board-hint">点击卡片学习汉字</span>
         </div>
         <div className="char-grid">
           {sampleCharacters.slice((selectedLevel - 1) * 6, (selectedLevel - 1) * 6 + 6).map((char) => (
             <button
               key={char.id}
               className={`char-tile ${char.collected ? 'collected' : 'new'}`}
               style={{ '--tile-color': categoryColors[char.category] } as React.CSSProperties}
               onClick={() => setSelectedChar(char)}
             >
               <span className="char-main">{char.char}</span>
               <span className="char-oracle">{char.oracle}</span>
               <span className="char-category-tag">{categoryLabels[char.category]}</span>
             </button>
           ))}
         </div>
       </div>
 
       {selectedChar && (
         <div className="char-modal-overlay" onClick={() => setSelectedChar(null)}>
           <div className="char-modal" onClick={(e) => e.stopPropagation()}>
             <button className="modal-close" onClick={() => setSelectedChar(null)}>✕</button>
             <div className="modal-char-display" style={{ '--tile-color': categoryColors[selectedChar.category] } as React.CSSProperties}>
               <span className="modal-char">{selectedChar.char}</span>
               <span className="modal-oracle">{selectedChar.oracle}</span>
             </div>
             <div className="modal-info">
               <p className="modal-pinyin">{selectedChar.pinyin}</p>
               <p className="modal-meaning">{selectedChar.meaning}</p>
               <div className="modal-category">
                 <span className="category-badge" style={{ background: categoryColors[selectedChar.category] }}>
                   {categoryLabels[selectedChar.category]}
                 </span>
               </div>
               <div className="modal-description">
                 <p>
                   "{selectedChar.char}" 的甲骨文像{selectedChar.oracle}，
                   是{categoryLabels[selectedChar.category]}类象形文字。
                   古人通过观察事物的特征，用简练的线条描绘出这个字。
                 </p>
               </div>
               <button className="practice-btn">开始练习</button>
             </div>
           </div>
         </div>
       )}
     </div>
   )
 }
