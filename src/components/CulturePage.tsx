 import { useState } from 'react'
 
 interface CultureTopic {
   id: number
   title: string
   subtitle: string
   icon: string
   color: string
   summary: string
   content: string
 }
 
 const cultureTopics: CultureTopic[] = [
   {
     id: 1,
     title: '甲骨文之谜',
     subtitle: '汉字的起源',
     icon: '🦴',
     color: '#6B8E5A',
     summary: '探索3000年前刻在龟甲和兽骨上的神秘文字',
     content: '甲骨文是中国已知最古老的成熟文字系统，距今约3600年。商代的人们将文字刻在龟甲和兽骨上，用于占卜记事。甲骨文已经具备了汉字"象形、指事、会意、形声"等基本构造方法，是理解汉字起源的钥匙。'
   },
   {
     id: 2,
     title: '汉字演变史',
     subtitle: '从甲骨到楷书',
     icon: '📜',
     color: '#C87A2C',
     summary: '看汉字如何从甲骨文→金文→篆书→隶书→楷书一路演变',
     content: '汉字的演变是一部浓缩的中华文明史。从商周的甲骨文、金文，到秦朝统一的小篆，再到汉代的隶书，最终定型为今天的楷书。每一次演变都让汉字变得更加规范和易于书写，却也保留了最初造字的智慧。'
   },
   {
     id: 3,
     title: '六书造字法',
     subtitle: '汉字的构造逻辑',
     icon: '🔤',
     color: '#8B4513',
     summary: '象形、指事、会意、形声、转注、假借——汉字的六种造字方法',
     content: '"六书"是古人总结的六种汉字构造方法：象形（画物成字）、指事（用符号指示）、会意（组合意义）、形声（半形半声）、转注（互训）、假借（借音）。其中形声字占比最大，超过90%的现代汉字都是形声字。'
   },
   {
     id: 4,
     title: '书法国粹',
     subtitle: '笔墨间的艺术',
     icon: '🖌',
     color: '#4A6FA5',
     summary: '领略中国书法——世界上唯一成为艺术的文字书写',
     content: '中国书法是一门将汉字的书写提升到艺术高度的独特文化。从王羲之的《兰亭序》到颜真卿的《祭侄文稿》，书法家们通过笔墨的浓淡、线条的粗细、结构的疏密，表达情感和意境。学习书法也是理解汉字之美的最好方式。'
   },
   {
     id: 5,
     title: '节气与汉字',
     subtitle: '时间里的文化',
     icon: '🌿',
     color: '#2E7D32',
     summary: '二十四节气中蕴含的汉字智慧',
     content: '二十四节气是古人观察自然节律的伟大创造。"清明""谷雨""白露"——每个节气名称本身就是一幅画面，用最精炼的汉字描绘出天地万物的变化。学习这些汉字，就能读懂古人如何与自然对话。'
   },
   {
     id: 6,
     title: '诗词雅韵',
     subtitle: '汉字的声音之美',
     icon: '📝',
     color: '#6A1B9A',
     summary: '在唐诗宋词中感受汉字的音韵和意境',
     content: '汉字不仅有形，更有声。唐诗宋词将汉字的声调、韵律发挥到了极致。"床前明月光，疑是地上霜"——简单的20个字，却能在每个人心中画出一幅明月图。通过诗词学习汉字，能同时体会其形、音、义三美。'
   },
 ]
 
 export default function CulturePage() {
   const [selectedTopic, setSelectedTopic] = useState<CultureTopic | null>(null)
 
   return (
     <div className="culture-page">
       <h2 className="section-title">文化拓展</h2>
       <p className="section-subtitle">通过文化了解汉字，通过汉字了解中国</p>
 
       <div className="culture-grid">
         {cultureTopics.map((topic) => (
           <button
             key={topic.id}
             className="culture-card"
             style={{ '--card-color': topic.color } as React.CSSProperties}
             onClick={() => setSelectedTopic(topic)}
           >
             <div className="culture-card-icon">{topic.icon}</div>
             <div className="culture-card-body">
               <h3 className="culture-card-title">{topic.title}</h3>
               <p className="culture-card-subtitle">{topic.subtitle}</p>
               <p className="culture-card-summary">{topic.summary}</p>
             </div>
             <div className="culture-card-arrow">→</div>
           </button>
         ))}
       </div>
 
       {selectedTopic && (
         <div className="culture-modal-overlay" onClick={() => setSelectedTopic(null)}>
           <div className="culture-modal" onClick={(e) => e.stopPropagation()}>
             <button className="modal-close" onClick={() => setSelectedTopic(null)}>✕</button>
             <div className="culture-modal-header" style={{ background: selectedTopic.color }}>
               <span className="culture-modal-icon">{selectedTopic.icon}</span>
               <h3>{selectedTopic.title}</h3>
               <p>{selectedTopic.subtitle}</p>
             </div>
             <div className="culture-modal-body">
               <p>{selectedTopic.content}</p>
             </div>
           </div>
         </div>
       )}
     </div>
   )
 }
