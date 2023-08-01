/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import classes from './Signin.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { request } from '../../utils/fetchApi'
import { login } from '../../redux/authSlice'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const options = { 'Content-Type': 'application/json' }
      const data = await request('/auth/login', 'POST', options, { email, password })
      console.log(data)
      //this data is actually action.payload , we have data={token:"addassf",others:{pura user object hai}} others key hi hamari set hui hia as a user state in redux
      dispatch(login(data))
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Email....'
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <input
            type="password"
            placeholder='Password...'
            onChange={(e) => { setPassword(e.target.value) }}

          />
          <button type='submit'>Sign in</button>
          <p>have a account ? <Link to='/signup'>Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signin