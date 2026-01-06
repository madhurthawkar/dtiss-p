import './SignIn.css'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { login } from '../../service/user'
import { Link, useNavigate } from 'react-router-dom' 
import { useAuth } from '../../providers/AuthProvider'
function SignIn()
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  // get the user from AuthContext
    const { setUser } = useAuth()

  // get navigate function reference
    const navigate = useNavigate()

    const onSignIn = async () => {
        if (email.length == 0) {
        toast.warning('please enter email')
        } else if (password.length == 0) {
        toast.warning('please enter password')
        } else {
     const response = await login(email, password)
      if (response['status'] == 'success') {
        toast.success('login successful')

        // get the token from response and cache it in local storage
        localStorage.setItem('token', response['data']['token'])
        localStorage.setItem('firstName', response['data']['firstName'])
        localStorage.setItem('lastName', response['data']['lastName'])
        localStorage.setItem('userId', response['data']['userId'])

        // set the logged in user information
        setUser({
          firstName: response['data']['firstName'],
          lastName: response['data']['lastName'],
        })
        navigate('/allmovies')
      } else {
        toast.error(response['error'])
      }
        }
    }

        

    return(
        <div className='container' style={{marginTop: '10px', width: '500px'}}>
            <h3 className='page-header' style={{textAlign:'center'}}>Sign In</h3>

            <div className='signIn-container'>
                <div className='mb-3' style={{ padding:'0px 0px 10px 0px'}}>
                    <label htmlFor='email'style={{ padding:'0px 0px 10px 0px'}}>Email address</label>
                    <input
                    onChange={(e) => {
                    setEmail(e.target.value)
                    }}
                    type='email'
                    className='form-control'
                    id='email'
                    autoComplete='email'
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' style={{ padding:'0px 0px 10px 0px'}}>Password</label>
                    <input
                    onChange={(e) => {
                    setPassword(e.target.value)
                    }}
                    type='password'
                    className='form-control'
                    id='password'
                    />
                </div>
                <div className='mb-3' style={{ padding:'10px 0px'}}>    
                    <button
                        style={{width:'456px'}}
                        onClick={onSignIn}
                        className='btn btn-primary'
                    >
                    Sign In
                    </button>
                </div>
                <div className='mb-3' style={{ padding:'0px 0px 5px 0px', textAlign:'center'}}>
                    Don't have an account? <Link to='/signup'>SignUp</Link>
                </div>
            </div>
        </div>
        
    );
}

export default SignIn
