import { useEffect, useRef } from "react"; 
import gsap from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
 
gsap.registerPlugin(ScrollTrigger); 
 
const Hero = () => { 
   const heroRef = useRef(null); 
   const textContainerRef = useRef(null);
   const cursorRef = useRef(null);
   
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

   // Full text that will be typed with tokens for syntax highlighting
   const codeTokens = [
      { text: "const ", class: colors.keyword },
      { text: "response ", class: colors.variable },
      { text: "= ", class: colors.punctuation },
      { text: "await ", class: colors.keyword },
      { text: "axios", class: colors.variable },
      { text: ".", class: colors.punctuation },
      { text: "get", class: colors.method },
      { text: "(", class: colors.bracket },
      { text: "\"/api/veerasiva/portfolio\"", class: colors.string },
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
      { text: "\"I develop web applications using modern technologies\"", class: colors.string },
      { text: ",", class: colors.punctuation },
      { text: "\n", class: "" },

      { text: "  skills", class: colors.property },
      { text: ": [", class: colors.bracket },
      { text: "\"JavaScript\"", class: colors.string },
      { text: ", ", class: colors.punctuation },
      { text: "\"React\"", class: colors.string },
      { text: ", ", class: colors.punctuation },
      { text: "\"GSAP\"", class: colors.string },
      { text: ", ", class: colors.punctuation },
      { text: "\"Three.js\"", class: colors.string },
      { text: "]", class: colors.bracket },
      { text: ",", class: colors.punctuation },
      { text: "\n", class: "" },

      { text: "};", class: colors.punctuation },
   ];

   // Calculate the total number of characters
   const totalChars = codeTokens.reduce((sum, token) => sum + token.text.length, 0);
   
   useEffect(() => {
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
            // Calculate how many characters to show based on scroll progress
            const progress = self.progress;
            const targetCharCount = Math.floor(progress * totalChars);
            
            // Clear the code container
            codeContainer.innerHTML = '';
            
            // Track how many characters we've processed
            let charCount = 0;
            
            // For each token
            for (let i = 0; i < codeTokens.length; i++) {
               const token = codeTokens[i];
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
      };
   }, []); 
 
   return ( 
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center bg-black text-[#e23720] font-mono"> 
         <div className="max-w-4xl w-full px-5"> 
            <h1 className="text-xl sm:text-2xl md:text-3xl text-[#e23720]">Terminal: ~/portfolio</h1> 
            <div ref={textContainerRef} className="mt-4 text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre">
               {/* Text will be inserted here via JS */}
            </div> 
         </div> 
      </section> 
   ); 
}; 
 
export default Hero;