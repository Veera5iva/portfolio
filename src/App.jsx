import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, Preloader } from './components';

const App = () => {
   const [isPreloaderVisible, setPreloaderVisible] = useState(true);

   const handlePreloaderComplete = () => {
      setPreloaderVisible(false);
   };

   return (
      <BrowserRouter>
         {isPreloaderVisible && <Preloader onAnimationComplete={handlePreloaderComplete} />}
         {!isPreloaderVisible && (
            <div className="relative z-0 bg-primary">
               <div className="bg-[url(/src/assets/herobg.png)] bg-cover bg-no-repeat bg-center">
                  <Navbar />
                  <Hero />
               </div>
               <About />
               <Experience />
               <Tech />
               <Works />
               <Feedbacks />
               <div className="relative z-0">
                  <Contact />
                  <StarsCanvas />
               </div>
            </div>
         )}
      </BrowserRouter>
   );
};

export default App;
