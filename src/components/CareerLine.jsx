import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const CareerSection = styled.section`
  padding: 6rem 2rem;
  background: #0a192f;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
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
  margin-bottom: 3rem;
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

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, #64ffda, #0984e3);
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    &:before {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.align === 'right' ? 'flex-start' : 'flex-end'};
  padding-right: ${props => props.align === 'right' ? '0' : '50%'};
  padding-left: ${props => props.align === 'right' ? '50%' : '0'};
  margin-bottom: 3rem;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 60px;
  }
`;

const TimelineCard = styled(motion.div)`
  background: #112240;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 450px;
  position: relative;
  border: 1px solid #233554;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: #64ffda;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 15px;
    padding: 2px;
    background: linear-gradient(45deg, transparent, #64ffda, transparent);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Institution = styled.h3`
  font-size: 1.5rem;
  color: #ccd6f6;
  margin-bottom: 0.5rem;
`;

const Course = styled.h4`
  font-size: 1.2rem;
  color: #64ffda;
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
`;

const Period = styled.p`
  color: #8892b0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
`;

const Description = styled.p`
  color: #8892b0;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Result = styled(motion.div)`
  background: rgba(100, 255, 218, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(100, 255, 218, 0.2);
  margin-top: 1rem;

  span {
    color: #64ffda;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const TimelineDot = styled(motion.div)`
  width: 20px;
  height: 20px;
  background: #64ffda;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px rgba(100, 255, 218, 0.2);

  @media (max-width: 768px) {
    left: 20px;
  }
`;

const ParallaxContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
`;

const ParallaxDot = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #64ffda;
  border-radius: 50%;
  opacity: 0.2;
`;

const educationData = [
  {
    institution: "Sasi Institute Of Technology And Engineering",
    course: "B.Tech (Information Technology)",
    period: "2022 - Present",
    description: "Currently pursuing a B.Tech in Information Technology, maintaining a GPA of 8.75, with an emphasis on software development.",
    result: "8.75 GPA (Current)"
  },
  {
    institution: "Narayana Junior College",
    course: "Intermediate (MPC)",
    period: "2020 - 2022",
    description: "Excelled in Mathematics, Physics, and Chemistry with a GPA of 9.27, enhancing my analytical and problem-solving abilities.",
    result: "9.27 GPA"
  },
  {
    institution: "SriChaitanya Techno School",
    course: "Schooling",
    period: "2019 - 2020",
    description: "Achieved a remarkable 96% in my schooling, which laid a strong foundation for my academic career.",
    result: "96% Academic Performance"
  }
];

const CareerLine = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateParallaxDots = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2
    }));
  };

  const parallaxDots = useMemo(() => generateParallaxDots(50), []);

  return (
    <CareerSection id="education" ref={containerRef}>
      <ParallaxContainer>
        {parallaxDots.map((dot, i) => (
          <ParallaxDot
            key={i}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size
            }}
            animate={{
              y: scrollY * (i % 3 + 1) * 0.1,
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              y: { type: "spring", stiffness: 50 },
              opacity: { duration: 2, repeat: Infinity }
            }}
          />
        ))}
      </ParallaxContainer>

      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Educational Journey
        </Title>
        <TimelineContainer>
          {educationData.map((education, index) => (
            <TimelineItem
              key={index}
              align={index % 2 === 0 ? 'right' : 'left'}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <TimelineCard
                align={index % 2 === 0 ? 'right' : 'left'}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <Institution>{education.institution}</Institution>
                <Course>{education.course}</Course>
                <Period>{education.period}</Period>
                <Description>{education.description}</Description>
                <Result
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Result: <span>{education.result}</span>
                </Result>
              </TimelineCard>
              <TimelineDot
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
              />
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </CareerSection>
  );
};

export default CareerLine;
