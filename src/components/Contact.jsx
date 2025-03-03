import { useState } from "react"
import { SectionWrapper } from "../hoc"
import { terminal } from "../assets"
import { motion } from "framer-motion"
import { textVariant } from "../utils/motion"
import { styles } from "../styles"

const FormInput = ({ label, name, type = "text", placeholder, value, onChange, required = true }) => (
   <label className="space-y-3 w-full">
      <span className="text-lg font-medium text-white/80">{label}</span>
      <div className="relative group">
         <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-black/40 backdrop-blur-sm px-5 py-2 min-h-14 rounded-lg !p-3
                  placeholder:text-white/40 text-lg text-white 
                  border border-white/10 
                  shadow-[0_0_15px_rgba(255,255,255,0.05),0_10px_20px_-15px_rgba(255,255,255,0.1)]
                  focus:outline-none focus:border-[#e23720]/50 focus:shadow-[0_0_20px_rgba(226,55,32,0.15)]
                  transition-all duration-300"
            placeholder={placeholder}
         />
         <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e23720]/5 to-[#e23720]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
   </label>
)

const FormTextarea = ({ label, name, placeholder, value, onChange, required = true }) => (
   <label className="space-y-3 w-full">
      <span className="text-lg font-medium text-white/80">{label}</span>
      <div className="relative group">
         <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-black/40 backdrop-blur-sm px-5 py-4 min-h-[120px] rounded-lg !p-3
                  placeholder:text-white/40 text-lg text-white 
                  border border-white/10 
                  shadow-[0_0_15px_rgba(255,255,255,0.05),0_10px_20px_-15px_rgba(255,255,255,0.1)]
                  focus:outline-none focus:border-[#e23720]/50 focus:shadow-[0_0_20px_rgba(226,55,32,0.15)]
                  transition-all duration-300 resize-none"
            placeholder={placeholder}
         />
         <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e23720]/5 to-[#e23720]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
   </label>
)

const SubmitButton = ({ onClick, isSubmitting }) => (
   <button
      type="submit"
      disabled={isSubmitting}
      onClick={onClick}
      className="w-full bg-gradient-to-r from-[#e23720] to-[#e23720]/80 
              hover:from-[#e23720]/90 hover:to-[#e23720]/70 
              text-white py-4 min-h-14 rounded-lg text-lg font-medium 
              shadow-[0_5px_15px_rgba(226,55,32,0.25)] 
              hover:shadow-[0_5px_25px_rgba(226,55,32,0.4)] 
              transition-all duration-300 border-0 cursor-pointer
              disabled:opacity-70 disabled:cursor-not-allowed"
   >
      {isSubmitting ? "Sending..." : "Send Message"}
   </button>
)

const Contact = () => {
   const [formState, setFormState] = useState({
      name: "",
      email: "",
      message: "",
   })
   const [isSubmitting, setIsSubmitting] = useState(false)

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormState((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Simulate form submission
      try {
         console.log("Form submitted:", formState)
         // Add your actual form submission logic here
         await new Promise((resolve) => setTimeout(resolve, 1000))

         // Reset form after successful submission
         setFormState({
            name: "",
            email: "",
            message: "",
         })
         alert("Message sent successfully!")
      } catch (error) {
         console.error("Error submitting form:", error)
         alert("Failed to send message. Please try again.")
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <section className="my-20">
         <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText}`}>Let's Talk (I Promise I Don't Bite)</p>
            <h2 className={`${styles.sectionHeadText}`} style={{ WebkitTextStroke: "2px #e23720" }}>
               Reach Out & Say Hi!
            </h2>
         </motion.div>
         <div className="mt-7 relative flex items-center justify-center flex-col">
            <img
               src={terminal || "/placeholder.svg"}
               alt="terminal-image"
               className="w-[900px] h-auto object-cover transition-transform duration-300 hover:scale-105 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center sm:px-10 px-5 mt-12">
               <form className="!mt-12 flex flex-col !space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
                  <FormInput
                     label="Full Name"
                     name="name"
                     value={formState.name}
                     onChange={handleChange}
                     placeholder="ex., John Doe"
                  />

                  <FormInput
                     label="Email Address"
                     name="email"
                     type="email"
                     value={formState.email}
                     onChange={handleChange}
                     placeholder="ex., john@example.com"
                  />

                  <FormTextarea
                     label="Message"
                     name="message"
                     value={formState.message}
                     onChange={handleChange}
                     placeholder="Your message here..."
                  />

                  <div className="pt-3">
                     <SubmitButton isSubmitting={isSubmitting} />
                  </div>
               </form>
            </div>
         </div>
      </section>
   )
}

export default SectionWrapper(Contact, "contact")