import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from "./bacurl";



const AuthContext = createContext()

export default AuthContext;



export  const AuthProvider = ({children}) => { 
   
   let [user, setuser] = useState(()=>localStorage.getItem('authtoken') ? jwtDecode(localStorage.getItem('authtoken')):null)
   let [auth, setAuth] = useState(()=>localStorage.getItem('authtoken') ? JSON.parse(localStorage.getItem('authtoken')):null)
   let [loading, setloading] = useState(true)
   let [error, setError] = useState(null);

   const navigate = useNavigate()

  let loginUser = async (e) =>{
    e.preventDefault()
    
     let response = await fetch(`${BACKEND_URL}/track/api/token/`,{
      method : 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
  
     })

     let data  = await response.json();
   

     if (response.status=== 200){
        setAuth(data)
        setuser (jwtDecode(data.access))
        localStorage.setItem('authtoken',JSON.stringify(data) )
        navigate('/')
        
      } else {
      
        setError("wrong credentials");      }
    }

    let logoutUser = () =>{
       
       setAuth(null)
       setuser(null)
       localStorage.removeItem('authtoken')
       navigate('/login')
    }

 

let updateToken = async (e) => {

  if (!auth) {
        return
      }
 
  console.log('update token called')
  console.log('user', user);
  let response = await fetch(`${BACKEND_URL}/track/api/token/refresh/`,{
  method : 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify({'refresh': auth.refresh})


 })
 let data  = await response.json();
 if (response.status=== 200){
    setAuth(data)
    setuser (jwtDecode(data.access))
    localStorage.setItem('authtoken',JSON.stringify(data) )
    
  } else {
   logoutUser()
  }

 
};


    useEffect(()=>{
      let forMinutes = 1000 *60 *2
      let interval = setInterval(()=>{
         if (auth ){
          updateToken()
         }
     },forMinutes)

     return () => clearInterval(interval);
    } ,[auth,loading])

    let contextData ={
      logoutUser :logoutUser,
      loginUser : loginUser,
      user:user,
      auth:auth,
      error:error,
       
      
    };

  return (
      
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
   
  )
}




