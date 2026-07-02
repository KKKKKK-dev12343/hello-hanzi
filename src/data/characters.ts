// 汉字说 · 30个基础汉字数据 (HSK 1级)

export interface HanziData {
  id: number
  char: string
  pinyin: string
  meaning: string
  oracleDescription: string
  oracleEmoji: string
  category: string
  strokeCount: number
  commonWords: string[]
  cultureStory: string
}

export interface LevelData {
  id: number
  name: string
  subtitle: string
  description: string
  characterIds: number[]
}

export const characters: HanziData[] = [
  { id: 1, char: '日', pinyin: 'rì', meaning: 'sun', oracleDescription: '一个圆圈中间有一点——古人眼中的太阳', oracleEmoji: '☀️', category: '自然', strokeCount: 4, commonWords: ['日子', '今天', '生日'], cultureStory: '“日”字在甲骨文中画的是一个圆圈里边加一点，正是太阳的模样。古人认为中间那一点表示太阳发光。' },
  { id: 2, char: '月', pinyin: 'yuè', meaning: 'moon', oracleDescription: '像一弯新月的形状', oracleEmoji: '\ud83c\udf19', category: '自然', strokeCount: 4, commonWords: ['月亮', '明天', '岁月'], cultureStory: '“月”字甲骨文画的是一弯新月，因为月亮缺多圆少，古人就用弯月的形状来表示。' },
  { id: 3, char: '山', pinyin: 'shān', meaning: 'mountain', oracleDescription: '三座山峰并立的形状', oracleEmoji: '⛰️', category: '自然', strokeCount: 3, commonWords: ['山脉', '火山', '山东'], cultureStory: '“山”字的甲骨文就是三座山峰排在一起的样子，中间那座最高，两边的比较低，非常形象。' },
  { id: 4, char: '水', pinyin: 'shuǐ', meaning: 'water', oracleDescription: '中间一条曲线，两旁有水滴', oracleEmoji: '\ud83c\udf0a', category: '自然', strokeCount: 4, commonWords: ['水果', '河水', '饮水'], cultureStory: '甲骨文中的“水”字画的是一条山峥间的溪流，中间是水流，两旁是飞溅的水花。' },
  { id: 5, char: '火', pinyin: 'huǒ', meaning: 'fire', oracleDescription: '像一团燃烧的火焰', oracleEmoji: '\ud83d\udd25', category: '自然', strokeCount: 4, commonWords: ['火车', '火山', '火焰'], cultureStory: '“火”字的甲骨文就是一团烧得正旺的火焰，上宽下窄，火苗在空中舞动。' },
  { id: 6, char: '木', pinyin: 'mù', meaning: 'tree', oracleDescription: '一棵树，上有枝下有根', oracleEmoji: '\ud83c\udf33', category: '自然', strokeCount: 4, commonWords: ['木头', '森林', '木材'], cultureStory: '甲骨文的“木”字画的是一棵完整的树：上面是树枝和树叶，下面是树根。' },
  { id: 7, char: '雨', pinyin: 'yǔ', meaning: 'rain', oracleDescription: '上面一横代表天，下面有雨滴落下', oracleEmoji: '\ud83c\udf27️', category: '自然', strokeCount: 8, commonWords: ['雨天', '下雨', '雨水'], cultureStory: '“雨”字的甲骨文非常生动：一横代表天空，下面垂着的线条就是落下的雨点。' },
  { id: 8, char: '云', pinyin: 'yún', meaning: 'cloud', oracleDescription: '像云朵回旋的形状', oracleEmoji: '☁️', category: '自然', strokeCount: 12, commonWords: ['白云', '云彩', '云端'], cultureStory: '甲骨文中的“云”字画的是云气回旋卷起的样子，像一团丝缕绕成的圆圈。' },
  { id: 9, char: '石', pinyin: 'shí', meaning: 'stone', oracleDescription: '山崖下有一块石头', oracleEmoji: '\ud83e\udea8', category: '自然', strokeCount: 5, commonWords: ['石头', '石头', '石材'], cultureStory: '“石”字的甲骨文为山崖下有一块石头的样子，指的就是山岩上的石头。' },
  { id: 10, char: '田', pinyin: 'tián', meaning: 'field', oracleDescription: '被分成四块的田地', oracleEmoji: '\ud83c\udf3e', category: '自然', strokeCount: 5, commonWords: ['田地', '种田', '田野'], cultureStory: '“田”字的甲骨文画的就是一块被畟区分成四部分的水田，非常直观。' },
  { id: 11, char: '土', pinyin: 'tǔ', meaning: 'earth', oracleDescription: '地面上一堆土', oracleEmoji: '\ud83e\uddf1', category: '自然', strokeCount: 3, commonWords: ['土地', '泥土', '土地'], cultureStory: '甲骨文的“土”字画的是地上堆起的一堆土，上面的圆点就是土粒。' },
  { id: 12, char: '金', pinyin: 'jīn', meaning: 'gold', oracleDescription: '覆盖着矿物的青铜器', oracleEmoji: '\ud83d\udcb0', category: '自然', strokeCount: 8, commonWords: ['金子', '金钱', '金色'], cultureStory: '“金”字甲骨文表示的是矿石中的金属，上面覆盖着矿物，下面是盆器，指代贵金属。' },
  { id: 13, char: '人', pinyin: 'rén', meaning: 'person', oracleDescription: '一个侧立的人形，胳背直立', oracleEmoji: '\ud83d\udeb6', category: '人', strokeCount: 2, commonWords: ['大人', '人口', '好人'], cultureStory: '“人”字是最简单的象形字，甲骨文中就是一个人侧站的姿势，胳肯一在、下一在就是两条腿。' },
  { id: 14, char: '口', pinyin: 'kǒu', meaning: 'mouth', oracleDescription: '一张张开的嘴巴', oracleEmoji: '\ud83d\udc44', category: '人', strokeCount: 3, commonWords: ['口中', '口语', '入口'], cultureStory: '甲骨文的“口”字就是一张向上张开的嘴巴的形状，古人用最简洁的线条描绘出了嘴巴的轮廓。' },
  { id: 15, char: '手', pinyin: 'shǒu', meaning: 'hand', oracleDescription: '一只手有五根手指', oracleEmoji: '✋', category: '人', strokeCount: 4, commonWords: ['手机', '手表', '手工'], cultureStory: '“手”字的甲骨文画的是整只手，上面分岐的线条代表手指，下面一横代表手掌。' },
  { id: 16, char: '目', pinyin: 'mù', meaning: 'eye', oracleDescription: '一只睁开的眼睛', oracleEmoji: '\ud83d\udc41️', category: '人', strokeCount: 5, commonWords: ['目光', '目的', '注目'], cultureStory: '“目”字的甲骨文画的就是一只水平的眼睛，内部的圆圈代表眼珠，外城代表眼睽。' },
  { id: 17, char: '心', pinyin: 'xīn', meaning: 'heart', oracleDescription: '一颗哈哈的心脏形状', oracleEmoji: '\ud83d\udc99', category: '人', strokeCount: 4, commonWords: ['心情', '爱心', '心中'], cultureStory: '甲骨文的“心”字画的是人体心脏的形状，当时已经认识到心脏的存在。' },
  { id: 18, char: '足', pinyin: 'zú', meaning: 'foot', oracleDescription: '一只脚和脚趾', oracleEmoji: '\ud83e\uddb6', category: '人', strokeCount: 7, commonWords: ['足球', '不足', '心意'], cultureStory: '“足”字甲骨文画的是整条腿和脚，上面是膝盖，下面是脚掌和趾。' },
  { id: 19, char: '牛', pinyin: 'niú', meaning: 'cow', oracleDescription: '一个牛头，有两只角向上弯', oracleEmoji: '\ud83d\udc04', category: '动物', strokeCount: 4, commonWords: ['牛奶', '牛肉', '牛仔'], cultureStory: '“牛”字的甲骨文只画了牛的头部——两只大角向上弯。' },
  { id: 20, char: '羊', pinyin: 'yáng', meaning: 'sheep', oracleDescription: '一个羊头，角向下弯', oracleEmoji: '\ud83d\udc11', category: '动物', strokeCount: 6, commonWords: ['羊肉', '羊毛', '山羊'], cultureStory: '“羊”字甲骨文和牛很像，但角是向下的，这是区分“牛”和“羊”的关键。' },
  { id: 21, char: '马', pinyin: 'mǎ', meaning: 'horse', oracleDescription: '一匹马的侧影，有鬠毛', oracleEmoji: '\ud83d\udc0e', category: '动物', strokeCount: 3, commonWords: ['马过', '马车', '马路'], cultureStory: '“马”字的甲骨文画的是一匹的侧面形象，有头、有嘴、有鬠毛。' },
  { id: 22, char: '鱼', pinyin: 'yú', meaning: 'fish', oracleDescription: '一条鱼，有头有尾', oracleEmoji: '\ud83d\udc1f', category: '动物', strokeCount: 8, commonWords: ['鱼肉', '金鱼', '鱼网'], cultureStory: '甲骨文的“鱼”字是一条鱼的整体轮廓，有鱼头、鱼鳞、鱼鳍、鱼尾。' },
  { id: 23, char: '鸟', pinyin: 'niǎo', meaning: 'bird', oracleDescription: '一只鸟站在树枝上', oracleEmoji: '\ud83d\udc26', category: '动物', strokeCount: 5, commonWords: ['小鸟', '鸟类', '飞鸟'], cultureStory: '“鸟”字的甲骨文画的是一只长尾巴的鸟站在树上，有嘴、翅膀和尾巴。' },
  { id: 24, char: '虫', pinyin: 'chóng', meaning: 'insect', oracleDescription: '一条弯曲的蛇形', oracleEmoji: '\ud83d\udc1b', category: '动物', strokeCount: 6, commonWords: ['昆虫', '小虫', '毛毛虫'], cultureStory: '甲骨文的“虫”字画的是一条盘旋的蛇，因为古人把蛇也归为“虫”。' },
  { id: 25, char: '门', pinyin: 'mén', meaning: 'door', oracleDescription: '两扇对开的门', oracleEmoji: '\ud83d\udeaa', category: '器物', strokeCount: 3, commonWords: ['门口', '开门', '门窗'], cultureStory: '“门”字的甲骨文就是两扇门对开的样子，非常直观地表现了古代建筑的入口。' },
  { id: 26, char: '车', pinyin: 'chē', meaning: 'vehicle', oracleDescription: '一辆马车的侧面视图', oracleEmoji: '\ud83d\ude97', category: '器物', strokeCount: 4, commonWords: ['公车', '火车', '汽车'], cultureStory: '“车”字的甲骨文画的是一辆古代的两轮战车，从上面看下去，有车轴和轮子。' },
  { id: 27, char: '女', pinyin: 'nǔ', meaning: 'woman', oracleDescription: '一个跪坐的女子，两手叠在膝前', oracleEmoji: '\ud83d\udc69', category: '人', strokeCount: 3, commonWords: ['女人', '女生', '女儿'], cultureStory: '“女”字的甲骨文画的是一个跪坐的女子，双手交叠在膝前，表现得优雅端庄。' },
  { id: 28, char: '子', pinyin: 'zǐ', meaning: 'child', oracleDescription: '一个婴儿的轮廓，有大头和小身体', oracleEmoji: '\ud83e\uddd2', category: '人', strokeCount: 3, commonWords: ['子女', '孩子', '子女'], cultureStory: '甲骨文的“子”字画的是一个小婴儿，头大身小，两只手张开摆动。' },
  { id: 29, char: '大', pinyin: 'dà', meaning: 'big', oracleDescription: '一个张开双臂站立的人', oracleEmoji: '\ud83d\udc4f', category: '人', strokeCount: 3, commonWords: ['大家', '大小', '大人'], cultureStory: '“大”字的甲骨文画的是一个人张开双臂、分开双腿站着，展示了“勃大”的含义。' },
  { id: 30, char: '小', pinyin: 'xiǎo', meaning: 'small', oracleDescription: '三颗细小的沙粒', oracleEmoji: '\ud83e\udea4', category: '人', strokeCount: 3, commonWords: ['小心', '小学', '小小'], cultureStory: '甲骨文中的“小”字画的是三颗小细尘粒，表示微小的东西。' },
]

export const levels: LevelData[] = [
  { id: 1, name: '自然万象', subtitle: 'Nature', description: '日月山水火木——大自然的基本元素', characterIds: [1, 2, 3, 4, 5, 6] },
  { id: 2, name: '天地之间', subtitle: 'Heaven & Earth', description: '雨云石田土金——天地的恶赐', characterIds: [7, 8, 9, 10, 11, 12] },
  { id: 3, name: '人之初', subtitle: 'Human Body', description: '人口手目心足——认识自己', characterIds: [13, 14, 15, 16, 17, 18] },
  { id: 4, name: '生灵万物', subtitle: 'Living Beings', description: '牛羊马鱼鸟虫——动物们的故事', characterIds: [19, 20, 21, 22, 23, 24] },
  { id: 5, name: '日用之间', subtitle: 'Daily Life', description: '门车女子大小——日常生活的智慧', characterIds: [25, 26, 27, 28, 29, 30] },
]

export function getCharacterById(id: number): HanziData | undefined {
  return characters.find(c => c.id === id)
}

export function getCharactersByLevel(levelId: number): HanziData[] {
  const level = levels.find(l => l.id === levelId)
  if (!level) return []
  return level.characterIds.map(id => getCharacterById(id)!).filter(Boolean)
}