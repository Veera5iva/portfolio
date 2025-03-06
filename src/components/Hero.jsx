import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
   const heroRef = useRef(null);
   const textContainerRef = useRef(null);
   const cursorRef = useRef(null);
   const isMobileRef = useRef(window.innerWidth < 640); // Track mobile state

   // Define GitHub-like syntax highlighting colors
   const colors = {
      keyword: "text-[#ff79c6]",      // const, await, etc. (pink)
      variable: "text-[#f8f8f2]",     // response, data, etc. (white)
      string: "text-[#f1fa8c]",       // quoted strings (yellow)
      property: "text-[#8be9fd]",     // object properties (cyan)
      method: "text-[#50fa7b]",       // methods like get(), log() (green)
      bracket: "text-[#f8f8f2]",      // brackets and parentheses (white)
      punctuation: "text-[#f8f8f2]",  // semicolons, commas, etc. (white)
      comment: "text-[#6272a4]",      // comments (gray-purple)
      default: "text-[#e23720]"       // default text color (custom red)
   };

   // Function to get code tokens based on screen size
   const getCodeTokens = (isMobile) => {
      // For desktop, use the original strings
      if (!isMobile) {
         return [
            { text: "const ", class: colors.keyword },
            { text: "response ", class: colors.variable },
            { text: "= ", class: colors.punctuation },
            { text: "await ", class: colors.keyword },
            { text: "axios", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "get", class: colors.method },
            { text: "(", class: colors.bracket },
            { text: "\"/api/portfolio/hero-section\"", class: colors.string },
            { text: ");", class: colors.punctuation },
            { text: "\n", class: "" },

            { text: "console", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "log", class: colors.method },
            { text: "(", class: colors.bracket },
            { text: "response", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "data", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "data", class: colors.variable },
            { text: ");", class: colors.punctuation },
            { text: "\n", class: "" },
            { text: "\n", class: "" },

            { text: "const ", class: colors.keyword },
            { text: "data ", class: colors.variable },
            { text: "= {", class: colors.bracket },
            { text: "\n", class: "" },

            { text: "  name", class: colors.property },
            { text: ": ", class: colors.punctuation },
            { text: "\"Veerasiva\"", class: colors.string },
            { text: ",", class: colors.punctuation },
            { text: "\n", class: "" },

            { text: "  headline", class: colors.property },
            { text: ": ", class: colors.punctuation },
            { text: "\"Turning caffeine into code & ideas into applications\"", class: colors.string },
            { text: ",", class: colors.punctuation },
            { text: "\n", class: "" },

            { text: "  philosophy", class: colors.property },
            { text: ": ", class: colors.punctuation },
            { text: "\"Write code as if the next person maintaining it is a time-traveling assassin.\"", class: colors.string },
            { text: "\n", class: "" },

            { text: "};", class: colors.punctuation },
         ];
      }
      // For mobile, adjust specific strings to break where requested
      else {
         return [
            { text: "const ", class: colors.keyword },
            { text: "response ", class: colors.variable },
            { text: "= ", class: colors.punctuation },
            { text: "await ", class: colors.keyword },
            { text: "axios", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "get", class: colors.method },
            { text: "(", class: colors.bracket },
            { text: "\"/api/portfolio/hero-section\"", class: colors.string },
            { text: ");", class: colors.punctuation },
            { text: "\n", class: "" },

            { text: "console", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "log", class: colors.method },
            { text: "(", class: colors.bracket },
            { text: "response", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "data", class: colors.variable },
            { text: ".", class: colors.punctuation },
            { text: "data", class: colors.variable },
            { text: ");", class: colors.punctuation },
            { text: "\n", class: "" },
            { text: "\n", class: "" },

            { text: "const ", class: colors.keyword },
            { text: "data ", class: colors.variable },
            { text: "= {", class: colors.bracket },
            { text: "\n", class: "" },

            { text: "  name", class: colors.property },
            { text: ": ", class: colors.punctuation },
            { text: "\"Veerasiva\"", class: colors.string },
            { text: ",", class: colors.punctuation },
            { text: "\n", class: "" },

            { text: "  headline", class: colors.property },
            { text: ": ", class: colors.punctuation },
            { text: "\"Turning caffeine into code & ideas into applications\"", class: colors.string },
            { text: ",", class: colors.punctuation },
            { text: "\n", class: "" },

            { text: "  philosophy", class: colors.property },
            { text: ": ", class: colors.punctuation },
            { text: "\"Write code as if the next person maintaining it is a", class: colors.string },
            { text: "\n", class: "" },
            { text: "    time-traveling assassin.\"", class: colors.string },
            { text: "\n", class: "" },

            { text: "};", class: colors.punctuation },
         ];
      }
   };

   // Get the appropriate tokens based on screen size
   // const codeTokens = getCodeTokens(isMobileRef.current);

   // // Calculate the total number of characters
   // const totalChars = codeTokens.reduce((sum, token) => sum + token.text.length, 0);

   useEffect(() => {
      // Handle window resize to update mobile state
      const handleResize = () => {
         isMobileRef.current = window.innerWidth < 640;
         // Force a ScrollTrigger refresh to update the content
         ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      // Only create elements if they don't already exist
      if (!cursorRef.current) {
         // Create glowing cursor element with custom color
         const cursor = document.createElement('span');
         cursor.textContent = '█';
         cursor.className = 'animate-pulse text-[#e23720] opacity-80 drop-shadow-[0_0_8px_rgba(226,55,32,0.8)]';
         cursorRef.current = cursor;

         // Create container for code text (only once)
         const codeContainer = document.createElement('span');

         // Clear existing content to prevent duplicate cursors
         textContainerRef.current.innerHTML = '';

         // Add the elements in the right order
         textContainerRef.current.appendChild(codeContainer);
         textContainerRef.current.appendChild(cursor);
      }

      // References to the elements for use in the ScrollTrigger
      const cursor = cursorRef.current;
      const codeContainer = cursor.previousSibling;

      // Set up ScrollTrigger to control typing animation based on scroll position
      const scrollTrigger = ScrollTrigger.create({
         trigger: heroRef.current,
         start: "top top",
         end: "+=2000px", // Adjust this value to control how far user needs to scroll
         pin: true,
         scrub: 1,
         onUpdate: (self) => {
            // Get the current tokens based on screen size
            const currentTokens = getCodeTokens(isMobileRef.current);

            // Calculate how many characters to show based on scroll progress
            const progress = self.progress;
            const currentTotalChars = currentTokens.reduce((sum, token) => sum + token.text.length, 0);
            const targetCharCount = Math.floor(progress * currentTotalChars);

            // Clear the code container
            codeContainer.innerHTML = '';

            // Track how many characters we've processed
            let charCount = 0;

            // For each token
            for (let i = 0; i < currentTokens.length; i++) {
               const token = currentTokens[i];
               const tokenLength = token.text.length;

               // If we haven't reached this token yet, break
               if (charCount >= targetCharCount) break;

               // If this token is fully visible
               if (charCount + tokenLength <= targetCharCount) {
                  // Create the element with appropriate class
                  const span = document.createElement('span');
                  span.className = token.class;

                  // Handle newlines
                  if (token.text === '\n') {
                     span.innerHTML = '<br>';
                  } else {
                     span.textContent = token.text;
                  }

                  codeContainer.appendChild(span);
                  charCount += tokenLength;
               }
               // If this token is partially visible
               else {
                  const visiblePart = token.text.substring(0, targetCharCount - charCount);

                  const span = document.createElement('span');
                  span.className = token.class;
                  span.textContent = visiblePart;

                  codeContainer.appendChild(span);
                  break;
               }
            }
         }
      });

      return () => {
         if (scrollTrigger) scrollTrigger.kill();
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center bg-black text-[#e23720] font-mono overflow-hidden">
         <div className="md:max-w-4xl w-full px-5 relative md:right-14 right-[-6px]">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-[#e23720]">User@veerasiva: ~/portfolio</h1>
            <div ref={textContainerRef} className="mt-4 text-[14.5px] sm:text-xl md:text-2xl leading-relaxed whitespace-pre">
               {/* Text will be inserted here via JS */}
            </div>
         </div>
         <div className="flex justify-center items-center">
            <motion.div
               // style={{ opacity: 0.7 }}
               animate={{
                  y: [0, 24, 0],
                  opacity: [0.3, 1, 0.3],
               }}
               transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
               }}
               className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#e23720]"
            />
         </div>
      </section>
   );
};

export default Hero;