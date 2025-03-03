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
   
   // CUSTOMIZE: Add these new props with defaults
   letterSpacing = '0.02em',   // ADJUST: Change value to increase/decrease letter spacing
   textHeight = 1,             // ADJUST: Change value to increase/decrease overall height (1 is normal)
   hoverColor = '#FF0000',     // ADJUST: Change to your preferred hover color
   hoverScale = 1.1,           // ADJUST: How much a letter grows when hovered (1 is no change)
}) => {
   const containerRef = useRef(null);
   const titleRef = useRef(null);
   const spansRef = useRef([]);

   const mouseRef = useRef({ x: 0, y: 0 });
   const cursorRef = useRef({ x: 0, y: 0 });

   const [fontSize, setFontSize] = useState(minFontSize);
   const [scaleY, setScaleY] = useState(1);
   const [lineHeight, setLineHeight] = useState(textHeight); // Use the textHeight prop
   const [isActive, setIsActive] = useState(false);
   const [containerWidth, setContainerWidth] = useState('auto');
   const [containerHeight, setContainerHeight] = useState('auto');
   const [loaded, setLoaded] = useState(false);
   const [hoveredIndex, setHoveredIndex] = useState(-1); // Track which letter is hovered

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

   // Set size based on container
   const setSize = () => {
      if (!containerRef.current || !titleRef.current) return;

      // Get parent width for full width text
      const parentWidth = containerRef.current.parentElement ?
         containerRef.current.parentElement.clientWidth :
         window.innerWidth;

      // Use full parent width
      setContainerWidth(`${parentWidth}px`);

      let newFontSize = parentWidth / (chars.length * 0.8); // Adjusted to spread text more
      newFontSize = Math.max(newFontSize, minFontSize);

      setFontSize(newFontSize);
      setScaleY(1);
      setLineHeight(textHeight); // Initialize with the custom height

      requestAnimationFrame(() => {
         if (!titleRef.current) return;
         const textRect = titleRef.current.getBoundingClientRect();

         if (scale && textRect.height > 0) {
            const yRatio = containerRef.current.clientHeight / textRect.height;
            setScaleY(yRatio * textHeight); // Apply custom height factor
            setLineHeight(yRatio * textHeight);
         }

         // Set container height to match text height exactly
         setContainerHeight(`${textRect.height}px`);
         setLoaded(true);
      });
   };

   // Handle initial layout and resize
   useEffect(() => {
      // Run setSize on mount to initialize properly
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
   }, [scale, text, textHeight]); // Added textHeight dependency

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

   // Main animation effect
   useEffect(() => {
      let rafId;
      const animate = () => {
         // Only update when active
         if (isActive) {
            // Apply smoother easing (increased from 0.1 to 0.15)
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.15;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.15;
         }

         if (titleRef.current && spansRef.current.length > 0) {
            const titleRect = titleRef.current.getBoundingClientRect();
            // Reduced max distance to increase intensity
            const maxDist = Math.min(titleRect.width, 200);

            spansRef.current.forEach((span, idx) => {
               if (!span) return;

               const rect = span.getBoundingClientRect();
               const charCenter = {
                  x: rect.x + rect.width / 2,
                  y: rect.y + rect.height / 2,
               };

               const d = dist(mouseRef.current, charCenter);
               const isHovered = idx === hoveredIndex;

               // Modify the attribute calculation to be more intense
               const getAttr = (distance, minVal, maxVal) => {
                  // More aggressive falloff
                  const falloff = Math.max(0, 1 - (distance / maxDist));
                  // Apply cubic easing for more prominent effect
                  const easedFalloff = falloff * falloff * falloff;
                  return minVal + (maxVal - minVal) * easedFalloff;
               };

               // Apply more extreme values for more noticeable effect
               const wdth = width ? Math.floor(getAttr(d, 50, 200)) : 100;
               const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
               const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
               const alphaVal = alpha ? getAttr(d, 0.3, 1).toFixed(2) : 1;

               // Force render by directly applying styles
               span.style.fontFamily = fallbackFontFamily;
               span.style.opacity = alphaVal;

               // Try using transform for a more reliable visual change
               if (!italic && !width) {
                  // If not using font variations, use scale/weight as fallback
                  const scale = getAttr(d, 1, 1.5);
                  span.style.transform = isHovered ? `scale(${hoverScale})` : `scale(${scale})`;
                  span.style.fontWeight = wght;
               } else {
                  // Apply variable font settings if supported
                  span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
                  if (isHovered) {
                     span.style.transform = `scale(${hoverScale})`;
                  } else {
                     span.style.transform = 'scale(1)';
                  }
               }

               // CUSTOMIZE: Change color based on hover state
               if (isHovered) {
                  span.style.color = hoverColor;
                  span.style.zIndex = '1';
               } else if (d < maxDist) {
                  const intensity = 1 - (d / maxDist);
                  span.style.color = `rgba(255, 255, 255, ${0.5 + 0.5 * intensity})`;
                  span.style.zIndex = '0';
               } else {
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
         className="overflow-hidden bg-transparent"
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
          position: relative; /* Add this for z-index to work */
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
               color: stroke ? undefined : textColor,
               letterSpacing, // CUSTOMIZE: Use the letterSpacing prop
               padding: '0',
               display: 'flex',
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
                  onMouseEnter={() => setHoveredIndex(i)} // CUSTOMIZE: Track hovered letter
                  onMouseLeave={() => setHoveredIndex(-1)} // CUSTOMIZE: Reset when not hovering
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