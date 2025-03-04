import { Link } from "react-router-dom";
import { styles } from "../../styles";
import { veeraLogo } from "../../assets";
import { useEffect, useState, useRef } from "react";
import Menu from "./menu/Menu";
import Nav from "./nav/Nav";
import style from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const menu = {
    open: {
        width: "420px",
        height: "570px",
        top: "-25px",
        right: "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
    }
};

// Animation for internal elements
const logoVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: 10,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const menuVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.2 // Slightly delayed from logo
        }
    },
    exit: {
        opacity: 0,
        y: 10,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const contentVariants = {
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const indicatorVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.2
        }
    },
    pulse: {
        scale: [1, 1.05, 1],
        opacity: [0.9, 1, 0.9],
        transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2.5,
            ease: "easeInOut"
        }
    }
};

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);
    const [isShrinking, setIsShrinking] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const menuContainerRef = useRef(null);
    const progressRef = useRef(null);
    const shrinkTimerRef = useRef(null);
    const navTimeline = useRef(null);
    const contentTimeline = useRef(null);

    // Initialize GSAP timeline for navbar
    useEffect(() => {
        navTimeline.current = gsap.timeline({ paused: true });

        // Only setup the animation if the ref exists
        if (navbarRef.current) {
            // Store original dimensions to restore on reverse
            const originalWidth = "80%";
            const originalHeight = "90px";
            const originalBorderRadius = "45px";

            // First, set the initial state to ensure proper expansion
            gsap.set(navbarRef.current, {
                width: originalWidth,
                height: originalHeight,
                borderRadius: originalBorderRadius
            });

            // Define the shrink animation
            navTimeline.current
                .to(navbarRef.current, {
                    width: "150px",
                    height: "50px",
                    borderRadius: "25px",
                    duration: 0.6,
                    ease: "power2.inOut"
                });
        }

        return () => {
            if (navTimeline.current) {
                navTimeline.current.kill();
            }
        };
    }, []);

    // Setup content animation timeline
    useEffect(() => {
        contentTimeline.current = gsap.timeline({ paused: true });

        if (logoRef.current && menuContainerRef.current) {
            // Reset any existing animations
            gsap.set([logoRef.current, menuContainerRef.current], {
                clearProps: "all"
            });

            // Setup the content animation timeline
            contentTimeline.current
                .fromTo(
                    logoRef.current,
                    {
                        opacity: 0,
                        y: 15,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.4)"
                    }
                )
                .fromTo(
                    menuContainerRef.current,
                    {
                        opacity: 0,
                        y: 15,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.4)"
                    },
                    "-=0.25" // Slight overlap for smoother feeling
                );
        }

        return () => {
            if (contentTimeline.current) {
                contentTimeline.current.kill();
            }
        };
    }, []);

    // Update timeline when expanded state changes
    useEffect(() => {
        if (navTimeline.current) {
            if (isExpanded) {
                navTimeline.current.reverse();

                // Play content animation when navbar starts expanding
                if (contentTimeline.current) {
                    contentTimeline.current.restart();
                }

                setIsPulsing(false);
            } else {
                navTimeline.current.play();
                setTimeout(() => setIsPulsing(true), 600); // Start pulsing after shrink animation
            }
        }
    }, [isExpanded]);

    // Handle initial expansion timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!userInteracted) {
                setIsExpanded(false);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [userInteracted]);

    // Reset the interaction state when expanded
    useEffect(() => {
        if (!isExpanded) {
            setUserInteracted(false);
        }
    }, [isExpanded]);

    // Clean up timers on unmount
    useEffect(() => {
        return () => {
            if (shrinkTimerRef.current) {
                clearTimeout(shrinkTimerRef.current);
            }
        };
    }, []);

    // Animate the shrinking progress bar
    useEffect(() => {
        if (isShrinking && progressRef.current) {
            gsap.fromTo(
                progressRef.current,
                { scaleX: 1 },
                {
                    scaleX: 0,
                    duration: 3,
                    ease: "linear",
                    onComplete: () => {
                        setIsExpanded(false);
                        setIsShrinking(false);
                    }
                }
            );
        } else if (!isShrinking && progressRef.current) {
            gsap.killTweensOf(progressRef.current);
        }

        return () => {
            if (progressRef.current) {
                gsap.killTweensOf(progressRef.current);
            }
        };
    }, [isShrinking]);

    const handleExpand = () => {
        // Clear any pending shrink timer
        if (shrinkTimerRef.current) {
            clearTimeout(shrinkTimerRef.current);
            shrinkTimerRef.current = null;
        }

        setIsShrinking(false);
        setIsExpanded(true);
        setUserInteracted(true);
    };

    const handleShrink = () => {
        if (!userInteracted) return;

        // Start the shrinking process
        setIsShrinking(true);
    };

    // Cancel shrinking if user comes back
    const handleShrinkCancel = () => {
        if (isShrinking) {
            setIsShrinking(false);
        }
    };

    // Use a pre-defined class for the expanded/shrunk state to reduce inline style calculations
    const navbarClass = `${styles.paddingX} mx-auto flex items-center fixed top-5 left-1/2 transform -translate-x-1/2 z-20 
        bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full overflow-hidden
        ${!isExpanded ? 'cursor-pointer hover:bg-white/15' : ''}`;

    return (
        <div
            ref={navbarRef}
            className={navbarClass}
            onMouseEnter={() => {
                handleExpand();
                handleShrinkCancel();
            }}
            onMouseLeave={handleShrink}
            onClick={handleExpand}
        >
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        className="w-full max-w-7xl mx-auto flex justify-between items-center"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div ref={logoRef} className="flex items-center gap-2">
                            <Link
                                to="/"
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <img src={veeraLogo} alt="logo" className="md:w-80 h-9 object-contain" />
                            </Link>
                        </div>

                        <div ref={menuContainerRef} className={`${style.header} relative z-50`}>
                            <motion.div
                                className={`${style.menu} z-50`}
                                variants={menu}
                                animate={isActive ? "open" : "closed"}
                                initial="closed"
                                style={{ position: "relative" }}
                            >
                                <AnimatePresence>
                                    {isActive && (
                                        <div className="z-50" style={{ position: "absolute" }}>
                                            <Nav />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            <Menu isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="shrunk"
                        className="absolute inset-0 flex items-center justify-center"
                        variants={isPulsing ? indicatorVariants : indicatorVariants}
                        initial="initial"
                        animate={isPulsing ? "pulse" : "animate"}
                        exit="exit"
                    >
                        <div className="w-6 h-6 bg-white/50 rounded-full shadow-inner" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Shrinking indicator/countdown */}
            {isShrinking && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="h-1 w-16 bg-white/30 rounded-full overflow-hidden">
                        <div
                            ref={progressRef}
                            className="h-full bg-white/70 origin-left"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;