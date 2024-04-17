import { Table, message } from 'antd'
import React, { useEffect } from 'react'
import { GetDoctorAppointments, GetUserAppointments, UpdateAppointmentStatus } from '../../apicalls/appointments';
import { ShowLoader } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function Appointments() {

    const [appointments, setAppointments] = React.useState([]);
    const disptach = useDispatch();
   
    const getData = async ()=>{
        
      const user = JSON.parse(localStorage.getItem("user"));
        
        if(user.role === "doctor"){
            const response = await GetDoctorAppointments(user.id);
            console.log(response)
            if(response.success){
                setAppointments(response.data);
            }
        }
        else{
          const response = await GetUserAppointments(user.id);
          if(response.success){
              setAppointments(response.data);
          }
      
      }
  }



  const onUpdate = async (id, status)=>{
    
    try{
      disptach(ShowLoader(true));
      const response = await UpdateAppointmentStatus(id, status);
          if(response.success){
              message.success(response.message);
              getData();
          }
          else{
            message.error(response.message);
          }
          disptach(ShowLoader(false));
    }
    catch(error){
      message.error(error.message);
      disptach(ShowLoader(false));
    }

  }

  const columns = [
    
    {
      title : "Date",
      dataIndex : "date",
    },
    {
      title : "Time",
      dataIndex : "slot",
    },
    {
      title : "Doctor",
      dataIndex : "doctorName",
    },
    {
      title : "Patient",
      dataIndex : "userName",
    },
    {
      title : "Booked At",
      dataIndex : "bookedOn",
    },
    {
      title : "Problem",
      dataIndex : "problem",
    },
    {
      title : "Status",
      dataIndex : "status",
    },
    {
      title : "Action",
      dataIndex : "action",
      render : (text, record) =>{
        const user = JSON.parse(localStorage.getItem("user"));

        if(record.status === "pending" && user.role === "doctor"){
          return (
            <div className='flex gap-1' >
              <span className='underline cursor-pointer'
                   onClick={(e) => onUpdate(record.id, "cancelled")}
              > 
                 Cancel
              </span>
              <span className='underline cursor-pointer'
                   onClick={(e) => onUpdate(record.id, "approved")}
              >
                  Approve
              </span>
            </div>
          )
        }
      }
    }
]  


useEffect(()=>{
  getData();
}, []);


return (
  <div className="app" style={{ backgroundColor: "rgb(123, 100, 144)" }} >
    <Table columns={columns } dataSource={appointments || [] } />
  </div>
)

}

export default Appointments