import { TextPressure } from "./ui"
const Footer = () => {
   return (
      <div className="">
         <TextPressure
            text="Hello!"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
         />
      </div>
   )
}

export default Footer