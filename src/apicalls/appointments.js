import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import firestoreDatabase from "../firebaseConfig";


export const BookDoctorAppointment = async (payload) =>{
    try {
        await addDoc(collection(firestoreDatabase, "appointments"), payload);                                                                                                                                                               // making doctor id === userid
        return {
            success: true,
            message : "Appointment booked successfully",
         }   
    } 
    catch (error) {
         return {
            success: false,
            message : error.message,
         }
    }
}



export const GetDoctorAppointmentOnDate = async (doctorId, date) =>{
    try {
         const querySnapshot =  await getDocs(
            query(
                collection(firestoreDatabase, "appointments"), 
                    where("doctorId", "==", doctorId),
                    where("date", "==", date)
                )
            );
            const data =[];
            querySnapshot.forEach((doc) =>{
                data.push(doc.data());
            });

            return {
            success: true,
            data,
         }   
    } 
    catch (error) {
         return {
            success: false,
            message : error.message,
         }
    }
}




// ---------------get doctor appointment details-------------
export const GetDoctorAppointments = async (doctorId) =>{
    try {
         const querySnapshot =  await getDocs(
            query(
                collection(firestoreDatabase, "appointments"), 
                    where("doctorId", "==", doctorId),
                )
            );
            const data =[];
            querySnapshot.forEach((doc) =>{
                data.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });

            return {
            success: true,
            data,
         }   
    } 
    catch (error) {
         return {
            success: false,
            message : error.message,
         }
    }
}





// ---------------get User appointment details-------------
export const GetUserAppointments = async (userId) =>{
    try {
         const querySnapshot =  await getDocs(
            query(
                collection(firestoreDatabase, "appointments"), 
                    where("userId", "==", userId),
                )
            );
            const data =[];
            querySnapshot.forEach((doc) =>{
                data.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });

            return {
            success: true,
            data,
         }   
    } 
    catch (error) {
         return {
            success: false,
            message : error.message,
         }
    }
}




// ------------------------ UpdateAppointment ----------------
export const UpdateAppointmentStatus = async (id, status) =>{
    try {
          await updateDoc(doc(firestoreDatabase, "appointments", id), {
            status,
          });
          return {
             success: true,
            message : "Appointment status updated",
          }
    } 
    catch (error) {
         return {
            success: false,
            message : error.message,
         }
    }
}