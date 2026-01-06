import Navbar from "../../components/Navbar/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getReviewById, updateReview } from "../../service/review"
import { toast } from "react-toastify"

function EditReview() {
  const { reviewId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')

  useEffect(() => {
    loadReview()
  }, [])

  const loadReview = async () => {
    try {
      const response = await getReviewById(reviewId)
      const data = response.data.data[0]

      setTitle(data.title)
      setRating(data.rating)
      setReview(data.review)
    } catch {
      toast.error('Failed to load review')
    }
  }

  const onUpdate = async () => {
    if (!rating || !review) {
      toast.warning('Please fill all fields')
      return
    }

    const body = {
      rating,
      review,
      userId: localStorage.getItem('userId')
    }

    try {
      const response = await updateReview(reviewId, body)

      if (response.data.status === 'success') {
        toast.success('Review updated')
        navigate('/myreviews')
      } else {
        toast.error(response.data.error)
      }
    } catch {
      toast.error('Update failed')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ maxWidth: '600px', marginTop: '30px' }}>
        <h1>Edit Review for "{title}"</h1>

        <div className="mb-3">
          <label>Rating (1–10)</label>
          <input
            type="number"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Your Review</label>
          <textarea
            className="form-control"
            style={{ minHeight: '170px' }}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <button className="btn btn-primary me-2" onClick={onUpdate}>
          Update Review
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/myreviews')}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditReview
