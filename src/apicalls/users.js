import  firestoreDatabase  from "../firebaseConfig.js";
import { collection,addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

export const CreatUser = async (payload) => {
    try{

          //-----check if user exist by email----
          const qry = query(
            collection(firestoreDatabase, "users"), 
            where("email", "==", payload.email)
            );
          const querySnapshot = await getDocs(qry);
          if(querySnapshot.size >0){
            throw new Error("User already exists")
          }


          //----------Creating password as === hash password----------
          const hashedPassword = CryptoJS.AES.encrypt(
            payload.password,
            "healthy-life"                                 // scret key
          ).toString();
          payload.password= hashedPassword;


        //                      database-configuration-object         collection-path
           const docRef =  collection(firestoreDatabase          ,          "users") 
            await addDoc(docRef,payload);
            return {
                success : true,
                message: "User created successfully",
            };
        }
    catch(error){
        return error;
    }
}



export const LoginUser = async (payload) => {
    try{

          //-----check if user exist by email----
          const qry = query(
            collection(firestoreDatabase, "users"), 
            where("email", "==", payload.email)
            );
          const userSnapshot = await getDocs(qry);
          if(userSnapshot.size === 0){
            throw new Error("User does not exists")
          }


          //----------Decrypt password  configuration { "healthy-life" is secret key }----------
          const user = userSnapshot.docs[0].data();
          user.id = userSnapshot.docs[0].id;                                                                           // for user id 
          const bytes = CryptoJS.AES.decrypt(user.password, "healthy-life")
          const originalPassword = bytes.toString(CryptoJS.enc.Utf8);



          // ------ password confirming -------
          if(originalPassword!== payload.password){
            throw new Error("Incorrect Password")
          }

          return{
            success: true,
            message: "User logged in successfully",
            data:user,
          };
    }
    catch(error){
        return error;
    }
}


export const GetAllUsers = async () =>{
  try {
      const users = await getDocs(
          collection(firestoreDatabase, "users")
      );
          return {
              success: true,
              data : users.docs.map((doc) =>{
                  return{
                  ...doc.data(),
                  id: doc.id,
                  }
              }),
           } 
  }         
  catch (error) {
       return {
          success: false,
          message : error.message,
       }
  }
}



// ------------Getting user by id------------------
export const GetUserById = async (id) =>{
  try {
      const user = await getDoc(doc(firestoreDatabase, "users", id));
          return {
              success: true,
              data : {
                  ...user.data(),
                  id: user.id,
                  },
              };
  }         
  catch (error) {
       return error;
  }
}


//---- Storing user details in firebase---- 