import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, SwatchBook } from 'lucide-react';
import './Projects.css';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSectionTitle from './AnimatedSectionTitle';

const getDomain = (url) => url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

const buildSplinePath = (curvePoints, tension = 0.9) => {
  if (curvePoints.length < 2) {
    return '';
  }

  let path = `M ${curvePoints[0].x} ${curvePoints[0].y}`;

  for (let index = 0; index < curvePoints.length - 1; index += 1) {
    const previousPoint = curvePoints[index - 1] ?? curvePoints[index];
    const currentPoint = curvePoints[index];
    const nextPoint = curvePoints[index + 1];
    const afterNextPoint = curvePoints[index + 2] ?? nextPoint;
    const controlScale = tension / 6;
    const controlPointOne = {
      x: currentPoint.x + ((nextPoint.x - previousPoint.x) * controlScale),
      y: currentPoint.y + ((nextPoint.y - previousPoint.y) * controlScale)
    };
    const controlPointTwo = {
      x: nextPoint.x - ((afterNextPoint.x - currentPoint.x) * controlScale),
      y: nextPoint.y - ((afterNextPoint.y - currentPoint.y) * controlScale)
    };

    path += ` C ${controlPointOne.x} ${controlPointOne.y}, ${controlPointTwo.x} ${controlPointTwo.y}, ${nextPoint.x} ${nextPoint.y}`;
  }

  return path;
};

const getAnimatedPoints = (points, width) => {
  if (!points.length || !width) {
    return [];
  }

  const centerX = width / 2;
  const horizontalPadding = Math.min(Math.max(width * 0.05, 48), 140);
  
  return points.map((point) => {
    const direction = point.x >= centerX ? 1 : -1;
    const distanceFromCenter = Math.abs(point.x - centerX);
    const emphasizedDistance = Math.max(distanceFromCenter * 1.78, width * 0.28);

    return {
      x: clampValue(centerX + (direction * emphasizedDistance), horizontalPadding, width - horizontalPadding),
      y: point.y
    };
  });
};

const buildPathData = (points, width, height) => {
  if (!points.length || !width || !height) {
    return { d: '', points: [] };
  }

  const centerX = width / 2;
  const horizontalPadding = Math.min(Math.max(width * 0.05, 48), 140);
  const animatedPoints = getAnimatedPoints(points, width);

  const startPoint = {
    x: clampValue(centerX - (width * 0.12), horizontalPadding, width - horizontalPadding),
    y: 0
  };
  const lastPoint = animatedPoints[animatedPoints.length - 1];
  const lastDirection = lastPoint.x >= centerX ? 1 : -1;
  const endPoint = {
    x: clampValue(lastPoint.x - (lastDirection * width * 0.1), horizontalPadding, width - horizontalPadding),
    y: height
  };
  const curvePoints = [startPoint, ...animatedPoints, endPoint];
  const path = buildSplinePath(curvePoints, 0.9);

  return { d: path, points: animatedPoints };
};

const Projects = () => {
  const { t } = useLanguage();
  const projectItems = Array.isArray(t('projects.items')) ? t('projects.items') : [];
  const sectionRef = useRef(null);
  const pathContainerRef = useRef(null);
  const listRef = useRef(null);
  const markerRefs = useRef([]);
  const [pathGeometry, setPathGeometry] = useState({ d: '', width: 100, height: 100 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%']
  });
  const movingPathOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0.18, 0.85, 1]);

  useEffect(() => {
    let frameId = 0;

    const updatePath = () => {
      const container = pathContainerRef.current;
      const list = listRef.current;
      const markers = markerRefs.current.filter(Boolean);

      if (!container || !list || !markers.length) {
        return;
      }

      const listRect = list.getBoundingClientRect();
      const width = container.clientWidth;
      const height = Math.max(list.scrollHeight, list.offsetHeight);
      const points = markers.map((marker) => {
        const markerRect = marker.getBoundingClientRect();

        return {
          x: markerRect.left - listRect.left + (markerRect.width / 2),
          y: markerRect.top - listRect.top + (markerRect.height / 2)
        };
      });

      const nextPath = buildPathData(points, width, height);

      setPathGeometry({
        d: nextPath.d,
        width,
        height
      });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePath);
    };

    scheduleUpdate();

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    if (pathContainerRef.current) {
      resizeObserver.observe(pathContainerRef.current);
    }

    if (listRef.current) {
      resizeObserver.observe(listRef.current);
    }

    markerRefs.current.forEach((marker) => {
      if (marker) {
        resizeObserver.observe(marker);
      }
    });

    window.addEventListener('resize', scheduleUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [projectItems.length]);

  return (
    <section ref={sectionRef} id="projects" className="projects section-padding">
      <div className="container">
        <AnimatedSectionTitle
          title={t('projects.title')}
          icon={<SwatchBook className="title-icon" size={32} />}
        />

        <div ref={pathContainerRef} className="projects-path-container">
          <svg
            className="projects-path-svg"
            viewBox={`0 0 ${pathGeometry.width} ${pathGeometry.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {pathGeometry.d ? (
              <>
                <path
                  className="projects-path-aura"
                  d={pathGeometry.d}
                />
                <path
                  className="projects-path-track"
                  d={pathGeometry.d}
                />
                <motion.path
                  className="projects-path-glow"
                  d={pathGeometry.d}
                  style={{
                    pathLength: scrollYProgress,
                    opacity: movingPathOpacity
                  }}
                />
                <motion.path
                  className="projects-path-progress"
                  d={pathGeometry.d}
                  style={{
                    pathLength: scrollYProgress,
                    opacity: movingPathOpacity
                  }}
                />
              </>
            ) : null}
          </svg>

          <div ref={listRef} className="projects-list">
            {projectItems.map((project, index) => (
              <motion.div
                key={index}
                className={`project-step ${index % 2 === 0 ? 'project-step-right' : 'project-step-left'}`}
                initial={{ opacity: 0, y: -120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: index * 0.12, ease: 'easeOut' }}
              >
                <span
                  ref={(element) => {
                    markerRefs.current[index] = element;
                  }}
                  className="project-step-marker"
                  aria-hidden="true"
                />
                <Tilt
                  className="project-step-shell"
                  perspective={1500}
                  scale={1.03}
                  glareEnable={true}
                  glareMaxOpacity={0.12}
                >
                  <motion.article
                    className="project-card glass-panel interactive-card"
                    initial={{ opacity: 0, y: -80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: index * 0.14, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="project-image"
                      initial={{ opacity: 0, y: -30, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: index * 0.16, ease: 'easeOut' }}
                    >
                      <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                      {project.url && (
                        <span className="project-image-label">{getDomain(project.url)}</span>
                      )}
                    </motion.div>

                    <div className="project-info">
                      <span className="project-label">{t('projects.viewProject')}</span>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      {project.url ? (
                        <a
                          className="project-site-link"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {project.url}
                        </a>
                      ) : null}
                      <div className="project-footer">
                        <div className="project-tags">
                          {Array.isArray(project.tags) ? project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="project-tag">{tag}</span>
                          )) : null}
                        </div>
                        {project.url ? (
                          <a
                            className="project-link-btn"
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={t('projects.viewProject')}
                          >
                            <span>{t('projects.viewProject')}</span>
                            <ArrowRight size={18} />
                          </a>
                        ) : (
                          <button className="project-link-btn" disabled>
                            <span>{t('projects.viewProject')}</span>
                            <ArrowRight size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
