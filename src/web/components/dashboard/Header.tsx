import { useTranslation } from 'react-i18next'
import './Header.scss'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="sc-header">
      <div className="sc-header-deco left">
        <span className="deco-diamond"></span>
        <span className="deco-line"></span>
        <span className="deco-bar"></span>
      </div>
      <div className="sc-header-title-block">
        <span className="sc-header-corner tl"></span>
        <span className="sc-header-corner tr"></span>
        <span className="sc-header-corner bl"></span>
        <span className="sc-header-corner br"></span>
        <h1 className="sc-header-title">{t('dashboard.title')}</h1>
        <p className="sc-header-subtitle">{t('dashboard.subtitle')}</p>
      </div>
      <div className="sc-header-deco right">
        <span className="deco-bar"></span>
        <span className="deco-line"></span>
        <span className="deco-diamond"></span>
      </div>
    </header>
  )
}
