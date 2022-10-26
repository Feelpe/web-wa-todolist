import './styles.scss'

import logoWa from '../../assets/logo.svg'

export function Header() {
  return (
    <header className="header">
      <div>
        <img src={logoWa} alt="WA logo"/>
      </div>
    </header>
  )
}
