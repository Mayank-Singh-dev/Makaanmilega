import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsFillHouseFill } from "react-icons/bs";
import { Categories } from "../utils/data";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/Stateprovider";

const MenuConatiner = () => {
  const [filter, setfilter] = useState("Apartments");
  const [{ buildingItems }, dispatch] = useStateValue();

  return (
    <section className="contain w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor border-b-4 border-gray-600 rounded-sm mr-auto">
          Filter by Categories
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-hide ">
          {Categories &&
            Categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.6 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-white"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setfilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <BsFillHouseFill
                    className={` ${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer flag={false} data = {buildingItems?.filter(n => n.categories === filter)}/>
        </div>
      </div>
    </section>
  );
};

export default MenuConatiner;

// 'text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:contents before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'
