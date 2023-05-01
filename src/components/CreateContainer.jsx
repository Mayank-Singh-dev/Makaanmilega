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
import { saveItems } from "../utils/firebaseFunction";

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

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
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
          setImageset(downloadURL);
          setIsLoading(false);
          setFeild(true);
          setMsg("Image Uploaded Sucessfully");
          setAlertStatus("sucess");
          setTimeout(() => {
            setFeild(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageset);
    deleteObject(deleteRef).then(() => {
      setImageset(null);
      setIsLoading(false);
      setFeild(true);
      setMsg("Image delete sucessfully");
      setAlertStatus("sucess");
      setTimeout(() => {
        setFeild(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !category || !price || !adress || !imageset || !bhk) {
        setFeild(true);
        setMsg("error while uploading Try again");
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
        setMsg("Data Uploaded Sucessfully");
        clearData();
        setAlertStatus("sucess");
        setTimeout(() => {
          setFeild(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFeild(true);
      setMsg("error while uploading Try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFeild(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageset(null);
    setBhk("");
    setAdress("");
    setPrice("");
    setCategory("Select Category");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {feild && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
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
        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420
         cursor-pointer rounded-lg"
        >
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
                        click here to Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/**"
                      multiple
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageset}
                      alt="Uploaded images"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
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
