import './Logo.scss'

interface LogoProps {
  collapsed: boolean
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <div className="logo">
      <img src="/logo.png" alt="logo" />
      <span className={collapsed ? 'title-hide' : ''}>Tauri Kits</span>
    </div>
  )
}
