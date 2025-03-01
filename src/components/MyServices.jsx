import React from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';

const ServicesSection = styled.section`
  min-height: 100vh;
  background: #0a192f;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '<services>';
    font-family: 'Fira Code', monospace;
    color: rgba(100, 255, 218, 0.1);
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1.5rem;
  }

  &::after {
    content: '</services>';
    font-family: 'Fira Code', monospace;
    color: rgba(100, 255, 218, 0.1);
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  color: #ccd6f6;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);

  &::before {
    content: 'What I Do';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    color: #64ffda;
    white-space: nowrap;
    font-family: 'Fira Code', monospace;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #64ffda, transparent);
  }
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(100, 255, 218, 0.03);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(100, 255, 218, 0.15),
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  width: fit-content;
`;

const ServiceTitle = styled(motion.h3)`
  font-size: 1.5rem;
  color: #ccd6f6;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const ServiceDescription = styled(motion.p)`
  color: #8892b0;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    y: 50,
    opacity: 0,
    scale: 0.9
  },
  visible: { 
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      mass: 0.9
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.5
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

const MyServices = () => {
  const services = [
    {
      icon: "💻",
      title: "Full Stack Development",
      description: "Building scalable and interactive web applications using front-end and back-end technologies."
    },
    {
      icon: "🖥️",
      title: "Backend Development with Node.js",
      description: "Developing server-side logic and APIs using Node.js, along with database integration like MongoDB and PostgreSQL."
    },
    {
      icon: "📊",
      title: "Data Visualization with Apache Superset",
      description: "Leveraging Apache Superset for creating interactive dashboards and visualizations."
    },
    {
      icon: "🐧",
      title: "Linux/Fedora OS Experience",
      description: "Proficient in using Linux and Fedora operating systems for development, deployment, and server management."
    }
  ];

  return (
    <ServicesSection id="services">
      <Container>
        <Title
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20
            }
          }}
          viewport={{ once: true }}
        >
          My Services
        </Title>
        <ServicesGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <IconWrapper
                variants={iconVariants}
                whileHover="hover"
              >
                {service.icon}
              </IconWrapper>
              <ServiceTitle variants={textVariants}>
                {service.title}
              </ServiceTitle>
              <ServiceDescription variants={textVariants}>
                {service.description}
              </ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default MyServices;
