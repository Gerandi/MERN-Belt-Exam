import { Link } from "react-router-dom"
import './Navbar.css'

const Banner = ({ path, title }) => {
  return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#"><h1>Pet Shelter</h1></a>
        <a className="nav-item active"><Link to={path} className="nav-link">{title}</Link></a>
      </nav>
  )
}

export default Banner
