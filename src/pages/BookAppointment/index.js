import React, {  useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ShowLoader } from '../../redux/loaderSlice';
import {  GetDoctorById } from '../../apicalls/doctors';
import { message } from 'antd';
import moment from 'moment/moment';
import { BookDoctorAppointment, GetDoctorAppointmentOnDate } from '../../apicalls/appointments';
import "./index.css"

function BookAppointment() {

    const [date="", setDate] = React.useState("");
    const [doctor, setDoctor] = React.useState(null);
    const [selectedSlot="", setSelectedSlot] = React.useState("");
    const [bookedSlots=[], setBookedSlots] = React.useState([]);
    const [problem="", setProblem] = React.useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const disptach = useDispatch();

    const getData = async ()=>{
        
        try {
            disptach(ShowLoader(true))
            const response = await GetDoctorById(id);
            if(response.success){
                setDoctor(response.data);
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



 // -----------------------------for solts-----------------------------------
    const getSlotsData = ()=>{


        // ---for working days-------
          const day = moment(date).format("dddd");
          if(!doctor.days.includes(day)){
            return (
                   <h3 className='text-secondary' style={{color:"red"}}> 
                         Doctor is not avialable on  {moment(date).format("DD-MM-YYYY")}
                   </h3>  
            )     
          }


        // ----for timing-----
         const startTime = moment(doctor.startTime, "HH:mm");
         const endTime = moment(doctor.endTime, "HH:mm");
         const slotDuration =60;  // mintues
         const slots = [];
       
         while(startTime < endTime ){
            // if(!bookedSlots?.find((slot) => slot.slot === startTime.format("HH:mm"))) {                                                                                                                      // show slots who are not bookedand wihtin given time)
                slots.push(startTime.format("HH:mm"));
                startTime.add(slotDuration, "minutes");
         }

         return slots.map((slot) => {

            const isBooked =  bookedSlots?.find(
                (bookedSlot) => bookedSlot.slot === slot && bookedSlot.status !== "cancelled"
               );   

            return(
                <div className='bg-white p-1 cursor-pointer fit-content'
                      onClick={()=> setSelectedSlot(slot)}
                      style={{
                        backgroundColor: selectedSlot === slot ? "3px solid green" : "3px solid green",
                        color: selectedSlot === slot ? "black" : "white",
                        boxShadow: selectedSlot === slot ? " 0 18px solid red" : "white",
                        backgroundColor : isBooked ? "grey" : "green",
                        pointerEvents : isBooked ? "none" : "auto",
                        cursor : isBooked ? "not-allowed" : "pointer",
                      }}
                  
                >
                    <span>
                        { moment(slot, "HH:mm").format("hh:mm A") } - {" "}
                        { 
                           moment(slot, "HH:mm")
                              .add(slotDuration, "minutes")
                              .format("hh:mm A")  
                        }
                    </span>
                </div>
            )
         });

    };



 //-------book appointment------------
 const onbookAppointment = async ()=>{
     
    try {
        disptach(ShowLoader(true))
        const payload = {
            doctorId : doctor.id,
            userId :JSON.parse(localStorage.getItem("user")).id,
            // user : userId.role,
            date,
            slot : selectedSlot,
            doctorName : `${doctor.firstName} ${doctor.lastName}`,
            userName : JSON.parse(localStorage.getItem("user")).name,
            bookedOn : moment().format("DD-MM-YYYY hh:mm A"),
            problem,
            status : "pending"
        };

        const response = await BookDoctorAppointment(payload);
        if(response.success){
            message.success(response.message);
            navigate("/profile")
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



// -----for blocking booked slots----------
 const getBookedSlots = async ()=>{
        
    try {
        disptach(ShowLoader(true))
        const response = await GetDoctorAppointmentOnDate(id, date);
        disptach(ShowLoader(false));
        // console.log(response)
        if(response.success){
            setBookedSlots(response.data);
        }
        else{
            message.error(response.message)
        }
    } 
    catch (error) {
            disptach(ShowLoader(false))
            message.error(error.message)
    }
}

    useEffect(() => {
        getData();
    }, [id]);



// ----calling blocking slots function-----
useEffect(() => {
    if(date){
        getBookedSlots();
    }
}, [date]);



  return (

    doctor 
      &&
    <div className='bg-white p-2  particulardoc'>
            <h1 className='uppercase my-1 docname'> {doctor?.firstName} {doctor?.lastName}</h1>
          <hr/>

        <div className='w-half flex flex-col gap-1 my-1 div'>
            <div className='flex justify-between w-full detaildiv'>
                <h4 className='label'><b>Speciality : </b></h4>
                <h4 className='fill'> {doctor.speciality}</h4>
            </div>

            <div className='flex justify-between w-full detaildiv'>
                <h4 className='label'><b>Experience : </b></h4>
                <h4 className='fill'> {doctor.experience} Year</h4>
            </div>

            <div className='flex justify-between w-full detaildiv'>
                <h4 className='label'><b>Email : </b></h4>
                <h4 className='fill'> {doctor.email}</h4>
            </div>

            <div className='flex justify-between w-full detaildiv'>
                <h4 className='label'><b>Phone : </b></h4>
                <h4 className='fill'> {doctor.Phone}</h4>
            </div>

            <div className='flex justify-between w-full detaildiv'>
                <h4 className='label'><b>Address : </b></h4>
                <h4 className='fill'> {doctor.address}</h4>
            </div>

            <div className='flex justify-between w-full detaildiv'>
                <h4 className='label'><b>Fees : </b></h4>
                <h4 className='fill'> {doctor.fee}/- per Session</h4>
            </div>

            <div className='flex justify-between w-full detaildiv'>
                <h4 className='label'><b>Days Avialable : </b></h4>
                <h4 className='fill'> {doctor.days.join(",")}</h4>
            </div>
        </div>
        <hr/>



  {/* -----------------solts booking -------------------- */}
        <div className='flex flex-col gap-1 my-2'>

            <div className='flex gap-2 w-400 items-end'>
                <div>
                    <span>Select Date : </span>  
                    <input type='date' value={date} onChange={(e) => setDate(e.target.value)}
                         min={moment().format("YYYY-MM-DD")} 
                    />
                 </div>
            </div>

           
            <div className='flex gap-2'>
                {
                      date
                        &&
                    getSlotsData()
                }
            </div>


            {
                selectedSlot
                   &&
                <div> 

                    <textarea placeholder='Enter your problem here' value={problem} onChange={(e) => setProblem(e.target.value)} rows="10"></textarea>

                    <div className='flex gap-2 justify-center my-3'>
                        <button className='contained-btn background-secondary cursor-pointer'
                        onClick={()=> navigate("/")}
                        >
                            Cancel
                        </button>
                        <button className='contained-btn cursor-pointer'
                            onClick={onbookAppointment}
                        >
                            Book Appointment
                        </button>
                    </div>  

                 </div>   
            }

        </div>
    </div>


  )
}

export default BookAppointment