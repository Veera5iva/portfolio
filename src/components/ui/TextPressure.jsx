import { useEffect, useRef, useState } from 'react';

const TextPressure = ({
   text = 'Compressa',
   fontFamily = 'Compressa VF',
   fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',

   width = true,
   weight = true,
   italic = true,
   alpha = false,

   flex = true,
   stroke = false,
   scale = false,

   textColor = '#FFFFFF',
   strokeColor = '#FF0000',
   strokeWidth = 2,
   className = '',

   minFontSize = 24,
   debug = false,
   
   // Keep customizations from your first file
   letterSpacing = '0.02em',
   textHeight = 1,
   hoverColor = '#FF0000',
   hoverScale = 1.1,
}) => {
   const containerRef = useRef(null);
   const titleRef = useRef(null);
   const spansRef = useRef([]);

   const mouseRef = useRef({ x: 0, y: 0 });
   const cursorRef = useRef({ x: 0, y: 0 });

   const [fontSize, setFontSize] = useState(minFontSize);
   const [scaleY, setScaleY] = useState(1);
   const [lineHeight, setLineHeight] = useState(textHeight);
   const [isActive, setIsActive] = useState(false);
   const [containerWidth, setContainerWidth] = useState('auto');
   const [containerHeight, setContainerHeight] = useState('auto');
   const [loaded, setLoaded] = useState(false);
   const [hoveredIndex, setHoveredIndex] = useState(-1);

   const chars = text.split('');

   // Make sure we're using a default font if the variable font fails
   const fallbackFontFamily = `${fontFamily}, 'Arial Variable', Arial, sans-serif`;

   // Distance calculation
   const dist = (a, b) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      return Math.sqrt(dx * dx + dy * dy);
   };

   // Add mouse handlers
   useEffect(() => {
      const handleMouseMove = (e) => {
         cursorRef.current.x = e.clientX;
         cursorRef.current.y = e.clientY;
         setIsActive(true);
      };

      const handleMouseLeave = () => {
         setIsActive(false);
      };

      const handleMouseEnter = () => {
         setIsActive(true);
      };

      const handleTouchMove = (e) => {
         const t = e.touches[0];
         cursorRef.current.x = t.clientX;
         cursorRef.current.y = t.clientY;
         setIsActive(true);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });

      if (containerRef.current) {
         containerRef.current.addEventListener('mouseenter', handleMouseEnter);
         containerRef.current.addEventListener('mouseleave', handleMouseLeave);

         // Initialize cursor position to center of container
         const { left, top, width, height } = containerRef.current.getBoundingClientRect();
         mouseRef.current.x = left + width / 2;
         mouseRef.current.y = top + height / 2;
         cursorRef.current.x = mouseRef.current.x;
         cursorRef.current.y = mouseRef.current.y;
      }

      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
         window.removeEventListener('touchmove', handleTouchMove);

         if (containerRef.current) {
            containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
            containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
         }
      };
   }, []);

   // Set size based on container - using approach from second file
   const setSize = () => {
      if (!containerRef.current || !titleRef.current) return;

      // Get container dimensions directly like in the second file
      const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

      // Calculate font size based on container width and character count like in second file
      let newFontSize = containerW / (chars.length / 2);  // This is the key calculation from the second file
      newFontSize = Math.max(newFontSize, minFontSize);

      setFontSize(newFontSize);
      setScaleY(1);
      setLineHeight(textHeight);
      
      // Store container width
      setContainerWidth(`${containerW}px`);

      requestAnimationFrame(() => {
         if (!titleRef.current) return;
         const textRect = titleRef.current.getBoundingClientRect();

         if (scale && textRect.height > 0) {
            const yRatio = containerH / textRect.height;
            setScaleY(yRatio * textHeight);
            setLineHeight(yRatio * textHeight);
         }

         // Set container height to match text height
         setContainerHeight(`${textRect.height}px`);
         setLoaded(true);
      });
   };

   // Handle initial layout and resize
   useEffect(() => {
      setSize();
      
      // Add a small delay to ensure DOM is fully rendered
      const initialTimer = setTimeout(() => {
         setSize();
      }, 100);

      window.addEventListener('resize', setSize);

      return () => {
         clearTimeout(initialTimer);
         window.removeEventListener('resize', setSize);
      };
   }, [scale, text, textHeight]);

   // Force another layout calculation when font loads
   useEffect(() => {
      // Create a FontFace observer to detect when the font is loaded
      if (window.document) {
         try {
            const fontLoader = new FontFace(fontFamily, `url(${fontUrl})`);
            fontLoader.load().then(() => {
               // Font has loaded, update layout
               setSize();
            }).catch(err => {
               console.warn('Font loading error:', err);
               // Still try to set size with fallback font
               setSize();
            });
         } catch (e) {
            // Fallback if FontFace API is not available
            console.warn('FontFace API not available:', e);
            
            // Create a hidden element with the font to trigger loading
            const fontLoader = document.createElement('div');
            fontLoader.style.fontFamily = fontFamily;
            fontLoader.style.visibility = 'hidden';
            fontLoader.style.position = 'absolute';
            fontLoader.style.pointerEvents = 'none';
            fontLoader.innerText = text;
            document.body.appendChild(fontLoader);
            
            // Give the font some time to load
            setTimeout(() => {
               setSize();
               document.body.removeChild(fontLoader);
            }, 500);
         }
      }
   }, [fontFamily, fontUrl, text]);

   // Main animation effect - use approach from second file with division by 15
   useEffect(() => {
      let rafId;
      const animate = () => {
         // Apply slower easing like in second file (division by 15 instead of multiplication by 0.15)
         mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
         mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

         if (titleRef.current && spansRef.current.length > 0) {
            const titleRect = titleRef.current.getBoundingClientRect();
            // Use maxDist calculation from second file
            const maxDist = titleRect.width / 2;

            spansRef.current.forEach((span, idx) => {
               if (!span) return;

               const rect = span.getBoundingClientRect();
               const charCenter = {
                  x: rect.x + rect.width / 2,
                  y: rect.y + rect.height / 2,
               };

               const d = dist(mouseRef.current, charCenter);
               const isHovered = idx === hoveredIndex;

               // Use the attribute calculation from the second file
               const getAttr = (distance, minVal, maxVal) => {
                  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
                  return Math.max(minVal, val + minVal);
               };

               // Use the same ranges as in the second file
               const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
               const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
               const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
               const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

               // Force render by directly applying styles
               span.style.fontFamily = fallbackFontFamily;
               span.style.opacity = alphaVal;

               // Apply variable font settings if supported
               span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
               
               // Keep the hover effect from first file
               if (isHovered) {
                  span.style.transform = `scale(${hoverScale})`;
                  span.style.color = hoverColor;
                  span.style.zIndex = '1';
               } else {
                  span.style.transform = 'scale(1)';
                  span.style.color = textColor;
                  span.style.zIndex = '0';
               }
            });
         }

         rafId = requestAnimationFrame(animate);
      };

      animate();
      return () => cancelAnimationFrame(rafId);
   }, [width, weight, italic, alpha, chars.length, isActive, textColor, hoveredIndex, hoverColor, hoverScale]);

   return (
      <div
         ref={containerRef}
         className="relative w-full h-full overflow-hidden bg-transparent"
         style={{
            width: containerWidth,
            height: containerHeight,
            minHeight: '1em',
            visibility: loaded ? 'visible' : 'hidden'
         }}
      >
         <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}') format('woff2');
          font-weight: 100 900;
          font-stretch: 50% 200%;
          font-style: normal;
          font-display: swap;
        }
        
        .text-pressure-title {
          transition: color 0.05s ease-out;
          width: 100%;
        }
        
        .text-pressure-title span {
          display: inline-block;
          transition: transform 0.15s ease-out, color 0.15s ease-out, opacity 0.15s ease-out;
          will-change: transform, color, opacity, font-variation-settings;
          position: relative;
        }
        
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>

         <h1
            ref={titleRef}
            className={`text-pressure-title ${className} ${stroke ? 'stroke' : ''} uppercase text-center`}
            style={{
               fontFamily: fallbackFontFamily,
               fontSize: fontSize,
               lineHeight,
               transform: `scale(1, ${scaleY})`,
               transformOrigin: 'center top',
               margin: 0,
               fontWeight: 100, // Add this from second file
               color: stroke ? undefined : textColor,
               letterSpacing,
               padding: '0',
               display: flex ? 'flex' : 'block',
               justifyContent: flex ? 'space-between' : 'center',
               alignItems: 'center',
               width: '100%'
            }}
         >
            {chars.map((char, i) => (
               <span
                  key={i}
                  ref={(el) => {
                     if (el) spansRef.current[i] = el;
                  }}
                  data-char={char}
                  className="inline-block transition-all duration-150"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  style={{
                     margin: '0',
                     flexGrow: flex ? 1 : 0,
                     textAlign: 'center'
                  }}
               >
                  {char}
               </span>
            ))}
         </h1>
      </div>
   );
};

export default TextPressure;