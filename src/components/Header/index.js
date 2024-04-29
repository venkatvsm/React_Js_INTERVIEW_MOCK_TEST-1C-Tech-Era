import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <nav className="navBar">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="navBar_image"
      />
    </Link>
  </nav>
)
export default Header
