import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from './components'
import { useEffect, useState } from 'react'

const App = () => {
   const [loading, setLoading] = useState(true);
   const preloader = document.getElementById('preloader');
   if (preloader) {
      setTimeout(() => {
         preloader.style.display = 'none';
         setLoading(false);
      }, 6000);
   }
   return (
      !loading && (
         <BrowserRouter>
            <div className='relative z-0 bg-primary'>

               <div className='bg-[url(/src/assets/herobg.png)] bg-cover bg-no-repeat bg-center'>
                  <Navbar />
                  <Hero />
               </div>

               <About />
               <Experience />
               <Tech />
               <Works />
               <Feedbacks />

               <div className='relative z-0'>
                  <Contact />
                  <StarsCanvas />

               </div>

            </div>
         </BrowserRouter>
      )
   )
}
export default App;