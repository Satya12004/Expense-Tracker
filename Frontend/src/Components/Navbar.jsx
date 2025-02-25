import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../Context/UserContext'
const Navbar = () => {
  let ctxLogout=useContext(UserContext)
  console.log(ctxLogout)
 let  loginVal=ctxLogout.userdata.login
  const handleLogout=()=>{
    ctxLogout.setuserdata({...ctxLogout.userdata,login:false});
    localStorage.removeItem('expense')
  }
  return (
    
    <div className='flex justify-center align-middle bg-red-900 gap-80 h-20 text-center text-purple-50 '>

      <Link className='my-5 font-bold' to={'/'}>Home</Link>
      {
          loginVal===false&&<Link className='my-5 font-bold' to={'/login'}>Login</Link>
      }
      
      {
        loginVal===false&&  <Link className='my-5 font-bold' to={'/signup'}>SignUp</Link>
      }
      
      <button onClick={handleLogout} className='bg-green-500 h-10 my-5 rounded-xl w-20 font-bold'>Logout</button>
    </div>
  )
}

export default Navbar
