import { SectionWrapper } from "../hoc"
import { BallCanvas } from "./canvas"
import { technologies } from "../constants"
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";

const Tech = () => {
   return (
      <>
         <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText}`}>Tools of the Trade (AKA My Superpowers)</p>
            <h2
               className={`${styles.sectionHeadText}`}
               style={{ WebkitTextStroke: "2px #e23720" }}
            >
               What I Work With
            </h2>
         </motion.div>

         <div className="!mt-6 flex flex-row flex-wrap justify-center items-center gap-6 md:gap-10">
            {technologies.map((tech) => (
               <div className="md:w-28 md:h-28 w-20 h-20" key={tech.name}>
                  <BallCanvas icon={tech.icon} />
               </div>
            ))}

         </div>
      </>
   )
}

export default SectionWrapper(Tech, "");