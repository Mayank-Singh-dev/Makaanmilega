import React, { useEffect} from "react";
import { CreateContainer, Header, MainContainer } from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import { useStateValue } from "./context/Stateprovider";
import { actionType } from "./context/reducer";
import { getBuildingDetails } from "./utils/firebaseFunction";

function App() {
  const [{buildingItems}, dispatch] = useStateValue();


  const fetchData = async () => {
    try {
      const data = await getBuildingDetails();
      dispatch({
        type: actionType.SET_BUILDING,
        buildingItems: data,
      });
      // console.log(data)
    } catch (error) {
      console.error('Error fetching building details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-screen flex flex-col">
        <Header />
        <main className="mt-16 md:mt-24 p-8 w-full" >
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route
              path="/createItem"
              element={
                <ProtectedRoute>
                  <CreateContainer />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
