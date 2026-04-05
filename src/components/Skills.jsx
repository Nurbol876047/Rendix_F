import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Code2, ShieldCheck, Palette, Cpu } from 'lucide-react';
import './Skills.css';
import { useLanguage } from '../contexts/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: t('skills.web'),
      icon: <Code2 size={24} />,
      items: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: t('skills.cyber'),
      icon: <ShieldCheck size={24} />,
      items: ["Penetration Testing", "Security Audit", "Encryption", "Vulnerability Scanning"]
    },
    {
      title: t('skills.design'),
      icon: <Palette size={24} />,
      items: ["Figma", "UI/UX Design", "3D Modeling", "Branding"]
    },
    {
      title: t('skills.infrastructure'),
      icon: <Cpu size={24} />,
      items: ["Cloud AWS/Azure", "Docker", "CI/CD Pipelines", "System Architecture"]
    }
  ];

  return (
    <section id="skills" className="skills section-padding">
      <div className="container">
        <div className="section-title-container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              style={{ display: 'inline-block' }}
            >
              {/* No icon for Skills section yet, but leaving container for consistency */}
            </motion.span>
            
            {t('skills.title').split('').map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.4,
                      delay: index * 0.05 
                    }
                  }
                }}
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="skills-layout">
          {categories.map((category, index) => (
            <Tilt 
              key={index}
              perspective={1500} 
              scale={1.02} 
              glareEnable={true} 
              glareMaxOpacity={0.1}
            >
              <motion.div 
                className="skill-group glass-panel interactive-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="group-header">
                  <div className="group-icon">{category.icon}</div>
                  <h3 className="group-title">{category.title}</h3>
                </div>
                <div className="skill-list">
                  {category.items.map((skill, i) => (
                    <span className="skill-item" key={i}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
