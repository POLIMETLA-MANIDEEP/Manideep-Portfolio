import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const SkillsSection = styled.section`
  min-height: 100vh;
  background: #0a192f;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ccd6f6;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: #64ffda;
    border-radius: 2px;
  }
`;

const SkillsContainer = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  perspective: 1000px;
  margin: 0 auto;
  padding: 2rem;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const SkillsOrbit = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const Skill = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba(100, 255, 218, 0.1);
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid rgba(100, 255, 218, 0.2);
  transform-style: preserve-3d;
  backface-visibility: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #64ffda;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 130px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(100, 255, 218, 0.1);

  &:hover {
    background: rgba(100, 255, 218, 0.2);
    transform: scale(1.1) translateZ(30px);
    box-shadow: 0 8px 24px rgba(100, 255, 218, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    min-width: 100px;
    font-size: 0.9rem;
  }
`;

const Description = styled(motion.p)`
  color: #8892b0;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 0rem;  
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Skills = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const containerRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    let startTime = Date.now();
    let frame;

    const animate = () => {
      if (autoRotate && !isDragging) {
        const currentTime = Date.now();
        const deltaTime = currentTime - startTime;
        
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + (rotationSpeed * deltaTime * 0.01)
        }));

        startTime = currentTime;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, isDragging, rotationSpeed]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;
    
    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));

    // Update rotation speed based on movement velocity
    const moveSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    setRotationSpeed(Math.min(5, Math.max(0.5, moveSpeed * 0.05)));

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-rotation after a brief delay
    setTimeout(() => setAutoRotate(true), 150);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => setAutoRotate(true), 150);
    }
  };

  const skills = [
    'HTML', 'CSS', 'JavaScript', 'TailwindCSS', 'NodeJS', 'ExpressJS',
    'MongoDB', 'PostgreSQL', 'Python', 'C', 'Java', 'Firebase',
    'Apache Superset', 'React', 'Git', 'REST API'
  ];

  return (
    <SkillsSection id="skills">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Technical Skills
      </Title>
      <Description
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I've worked with a diverse set of technologies across the full stack development spectrum.
        My expertise spans from front-end frameworks to back-end systems and databases.
        <br />
      </Description>
      <SkillsContainer
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <SkillsOrbit
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {skills.map((skill, index) => {
            const angle = (index / skills.length) * Math.PI * 2;
            const radius = 250;
            const translateX = radius * Math.cos(angle);
            const translateZ = radius * Math.sin(angle);
            
            return (
              <Skill
                key={skill}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px)`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {skill}
              </Skill>
            );
          })}
        </SkillsOrbit>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;
