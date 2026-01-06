//signup & signin pages links
import { ToastContainer } from 'react-toastify'
import SignIn from './pages/SignIn/SignIn' 
import SignUp from './pages/SignUp/SignUp'
//other pages
//allmovies
import AllMovies from './pages/AllMovies/AllMovies';
import AllReviews from './pages/AllReviews/AllReviews';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import CreateReview from './pages/CreateReview/CreateReview';
import DeleteReview from './pages/DeleteReview/DeleteReview';
import EditProfile from './pages/EditProfile/EditProfile';
import EditReview from './pages/EditReview/EditReview'
import MyReviews from './pages/MyReviews/MyReviews';
import ShareReview from './pages/ShareReview/ShareReview';
import SharedWithMe from './pages/SharedWithMe/SharedWithMe';
//auth
import AuthProvider from './providers/AuthProvider'
//to have navbar
import { Navigate, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/signin' />}
        />
        <Route
          path='signin'
          element={<SignIn />}
        />
        <Route
          path='signup'
          element={<SignUp />}
        />
        <Route 
          path='allmovies'
          element={<AllMovies />}
        />
        <Route 
          path='allreviews'
          element={<AllReviews />}
        />
        <Route 
          path='changepassword'
          element={<ChangePassword />}
        />
        <Route 
          path='createreview/:movieId'
          element={<CreateReview />}
        />
        <Route 
          path='editprofile'
          element={<EditProfile />}
        />
        <Route 
          path='myreviews'
          element={<MyReviews />}
        />
        <Route 
          path='deletereview/:reviewId'
          element={<DeleteReview />}
        />
        <Route 
          path='editreview/:reviewId'
          element={<EditReview />}
        />
        <Route 
          path='sharereview/:reviewId'
          element={<ShareReview />}
        />
        <Route 
          path='sharedwithme'
          element={<SharedWithMe/>}
        />
      </Routes>
      </AuthProvider>
      <ToastContainer/>
    </div>
  );
}

export default App;