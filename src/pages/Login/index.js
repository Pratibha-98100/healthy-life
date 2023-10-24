import {Form, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { ShowLoader } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';


function Login() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) =>{
           try {
            dispatch(ShowLoader(true));
             const response = await LoginUser(values);

             dispatch(ShowLoader(false));
             if(response.success){
                message.success(response.message);
                localStorage.setItem(
                    "user", 
                    JSON.stringify({...response.data , password : ""})
                );
                navigate("/");                                                    // for directing to home page
             }
             else{
                throw new Error(response.message)
             }
           } 
           catch (error) {
            dispatch(ShowLoader(false));
             message.error(error.message)
           }
    }
    


    // //---- Cheking user present in localStorage or not------
    // useEffect(()=>{
    //   const user = JSON.parse(localStorage.getItem("user"));

    // //   if(!user){
    // //       navigate("/register"); 
    // //  }                                                     // if present take to home page page else login page 
    // }, [])


  return (
    <div className='flex justify-center items-center h-screen' style={{backgroundImage: "url(https://img.freepik.com/premium-vector/cartoon-young-doctor-his-office-room_43633-11096.jpg)", backgroundSize:'cover', backgroundRepeat: 'no-repeat',}}>
        <Form layout="vertical" className='w-400 bg-white p-2' onFinish={onFinish} >

            <h2 className='uppercase my-1'> 
                <strong style={{color: "black"}}><span className='text-primary'>Healthy</span>-<span className='text-secondary'>Life</span> Login</strong>
            </h2>
            <hr/>

            <Form.Item label = "Email"  name="email" >
                <input type='email' />
            </Form.Item>

            <Form.Item label = "Password" name="password">
                <input type='password' />
            </Form.Item>

            <button className='contained-btn my-1 w-full' type='submit' >Login</button>

            <Link className='underline' to="/register ">
                Don't have n account ? <strong>Sign Up</strong>
            </Link>
        </Form>
    </div>
  )
}

export default Login;


// Form , Button are from antd i.e design
// onFinish : It is a callback function that is triggered after submitting the form and verifying data successfully
//            after oncliking