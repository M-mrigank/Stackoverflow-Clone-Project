import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCurrentUser } from '../../actions/currentUser'
import { useNavigate} from 'react-router-dom';
import decode from "jwt-decode";

const Navbar = () => {

    // var User=JSON.parse(localStorage.getItem('Profile'));
    // console.log("printing user",User);
    var User=useSelector((state)=>state.currentUserReducer);
    console.log("printing user",User);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>(state.currentUserReducer));

    const handleLogout=()=>{
        dispatch({
            type:"LOGOUT",
        });
        navigate('/');
        dispatch(setCurrentUser(null));
    }

    useEffect(()=>{
        const token=user?.token;
        if(token){
            const decodeToken=decode(token);
            if(decodeToken.exp*1000<new Date().getTime()){
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch]);

  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt='logo'/>
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>

            <form>
                <input type='text' placeholder='Search...'/>
                <img src={search} alt='search' width={18} className='search-icon'/>
            </form>

            {
                User===null?(
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link>
                ):(
                    <>
                        <Avatar 
                            backgroundColor={'#009dff'}
                            px="10px"
                            py="7px"
                            borderRadius={"50%"}
                            color={"white"}
                            
                        >
                            <Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:"none"}}>
                                {user.result.name.charAt(0).toUpperCase()}
                            </Link>
                        </Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                    </>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar
