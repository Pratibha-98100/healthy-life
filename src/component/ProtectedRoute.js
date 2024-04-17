import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    //---- Cheking user present in localStorage or not------
    useEffect(()=>{
            const user = JSON.parse(localStorage.getItem("user"));

            if(!user){
                navigate("/login");
            }
    }, [])


  return (
    <div className='layout p-1'>
        <div className='header bg-white p-2 flex jutify-between items-center background-navbar'>
          <h1 className="cursor-pointer text-primary" onClick={()=> navigate("/")}> 
            <i>Healthy 🌍 Life</i>
          </h1>

          
            {
                user 
                  && 
                <div className="flex gap-3 items-center right-div">

                    <div className="flex gap-1 items-center">
                        <i className="ri-shield-user-line icon" style={{fontSize:"30px"}}></i>
                        <h3 className='uppercase cursor-pointer underline profile'  style={{fontSize:"30px"}}
                             onClick={()=> {
                                 if(user.role === "admin"){
                                  navigate("/admin");
                                 }
                                 else{
                                  navigate("/profile");
                                 }
                             }}
                        > 
                          {user.name} 
                        </h3>  
                    </div>
                    <i className="ri-logout-box-r-line cursor-pointer logout" style={{fontSize:"30px"}}
                         onClick={()=> {
                            localStorage.removeItem("user");
                            navigate("/login");
                         }}
                    >
                    </i>
                </div>
            }
        </div>

        <div className="content my-1">{children}</div>
    </div>
  )
}

export default ProtectedRoute


// ProtectedRoute : only access to the login users