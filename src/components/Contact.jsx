import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <motion.div
          className="contact-wrapper glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="lamp-system">
            <div className="lamp-wire"></div>
            <div className="lamp-head"></div>
            <div className="lamp-beam"></div>
          </div>

          <motion.div
            className="contact-actions"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="https://wa.me/77764370355" className="email-link" target="_blank" rel="noreferrer">
              +7 776 437 03 55 <ArrowUpRight className="arrow" size={28} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
