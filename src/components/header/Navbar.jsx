import { Link } from "react-router-dom"
import { styles } from "../../styles";
import { veeraLogo } from "../../assets";
import { useState } from "react";
import Menu from "./menu/Menu";
import Nav from "./nav/Nav";
import style from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const menu = {
    open: {
        width: "420px",
        height: "570px",
        top: "-25px",
        right: "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
    }
}
const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`${styles.paddingX} w-full flex items-center fixed top-0 z-20 bg-primary !py-9`}>
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2"
                    onClick={() => { window.scrollTo(0, 0) }}
                >
                    <img src={veeraLogo} alt="logo" className="md:w-80 h-9 object-contain" />
                    {/* <p className="text-white text-[18px] flex font-bold cursor-pointer">
                  Veerasiva &nbsp;
                  <span className="sm:block hidden">| Portfolio</span>
               </p> */}
                </Link>
                <div className={style.header}>
                    <motion.div
                        className={style.menu}
                        variants={menu}
                        animate={isActive ? "open" : "closed"}
                        initial="closed"
                    >
                        <AnimatePresence>
                            {isActive && <Nav />}
                        </AnimatePresence>
                    </motion.div>
                    <Menu isActive={isActive} toggleMenu={() => { setIsActive(!isActive) }} />
                </div>

            </div>

        </div>
    )
}

export default Navbar