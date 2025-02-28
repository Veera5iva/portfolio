import style from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data.js';
import { perspective, slideIn } from "./anim.js";

const Nav = () => {
    return(
        <div className={style.nav}>
            <div className={style.body}>
                {
                    links.map((link, i) => {
                        const { title, href } = link;
                        return (
                            <div key={`b_${i}`} className={style.linkContainer}>
                                <motion.div
                                    custom={i}
                                    variants={perspective}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                >
                                    <a href={href}>{title}</a>
                                </motion.div>
                            </div>
                        )
                    })
                }
            </div>
            <motion.div className={style.footer}>
                {
                    footerLinks.map((link, i) => {
                        const { title, href } = link;
                        return (
                            <motion.a
                                variants={slideIn}
                                custom={i}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                                key={`f_${i}`}
                            >
                                {title}
                            </motion.a>
                        )
                    })
                }
            </motion.div>
        </div>
    )
}

export default Nav