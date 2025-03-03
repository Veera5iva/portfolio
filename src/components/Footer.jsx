import { TextPressure } from "./ui"
const Footer = () => {
   return (
      <div className="">
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
   )
}

export default Footer