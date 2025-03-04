import { SectionWrapper } from "../hoc"
import { github } from "../assets"
import { styles } from "../styles"
import { motion } from "framer-motion"
import { projects } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
   return (
      <motion.div 
         variants={fadeIn("up", "spring", index * 0.5, 0.75)}
         whileHover={{ scale: 1.1 }} // Zoom effect on hover
         transition={{ duration: 0.3 }} // Smooth transition
         className='bg-black !p-5 rounded-2xl sm:w-[360px] w-[360px] border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05),0_10px_20px_-15px_rgba(255,255,255,0.1)]'
      >
         <div className='relative w-full h-[260px] md:h-[270px]'>
            <motion.img
               src={image}
               alt='project_image'
               className='w-full h-full object-cover rounded-2xl'
               whileHover={{ scale: 1.1 }} // Slight zoom effect on image hover
               transition={{ duration: 0.3 }}
            />

            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
               <div
                  onClick={() => window.open(source_code_link, "_blank")}
                  className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
               >
                  <img
                     src={github}
                     alt='source code'
                     className='w-1/2 h-1/2 object-contain'
                  />
               </div>
            </div>
         </div>

         <div className='!mt-5'>
            <h3 className='text-white font-bold text-[24px]'>{name}</h3>
            <p className='!mt-2 text-secondary text-[14px]'>{description}</p>
         </div>

         <div className='!mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
               <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
                  #{tag.name}
               </p>
            ))}
         </div>
      </motion.div>
   )
}

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

         <div className='!mt-12 flex flex-wrap !gap-17 items-center justify-center'>
            {projects.map((project, index) => (
               <ProjectCard key={`project-${index}`} index={index} {...project} />
            ))}
         </div>
      </>
   )
}

export default SectionWrapper(Projects, 'projects')
