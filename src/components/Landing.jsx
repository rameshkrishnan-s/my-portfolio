import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Landing = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const floatingShapes = [
    { rotate: 45, delay: 0, color: 'primary-light', size: 'lg' },
    { rotate: -30, delay: 0.2, color: 'secondary-light', size: 'md' },
    { rotate: 15, delay: 0.4, color: 'primary-dark', size: 'xl' },
    { rotate: -45, delay: 0.6, color: 'secondary-dark', size: 'sm' },
  ];

  return (
    <motion.section 
      id="landing"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background-light to-background-light/50 dark:from-background-dark dark:to-background-dark/50"
      style={{ y, opacity }}
      initial="hidden"
      animate="visible"
    >
      {/* Dynamic Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, 
            var(--primary-light) 0%, 
            var(--secondary-light) 50%, 
            var(--background-light) 100%)`
        }}
        animate={{
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating Geometric Shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute hidden md:block backdrop-blur-sm rounded-lg ${
            shape.size === 'sm' ? 'w-16 h-16' :
            shape.size === 'md' ? 'w-24 h-24' :
            shape.size === 'lg' ? 'w-32 h-32' :
            'w-40 h-40'
          }`}
          style={{
            rotate: shape.rotate,
            left: `${20 + index * 15}%`,
            top: `${30 + (index % 2) * 20}%`,
            background: `linear-gradient(135deg, var(--${shape.color}) 0%, transparent 60%)`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [shape.rotate - 10, shape.rotate + 10, shape.rotate - 10],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 text-center"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Glowing Background Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 blur-3xl"
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.8 : 0.5,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Title with Enhanced Animation */}
        <motion.h1
          variants={titleVariants}
          className="text-6xl md:text-8xl font-bold mb-6 relative"
        >
          <span className="block bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300">
            Ramesh
          </span>
          <span className="block bg-gradient-to-r from-secondary-light to-primary-light dark:from-secondary-dark dark:to-primary-dark text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300 mt-2">
            Krishnan
          </span>
          <motion.span
            className="absolute -inset-x-10 top-0 h-full w-[calc(100%+80px)]"
            animate={{
              background: [
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%) -100% 0 / 200% 100%",
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%) 100% 0 / 200% 100%"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          variants={titleVariants}
          className="text-xl md:text-2xl text-text-light/80 dark:text-text-dark/80 mb-8 relative"
        >
          <span className="relative z-10">
            Crafting Digital Experiences
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark"
              animate={{
                width: isHovered ? "100%" : "6rem",
              }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </motion.p>

        {/* Enhanced CTA Button */}
        <motion.button
          variants={titleVariants}
          className="px-8 py-4 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white rounded-full relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Explore My Work</span>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: [1, 1.5, 1.8],
              opacity: [0.2, 0.15, 0],
              transition: { duration: 0.8 }
            }}
          />
        </motion.button>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-text-light/30 dark:border-text-dark/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-text-light/50 dark:bg-text-dark/50 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Landing;
