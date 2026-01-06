// import Navbar from "../../components/Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { deleteReview } from "../../service/review"
// function DeleteReview(){
//    const navigate = useNavigate()
//    const goBack = async () => {
//       navigate('/myreviews')
//    }
//    const onDelete = async (reviewId) => {
//       const confirm = window.confirm('Are you sure you want to delete this review?')
//       if(!confirm) return

//       const userId =localStorage.getItem('userId')
//       try {
//          const response = await deleteReview(reviewId, userId)

//          if (response.data.status === 'success') {
//             toast.success('Review deleted')
//             loadMyReviews()   // 🔁 refresh list
//          } else {
//             toast.error(response.data.error)
//          }
//       } catch {
//       toast.error('Failed to delete review')
//       }
//    }
      
//    return(
//       <div>
//          <Navbar />
//          <div className="container" style={{margin:'30px 0px', width: "630px", position:'absolute', left:'50%', transform: 'translate(-50%)'}}>
//          {reviews.map((review) => (
//          <div class="card" key={review.rid}>
//             <div class="card-header text-bg-danger mb-3" style={{marginBottom:'20px'}}><h3>Delete Review</h3></div>
//             <div class="card-body">
//                <h5 class="card-title" style={{marginBottom:'20px'}}>Review for: <i>{review.title}</i> <span style={{backgroundColor: '#035afc', color: 'white', fontSize : '14px', padding: '2px 10px', borderRadius: '3px', fontWeight: 'bold'}}> {review.rating}/10 </span></h5>
//                <p class="card-text" style={{marginBottom:'20px'}}>{review.review}</p>
//                <div class='card' style={{marginBottom:'20px' ,padding:'10px 10px', backgroundColor:'#ffcccc', color:'#660000'}}>
//                   <div class='card-title'><h5>Are you sure you want to delete this review?</h5></div>
//                   <p class="card-text">This action cannot be undone. Any shares of this review will also be removed.</p>
//                </div>
//                <div>
//                   <button className="btn btn-secondary" onClick={goBack}>Cancel</button>
//                   <button className="btn btn-danger"style={{position: 'absolute', right: '16px'}}>Confirm Delete</button>
//                </div>
//             </div>
//          </div>
//          ))}
//          </div>
//       </div>
//    );   
// }

// export default DeleteReview

import Navbar from "../../components/Navbar/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { deleteReview, getReviewById } from "../../service/review"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function DeleteReview() {
  const navigate = useNavigate()
  const { reviewId } = useParams()

  const [review, setReview] = useState(null)

  const goBack = () => {
    navigate('/myreviews')
  }

  useEffect(() => {
    loadReview()
  }, [])

  const loadReview = async () => {
    try {
      const response = await getReviewById(reviewId)

      if (response.data.status === 'success') {
        setReview(response.data.data[0])
      } else {
        toast.error(response.data.error)
      }
    } catch {
      toast.error('Failed to load review')
    }
  }

  const onDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this review?')
    if (!confirm) return

    const userId = localStorage.getItem('userId')

    try {
      const response = await deleteReview(reviewId, userId)

      if (response.data.status === 'success') {
        toast.success('Review deleted')
        navigate('/myreviews')
      } else {
        toast.error(response.data.error)
      }
    } catch {
      toast.error('Failed to delete review')
    }
  }

  if (!review) return null

  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginTop: '30px', maxWidth: '650px' }}>
        <div className="card">
          <div className="card-header bg-danger text-white">
            <h3>Delete Review</h3>
          </div>

          <div className="card-body">
            <h5 className="card-title">
              Review for: <i>{review.title}</i>
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

            <p className="card-text">{review.review}</p>

            <div className="alert alert-danger">
              <h5>Are you sure?</h5>
              <p>This action cannot be undone.</p>
            </div>

            <button className="btn btn-secondary me-2" onClick={goBack}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onDelete}>
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteReview
