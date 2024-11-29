import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navbarBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)'],
    { clamp: true }
  );

  const navbarBackgroundDark = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)'],
    { clamp: true }
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: 'landing' },
    { name: 'About', href: 'about' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      style={{ 
        background: 'var(--theme-mode, light) === "dark" ? navbarBackgroundDark : navbarBackground',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 shadow-lg' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-text-light dark:text-white text-2xl font-bold cursor-pointer"
          onClick={() => scrollToSection('landing')}
        >
          Logo
        </motion.div>
        
        <div className="flex space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              href={`#${item.href}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-text-light dark:text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors cursor-pointer"
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
