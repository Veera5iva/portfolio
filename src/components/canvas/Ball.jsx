import { Suspense } from 'react' 
import { Canvas } from '@react-three/fiber' 
import { OrbitControls, Decal, Float, Preload, useTexture } from '@react-three/drei' 
import CanvasLoader from "../Loader"  
 
const Ball = (props) => { 
   const [decal] = useTexture([props.imgUrl]) 
   return ( 
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}> 
         {/* Increase ambient light intensity for overall brightness */}
         <ambientLight intensity={1} /> 
         
         {/* Add stronger directional light from front */}
         <directionalLight position={[0, 0, 1]} intensity={1} />
         
         {/* Add fill light from other angles */}
         <directionalLight position={[2, 2, 0]} intensity={0.5} />
         <directionalLight position={[-2, -2, 0]} intensity={0.3} />
         
         <mesh castShadow receiveShadow scale={2.75}> 
            <icosahedronGeometry args={[1, 1]} /> 
            <meshStandardMaterial 
               color="#ffffff" // Pure white color
               polygonOffset 
               polygonOffsetFactor={-5} 
               flatShading
               roughness={0.2} // Lower roughness for more shininess
               metalness={0.9} // Slight metalness for better light reflection
            /> 
            <Decal 
               position={[0, 0, 1]} 
               rotation={[2 * Math.PI, 0, 6.25]} 
               scale={1} 
               map={decal} 
               flatShading 
            /> 
         </mesh> 
      </Float> 
   ) 
} 

const BallCanvas = ({ icon }) => { 
   return ( 
      <Canvas 
         frameloop="always" 
         dpr={[1, 2]} 
         gl={{ 
            preserveDrawingBuffer: true,
            antialias: true, // Add antialiasing for smoother edges
         }} 
      > 
         <Suspense fallback={<CanvasLoader />}> 
            <OrbitControls enableZoom={false} /> 
            <Ball imgUrl={icon} /> 
         </Suspense> 
          
         <Preload all /> 
      </Canvas> 
   ) 
} 
 
export default BallCanvas