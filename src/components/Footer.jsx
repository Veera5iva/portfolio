import { TextPressure } from "./ui"
const Footer = () => {
   return (
      <div
         className='relative h-[270px]'
         style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
         <div className='relative h-[calc(100vh+270px)] -top-[100vh]'>
            <div className='h-[270px] sticky top-[calc(100vh-270px)]'>
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
   )
}

export default Footer