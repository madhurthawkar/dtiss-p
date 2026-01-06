// import Navbar from "../../components/Navbar/Navbar";
// function ChangePassword(){
//     return(
//         <div>
//             <Navbar />
//             <div className='body' style={{margin : "20px 0px 0px 25px"}}>
//             <h1 style={{marginBottom: "25px" }}>Change Password</h1>
//                 <div style={{margin:'30px 0px 20px'}}>
//                     <label style={{marginBottom:'10px'}}>Current Password</label>
//                     <input type="password" placeholder="" className='form-control'></input>
//                 </div>
//                 <div style={{marginBottom:'20px'}}>
//                     <label style={{marginBottom:'10px'}}>New Password</label>
//                     <input type="password" placeholder="" className='form-control'></input>
//                 </div>
//                 <div style={{marginBottom:'20px'}}>
//                     <label style={{marginBottom:'10px'}}>Confirm New Passsword</label>
//                     <input type="password" className='form-control'></input>
//                 </div>
//                 <div style={{}}>
//                     <button className="btn btn-primary">Change Password</button>
//                 </div>
//             </div>
//         </div>
//     );   
// }

// export default ChangePassword

import Navbar from "../../components/Navbar/Navbar"
import { useState } from "react"
import { changePassword } from "../../service/user"
import { toast } from "react-toastify"

function ChangePassword() {
  const userId = localStorage.getItem('userId')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning('All fields are required')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.warning('Password must be at least 6 characters')
      return
    }

    const body = {
      userId,
      currentPassword,
      newPassword
    }

    try {
      const response = await changePassword(body)

      if (response.data.status === 'success') {
        toast.success('Password changed successfully')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error(response.data.error)
      }
    } catch {
      toast.error('Failed to change password')
    }
  }

  return (
    <div>
      <Navbar />
      <div className='body' style={{ margin: "20px 0px 0px 25px", maxWidth: '500px' }}>
        <h1 style={{ marginBottom: "25px" }}>Change Password</h1>

        <div style={{ marginBottom: '20px' }}>
          <label>Current Password</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={onChangePassword}>
          Change Password
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
