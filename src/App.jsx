import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Hero, Navbar, Tech, Projects, Footer } from './components'
import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

const App = () => {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
         setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
         }, 4500);
      } else {
         setLoading(false);
      }
   }, []);

   return (
      <>
         <Analytics /> {/* Ensures analytics runs on all pages */}
         {!loading && (
            <BrowserRouter>
               <div className='relative z-0 bg-black'>
                  <Navbar />
                  <Hero />
                  <About />
                  <Tech />
                  <Projects />
                  <div className='relative z-0'>
                     <Contact />
                     <Footer />
                  </div>
               </div>
            </BrowserRouter>
         )}
      </>
   )
}

export default App;
