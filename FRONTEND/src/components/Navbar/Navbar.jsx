import { Link, useNavigate, NavLink } from "react-router-dom";
function Navbar() 
{
    const navLinkStyles = ({ isActive }) => ({
    color: isActive ? '#ffffff' : '#b2b2b2',
    fontWeight: isActive ? 'bold' : 'normal'
    });
    const navigate = useNavigate()
    const onLogout = async () => {
    // remove all the cached items
    //localStorage.removeItem('token')
    //localStorage.removeItem('firstName')
    //localStorage.removeItem('lastName')

    // set the user to null
    //setUser(null)

    // redirect to Login page
    navigate('/signin')
  }
    return (
        <nav
            className='navbar navbar-dark bg-dark'
            data-bs-theme='dark'
            >
            <div className='container-fluid'>
                <h3 className="navbar-brand" style={{textalign: "center", margin: 0}}>
                    <b>Movie Reviews</b>
                </h3>
                <NavLink
                    className='navbar-brand'
                    to='/allmovies'
                    style={navLinkStyles}
                    >
                        All Movies
                </NavLink>
                <NavLink
                    className='navbar-brand'
                    to='/myreviews'
                    style={navLinkStyles}
                    >
                        My Reviews
                </NavLink>
                <NavLink
                    className='navbar-brand'
                    to='/sharedwithme'
                    style={navLinkStyles}
                    >
                        Shared With Me
                </NavLink>
                <NavLink
                    className='navbar-brand'
                    to='/allreviews'
                    style={navLinkStyles}
                    >
                        All Reviews
                </NavLink>
                <NavLink
                    className='navbar-brand'
                    to='/editprofile'
                    style={navLinkStyles}
                    >
                        Edit Profile
                </NavLink>
                <NavLink
                    className='navbar-brand'
                    to='/changepassword'
                    style={navLinkStyles}
                    >
                        Change Password
                </NavLink>
                {/* <Link className='nav-brand'
                    //onClick={onLogout}
                    to={'/signin'}
                    style={{textDecoration : 'none', color: 'orange'}}
                    //aria-current='page'
                    >
                        Logout
            </Link> */}
                    <button className="btn bg-dark"
                    onClick={onLogout}
                    style={{textDecoration : 'none', color: '#ffb300'}}
                    >
                        Logout
                    </button>
            </div>
        </nav>
        
    );
}

export default Navbar