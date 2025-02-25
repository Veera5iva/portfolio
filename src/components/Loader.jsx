import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
   const { progress } = useProgress();  // Shows loading progress

   return (
      <Html center>
         <span className="text-white">{progress.toFixed(2)}%</span>
      </Html>
   );
};

export default Loader;