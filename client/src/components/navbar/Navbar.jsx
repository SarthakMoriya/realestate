/* eslint-disable no-unused-vars */
import classes from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BsHouseDoor } from 'react-icons/bs';
import { logout } from '../../redux/authSlice';
import { useState } from 'react';
import { AiOutlineFileImage, AiOutlineClose } from 'react-icons/ai'
import { request } from '../../utils/fetchApi'

const Navbar = () => {
  const [showForm, setShowForm] = useState('');
  const [photo, setPhoto] = useState('');
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth)//auth is name of slice
  // console.log(user)
  const handleLogout = () => {
    dispatch(logout())
  }
  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleListProperty = async (e) => {
    e.preventDefault();
    let filename = null;
    if (photo) {
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append('filename', filename);
      formData.append('image', photo);

      await request('/upload/image', "POST", {}, formData, true)
    }
    else {
      return
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      const data = await request('/property', "POST", headers, { ...state, img: filename })
      console.log(data)
      setShowForm(false)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
          Real Estate <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li className={classes.listitem}><Link to='/'>Home</Link></li>
          <li className={classes.listitem}>About</li>
          <li className={classes.listitem}><a href='#featuredProperties'>Featured</a></li>
          <li className={classes.listitem}>Contact</li>
        </ul>
        <div className={classes.right}>
          {!user && <>
            <Link to='/signup'>Sign up</Link>
            <Link to='/signin'>Sign in</Link>
          </>}
          {
            user && <>
              <span>Hello {user?.username}</span>
              <span
                className={classes.logoutBtn}
                onClick={handleLogout}>
                Logout
              </span>
              <Link
                className={classes.list}
                onClick={() => { setShowForm(true) }}
              >List your properties
              </Link>
            </>
          }
        </div>
      </div>
      {showForm &&
        <div className={classes.listPropertyForm} onClick={handleCloseForm}>
          <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>List Property</h2>
            <form onSubmit={handleListProperty}>
              <input value={state?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
              <input value={state?.type} type="text" placeholder='Type' name="type" onChange={handleState} />
              <input value={state?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
              <input value={state?.continent} type="text" placeholder='Continent' name="continent" onChange={handleState} />
              <input value={state?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
              <input value={state?.sqmeters} type="number" placeholder='Sq. meters' name="sqmeters" onChange={handleState} />
              <input value={state?.beds} type="number" placeholder='Beds' name="beds" step={1} min={1} onChange={handleState} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                <label htmlFor='photo'>Property picture <AiOutlineFileImage /></label>
                <input
                  type="file"
                  id='photo'
                  style={{ display: 'none' }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && <p>{photo.name}</p>}
              </div>
              <button>List property</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>

        </div>}
    </div >
  )
}

export default Navbar