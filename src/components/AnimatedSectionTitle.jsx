import { motion } from 'framer-motion';

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const getLetterVariants = (index) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: index * 0.05,
    },
  },
});

const AnimatedSectionTitle = ({ title, icon = null }) => {
  return (
    <div className="section-title-container">
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {icon ? (
          <motion.span className="section-title-icon-wrap" variants={iconVariants}>
            {icon}
          </motion.span>
        ) : null}

        {title.split('').map((char, index) => {
          if (char === ' ') {
            return <span key={`space-${index}`} className="section-title-space" aria-hidden="true" />;
          }

          return (
            <motion.span
              key={`${char}-${index}`}
              className="section-letter"
              variants={getLetterVariants(index)}
            >
              <span className="section-letter-flip">
                <span className="section-letter-face section-letter-front">{char}</span>
                <span className="section-letter-face section-letter-back" aria-hidden="true">{char}</span>
              </span>
            </motion.span>
          );
        })}
      </motion.h2>
    </div>
  );
};

export default AnimatedSectionTitle;
