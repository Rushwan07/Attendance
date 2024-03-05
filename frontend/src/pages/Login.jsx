import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      await login(email, password)
    }
  return (
    <div>
       <form className='container w-50 mt-5' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Submit
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login
