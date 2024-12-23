import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import portfolioImg from "../../public/portfolio.png"
const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const projects = [
    // {
    //   title: "AI-Powered Chat Application",
    //   description: "Real-time chat application with AI-powered features including sentiment analysis and automatic language translation.",
    //   tech: ["React", "Node.js", "Socket.io", "TensorFlow.js"],
    //   image: "/project1.jpg",
    //   link: "https://github.com/yourusername/project1",
    //   color: "from-blue-500 to-purple-500"
    // },
    // {
    //   title: "E-commerce Platform",
    //   description: "Full-featured e-commerce platform with real-time inventory management and AI-powered product recommendations.",
    //   tech: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
    //   image: "/project2.jpg",
    //   link: "https://github.com/yourusername/project2",
    //   color: "from-green-500 to-teal-500"
    // },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website with advanced animations and interactive elements built with React and Framer Motion.",
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      image: portfolioImg,
      link: "https://github.com/rameshkrishnan-s/my-portfolio",
      color: "from-pink-500 to-red-500"
    }
  ];

  return (
    <motion.section
      id="projects"
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-background-light to-background-light/50 dark:from-background-dark dark:to-background-dark/50"
      style={{ opacity }}
    >
      {/* Enhanced Background Animation */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, var(--primary-light) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, var(--secondary-light) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, var(--primary-light) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 relative" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark inline-block text-transparent bg-clip-text"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark mx-auto rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => setActiveProject(index)}
              onHoverEnd={() => setActiveProject(null)}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 rounded-2xl`}
                animate={activeProject === index ? {
                  scale: [1, 1.02, 1],
                  opacity: [0.1, 0.15, 0.1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <motion.h3
                      className="text-3xl font-bold text-text-light dark:text-text-dark"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.title}
                      <motion.div
                        className="h-1 w-0 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-full mt-2"
                        animate={activeProject === index ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.h3>
                    
                    <motion.p
                      className="text-text-light/80 dark:text-text-dark/80 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {project.description}
                    </motion.p>

                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full text-sm text-primary-light dark:text-primary-dark"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.3 + techIndex * 0.1
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(var(--primary-light-rgb), 0.2)"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-light dark:text-primary-dark"
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Project</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={activeProject === index ? { x: [0, 5, 0] } : {}}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </motion.svg>
                    </motion.a>
                  </div>

                  <motion.div
                    className="relative aspect-video rounded-xl overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20"
                      animate={activeProject === index ? {
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-light/80 to-secondary-light/80 dark:from-primary-dark/80 dark:to-secondary-dark/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={activeProject === index ? { opacity: 1 } : { opacity: 0 }}
                    >
                      <motion.button
                        className="px-6 py-3 bg-white dark:bg-gray-800 text-primary-light dark:text-primary-dark rounded-full shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
