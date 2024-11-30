import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const containerRef = useRef(null);
  const form = useRef();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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
    setSubmitStatus({ type: 'loading', message: 'Sending message...' });

    emailjs.sendForm(
      'service_x0ek66n', // Replace with your EmailJS service ID
      'template_jep58gr', // Replace with your EmailJS template ID
      form.current,
      'OYZ2z-H9Vqbgvnw3A' // Replace with your EmailJS public key
    )
      .then((result) => {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        setFormState({ name: '', email: '', message: '' });
      }, (error) => {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again later.'
        });
      });
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
                  content: "Tirupur, Tamil Nadu, India"
                },
                {
                  icon: "",
                  title: "Email",
                  content: "sundarrajanrameshkrishnan@gmail.com"
                },
                {
                  icon: "",
                  title: "Phone",
                  content: "+91 6383935616"
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
            <div className="mt-8 flex justify-center space-x-6">
              <a
                href="https://github.com/rameshkrishnan-s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors flex flex-col items-center"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-current hover:scale-110 transition-transform duration-300 mb-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>

              <a
                href="https://x.com/Ramesh30739342"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors flex flex-col items-center"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-current hover:scale-110 transition-transform duration-300 mb-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Twitter</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rameshkrishnanS/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors flex flex-col items-center"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-current hover:scale-110 transition-transform duration-300 mb-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {submitStatus.message && (
              <div className={`p-4 rounded-lg mb-4 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                  : submitStatus.type === 'error'
                  ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100'
              }`}>
                {submitStatus.message}
              </div>
            )}
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
