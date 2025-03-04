import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Hero, Navbar, Tech, Projects, Footer } from './components'
import { useState } from 'react'

const App = () => {
   const [loading, setLoading] = useState(true);
   const preloader = document.getElementById('preloader');
   if (preloader) {
      setTimeout(() => {
         preloader.style.display = 'none';
         setLoading(false);
      }, 2000);
   }
   return (
      !loading && (
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
      )
   )
}
export default App;
