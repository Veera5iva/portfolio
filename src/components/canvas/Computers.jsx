import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

import CanvasLoader from "../Loader"

const Computers = ({isMobile}) => {
   const computer = useGLTF("./desktop_pc/scene.gltf")

   return (
      <mesh>
         {/* Reduced ambient and hemisphere lights for darker atmosphere */}
         <ambientLight intensity={0.3} /> {/* Reduced from 1.2 */}
         <hemisphereLight intensity={0.15} groundColor="black" /> {/* Reduced from 0.4 and changed ground color */}

         {/* Main spot light from front - reduced intensity */}
         <spotLight
            position={[-20, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={0.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
         />

         {/* Secondary spot light from back - reduced intensity */}
         <spotLight
            position={[20, 30, -10]}
            angle={0.25}
            penumbra={1}
            intensity={0.6}
            castShadow
         />

         {/* Fill light from the side - reduced intensity */}
         <spotLight
            position={[30, 20, 10]}
            angle={0.35}
            penumbra={1}
            intensity={0.4}
         />

         {/* Point lights for subtle highlights */}
         <pointLight position={[10, 10, 10]} intensity={0.3} />
         <pointLight position={[-10, 0, -10]} intensity={0.3} />
         <pointLight intensity={0.8} />

         {/* Soft directional light from above - reduced intensity */}
         <directionalLight
            position={[0, 10, 0]}
            intensity={0.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
         />

         {/* The 3D model */}
         <primitive
            object={computer.scene}
            scale={isMobile? 0.7 : 0.75}
            position={isMobile ? [0, -3, -2.2] : [0, -3.35, -1.5]}
            rotation={[-0.01, -0.2, -0.1]}
            castShadow
            receiveShadow
         />

         {/* Ground plane with darker shadows */}
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.25, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial transparent opacity={0.4} /> {/* Increased from 0.2 for darker shadows */}
         </mesh>
      </mesh>
   )
}

const ComputersCanvas = () => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      setIsMobile(mediaQuery.matches);

      const handleMediaQueryChange = (event) => {
         setIsMobile(event.matches);
      };

      mediaQuery.addEventListener("change", handleMediaQueryChange);

      return () => {
         mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };

   }, []);

   return (
      <Canvas
         frameloop="demand"
         shadows
         camera={{ position: [20, 3, 5], fov: 25 }}
         gl={{
            preserveDrawingBuffer: true,
            toneMapping: 3, // ACESFilmic tone mapping
            exposure: 0.8, // Reduced from 1.2 for darker overall scene
         }}
      >
         <Suspense fallback={<CanvasLoader />}>
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            <Computers isMobile={isMobile} />
            <Preload all />
         </Suspense>
      </Canvas>
   )
}

export default ComputersCanvas

