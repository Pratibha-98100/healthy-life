import React, { useDebugValue, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShowLoader } from '../../redux/loaderSlice';
import { Col, Row, message } from 'antd';
import { GetAllDoctors } from '../../apicalls/doctors';
import { useDispatch } from 'react-redux';
import "./index.css";

function Home() {

  const navigate = useNavigate();
  const disptach = useDispatch();
  const[doctors =[], setDoctors] = React.useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const getData = async()=>{
    try {
      disptach(ShowLoader(true))
      const response = await GetAllDoctors();
      if(response.success){
          setDoctors(response.data);
      }
      else{
        message.error(response.message)
      }
      disptach(ShowLoader(false))  
    } 
    catch (error) {
            disptach(ShowLoader(false))
            message.error(error.message)
    }
  }



  useEffect(()=>{
    getData();
  },[]);



   return (
    <div>
      
      <div className='flex justify-between'>
        {/* <div>
          <input placeholder='Sreach doctors' className='w-400'/>
        </div> */}

        {
          user?.role !== "doctor" 
               &&
          <button className='outlined-btn background-blue'
              onClick={()=> navigate("/apply-doctor")}
          >
              Apply Doctor
          </button>      
        }
      </div>


      <Row gutter={[16,16]} className='my-1'>
        {
            doctors.map((doctor) =>{
              return (
                // col==12 forphone version
                <Col span={12}> 
                     <div className='bg-white p-1 flex flex-col gap-1 uppercase cursor-pointer info-bakchground'
                          onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                     >
                         <div className='flex justify-between w-full'>
                              <h2> {doctor.firstName} {doctor.lastName} </h2>
                         </div><hr/>

                         <div className='flex justify-between w-full detaildiv'>
                              <h4 className='label'><b>Speciality : </b></h4>
                              <h4 className='fill'> {doctor.speciality}</h4>
                         </div>

                         <div className='flex justify-between w-full detaildiv'>
                              <h4  className='label'><b>Experience : </b></h4>
                              <h4 className='fill'> {doctor.experience} Year</h4>
                         </div>

                         <div className='flex justify-between w-full detaildiv'>
                              <h4  className='label'><b>Email : </b></h4>
                              <h4 className='fill'> {doctor.email}</h4>
                         </div>

                         <div className='flex justify-between w-full detaildiv'>
                              <h4  className='label'><b>Phone : </b></h4>
                              <h4 className='fill'> {doctor.Phone}</h4>
                         </div>
                     </div>
                </Col>
              )
            })
        }
      </Row>
    </div>
  )
}

export default Home
