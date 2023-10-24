import {Form, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreatUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';


function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) =>{
            try {
                dispatch(ShowLoader(true));
                const response = await CreatUser({
                    ...values,
                    role: "user",
                });
                
                dispatch(ShowLoader(false));
                if(response.success){
                    message.success(response.message);
                    navigate("/login");
                }
                else{
                        throw new Error(response.message)
                }
            }
            catch (error) {
                dispatch(ShowLoader(false));
                message.error(error.message);
            }
    }
    

    //---- Cheking user present in localStorage or not------
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
  
       if(user){
        navigate("/")
       }                                                      // if present take to home page page else login page 
      }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
        <Form layout="vertical" className='w-400 bg-white p-2' onFinish={onFinish} >

            <h2 className='uppercase my-1'> 
                <strong>Healthy-Life  Register</strong>
            </h2>
            <hr/>

            <Form.Item label = "Name" name="name">
                <input type='text' />
            </Form.Item>

            <Form.Item label = "Email"  name="email">
                <input type='email' />
            </Form.Item>

            <Form.Item label = "Password" name="password">
                <input type='password' />
            </Form.Item>

            <button className='contained-btn my-1 w-full' type='submit' >Register</button>

            <Link className='underline' to="/login">
                Already have a account ? <strong>Sign In</strong>
            </Link>
        </Form>
    </div>
  )
}

export default Register


// Form , Button are from antd i.e design
// onFinish : It is a callback function that is triggered after submitting the form and verifying data successfully
//            after oncliking