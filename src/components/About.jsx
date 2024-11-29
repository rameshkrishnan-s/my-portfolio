import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(null);
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;
      setMousePosition({ x, y });
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => containerRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    {
      name: "Frontend Development",
      icon: "",
      description: "React, Next.js, TypeScript",
      color: "#60A5FA"
    },
    {
      name: "Backend Development",
      icon: "",
      description: "Node.js, Python, APIs",
      color: "#34D399"
    },
    {
      name: "UI/UX Design",
      icon: "",
      description: "Figma, Adobe XD",
      color: "#F472B6"
    },
    {
      name: "Mobile Development",
      icon: "",
      description: "React Native, Flutter",
      color: "#A78BFA"
    },
    {
      name: "Database Management",
      icon: "",
      description: "MongoDB, PostgreSQL",
      color: "#FBBF24"
    },
    {
      name: "DevOps",
      icon: "",
      description: "Docker, AWS, CI/CD",
      color: "#EC4899"
    }
  ];

  const experiences = [
    {
      year: "2022 - Present",
      title: "Senior Frontend Developer",
      company: "Tech Innovation Labs",
      description: "Leading frontend development team, architecting scalable solutions.",
      color: "#60A5FA"
    },
    {
      year: "2020 - 2022",
      title: "Full Stack Developer",
      company: "Digital Solutions Inc",
      description: "Developed and maintained full-stack applications using modern technologies.",
      color: "#34D399"
    },
    {
      year: "2018 - 2020",
      title: "Web Developer",
      company: "Creative Agency",
      description: "Created responsive and interactive web applications for clients.",
      color: "#A78BFA"
    }
  ];

  return (
    <motion.section
      id="about"
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden theme-transition"
      style={{ 
        opacity,
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--primary-light) 0%, transparent 15%)`
      }}
    >
      <div className="container mx-auto px-4 relative" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl font-bold mb-6 text-gradient"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-xl text-text-light/80 dark:text-text-dark/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Passionate developer crafting digital experiences with creativity and precision.
            I transform ideas into elegant, functional solutions.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills Grid */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="card-hover interactive-bg glow p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setActiveSkill(skill.name)}
                  onHoverEnd={() => setActiveSkill(null)}
                  style={{
                    borderColor: activeSkill === skill.name ? skill.color : 'transparent',
                    borderWidth: '2px'
                  }}
                >
                  <motion.span
                    className="text-3xl mb-3 block floating"
                    animate={activeSkill === skill.name ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.icon}
                  </motion.span>
                  <h4 className="text-lg font-semibold mb-2">{skill.name}</h4>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6">Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  className="card-hover interactive-bg relative pl-8 border-l-2"
                  style={{ borderColor: exp.color }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="absolute -left-2.5 top-0 w-5 h-5 rounded-full"
                    style={{ backgroundColor: exp.color }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  />
                  <span className="text-sm font-medium" style={{ color: exp.color }}>
                    {exp.year}
                  </span>
                  <h4 className="text-xl font-bold mt-2">{exp.title}</h4>
                  <p className="text-text-light/80 dark:text-text-dark/80">{exp.company}</p>
                  <p className="mt-2 text-text-light/70 dark:text-text-dark/70">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Connect Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="magnetic-button glow px-8 py-3 rounded-full bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
