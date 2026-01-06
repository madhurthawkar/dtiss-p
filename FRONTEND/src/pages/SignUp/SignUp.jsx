import { register } from '../../service/user'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";

function SignUp()
{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

  // get navigate function reference
    const navigate = useNavigate()

    const onSignup = async () => {
        if (firstName.length == 0) {
        toast.warning('please enter first name')
        } else if (lastName.length == 0) {
        toast.warning('please enter last name')
        } else if (email.length == 0) {
        toast.warning('please enter email')
        } else if (phone.length == 0) {
        toast.warning('please enter phone number')
        } else if (password.length == 0) {
        toast.warning('please enter password')
        } else if (confirmPassword.length == 0) {
        toast.warning('please confirm password')
        } else if (password != confirmPassword) {
        toast.warning('password does not match')
        } else {
        const response = await register(
        firstName,
        lastName,
        email,
        phone,
        dob,
        password
        )
        if (response['status'] === 'success') {
            toast.success('Successfully registered user')

        //go to the Login page
            navigate('/signin')
        } else {
            toast.error(response['error'])
        }
        }
    }
    return(
        <div className="container" style={{marginTop: '10px', width: '500px'}}>
            <div style={{textAlign: 'center'}}>
                <h3>Sign Up</h3>
            </div>
            <div style={{margin:'10px'}}>
                <div className='row' style={{ padding:'5px 0px'}}>
                    <div className="col">
                        <label style={{ padding:'0px 0px 5px 0px'}}>First Name</label>
                        <input 
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text" 
                        placeholder="John" className='form-control'></input>
                    </div>
                    <div className="col">
                        <label style={{ padding:'0px 0px 5px 0px'}}>Last Name</label>
                        <input 
                        onChange={(e) => setLastName(e.target.value)}
                        type="text" 
                        placeholder="Doe" className='form-control'></input>
                    </div>
                </div>
                <div className='Email' style={{padding:'5px 0px'}}>
                    <label style={{ padding:'0px 0px 5px 0px'}}>Email address</label>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder="yourname@email.com" className='form-control'></input>
                </div>
                <div className="phone" style={{padding:'5px 0px'}}>
                    <label style={{ padding:'0px 0px 5px 0px'}}>Mobile Number</label>
                    <input 
                    onChange={(e) => setPhone(e.target.value)}
                    type='tel' 
                    placeholder='+1234567890' className='form-control'></input>
                </div>
                <div className="dob" style={{padding:'5px 0px'}}>
                    <label style={{ padding:'0px 0px 5px 0px'}}>Date of Birth</label>
                    <input 
                    onChange={(e) => setDob(e.target.value)}
                    type='date'  className='form-control'></input>
                </div>
                <div className='password' style={{padding:'5px 0px'}}>
                    <label style={{ padding:'0px 0px 5px 0px'}}>Password</label>
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type='password' className='form-control'></input>
                </div>
                <div className='password' style={{padding:'5px 0px'}}>
                    <label style={{ padding:'0px 0px 5px 0px'}}>Confirm Password</label>
                    <input 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type='password' className='form-control'></input>
                </div>
                <div
                    style={{padding: '20px 0px'}}
                >
                    <button
                        style={{width: '456px'}}
                        onClick={onSignup}
                        className='btn btn-success'
                
                    >
                        Sign Up
                    </button>
                </div>
                <div
                style={{textAlign: 'center', padding: "5px 0px"}} 
                className='mb-3'>
                    Already have an account? <Link to='/signin'>Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp
