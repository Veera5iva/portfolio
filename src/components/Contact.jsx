import { useState, useEffect, useRef } from "react";
import { SectionWrapper } from "../hoc";
import { terminal } from "../assets";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import emailjs from "@emailjs/browser";

const FormInput = ({ label, name, type = "text", placeholder, value, onChange, required = true }) => (
   <label className="space-y-2 sm:space-y-3 w-full">
      <span className="text-base sm:text-lg font-medium text-[#e23720]">{label}</span>
      <div className="relative group">
         <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-black/40 backdrop-blur-sm px-4 sm:px-5 py-2 min-h-12 sm:min-h-14 rounded-lg !p-3 !mt-1
                  placeholder:text-white/40 text-base sm:text-lg text-white 
                  border border-white/10 
                  shadow-[0_0_15px_rgba(255,255,255,0.05),0_10px_20px_-15px_rgba(255,255,255,0.1)]
                  focus:outline-none focus:border-[#e23720]/50 focus:shadow-[0_0_20px_rgba(226,55,32,0.15)]
                  transition-all duration-300"
            placeholder={placeholder}
         />
         <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e23720]/5 to-[#e23720]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
   </label>
);

const FormTextarea = ({ label, name, placeholder, value, onChange, required = true }) => (
   <label className="space-y-2 sm:space-y-3 w-full">
      <span className="text-base sm:text-lg font-medium text-[#e23720]">{label}</span>
      <div className="relative group">
         <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-black/40 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-4 min-h-[100px] sm:min-h-[120px] rounded-lg !p-3 !mt-1
                  placeholder:text-white/40 text-base sm:text-lg text-white 
                  border border-white/10 
                  shadow-[0_0_15px_rgba(255,255,255,0.05),0_10px_20px_-15px_rgba(255,255,255,0.1)]
                  focus:outline-none focus:border-[#e23720]/50 focus:shadow-[0_0_20px_rgba(226,55,32,0.15)]
                  transition-all duration-300 resize-none"
            placeholder={placeholder}
         />
         <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e23720]/5 to-[#e23720]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
   </label>
);

const SubmitButton = ({ isSubmitting }) => (
   <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-[#e23720] to-[#e23720]/80 
              hover:from-[#e23720]/90 hover:to-[#e23720]/70 
              text-black/90 py-3 sm:py-4 min-h-12 sm:min-h-14 rounded-lg text-base sm:text-lg font-medium 
              shadow-[0_5px_15px_rgba(226,55,32,0.25)] 
              hover:shadow-[0_5px_25px_rgba(226,55,32,0.4)] 
              transition-all duration-300 border-0 cursor-pointer
              disabled:opacity-70 disabled:cursor-not-allowed"
   >
      {isSubmitting ? "Sending..." : "Send Message"}
   </button>
);

const Contact = () => {
   const formRef = useRef(null);
   const [formState, setFormState] = useState({ name: "", email: "", message: "" });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkIfMobile = () => {
         setIsMobile(window.innerWidth < 768);
      };

      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);
      return () => window.removeEventListener("resize", checkIfMobile);
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      emailjs
         .send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
               from_name: formState.name,
               to_name: "Veerasiva", // Change this to your name
               from_email: formState.email,
               to_email: "veerasiva01@gmail.com", // Change this to your actual email
               message: formState.message,
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
         )
         .then(
            () => {
               setIsSubmitting(false);
               alert("Message sent successfully!");

               setFormState({
                  name: "",
                  email: "",
                  message: "",
               });
            },
            (error) => {
               setIsSubmitting(false);
               console.error("Error submitting form:", error);
               alert("Failed to send message. Please try again.");
            }
         );
   };

   return (
      <section>
         <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText}`}>Let's Talk (I Promise I Don't Bite)</p>
            <h2 className={`${styles.sectionHeadText}`} style={{ WebkitTextStroke: "2px #e23720" }}>
               Reach Out & Say Hi!
            </h2>
         </motion.div>

         <div className="md:!mt-7 !mt-8 relative flex items-center justify-center flex-col">
            {!isMobile && (
               <img
                  src={terminal}
                  alt="terminal-image"
                  className="w-full max-w-[900px] h-auto object-cover transition-transform duration-300 hover:scale-105 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
               />
            )}

            <div className={`${isMobile ? "relative" : "absolute"} inset-0 flex flex-col items-center justify-center w-[95%] md:w-auto px-4 sm:px-10`}>
               <form
                  ref={formRef}
                  className={`flex flex-col w-full max-w-md ${isMobile ? "!space-y-4 bg-black/30 backdrop-blur-md !p-5 rounded-lg border !border-white/10 shadow-lg" : "!mt-12 !space-y-6"}`}
                  onSubmit={handleSubmit}
               >
                  <FormInput label="Full Name" name="name" value={formState.name} onChange={handleChange} placeholder="ex., John Doe" />
                  <FormInput label="Email Address" name="email" type="email" value={formState.email} onChange={handleChange} placeholder="ex., john@example.com" />
                  <FormTextarea label="Message" name="message" value={formState.message} onChange={handleChange} placeholder="Your message here..." />
                  <div className="pt-2 sm:pt-3">
                     <SubmitButton isSubmitting={isSubmitting} />
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
};

export default SectionWrapper(Contact, "contact");
