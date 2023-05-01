//to save new items

import { doc, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItems=async(data)=>{
    await setDoc(doc(firestore,"MakanData", `${Date.now()}`), data,{
        merge:true,
    })
}