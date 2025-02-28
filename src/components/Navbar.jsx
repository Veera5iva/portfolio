import { Link } from "react-router-dom"
import { styles } from "../styles.js"
import { navLinks } from "../constants";
import { veeraLogo, menu, close } from "../assets"
import { useState } from "react";

const Navbar = () => {
   const [active, setActive] = useState("");
   const [toggle, setToggle] = useState(false);
   return (
      <div className={`${styles.paddingX} w-full flex items-center fixed top-0 z-20 bg-primary !py-5`}>
         <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2"
               onClick={() => { setActive(""); window.scrollTo(0, 0); }}
            >
               <img src={veeraLogo} alt="logo" className="md:w-80 h-9 object-contain" />
               {/* <p className="text-white text-[18px] flex font-bold cursor-pointer">
                  Veerasiva &nbsp;
                  <span className="sm:block hidden">| Portfolio</span>
               </p> */}
            </Link>

            <ul className="list-none hidden sm:flex flex-row gap-10">
               {navLinks.map((link) => (
                  <li key={link.id}
                     className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`}
                     onClick={() => setActive(link.title)}
                  >
                     <a href={`#${link.id}`}>{link.title}</a>
                  </li>
               ))}

            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
               <img
                  src={toggle ? close : menu}
                  alt="menu"
                  className="w-[28px] h-[28px] object-contain cursor-pointer"
                  onClick={() => setToggle(!toggle)}
               />
               <div className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl min-h-[150px]`}>
                  <ul className='list-none flex justify-center items-center flex-1 flex-col gap-4'>
                     {navLinks.map((link) => (
                        <li key={link.id}
                           className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`}
                           onClick={() => { setActive(link.title); setToggle(!toggle); }}
                        >
                           <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                     ))}

                  </ul>

               </div>
            </div>

         </div>

      </div>
   )
}

export default Navbar