import classes from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { BsHouseDoor } from 'react-icons/bs';

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
          Real Estate <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li className={classes.listitem}>Home</li>
          <li className={classes.listitem}>About</li>
          <li className={classes.listitem}>Featured</li>
          <li className={classes.listitem}>Contact</li>
        </ul>
        <div className={classes.right}>
          <Link to='/signup'>Sign up</Link>
          <Link to='/signin'>Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar