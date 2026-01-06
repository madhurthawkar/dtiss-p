import { getAllMovies } from '../../service/movie'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
function AllMovies(){
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])

    
    const createReview = (movieId) => {
        navigate(`/createreview/${movieId}`)
    }

    useEffect(() => {
        loadMovies()
    }, [])

    const loadMovies = async () => {
        try{
            const respose = await getAllMovies()

            if(respose.data.status == 'success'){
                setMovies(respose.data.data)
            }else{
                toast.error(respose.data.error);
                
            }
        }catch(err){
            toast.error('Failed to load movies.')
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
            <h1 style={{margin : "20px 0px 0px 25px"}}>All Movies</h1>
            <div className='body' style={{margin : "20px 10px 10px 25px", display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {movies.map((movie) => (
                    <div key={movie.id} className="card" style={{width: '20rem', margin:'20px 10px'}}>
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text"><b>Release Date:</b> {movie.release_date.split('T')[0]}</p>
                            <button className="btn btn-primary" onClick={ () => createReview(movie.id)}>Review this Movie</button>
                        </div>
                    </div>
                ))}
            </div>   
        </div>
    );   
}

export default AllMovies