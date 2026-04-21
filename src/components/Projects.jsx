import { useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ArrowLeft, ArrowRight, LockKeyhole, SwatchBook } from 'lucide-react';
import './Projects.css';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSectionTitle from './AnimatedSectionTitle';

const getDomain = (url) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '');
const AUTO_SCROLL_SPEED = 118;
const WHEEL_SCROLL_MULTIPLIER = 2.9;
const DRAG_SCROLL_MULTIPLIER = 1.35;
const BUTTON_SCROLL_RATIO = 0.96;
const USER_INTERACTION_PAUSE_MS = 2200;

const Projects = () => {
  const { t } = useLanguage();
  const projectItems = Array.isArray(t('projects.items')) ? t('projects.items') : [];
  const duplicatedItems = [...projectItems, ...projectItems];
  const carouselRef = useRef(null);
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const userPauseUntilRef = useRef(0);
  const suppressClickRef = useRef(false);
  const dragStateRef = useRef({
    isPointerDown: false,
    isDragging: false,
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
  });

  const pauseAutoScroll = (duration = USER_INTERACTION_PAUSE_MS) => {
    userPauseUntilRef.current = performance.now() + duration;
  };

  const normalizeScrollPosition = () => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const midpoint = carousel.scrollWidth / 2;

    if (!midpoint) {
      return;
    }

    if (carousel.scrollLeft >= midpoint) {
      carousel.scrollLeft -= midpoint;
    } else if (carousel.scrollLeft < 0) {
      carousel.scrollLeft += midpoint;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || projectItems.length === 0) {
      return undefined;
    }

    const animate = (timestamp) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      if (timestamp < userPauseUntilRef.current) {
        lastFrameTimeRef.current = timestamp;
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      const delta = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      carousel.scrollLeft += (AUTO_SCROLL_SPEED * delta) / 1000;
      normalizeScrollPosition();

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      lastFrameTimeRef.current = 0;
    };
  }, [projectItems.length]);

  const handleScroll = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    pauseAutoScroll();

    const scrollOffset = Math.max(carousel.clientWidth * BUTTON_SCROLL_RATIO, 360) * direction;
    carousel.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  const handleWheel = (event) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    event.preventDefault();
    pauseAutoScroll();

    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    carousel.scrollLeft += dominantDelta * WHEEL_SCROLL_MULTIPLIER;
    normalizeScrollPosition();
  };

  const handlePointerDown = (event) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    dragStateRef.current = {
      isPointerDown: true,
      isDragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: carousel.scrollLeft,
    };

    suppressClickRef.current = false;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture?.(event.pointerId);
    pauseAutoScroll(3200);
  };

  const handlePointerMove = (event) => {
    const carousel = carouselRef.current;
    const dragState = dragStateRef.current;

    if (!carousel || !dragState.isPointerDown) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;

    if (!dragState.isDragging && Math.abs(deltaX) > 6) {
      dragState.isDragging = true;
      suppressClickRef.current = true;
    }

    if (!dragState.isDragging) {
      return;
    }

    carousel.scrollLeft = dragState.startScrollLeft - deltaX * DRAG_SCROLL_MULTIPLIER;
    pauseAutoScroll(3200);
    normalizeScrollPosition();
  };

  const handlePointerRelease = () => {
    const carousel = carouselRef.current;
    const dragState = dragStateRef.current;

    if (!dragState.isPointerDown) {
      return;
    }

    if (carousel && dragState.pointerId !== null && carousel.hasPointerCapture?.(dragState.pointerId)) {
      carousel.releasePointerCapture(dragState.pointerId);
      carousel.classList.remove('is-dragging');
    }

    dragStateRef.current = {
      isPointerDown: false,
      isDragging: false,
      pointerId: null,
      startX: 0,
      startScrollLeft: 0,
    };
  };

  const handleClickCapture = (event) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <section id="projects" className="projects section-padding">
      <div className="container">
        <div className="projects-head">
          <div>
            <AnimatedSectionTitle
              title={t('projects.title')}
              icon={<SwatchBook className="title-icon" size={32} />}
            />
            <p className="section-intro projects-intro">{t('projects.intro')}</p>
          </div>

          <div className="projects-nav" aria-label="Projects navigation">
            <button
              type="button"
              className="projects-nav-btn"
              onClick={() => handleScroll(-1)}
              aria-label="Scroll projects left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              className="projects-nav-btn"
              onClick={() => handleScroll(1)}
              aria-label="Scroll projects right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="projects-carousel-container"
        ref={carouselRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        onPointerLeave={handlePointerRelease}
        onClickCapture={handleClickCapture}
      >
        <div className="projects-track">
          {duplicatedItems.map((project, index) => (
            <div key={`${project.title}-${index}`} className="project-step">
              <Tilt
                className="project-step-shell"
                perspective={1500}
                scale={1.02}
                glareEnable
                glareMaxOpacity={0.1}
              >
                <Motion.article
                  className="project-card glass-panel interactive-card"
                  animate={{
                    y: [0, -8, 0],
                    rotateX: [0, 1.5, 0, -1.5, 0],
                    rotateY: [0, -1.5, 0, 1.5, 0],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    delay: (index % Math.max(1, projectItems.length)) * 0.45,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                    {project.url ? (
                      <span className="project-image-label">{getDomain(project.url)}</span>
                    ) : (
                      <span className="project-image-label project-image-label-muted">
                        {t('projects.privateCase')}
                      </span>
                    )}
                  </div>

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
                    ) : (
                      <span className="project-site-link project-site-link-muted">
                        {t('projects.privateCase')}
                      </span>
                    )}

                    <div className="project-footer">
                      <div className="project-tags">
                        {Array.isArray(project.tags)
                          ? project.tags.map((tag, tagIndex) => (
                              <span key={`${project.title}-${tagIndex}`} className="project-tag">
                                {tag}
                              </span>
                            ))
                          : null}
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
                        <a className="project-link-btn project-link-btn-muted" href="#contact">
                          <span>{t('projects.requestCase')}</span>
                          <LockKeyhole size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </Motion.article>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
