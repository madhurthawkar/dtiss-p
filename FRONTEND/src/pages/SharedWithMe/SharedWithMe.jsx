import Navbar from "../../components/Navbar/Navbar"
import { useEffect, useState } from "react"
import { getSharedWithMe } from "../../service/review"
import { toast } from "react-toastify"

function SharedWithMe(){
   const [reviews, setReviews] = useState([])
    useEffect(() => {
  loadSharedReviews()
}, [])

const loadSharedReviews = async () => {
  const userId = localStorage.getItem('userId')

  if (!userId) {
    toast.error('User not logged in')
    return
  }

  try {
    const response = await getSharedWithMe(userId)
    setReviews(response.data.data)
  } catch {
    toast.error('Failed to load shared reviews')
  }
}
                       

    return(
        <div>
            <Navbar />
            <div className='body' style={{margin : "20px 0px 0px 25px"}}>
                <h1 style={{marginBottom: "25px" }}>Shared With Me</h1>
                {reviews.map((review) => (
                    <div key={review.id} className="card" style={{marginBottom : '25px'}}>
                        <div className="card-body" style={{padding : '16px 14px 10px '}}>
                        <h5 className="card-title" style={{marginBottom:'8px'}}>{review.title} <span style={{backgroundColor: '#035afc', color: 'white', fontSize : '14px', padding: '2px 10px', borderRadius: '3px', fontWeight: 'bold'}}> {review.rating}/10 </span></h5>
                        <p className="card-text" style={{marginBottom: '8px',color: '#808080'}}><span style={{fontWeight : '500'}}>Reviewed by: {review.first_name} {review.last_name}</span></p>
                        <p className="card-text" style={{marginBottom :'20px'}}>{review.review}</p>
                        <p className="card-foot" style={{marginBottom:'0px', color: '#999999'}}>Last updated: {review.modified.split('T')[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        
        </div>
    );
}

export default SharedWithMe

