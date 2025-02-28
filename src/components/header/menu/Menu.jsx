import style from './style.module.scss';
import { motion } from 'framer-motion';

function PerspectiveText({ label }) {
    return (
        <div className={style.perspectiveText}>
            <p>{label}</p>
            <p>{label}</p>
        </div>
    )
}

const Menu = ({ isActive, toggleMenu }) => {
    return (
        <div className={style.button}>
            <motion.div
                className={style.slider}
                animate={{ top: isActive ? "-100%" : "0%" }}
                transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
            >
                <div
                    className={style.el}
                    onClick={() => { toggleMenu(); console.log("Menu State:", isActive); }}
                >
                    <PerspectiveText label="Menu" />
                </div>
                <div
                    className={style.el}
                    onClick={() => { toggleMenu() }}
                >
                    <PerspectiveText label="Close" />
                </div>
            </motion.div>
        </div>
    )
}

export default Menu