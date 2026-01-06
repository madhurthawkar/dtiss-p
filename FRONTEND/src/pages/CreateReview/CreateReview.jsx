
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../../service/movie";
import { addReview } from "../../service/review";
import { toast } from "react-toastify";

function CreateReview(){
   const navigate = useNavigate()
   const goBack = async () => {
      navigate('/allmovies')
   }
   const { movieId } = useParams()
   const [movie, setMovie] = useState(null)
   const [rating, setRating] = useState('')
   const [review, setReview] = useState('')
   const userId = localStorage.getItem('userId')
   useEffect(() => {
    loadMovie()
   }, [])

   const loadMovie = async () => {
    try{
        const response = await getMovieById(movieId)
        
        if(response.data.status == 'success'){
            setMovie(response.data.data[0])
        } else {
            toast.error(response.data.error)
        }
    } catch(err) {
        toast.error('Failed to load movie')
    }
   }
   const submitReview = async () => {
        if(!rating || !review) {
            toast.warning('Please  fill all fields')
            return
        }
        console.log({ movieId, rating, review, userId})
        const body = {
            movieId,
            rating,
            review,
            userId 
        }
        try {
            const response = await addReview(body)

            if(response.data.status == 'success'){
                toast.success('Review added successfully')
                navigate('/allmovies')
            }else{
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error('Failed to add review')
        }
   }
   if(!movie) return null

    return(
        <div>
            <Navbar />
            <div className="container">
                <h1 style={{ margin: "20px 0px" }}>Create Review for "{movie.title}"</h1>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="" style={{ margin: "10px 0px" }}>Rating(1-10)</label>
                    <input 
                    onChange={(e) => {
                    setRating(e.target.value)
                    }}
                    type="number" 
                    className='form-control' 
                    placeholder="0"></input>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="" style={{ marginBottom: "10px" }}>Your Review</label>
                    <textarea 
                    onChange={(e) => {
                    setReview(e.target.value)
                    }}
                    className='form-control' 
                    style={{minHeight: "170px"}} 
                    placeholder="Give your review about the movie here. "></textarea>
                </div>
                <div>
                    <button className="btn btn-success" style={{marginRight:'10px'}} onClick={submitReview}>Submit Review</button>
                    <button className="btn btn-secondary" onClick={goBack}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default CreateReview