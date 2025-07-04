import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({
  title,
  subtitle,
  backgroundImage = '',
  cta,
  children,
  height = 'h-[60vh] md:h-[70vh]',
}) => {
  return (
    <section className={`relative flex items-center justify-center overflow-hidden ${height}`}>
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
          filter: 'brightness(0.7)',
        }}
      />
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/60 to-pink-900/80 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/40 z-0" />
      {/* Animated shapes */}
      <AnimatedBackgroundShapes />
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white leading-tight drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-2xl mb-8 text-gray-100/90 font-medium drop-shadow-md">
              {subtitle}
            </p>
          )}
          {cta && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="mb-6">
              {cta}
            </motion.div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
};

function AnimatedBackgroundShapes() {
  return (
    <>
      <motion.div
        className="absolute top-16 right-16 w-40 h-40 rounded-full opacity-20 bg-purple-500 z-10"
        animate={{ x: [0, 10, 0], y: [0, 15, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-16 left-16 w-64 h-64 rounded-full opacity-20 bg-indigo-500 z-10"
        animate={{ x: [0, -15, 0], y: [0, 10, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full opacity-10 bg-pink-500 z-10"
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />
    </>
  );
}

export default PageHeader; 