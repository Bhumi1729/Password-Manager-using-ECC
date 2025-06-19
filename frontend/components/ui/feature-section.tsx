"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "Features",
  autoPlayInterval = 3000, // Default interval set to 3 seconds
  imageHeight = "h-[350px]", // Reduced from h-[400px]
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Only set interval if not hovering
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentFeature((prevFeature) => (prevFeature + 1) % features.length)
      }, autoPlayInterval)
    }
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, features.length, autoPlayInterval])

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index)
    
    // Reset the interval when manually clicking
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentFeature((prevFeature) => (prevFeature + 1) % features.length)
      }, autoPlayInterval)
    }
  }

  return (
    <div className={cn(
      "relative p-4 md:p-5 lg:p-8 bg-[#050816] text-white min-h-[90vh] flex items-center justify-center", 
      className
    )}>
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_rgba(17,24,39,0)_50%)]" />
      </div>
      
      {/* Animated light streaks */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          style={{ top: '20%', left: '-10%' }}
          animate={{ 
            left: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: 'loop',
            ease: 'linear',
            times: [0, 0.5, 1]
          }}
        />
        <motion.div 
          className="absolute h-px w-1/4 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          style={{ top: '45%', right: '-10%' }}
          animate={{ 
            right: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            repeatType: 'loop',
            ease: 'linear',
            delay: 2,
            times: [0, 0.5, 1]
          }}
        />
        <motion.div 
          className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          style={{ top: '70%', left: '-10%' }}
          animate={{ 
            left: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: 'loop',
            ease: 'linear',
            delay: 1,
            times: [0, 0.5, 1]
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-12 text-center px-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            {title}
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {/* Mobile tabs for feature selection - NOW IN 2x2 GRID */}
          <div className="lg:hidden grid grid-cols-2 gap-3 px-4 pb-4 mb-4">
            {features.map((feature, index) => (
              <button
                key={index}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all text-center",
                  index === currentFeature 
                    ? "bg-blue-600 text-white" 
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                )}
                onClick={() => handleFeatureClick(index)}
              >
                <span className="text-sm font-medium">{feature.title || feature.step}</span>
              </button>
            ))}
          </div>

          {/* Side panel with feature indicators - hidden on mobile, 3 columns on desktop */}
          <motion.div 
            className="hidden lg:flex lg:col-span-3 flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "relative mb-3 px-3 py-4 rounded-xl cursor-pointer transition-all duration-300",
                  index === currentFeature 
                    ? "bg-white/10 border-l-4 border-blue-500" 
                    : "hover:bg-white/5 border-l-4 border-transparent"
                )}
                whileHover={{ x: 5 }}
                onClick={() => handleFeatureClick(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-1">
                    <motion.div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        index === currentFeature
                          ? "bg-blue-500 text-white"
                          : "bg-white/10 text-gray-300"
                      )}
                      whileHover={{ scale: 1.1 }}
                      animate={index === currentFeature ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.7, repeat: 1 }
                      } : {}}
                    >
                      <span className="text-sm font-bold">{index + 1}</span>
                    </motion.div>
                    
                    <h3 className={cn(
                      "text-lg font-bold transition-colors",
                      index === currentFeature ? "text-blue-200" : "text-blue-300/80"
                    )}>
                      {feature.title || feature.step}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main feature showcase - full width on mobile, 9 columns on desktop */}
          <motion.div
            className="col-span-1 lg:col-span-9 relative px-3 lg:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div 
              className={cn(
                "relative overflow-hidden rounded-2xl shadow-lg", 
                imageHeight
              )}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Animated glow effect */}
              <motion.div 
                className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-sm z-0"
                animate={{ 
                  background: [
                    "linear-gradient(90deg, rgba(59,130,246,0.5) 0%, rgba(147,51,234,0.5) 100%)",
                    "linear-gradient(90deg, rgba(147,51,234,0.5) 0%, rgba(59,130,246,0.5) 100%)",
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              />
              
              <div className="absolute inset-0 bg-[#0a0a1a] rounded-2xl z-10" />
              
              <AnimatePresence mode="wait">
                {features.map(
                  (feature, index) =>
                    index === currentFeature && (
                      <motion.div
                        key={index}
                        className="absolute inset-0 z-20 flex flex-col lg:flex-row items-center overflow-hidden rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Image section - INCREASED HEIGHT ON MOBILE */}
                        <motion.div 
                          className="w-full h-56 sm:h-64 lg:h-full lg:w-1/2 relative overflow-hidden"
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-transparent to-transparent z-20" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a] z-20 lg:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-transparent z-20 lg:opacity-0" />
                          
                          <Image
                            src={feature.image}
                            alt={feature.title || feature.step}
                            className="w-full h-full object-contain"
                            width={1000}
                            height={700}
                            priority
                          />
                          
                          {/* Accent circle - smaller on mobile */}
                          <div className="absolute top-3 right-3 lg:top-5 lg:right-5 w-14 lg:w-20 h-14 lg:h-20 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center z-30">
                            <div className="text-2xl lg:text-4xl font-bold text-white/80">{index + 1}</div>
                          </div>
                        </motion.div>
                        
                        {/* Content section - bottom half on mobile, right half on desktop */}
                        <motion.div 
                          className="w-full lg:w-1/2 h-full flex flex-col justify-center p-4 sm:p-5 lg:p-8"
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="mb-2 lg:mb-4 flex items-center">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/40 text-cyan-100">
                              {feature.step}
                            </span>
                          </div>
                          
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                            {feature.title}
                          </h3>
                          
                          <p className="text-sm sm:text-base lg:text-base text-gray-300 mb-3 lg:mb-6">
                            {feature.content}
                          </p>
                          
                          {/* Decorative elements */}
                          <div className="grid grid-cols-3 gap-2 lg:gap-3 mt-2 lg:mt-3">
                            {[1, 2, 3].map((i) => (
                              <motion.div 
                                key={i}
                                className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ 
                                  duration: 0.8, 
                                  delay: 0.5 + (i * 0.2)
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* Learn more button - smaller on mobile */}
                          <div className="mt-3 lg:mt-6">
                            <motion.button
                              className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm font-medium flex items-center gap-2 group transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Learn more
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
              
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: autoPlayInterval / 1000, 
                    ease: "linear",
                    repeat: 0
                  }}
                  key={currentFeature} // This ensures the animation restarts when feature changes
                />
              </div>
            </div>
            
            {/* Mobile navigation dots */}
            <div className="flex justify-center mt-4 gap-2 lg:hidden">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentFeature ? "bg-blue-500 w-6" : "bg-white/30"
                  )}
                  onClick={() => handleFeatureClick(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}