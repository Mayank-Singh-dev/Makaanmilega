import React, { useEffect, useRef, useState } from "react";
import Logo from "../image/logo.png";
import Avatar from "../image/Avatar.png";
import { AiOutlineHeart } from "react-icons/ai";
import { MdAdd, MdOutlineLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link} from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/Stateprovider";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const menuRef = useRef(null);
  
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const Logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  

  return (
    <header className="fixed z-50 w-screen bg-[#fefcfb] p-3 px-4 md:p-6">
      {/* desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-8 object-cover " src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">Makaan-Milega</p>
        </Link>
        <div className="flex justify-center items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-8"
          >
            <Link to={"/"} className="headerMenus"> Home</Link>
            <Link to={"/"} className="headerMenus">Projects</Link>
            <Link to={"/"} className="headerMenus">About-us</Link>
            <Link to={"/"} className="headerMenus">Services</Link>
          </motion.ul>
          {/* <div className="relative flex items-center justify-center">
            <AiOutlineHeart className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div> */}
          <div className="relative" ref={menuRef}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer border rounded-full"
              alt="Avatar"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ delay: 0.1 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0"
              >
                {user  && (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text text-textColor text-base" onClick={()=>setIsMenu(false)}>
                      New Item<MdAdd />
                    </p >
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text text-textColor text-base"
                  onClick={Logout}
                >
                  Logout <MdOutlineLogout />
                </p >
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-8 object-cover " src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">Makaan-Milega</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer border rounded-full"
            alt="Avatar"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ delay: 0.1 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0"
            >
              {user && user.email === "mayankphenomuraaaa@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col  gap-3">
                <li className="text-lg text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={()=>setIsMenu(false)} >
                  Home
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={()=>setIsMenu(false)} >
                  Projects
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={()=>setIsMenu(false)} >
                  About-us
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={()=>setIsMenu(false)} >
                  Services
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text text-textColor text-base bg-gray-200"
                onClick={Logout} 
              >
                Logout <MdOutlineLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// && user.email === "mayankphenomuraaaa@gmail.com"