import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface LoginPageProps { onLogin: (email: string) => void }
export default function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useTranslation()
  const [isReg, setReg] = useState(false)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [cpw, setCpw] = useState('')
  const [showCap, setShowCap] = useState(false)
  const [capPass, setCapPass] = useState(false)
  const [capOrder, setCapOrder] = useState<number[]>([])
  const [err, setErr] = useState('')
  const nums = [1,2,3,4].sort(()=>Math.random()-0.5)

  const onCap = (n: number) => {
    if (capPass) return
    let o = [...capOrder, n]
    setCapOrder(o)
    if (o.length === 4) {
      if (JSON.stringify(o) === JSON.stringify([1,2,3,4])) { setCapPass(true); setShowCap(false) }
      else setCapOrder([])
    }
  }

  const submit = () => {
    setErr('')
    if (!email || !pw) return
    if (isReg && pw !== cpw) { setErr('密码不一致'); return }
    if (!capPass) { setShowCap(true); return }
    localStorage.setItem('hellohanzi_user', JSON.stringify({email}))
    localStorage.setItem('hellohanzi_logged_in', 'true')
    onLogin(email)
  }

  if (showCap) return (
    <div className='captcha-overlay'><div className='captcha-box'>
      <h3>人机验证</h3>
      <p>请按顺序点击: 1→2→3→4</p>
      <div className='captcha-grid'>{nums.map(n =>
        <button key={n} className={'captcha-btn ' + (capOrder.includes(n) ? 'used' : '')}
          onClick={()=>onCap(n)} disabled={capOrder.includes(n)}>{n}</button>
      )}</div>
      {capOrder.length>0 && capOrder.length<4 && <p className='captcha-progress'>已选择 {capOrder.length}/4</p>}
    </div></div>
  )

  return (
    <div className='login-page'>
      <h2>{isReg ? '注册' : '登录'}</h2>
      {err && <p className='login-error'>{err}</p>}
      <input className='login-input' type='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input className='login-input' type='password' placeholder='密码' value={pw} onChange={e=>setPw(e.target.value)} />
      {isReg && <input className='login-input' type='password' placeholder='确认密码' value={cpw} onChange={e=>setCpw(e.target.value)} />}
      <button className='login-btn' onClick={submit}>{isReg ? '注册' : '登录'}</button>
      <button className='login-switch' onClick={()=>{setReg(!isReg);setErr('');}}>
        {isReg ? '已有账号？登录' : '没有账号？注册'}
      </button>
    </div>
  )
}