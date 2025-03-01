import { useEffect, useRef, useState } from "react"; 
import gsap from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
 
gsap.registerPlugin(ScrollTrigger); 
 
const Hero = () => { 
   const heroRef = useRef(null); 
   const textContainerRef = useRef(null);
   const cursorRef = useRef(null);
   
   // Full text that will be typed
   const fullText = [
     "const response = await axios.get(\"/api/veerasiva/portfolio\");",
     "console.log(response.data.data);",
     "",
     "const data = {",
     "  name: \"Veerasiva\",",
     "  headline: \"I develop web applications using modern technologies\",",
     "  skills: [\"JavaScript\", \"React\", \"GSAP\", \"Three.js\"],",
     "};"
   ].join('\n');
   
   useEffect(() => {
      // Create cursor element
      const cursor = document.createElement('span');
      cursor.textContent = '_';
      cursor.className = 'animate-pulse';
      cursorRef.current = cursor;
      textContainerRef.current.appendChild(cursor);
      
      // Set up blinking cursor animation
      gsap.to(cursor, {
         opacity: 0,
         duration: 0.5,
         repeat: -1,
         yoyo: true
      });
      
      // Calculate the total number of characters
      const totalChars = fullText.length;
      
      // Set up ScrollTrigger to control typing animation based on scroll position
      const scrollTrigger = ScrollTrigger.create({
         trigger: heroRef.current,
         start: "top top", 
         end: "+=2000px", // Adjust this value to control how far user needs to scroll for full text
         pin: true,
         scrub: 1,
         onUpdate: (self) => {
            // Calculate how many characters to show based on scroll progress
            const progress = self.progress;
            const charCount = Math.floor(progress * totalChars);
            
            // Update the visible text
            const visibleText = fullText.substring(0, charCount);
            
            // Replace line breaks with <br> tags for proper display
            const formattedText = visibleText.replace(/\n/g, '<br>');
            
            // Update text content (without the cursor)
            if (textContainerRef.current) {
               // Remove text nodes (but keep the cursor)
               while (textContainerRef.current.firstChild !== cursorRef.current) {
                  textContainerRef.current.removeChild(textContainerRef.current.firstChild);
               }
               
               // Add the new text
               const textNode = document.createElement('span');
               textNode.innerHTML = formattedText;
               textContainerRef.current.insertBefore(textNode, cursorRef.current);
            }
         }
      });
      
      return () => {
         if (scrollTrigger) scrollTrigger.kill();
      };
   }, []); 
 
   return ( 
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center bg-black text-green-400 font-mono"> 
         <div className="max-w-4xl w-full px-5"> 
            <h1 className="text-xl sm:text-2xl md:text-3xl">Terminal: ~/portfolio</h1> 
            <div ref={textContainerRef} className="mt-4 text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
               {/* Text will be inserted here via JS */}
            </div> 
         </div> 
      </section> 
   ); 
}; 
 
export default Hero;