import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formState);
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(var(--primary-light-rgb), 0.3)",
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 0 0px rgba(var(--primary-light-rgb), 0)",
    }
  };

  return (
    <motion.section
      id="contact"
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, var(--primary-light) 0%, transparent 40%)",
            "radial-gradient(circle at 80% 80%, var(--secondary-light) 0%, transparent 40%)",
            "radial-gradient(circle at 20% 20%, var(--primary-light) 0%, transparent 40%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Header */}
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
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-xl text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind? Let's create something amazing together.
          </motion.p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {[
                {
                  icon: "",
                  title: "Location",
                  content: "San Francisco, CA"
                },
                {
                  icon: "",
                  title: "Email",
                  content: "hello@example.com"
                },
                {
                  icon: "",
                  title: "Phone",
                  content: "+1 (555) 123-4567"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.span
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    {item.icon}
                  </motion.span>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-text-light/80 dark:text-text-dark/80">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {['GitHub', 'Twitter', 'LinkedIn', 'Instagram'].map((platform, index) => (
                  <motion.a
                    key={platform}
                    href="#"
                    className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg"
                    whileHover={{ y: -5, scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                      delay: 0.5 + index * 0.1
                    }}
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {[
              { name: 'name', type: 'text', label: 'Name' },
              { name: 'email', type: 'email', label: 'Email' }
            ].map((field) => (
              <motion.div key={field.name} className="space-y-1">
                <label className="block text-sm font-medium">
                  {field.label}
                </label>
                <motion.input
                  type={field.type}
                  name={field.name}
                  value={formState[field.name]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:outline-none"
                  variants={inputVariants}
                  animate={focusedField === field.name ? "focused" : "unfocused"}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  whileTap={{ scale: 0.995 }}
                />
              </motion.div>
            ))}

            <motion.div className="space-y-1">
              <label className="block text-sm font-medium">
                Message
              </label>
              <motion.textarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:outline-none"
                variants={inputVariants}
                animate={focusedField === 'message' ? "focused" : "unfocused"}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                whileTap={{ scale: 0.995 }}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                delay: 0.5
              }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
