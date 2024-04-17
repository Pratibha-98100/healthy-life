import { Tabs } from 'antd'
import React from 'react'
import Appointments from './Appointments'
import DoctorForm from '../DoctorForm';
import moment from 'moment';

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Appointments" key="1" style={{color: "white"}}> <Appointments/> </Tabs.TabPane>
        <Tabs.TabPane tab="Profile" key="2">
          {
            user.role ==="doctor" 
                &&
            <DoctorForm/>
          }

          {
             user.role !=="doctor" 
                &&
              <div className='my-1 bg-white p-1 flex flex-col gap-1' style={{ backgroundColor: " grey"}}>
                <div className='flex gap-2'>
                   <h4>
                   <b className='profilename'>Name : {user.name}</b>
                    </h4>
                </div>

                <div className='flex gap-2'>
                   <h4>
                       <b className='profilename'>Email : {user.email}</b>
                    </h4>
                </div>

                <div className='flex gap-2'>
                   <h4>
                       <b className='profilename'>Creadted On :  { moment(user?.createdAt).format("DD-MM-YYYY   hh:mm A") }</b>
                    </h4>
                </div>

                <div className='flex gap-2'>
                   <h4>
                       <b className='profilename'>Name : {user.name}</b>
                    </h4>
                </div>
              </div>
          }
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile