import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdRealEstateAgent,
  MdCloudUpload,
  MdDelete,
  MdOutlineApartment,
} from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { BsFillPinMapFill } from "react-icons/bs";
import { Categories } from "./Sliderdata";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getBuildingDetails, saveItems } from "../utils/firebaseFunction";
import { useStateValue } from "../context/Stateprovider";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [bhk, setBhk] = useState("");
  const [price, setPrice] = useState("");
  const [adress, setAdress] = useState("");
  const [imageset, setImageset] = useState(null);
  const [category, setCategory] = useState(null);
  const [feild, setFeild] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [isLoading, setIsLoading] = useState(false);
  const [{buildingItems}, dispatch] = useStateValue();



  const uploadImage = (e) => {
    const imageFiles = e.target.files;

    // Check if number of files is greater than 5
    if (imageFiles.length > 5) {
      setFeild(true);
      setMsg("Cannot upload more than 5 images");
      setAlertStatus("danger");
      setIsLoading(false); // Set isLoading to false
      setTimeout(() => {
        setFeild(false);
      }, 4000);
      return;
    }

    setIsLoading(true);
    const imageUrls = [];

    Array.from(imageFiles).forEach((imageFile) => {
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
          setFeild(true);
          setMsg("error while uploading Try again");
          setAlertStatus("danger");
          setTimeout(() => {
            setFeild(false);
            setIsLoading(false);
          }, 4000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            imageUrls.push(downloadURL);

            if (imageUrls.length === imageFiles.length) {
              setImageset(imageUrls);
              setIsLoading(false);
              setFeild(true);
              setMsg("Images Uploaded Successfully");
              setAlertStatus("success");
              setTimeout(() => {
                setFeild(false);
              }, 4000);
            }
          });
        }
      );
    });
  };





  const deleteImage = (imageURL) => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageURL);
    deleteObject(deleteRef)
      .then(() => {
        setImageset((prevImageset) => prevImageset.filter((img) => img !== imageURL));
        setIsLoading(false);
        setFeild(true);
        setMsg("Image deleted successfully.");
        setAlertStatus("success");
        setTimeout(() => {
          setFeild(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setFeild(true);
        setMsg("Error deleting image. Please try again.");
        setAlertStatus("danger");
        setIsLoading(false);
        setTimeout(() => {
          setFeild(false);
        }, 4000);
      });
  };




  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !category || !price || !adress || !imageset.length || !bhk) {
        setFeild(true);
        setMsg("Error while uploading. Please try again.");
        setAlertStatus("danger");
        setTimeout(() => {
          setFeild(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          titles: title,
          imageURL: imageset,
          categories: category,
          prices: price,
          Adress: adress,
          specification: bhk,
        };
        saveItems(data);
        setIsLoading(false);
        setFeild(true);
        setMsg("Data uploaded successfully.");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFeild(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFeild(true);
      setMsg("Error while uploading. Please try again.");
      setAlertStatus("danger");
      setTimeout(() => {
        setFeild(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData()
  };


  const clearData = () => {
    setTitle("");
    setImageset(null);
    setBhk("");
    setAdress("");
    setPrice("");
    setCategory("Select Category");
  };

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


  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {feild && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
              }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdRealEstateAgent className="text-2xl text-gray-700 " />
          <input
            type="text"
            required
            value={title}
            placeholder="Give me a title..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {Categories &&
              Categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>


        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg overflow-hidden">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      multiple
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <div className="w-full h-full flex flex-wrap gap-3 overflow-auto">
                  {imageset.map((imageUrl, index) => (
                    <div key={index} className="relative w-1/2 md:w-1/3 h-28 md:h-56">
                      <img
                        src={imageUrl}
                        alt="Uploaded image"
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-lg cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-out"
                        onClick={() => deleteImage(imageUrl)}
                      >
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>


        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineApartment className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              placeholder="Specification"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <ImPriceTag className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <BsFillPinMapFill className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              placeholder="Adress"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="w-full flex items-center ">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
