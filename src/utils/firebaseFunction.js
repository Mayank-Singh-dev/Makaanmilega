
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

//to save new items
export const saveItems = async (data) => {
    await setDoc(doc(firestore, "MakanData", `${Date.now()}`), data, {
        merge: true,
    })
}

export const getBuildingDetails = async () => {
    const querySnapshot = await getDocs(
      query(collection(firestore, "MakanData"), orderBy("id", "desc"))
    );
  
    const items = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return items;
  };
  