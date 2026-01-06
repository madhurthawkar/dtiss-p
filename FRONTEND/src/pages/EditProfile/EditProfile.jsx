// import Navbar from "../../components/Navbar/Navbar";
// function EditProfile(){
//  return(
//     <div>
//         <Navbar />
//         <div className='body' style={{margin : "20px 0px 0px 25px"}}>
//             <h1 style={{marginBottom: "25px" }}>Edit Profile</h1>
//             <div className="row" style={{margin:'30px 0px 20px'}}>
//                 <div className="col">
//                     <label style={{marginBottom:'10px'}}>First Name</label>
//                     <input type="text" placeholder="John" className='form-control'></input>
//                 </div>
//                 <div className="col">
//                     <label style={{marginBottom:'10px'}}>Last Name</label>
//                     <input type="text" placeholder="Doe" className='form-control'></input>
//                 </div>
//                 <div style={{marginBottom:'20px'}}>
//                     <label style={{marginBottom:'10px'}}>Email address</label>
//                     <input type="email" placeholder="john@emaple.com" className='form-control'></input>
//                 </div>
//                 <div style={{marginBottom:'20px'}}>
//                     <label style={{marginBottom:'10px'}}>Mobile Number</label>
//                     <input type="tel" placeholder="+1234567890" className='form-control'></input>
//                 </div>
//                 <div style={{marginBottom:'20px'}}>
//                     <label style={{marginBottom:'10px'}}>Date of Birth</label>
//                     <input type="date" className='form-control'></input>
//                 </div>
//                 <div style={{}}>
//                     <button className="btn btn-primary">Save Changes</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//  );   
// }

// export default EditProfile

import Navbar from "../../components/Navbar/Navbar"
import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "../../service/user"
import { toast } from "react-toastify"

function EditProfile() {
  const userId = localStorage.getItem('userId')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [birth, setBirth] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await getProfile(userId)
      const data = response.data.data[0]

      setFirstName(data.first_name)
      setLastName(data.last_name)
      setEmail(data.email)
      setMobile(data.mobile)
      setBirth(data.birth?.substring(0, 10))
    } catch {
      toast.error('Failed to load profile')
    }
  }

  const onSave = async () => {
    if (!firstName || !lastName || !email) {
      toast.warning('Required fields missing')
      return
    }

    const body = {
      userId,
      firstName,
      lastName,
      email,
      mobile,
      birth
    }

    try {
      const response = await updateProfile(body)

      if (response.data.status === 'success') {
        toast.success('Profile updated successfully')
      } else {
        toast.error(response.data.error)
      }
    } catch {
      toast.error('Failed to update profile')
    }
  }

  return (
    <div>
      <Navbar />
      <div className='body' style={{ margin: "20px 0px 0px 25px", maxWidth: '800px' }}>
        <h1 style={{ marginBottom: "25px" }}>Edit Profile</h1>

        <div className="row" style={{ margin: '30px 0px 20px' }}>
          <div className="col">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="col">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={onSave}>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditProfile
