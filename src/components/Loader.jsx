import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
   const { progress } = useProgress();  // Shows loading progress

   return (
      <Html center>
         <span>
            <p
               style={{
                  fontSize: 14,
                  color: "#f1f1f1",
                  fontWeight: 800,
                  marginTop: 40,
               }}
            >{progress.toFixed(2)}%</p>
         </span>
      </Html>
   );
};

export default CanvasLoader;