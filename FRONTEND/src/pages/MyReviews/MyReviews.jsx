import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyReview } from "../../service/review";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
function MyReviews(){
    const navigate = useNavigate()
    const onEdit = async(reviewId) => {
            navigate(`/editreview/${reviewId}`)
    }
    const onShare = async(reviewId) => {
            navigate(`/sharereview/${reviewId}`)
    }
    const onDelete = async(reviewId) => {
            navigate(`/deletereview/${reviewId}`)
    }
    const [review, setReview] = useState([])
    useEffect(() => {
        loadMyReviews()
    }, [])

    const loadMyReviews = async () => {
        const userId = localStorage.getItem('userId')

        if(!userId){
            toast.error('User not logged in !!')
            return
        }

        try {
            const response = await getMyReview(userId)

            if(response.data.status == 'success'){
                setReview(response.data.data)
            } else{
                toast.error(response.data.error)
            }
        } catch(error){
            toast.error('Failed to load reviews')
        }
    }



    // const reviews = [
    //     {
    //         rid: 1,
    //         movie_id: 1,
    //         rating: 4,
    //         review: "very good movie",
    //         user_id: 1,
    //         modified: "2025-11-13T22:51:17.000Z",
    //         title: "Titanic",
    //         release_date: "1995-12-24T18:30:00.000Z",
    //         firstname: "Sanket",
    //         lastname: "Raut",
    //         email: "sanket@gmail.com",
    //     },
    //     {
    //         rid: 2,
    //         movie_id: 2,
    //         rating: 5,
    //         review: "very good movie",
    //         user_id: 1,
    //         modified: "2025-11-13T22:51:17.000Z",
    //         title: "Mission Impossible",
    //         release_date: "1995-12-24T18:30:00.000Z",
    //         firstname: "Sanket",
    //         lastname: "Raut",
    //         email: "sanket@gmail.com",
    //     },
    //     {
    //         rid: 3,
    //         movie_id: 1,
    //         rating: 5,
    //         review: "very nice movie",
    //         user_id: 2,
    //         modified: "2025-11-13T22:51:17.000Z",
    //         title: "Titanic",
    //         release_date: "1995-12-24T18:30:00.000Z",
    //         firstname: "Swaraj",
    //         lastname: "Raut",
    //         email: "swaraj@gmail.com",
    //     },
    //     {
    //         rid: 4,
    //         movie_id: 3,
    //         rating: 4,
    //         review: "my favourite",
    //         user_id: 2,
    //         modified: "2025-11-13T22:51:17.000Z",
    //         title: "The Golden Gun",
    //         release_date: "1995-12-24T18:30:00.000Z",
    //         firstname: "Swaraj",
    //         lastname: "Raut",
    //         email: "swaraj@gmail.com",
    //     },
    // ];
    return(
    <div>
        <Navbar />
        <div className='body' style={{margin : "20px 0px 0px 25px"}}>
            <h1 style={{marginBottom: "25px" }}>My Reviews</h1>
            {review.map((r) => (
                <div key={r.id} className="card" style={{marginBottom : '25px'}}>
                    <div className="card-body" style={{padding : '16px 14px 10px '}}>
                        <h5 className="card-title" style={{marginBottom:'8px'}}>{r.title} <span style={{backgroundColor: '#035afc', color: 'white', fontSize : '14px', padding: '2px 10px', borderRadius: '3px', fontWeight: 'bold'}}> {r.rating}/10 </span></h5>
                        <p className="card-text" style={{marginBottom :'20px'}}>{r.review}</p>
                        <p className="card-foot" style={{marginBottom:'10px', color: '#999999'}}>Last updated: {r.modified.split('T')[0]}</p>
                        <div className="card-options" style={{marginBottom :'10px'}}>
                            <button className="btn btn-primary" id='edit' style={{marginRight:'10px'}} onClick={() => onEdit(r.id)}>Edit</button>
                            <button className="btn btn-success" id='share' style={{marginRight:'10px'}} onClick={() => onShare(r.id)}>Share</button>
                            <button className="btn btn-danger" id='delete' style={{marginRight:'10px'}} onClick={() => onDelete(r.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
    </div>
 );   
}

export default MyReviews