import { motion } from "framer-motion";
import { styles } from "../styles";
import { about } from "../constants";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
   const element = useRef(null);
   const textRef = useRef(null);

   useEffect(() => {
      const words = textRef.current.innerText.split(" ");
      textRef.current.innerHTML = words
         .map((word) => `<span class="word">${word}</span>`)
         .join(" ");

      const wordElements = textRef.current.querySelectorAll(".word");

      gsap.fromTo(
         wordElements,
         { opacity: 0.1 },
         {
            opacity: 1,
            stagger: 0.1, // Controls delay between words
            scrollTrigger: {
               trigger: element.current,
               start: "top 90%", // Starts when 80% of the section is in view
               end: "bottom 40%", // Ends when 20% of the section leaves
               scrub: true, // Makes it reverse when scrolling back up
            },
         }
      );
   }, []);

   return (
      <>
         <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText}`}>Who am I? (Still figuring it out...)</p>
            <h2
               className={`${styles.sectionHeadText}`}
               style={{ WebkitTextStroke: "2px #e23720" }}
            >
               A Little Bit About Me
            </h2>
         </motion.div>

         <p
            className="!mt-4 relative text-secondary sm:text-[29px] xs:text-[27px] text-[27px] md:text-[50px] sm:leading-12 leading-11 md:leading-20"
            ref={(el) => {
               element.current = el;
               textRef.current = el;
            }}
         >
            {about}
         </p>
      </>
   );
};

export default SectionWrapper(About, "about");
