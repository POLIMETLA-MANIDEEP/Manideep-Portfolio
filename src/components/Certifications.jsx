import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const CertificationsSection = styled.section`
  padding: 6rem 2rem;
  background: #0a192f;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ccd6f6;
  margin-bottom: 4rem;
  text-align: center;
  font-weight: 700;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #64ffda, #0984e3);
    border-radius: 2px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CertificateWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const CertificateImage = styled(motion.img)`
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CertificateTitle = styled(motion.h3)`
  color: #64ffda;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  text-align: center;
  font-family: 'Fira Code', monospace;
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(100, 255, 218, 0.1);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64ffda;
  font-size: 1.5rem;
  z-index: 2;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(100, 255, 218, 0.2);

  &:hover {
    background: rgba(100, 255, 218, 0.2);
  }

  ${props => props.direction === 'prev' ? 'left: -70px;' : 'right: -70px;'}

  @media (max-width: 968px) {
    ${props => props.direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
  }
`;

const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2rem;
`;

const Dot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#64ffda' : 'rgba(100, 255, 218, 0.2)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const certifications = [
  {
    id: 1,
    title: "AWS and DevOps Certification",
    image: "/certificates/AD_VI.jpg"
  },
  {
    id: 2,
    title: "AI & Machine Learning Certification",
    image: "/certificates/AIML_VI.jpg"
  },
  {
    id: 3,
    title: "Cloud Computing - Excelr",
    image: "/certificates/Excelr.jpg"
  },
  {
    id: 4,
    title: "edX Course Certification",
    image: "/certificates/edx.jpg"
  },
  {
    id: 5,
    title: "FreeCodeCamp Certification I",
    image: "/certificates/fcc_1.jpg"
  },
  {
    id: 6,
    title: "FreeCodeCamp Certification II",
    image: "/certificates/fcc_2.jpg"
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const Certifications = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isAnimating) {
        if (e.key === 'ArrowLeft') {
          paginate(-1);
        } else if (e.key === 'ArrowRight') {
          paginate(1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnimating]);

  const handleDragEnd = (event, info) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    if (!isAnimating) {
      setPage([page + newDirection, newDirection]);
    }
  };

  const goToSlide = (slideIndex) => {
    if (!isAnimating) {
      const direction = slideIndex > page ? 1 : -1;
      setPage([slideIndex, direction]);
    }
  };

  const imageIndex = ((page % certifications.length) + certifications.length) % certifications.length;

  const handleSwipe = (event, info) => {
    if (info.offset.x > 100) {
      paginate(-1);
    } else if (info.offset.x < -100) {
      paginate(1);
    }
  };

  return (
    <CertificationsSection id="certifications" ref={containerRef}>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </Title>
        
        <CarouselContainer>
          <NavigationButton
            direction="prev"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous certificate"
          >
            ←
          </NavigationButton>

          <AnimatePresence
            initial={false}
            custom={direction}
            onExitComplete={() => setIsAnimating(false)}
          >
            <CertificateWrapper
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              onAnimationStart={() => setIsAnimating(true)}
              role="group"
              aria-label={`Certificate ${imageIndex + 1} of ${certifications.length}`}
            >
              <CertificateImage
                src={certifications[imageIndex].image}
                alt={certifications[imageIndex].title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
              <CertificateTitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {certifications[imageIndex].title}
              </CertificateTitle>
            </CertificateWrapper>
          </AnimatePresence>

          <NavigationButton
            direction="next"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next certificate"
          >
            →
          </NavigationButton>
        </CarouselContainer>

        <ProgressDots>
          {certifications.map((_, index) => (
            <Dot
              key={index}
              active={index === imageIndex}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              role="button"
              aria-label={`Go to certificate ${index + 1}`}
              aria-current={index === imageIndex}
            />
          ))}
        </ProgressDots>
      </Container>
    </CertificationsSection>
  );
};

export default Certifications;
