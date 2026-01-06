// import { use } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// function ShareReview(){
//    const navigate = useNavigate()
//    const goBack = async () => {
//       navigate('/myreviews')
//    }
//    const reviews = [
//       {
//          rid: 1,
//          movie_id: 1,
//          rating: 4,
//          review: "very good movie",
//          user_id: 1,
//          modified: "2025-11-13T22:51:17.000Z",
//          title: "Titanic",
//          release_date: "1995-12-24T18:30:00.000Z",
//          firstname: "Sanket",
//          lastname: "Raut",
//          email: "sanket@gmail.com",
//       }
//    ];
//    const users = [
//       {
//          email:'jane@example.com',
//          firstname:'Jane',
//          lastname:'Smith'
//       },
//       {
//          email:'mike@example.com',
//          firstname:'Mike',
//          lastname:'Johnson'
//       },
//       {
//          email:'sarah@example.com',
//          firstname:'Sarah',
//          lastname:'Williams'
//       },
//       {
//          email:'david@example.com',
//          firstname:'David',
//          lastname:'Brown'
//       }
//    ];   
//    return(
//       <div>
//          <Navbar />
//          <h1 style={{margin : "20px 0px 20px 25px"}}>Share Review</h1>
//          <div className="container">
//             {reviews.map((review) => (
//             <div className="card" key={review.rid} style={{padding:'16px', marginBottom: '30px'}}>
//                <h5 className="card-title" style={{fontWeight:'bold'}}>Review to Share: <i>{review.title}</i> <span style={{backgroundColor: '#035afc', color: 'white', fontSize : '14px', padding: '2px 10px', borderRadius: '3px', fontWeight: 'bold'}}> {review.rating}/10 </span></h5>
//                <div className="card-text">{review.review}</div>
//             </div>
//             ))}
//             <div>
//                <p>Select Users to Share With</p>
//                <div className="card" style={{maxHeight:'100px' ,padding:'10px 16px', marginBottom: '0.5px', overflowY:'scroll'}}>
//                   {users.map((user) => (
//                      <div className="card-text">{user.firstname} {user.lastname} ({user.email})</div>
//                   ))}
//                </div>
//                   <p style={{color:'gray'}}>Hold Ctrl/Cmd to select multiple users</p>
//                   <div>
//                   <button className="btn btn-primary" style={{marginRight:'10px'}}>Share Review</button>
//                   <button className="btn btn-secondary" onClick={goBack}>Cancel</button>
//                   </div>
//             </div>
//          </div>
//       </div>
//    );   
// }

// export default ShareReview

import Navbar from "../../components/Navbar/Navbar"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getSharedReview, shareReview } from "../../service/review"
import { getAllUsers } from "../../service/user"
import { toast } from "react-toastify"

function ShareReview() {
  const { reviewId } = useParams()
  const navigate = useNavigate()

  const [review, setReview] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedShareIds, setSelectedShareIds] = useState([])


  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
  const reviewRes = await getSharedReview(reviewId)

  const userId = localStorage.getItem('userId')
  const userRes = await getAllUsers(userId)

  setReview(reviewRes.data.data[0])
  setUsers(userRes.data.data)
}


  const toggleUser = (userId) => {
  if (selectedShareIds.includes(userId)) {
    setSelectedShareIds(selectedShareIds.filter(id => id !== userId))
  } else {
    setSelectedShareIds([...selectedShareIds, userId])
  }
}


  const onShare = async () => {
   console.log('SHARE CLICKED', selectedShareIds)
  if (selectedShareIds.length === 0) {
    toast.warning('Select at least one user')
    return
  }
console.log('SHARE CLICKED', selectedShareIds)
  const body = {
  reviewId: Number(reviewId),
  shareIds: selectedShareIds
}

   try{
   const response = await shareReview(body)
      console.log('BACKEND RESPONSE', response.data)
  if (response.data.status === 'success') {
    toast.success('Review shared successfully')
    navigate('/myreviews')
  } else {
    toast.error(response.data.error)
  }
  }catch(err) {
    console.error('SHARE ERROR', err)
    toast.error('Share failed')
  }
}


  if (!review) return null

  return (
    <div>
      <Navbar />
      <div className="container" style={{ maxWidth: '650px', marginTop: '30px' }}>
        <h1>Share Review</h1>

        {/* REVIEW CARD */}
        <div className="card mb-3 p-3">
          <h5 className="card-title">
            Review to Share: <i>{review.title}</i>
            <span style={{
              backgroundColor: '#035afc',
              color: 'white',
              fontSize: '14px',
              padding: '2px 10px',
              borderRadius: '3px',
              fontWeight: 'bold',
              marginLeft: '10px'
            }}>
              {review.rating}/10
            </span>
          </h5>
          <div className="card-text">{review.review}</div>
        </div>

        {/* USER SELECTION */}
        <p>Select Users to Share With</p>
        <div className="card" style={{ maxHeight: '140px', overflowY: 'auto', padding: '10px' }}>
          {users.map((u) => (
            <div key={u.id}>
            <input
            type="checkbox"
            checked={selectedShareIds.includes(u.id)}
            onChange={() => toggleUser(u.id)}
         />{' '}
         {u.first_name} {u.last_name} ({u.email})
         </div>
      ))}

        </div>

        <p style={{ color: 'gray' }}>Select multiple users if needed</p>

        <button className="btn btn-primary me-2" onClick={onShare}>
          Share Review
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/myreviews')}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ShareReview
