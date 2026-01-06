import { getAllReviews } from "../../service/review";
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
function AllReviews(){
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        loadMyReviews()
    }, [])
    const loadMyReviews = async () => {
    const response = await getAllReviews()
    setReviews(response.data)   // 🔥 NO status/data
    }
    // const loadMyReviews = async () => {
    //     try {
    //         const response = await getAllReview()
    //         if(response.data.status == 'success'){
    //             setReviews(response.data.data)
    //         } else{
    //             toast.error(response.data.error)
    //         }
    //     } catch(error){
    //         toast.error('Failed to load reviews')
    //     }
    // }


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
            <h1 style={{marginBottom: "25px" }}>All Reviews</h1>
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

export default AllReviews