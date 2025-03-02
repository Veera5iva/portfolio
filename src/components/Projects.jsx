import { SectionWrapper } from "../hoc"
import { styles } from "../styles"
import { motion } from "framer-motion"
import { textVariant } from "../utils/motion"
import { projects } from "../constants"
import { PinContainer } from "./index.js"
import { FaLocationArrow } from "react-icons/fa6";

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
         <div className="flex flex-wrap justify-center items-center gap-x-24 gap-y-4">
            {projects.map((item) => (
               <div
                  className="sm:h-[37rem] h-[30rem] lg:min-h-[42rem] flex items-center justify-center sm:w-[480px] w-[80vw]"
                  key={item.id}
               >
                  <PinContainer
                     title={item.link}
                     href={item.link}
                  >
                     <div className="relative flex items-center justify-center sm:w-[480px] w-[80vw] overflow-hidden sm:h-[42vh] h-[30vh] !mb-5">
                        <div
                           className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                           style={{ backgroundColor: "#13162D" }}
                        >
                           {/* <img src="/bg.png" alt="bgimg" /> */}
                        </div>
                        <img
                           src={item.img}
                           alt="cover"
                           className="z-10 absolute bottom-0"
                        />
                     </div>

                     <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                        {item.title}
                     </h1>

                     <p
                        className="lg:text-xl lg:font-normal font-light text-sm line-clamp-3"
                        style={{
                           color: "#BEC1DD",
                           margin: "1vh 0",
                        }}
                     >
                        {item.des}
                     </p>

                     <div className="flex items-center justify-between !mt-5 !mb-4">
                        <div className="flex items-center">
                           {item.iconLists.map((icon, index) => (
                              <div
                                 key={index}
                                 className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                                 style={{
                                    transform: `translateX(-${5 * index + 2}px)`,
                                 }}
                              >
                                 <img src={icon} alt="icon5" className="p-2" />
                              </div>
                           ))}
                        </div>

                        <div className="flex justify-center items-center">
                           <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                              Check GitHub
                           </p>
                           {/* <FaLocationArrow className="ms-3" color="#CBACF9" /> */}
                        </div>
                     </div>
                  </PinContainer>
               </div>
            ))}

         </div>
      </>
   )
}

export default SectionWrapper(Projects, 'projects')