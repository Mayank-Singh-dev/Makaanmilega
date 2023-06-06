  import React, { useState } from "react";
  import { BiPhoneCall } from "react-icons/bi";
  import { AiFillCloseCircle } from "react-icons/ai";
  import { FcNext, FcPrevious } from "react-icons/fc";
  import { motion } from "framer-motion";


  const RowContainer = ({ flag, data }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    

    const openModal = (data) => {
      setModalOpen(true);
      setSelectedData(data);
    };

    const closeModal = () => {
      setModalOpen(false);
      setSelectedData(null);
    };

    const nextImage = () => {
      setSelectedData((prevData) => {
        const currentIndex = prevData.imageURL.indexOf(prevData.selectedImage);
        const nextIndex = (currentIndex + 1) % prevData.imageURL.length;
        return {
          ...prevData,
          selectedImage: prevData.imageURL[nextIndex],
        };
      });
    };

    const prevImage = () => {
      setSelectedData((prevData) => {
        const currentIndex = prevData.imageURL.indexOf(prevData.selectedImage);
        const prevIndex =
          (currentIndex - 1 + prevData.imageURL.length) % prevData.imageURL.length;
        return {
          ...prevData,
          selectedImage: prevData.imageURL[prevIndex],
        };
      });
    };

    const openContactModal = () => {
      setContactModalOpen(true);
    };

    const closeContactModal = () => {
      setContactModalOpen(false);
    };

    return (
      <div>
        {modalOpen && selectedData && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-75"></div>
            <div className="relative z-10 w-full max-w-4xl mx-auto">
              <button
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-black text-2xl"
                onClick={prevImage}
              >
                <FcPrevious />
                ;
              </button>
              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-black text-2xl"
                onClick={nextImage}
              >
                <FcNext />
                ;
              </button>
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={closeModal}
              >
                <AiFillCloseCircle />
              </button>
              <div className="flex justify-center">
                <img
                  src={selectedData.selectedImage}
                  className="h-60vh w-60vw object-contain"
                  alt=""
                />
              </div>
            </div>
          </div>
        )}

        {contactModalOpen && selectedData && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-75"></div>
            <div className="relative z-10 w-full max-w-sm mx-auto p-4 bg-white rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Owner</h2>
              <div className="flex flex-col gap-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => {
                    // Handle Contact Owner action
                  }}
                >
                  Contact Owner
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => {
                    // Handle Message Owner action
                  }}
                >
                  Message Owner
                </button>
                <button
                  className="text-blue-500 underline"
                  onClick={closeContactModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`w-full flex items-center gap-4 md:gap-9 ${
            flag
              ? "overflow-x-scroll scrollbar-hide"
              : "overflow-x-hidden flex-wrap justify-center"
          } `}
        >
          {data &&
            data.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  openModal({
                    ...item,
                    selectedImage: item.imageURL[0],
                  })
                }
                className="w-275 min-w-[275px] md:w-340 md:min-w-[275px] h-[175px] bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative cursor-pointer"
              >
                <div className="w-full flex items-center justify-between">
                  <motion.div
                    className="w-44 h-40 -mt-8 drop-shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={item.imageURL[0]}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
                    onClick={openContactModal}
                  >
                    <BiPhoneCall className="text-white hover:shadow-md" />
                  </motion.div>
                </div>
                <div className="w-full flex flex-col items-end justify-end">
                  <p className="text-textColor font-semibold text-base md:text-lg">
                    {item.titles}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.specification}
                  </p>
                  <div className="flex items-center gap-8">
                    <p className="text-lg text-headingColor font-semibold">
                      <span className="text-sm text-red-500">₹</span>
                      {item.prices}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  export default RowContainer;



