import { Tilt } from "react-tilt"
import { motion } from "framer-motion"
import { styles } from "../styles"
import { services } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"
import { SectionWrapper } from "../hoc"
const ServiceCard = ({index, title, icon}) => {
   return (
      <Tilt className="xs:!w-[250px] !w-full flex">
         <motion.div
            variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
            className="w-full p-[1px] rounded-[20px] shadow-rose-800 shadow-lg border-rose-400 border-1"
         >
            <div
               options={{
                  max: 25,
                  speed: 400,
                  glare: true,
               }}
               className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
            >
               <img src={icon} alt={title} className="w-16 h-16 object-contain" />
               <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>

            </div>
         </motion.div>

      </Tilt>
   )
}
const About = () => {
   return (
      <>
         <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText}`}>
               Introduction
            </p>
            <h2 className={`${styles.sectionHeadText}`}>
               Overview.
            </h2>
         </motion.div>

         <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
         >
            I'm a passionate Full-Stack Developer with expertise in JavaScript, TypeScript, React, and Next.js. I enjoy building scalable and user-friendly applications that solve real-world problems. Let's create something amazing together!
         </motion.p>

         <div className="flex !flex-wrap !mt-20 !gap-10">
            {services.map((service, index) => (
               <ServiceCard key={service.title} index={index} {...service} />
            ))}

         </div>


      </>
   )
}

export default SectionWrapper(About, "about");