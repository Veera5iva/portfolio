import { SectionWrapper } from "../hoc"
import { styles } from "../styles"
import { motion } from "framer-motion"
import { textVariant } from "../utils/motion"

const Projects = () => {
   return (
      <>
         <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText}`}>Stuff I Built (That Actually Works!)</p>
            <h2
               className={`${styles.sectionHeadText}`}
               style={{ WebkitTextStroke: "2px #e23720" }}
            >
               My Creations & Experiments
            </h2>
         </motion.div>
         <div className="h-screen bg-red-500">Projects Section

         </div>
      </>
   )
}

export default SectionWrapper(Projects, 'projects')