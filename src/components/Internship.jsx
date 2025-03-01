import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';

const InternshipSection = styled.section`
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

const Timeline = styled.div`
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
    background: linear-gradient(180deg, #64ffda 0%, #0984e3 100%);
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

const TimelineContent = styled(motion.div)`
  background: #112240;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 450px;
  position: relative;
  border: 1px solid #233554;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: #64ffda;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
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

  @media (max-width: 768px) {
    width: 100%;
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

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #64ffda;
    border-radius: 50%;
    opacity: 0.4;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    70% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    left: 20px;
  }
`;

const Company = styled.h3`
  font-size: 1.5rem;
  color: #ccd6f6;
  margin-bottom: 0.5rem;
`;

const Role = styled.h4`
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

const SkillsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Skill = styled(motion.span)`
  color: #64ffda;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #64ffda;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    transform: translateY(-2px);
  }
`;

const BackgroundDecoration = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
`;

const internships = [
  {
    "company": "Bag N Dash",
    "role": "Full Stack Developer Intern",
    "period": "Feb 2025 - Present",
    "description": "Managed platform enhancements and optimized system performance to improve user experience. Developed new features, resolved critical bugs, and streamlined frontend and backend workflows for efficiency. Worked on improving system scalability and maintainability.",
    "skills": ["React.js", "Node.js", "PostgreSQL", "Performance Tuning"]
  },
  {
    "company": "Excelr",
    "role": "Cloud Computing Engineer",
    "period": "Jun 2024 - Aug 2024",
    "description": "Acquired foundational knowledge in cloud computing, focusing on infrastructure management and cloud service maintenance. Gained hands-on experience with AWS, working on server provisioning, security configurations, and cloud-based application deployment.",
    "skills": ["AWS", "Cloud Infrastructure", "Server Management", "Networking", "Security"]
  }
];

const Internship = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top } = sectionRef.current.getBoundingClientRect();
      setMousePosition({ x: clientX - left, y: clientY - top });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <InternshipSection id="experience" ref={sectionRef}>
      <BackgroundDecoration
        style={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <Container>
        <Title
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </Title>
        <Timeline>
          {internships.map((internship, index) => (
            <TimelineItem
              key={index}
              align={index % 2 === 0 ? 'right' : 'left'}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineContent
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Company>{internship.company}</Company>
                <Role>{internship.role}</Role>
                <Period>{internship.period}</Period>
                <Description>{internship.description}</Description>
                <SkillsContainer
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {internship.skills.map((skill, skillIndex) => (
                    <Skill
                      key={skillIndex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </Skill>
                  ))}
                </SkillsContainer>
              </TimelineContent>
              <TimelineDot
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
              />
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </InternshipSection>
  );
};

export default Internship;
