import { Col, Row, Form, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { AddDoctor, CheckIfDoctorAccountIsApplied, GetDoctorById, UpdateDoctor } from '../../apicalls/doctors';
import { useNavigate } from 'react-router-dom';

function DoctorForm() {

    const [form] = Form.useForm();
    const[days, setDays] = React.useState([]);
    const[alreadyApproved, setAlreadyApproved] = React.useState(false);
    const[alreadyApplied, setAlreadyApplied] = React.useState(false);
    const disptach = useDispatch();
    const navigate = useNavigate();

    const onFinish =  async(values) =>{
        try {
            disptach(ShowLoader(true));
            const payload = { 
                ... values, 
                days, 
                userId : JSON.parse(localStorage.getItem("user")).id, 
                status :"pending",
                role: "doctor",
            };

            let response = null;
            if(alreadyApproved){
                payload.id= JSON.parse(localStorage.getItem("user")).id;
                payload.status = "approved";
                response = await UpdateDoctor(payload);
            }
            else{
                response = await AddDoctor(payload);
            }


            if(message.success){
                message.success(response.message);
                navigate("/profile");
            }
            else{
                message.error(response.message);
            }
            disptach(ShowLoader(false));
        } 
        catch (error) {
            disptach(ShowLoader(false));
            message.error(error.message);
        }
    }


    const checkIfAlreadyApplied = async ()=>{
        
        try {
            disptach(ShowLoader(true))
            const response = await CheckIfDoctorAccountIsApplied(
                JSON.parse(localStorage.getItem("user")).id
            );
            if(response.success){
                setAlreadyApplied(true);
                if(response.data.status === "approved"){
                    console.log(response.data)
                    setAlreadyApproved(true);
                    form.setFieldsValue(response.data);
                    setDays(response.data.days)
                }
            }
            disptach(ShowLoader(false))  
        } 
        catch (error) {
                disptach(ShowLoader(false))
                message.error(error.message)
        }
    }


  //----------checking if doctor already applied or not -------------- 
    useEffect(() => {
        checkIfAlreadyApplied();
    }, []);


  return (
    <div className='bg-white p-2'>
        {
            !alreadyApplied 
                &&
            <>
                <h3 className="uppercase my-1">
                    {
                        alreadyApproved ? "Update your information" : "Apply for a Doctor Account"
                    }
                </h3>
                <hr/>

                <Form layout="vertical" className="my-1" onFinish={onFinish} form={form}>
                    <Row gutter={[16,16]}>

    {/*--------------------------Personal Information -------------------------------  */}
            {/* ---------------First Name-------------------- */}
                        <Col span={24}>
                            <h4 className='uppercase'>
                            <b>Personal Information</b>
                            </h4>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="text"/>
                            </Form.Item>
                        </Col>

                {/* ---------------Lst Name-------------------- */}
                        <Col span={8}>    
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="text"/>
                            </Form.Item>
                        </Col>



            {/* ---------------Email-------------------- */}
                        <Col span={8}>
                            <Form.Item
                                label="Email Name"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="email"/>
                            </Form.Item>
                        </Col>


            {/* ---------------Phone-------------------- */}
                        <Col span={8}>
                            <Form.Item
                                label="Phone"
                                name="Phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="number"/>
                            </Form.Item>
                        </Col>


            {/* ---------------Website-------------------- */}
                        <Col span={8}>    
                            <Form.Item
                                label="Website"
                                name="website"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="text"/>
                            </Form.Item>
                        </Col>


            {/* ---------------Address-------------------- */}
                         <Col span={24}>    
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <textarea type="text"/>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                        <hr/>
                        </Col>


        {/*----------------------Professional Information-------------------------  */}
            {/* ---------------Speciality-------------------- */}
                    
                        <Col span={24}>
                            <h4 className='uppercase'>
                            <b>Professional Information</b>
                            </h4>
                        </Col>
                        
                        <Col span={8}>    
                            <Form.Item
                                label="Speciality"
                                name="speciality"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <select>
                                    <option value="dermetologist">Dermetologist</option>
                                    <option value="gynecologist">Gynecologist</option>
                                    <option value="neurologist">Neurologist</option>
                                    <option value="orthopedic">Orthopedic</option>
                                    <option value="pediatrician">Pediatrician</option>
                                    <option value="psychiatrist">Psychiatrist</option>
                                    <option value="surgeon">Surgeon</option>
                                    <option value="urologist">Urologist</option>
                                </select>
                            </Form.Item>
                        </Col>


                {/* ---------------Experience-------------------- */}
                        <Col span={8}>    
                            <Form.Item
                                label="Experience"
                                name="experience"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="number"/>
                            </Form.Item>
                        </Col>


            {/* ---------------Qalification-------------------- */}
                        <Col span={8}>    
                            <Form.Item
                                label="Qalification"
                                name="qalification"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <select>
                                    <option value="MBBS">MBBS</option>
                                    <option value="MD">MD</option>
                                    <option value="MS">MS</option>
                                    <option value="MDS">MDS</option>
                                </select>
                            </Form.Item>
                        </Col><br/>

                        <Col span={24}>
                        <hr/>
                        </Col>

        {/* --------------------------Work Hours-------------------------- */}
            {/*----------------start time ---------------  */}

                        <Col span={24}>
                            <h4 className='uppercase'>
                            <b>Work Hours</b>
                            </h4>
                        </Col>
                    
                        <Col span={8}>    
                            <Form.Item
                                label="Start Time"
                                name="startTime"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="time"/>
                            </Form.Item>
                        </Col>
        

            {/* ---------------End Time-------------------- */}
                        <Col span={8}>    
                            <Form.Item
                                label="End Time"
                                name="endTime"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="time"/>
                            </Form.Item>
                        </Col>


                {/* ---------------Fee-------------------- */}
                        <Col span={8}>    
                            <Form.Item
                                label="Fee"
                                name="fee"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required",
                                    },
                                ]}
                            >    
                                <input type="number"/>
                            </Form.Item>
                        </Col>


                {/* ---------------Days-------------------- */}
                        <Col span={24}>    
                            <div className='flex gap-2'>
                                {["Monday", "Tuesday","Wdnesday","Thursday","Friday","Saturday","Sunday"]
                                    .map((day, index) =>(
                                        <div className='flex items-center'>
                                                <input  type='checkbox' key={index} value={day} 
                                                    checked={days.includes(day)}
                                                    onChange={(e) =>{
                                                        if(e.target.checked){
                                                            setDays([...days, e.target.value])
                                                        }
                                                        else{
                                                            setDays(days.filter((item) =>item !== e.target.value))
                                                        }
                                                    }}
                                                />
                                                <label>{day}</label>
                                        </div>
                                    ))}
                            </div> 
                        </Col>        

                    </Row>

            {/*---------------------------------Button--------------------------------------  */}
                    <div className='flex justify-end gap-2'>
                        <button className='outlined-btn' type='button'>Cancel</button>
                        <button className='contained-btn' type='submit'>SUBMIT</button>
                    </div>
                 </Form>
            </>
        }


        {
            alreadyApplied  && !alreadyApproved
                &&
            <div className='flex flex-col items-center gap-2'>
                <h3 className='text-secondary'>You have already applied for this doctor account, please wait for the admin to approve your request </h3>
            </div>
        }
    </div>
  )
}

export default DoctorForm