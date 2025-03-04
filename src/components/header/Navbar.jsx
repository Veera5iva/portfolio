"use client"

import { Link } from "react-router-dom"
import { styles } from "../../styles"
import { veeraLogo } from "../../assets"
import { useEffect, useState, useRef } from "react"
import Menu from "./menu/Menu"
import Nav from "./nav/Nav"
import style from "./style.module.scss"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

const menu = {
    open: {
        width: "420px",
        height: "570px",
        top: "-25px",
        right: "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
}

const contentVariants = {
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
}

const indicatorVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.2,
        },
    },
    pulse: {
        scale: [1, 1.05, 1],
        opacity: [0.9, 1, 0.9],
        transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 2.5,
            ease: "easeInOut",
        },
    },
}

const Navbar = () => {
    const [isActive, setIsActive] = useState(false)
    const [isExpanded, setIsExpanded] = useState(true)
    const [userInteracted, setUserInteracted] = useState(false)
    const [isShrinking, setIsShrinking] = useState(false)
    const [isPulsing, setIsPulsing] = useState(false)

    const navbarRef = useRef(null)
    const logoRef = useRef(null)
    const menuContainerRef = useRef(null)
    const progressRef = useRef(null)
    const shrinkTimerRef = useRef(null)
    const navTimeline = useRef(null)
    const contentTimeline = useRef(null)

    // Initialize GSAP timeline for navbar
    useEffect(() => {
        navTimeline.current = gsap.timeline({ paused: true })

        if (navbarRef.current) {
            const originalWidth = "80%"
            const originalHeight = "90px"
            const originalBorderRadius = "45px"

            // Set initial state
            gsap.set(navbarRef.current, {
                width: originalWidth,
                height: originalHeight,
                borderRadius: originalBorderRadius,
            })

            // Define the shrink animation
            navTimeline.current.to(navbarRef.current, {
                width: "150px",
                height: "50px",
                borderRadius: "25px",
                duration: 0.6,
                ease: "power2.inOut",
            })
        }

        return () => {
            navTimeline.current && navTimeline.current.kill()
        }
    }, [])

    // Setup content animation timeline for logo and menu container
    useEffect(() => {
        contentTimeline.current = gsap.timeline({ paused: true })

        if (logoRef.current && menuContainerRef.current) {
            // Clear any previous inline styles
            gsap.set([logoRef.current, menuContainerRef.current], { clearProps: "all" })

            contentTimeline.current
                .fromTo(
                    logoRef.current,
                    { opacity: 0, y: 15, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" },
                )
                .fromTo(
                    menuContainerRef.current,
                    { opacity: 0, y: 15, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" },
                    "-=0.25",
                )
        }

        return () => {
            contentTimeline.current && contentTimeline.current.kill()
        }
    }, [])

    // Update timeline when expanded state changes
    useEffect(() => {
        if (navTimeline.current) {
            if (isExpanded) {
                navTimeline.current.reverse()
                contentTimeline.current && contentTimeline.current.restart()
                setIsPulsing(false)
            } else {
                navTimeline.current.play()
                setTimeout(() => setIsPulsing(true), 600)
            }
        }
    }, [isExpanded])

    // Handle automatic collapse if no interaction within 2s
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!userInteracted) {
                setIsExpanded(false)
            }
        }, 2000)

        return () => clearTimeout(timer)
    }, [userInteracted])

    // Reset user interaction state when collapsed
    useEffect(() => {
        if (!isExpanded) {
            setUserInteracted(false)
        }
    }, [isExpanded])

    // Clean up timers on unmount
    useEffect(() => {
        return () => {
            if (shrinkTimerRef.current) clearTimeout(shrinkTimerRef.current)
        }
    }, [])

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
                        setIsExpanded(false)
                        setIsShrinking(false)
                    },
                },
            )
        } else if (!isShrinking && progressRef.current) {
            gsap.killTweensOf(progressRef.current)
        }
        return () => progressRef.current && gsap.killTweensOf(progressRef.current)
    }, [isShrinking])

    const handleExpand = () => {
        if (shrinkTimerRef.current) {
            clearTimeout(shrinkTimerRef.current)
            shrinkTimerRef.current = null
        }
        setIsShrinking(false)
        setIsExpanded(true)
        setUserInteracted(true)
    }

    const handleShrink = () => {
        if (!userInteracted) return
        setIsShrinking(true)
    }

    const handleShrinkCancel = () => {
        if (isShrinking) setIsShrinking(false)
    }

    // Modified navbar class with template literals properly formatted
    const navbarClass = `${styles.paddingX} mx-auto flex items-center fixed top-5 left-1/2 transform -translate-x-1/2 z-20 
        bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full
        ${!isExpanded ? "cursor-pointer hover:bg-white/15" : ""}`

    return (
        <div
            ref={navbarRef}
            className={navbarClass}
            onMouseEnter={() => {
                handleExpand()
                handleShrinkCancel()
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
                            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                                <img src={veeraLogo || "/placeholder.svg"} alt="logo" className="md:w-80 h-9 object-contain" />
                            </Link>
                        </div>

                        {/* This is the key part that needs to be fixed - using the structure from the working file */}
                        <div ref={menuContainerRef} className={style.header}>
                            <motion.div
                                className={style.menu}
                                variants={menu}
                                animate={isActive ? "open" : "closed"}
                                initial="closed"
                            >
                                <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
                            </motion.div>
                            <Menu isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="shrunk"
                        className="absolute inset-0 flex items-center justify-center"
                        variants={indicatorVariants}
                        initial="initial"
                        animate={isPulsing ? "pulse" : "animate"}
                        exit="exit"
                    >
                        <div className="w-6 h-6 bg-white/50 rounded-full shadow-inner" />
                    </motion.div>
                )}
            </AnimatePresence>

            {isShrinking && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="h-1 w-16 bg-white/30 rounded-full overflow-hidden">
                        <div ref={progressRef} className="h-full bg-white/70 origin-left" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar

