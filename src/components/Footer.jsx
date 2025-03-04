import { useEffect, useState } from "react";
import { TextPressure } from "./ui";

const Footer = () => {
   const [footerHeight, setFooterHeight] = useState(270);

   useEffect(() => {
      // Function to check screen width and update height accordingly
      const updateFooterHeight = () => {
         if (window.innerWidth <= 640) {
            setFooterHeight(68); // Smaller height for mobile devices
         } else {
            setFooterHeight(270); // Default height for larger screens
         }
      };

      updateFooterHeight(); // Set height initially
      window.addEventListener("resize", updateFooterHeight); // Listen for screen size changes

      return () => window.removeEventListener("resize", updateFooterHeight); // Cleanup event listener
   }, []);

   return (
      <div
         className="relative"
         style={{
            height: `${footerHeight}px`,
            clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
         }}
      >
         <div
            className="relative -top-[100vh]"
            style={{ height: `calc(100vh + ${footerHeight}px)` }}
         >
            <div
               className="sticky"
               style={{
                  height: `${footerHeight}px`,
                  top: `calc(100vh - ${footerHeight}px)`,
               }}
            >
               <TextPressure
                  text="Veerasiva!"
                  flex={true}
                  alpha={false}
                  stroke={true}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#ff0000"
                  minFontSize={36}
                  letterSpacing="0.05em"
                  textHeight={0.9}
                  hoverColor="#e23720"
                  hoverScale={1.15}
               />
            </div>
         </div>
      </div>
   );
};

export default Footer;
