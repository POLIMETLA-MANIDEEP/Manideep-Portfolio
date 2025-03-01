import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = styled.section`
  background: #0a192f;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Content = styled.div`
  max-width: 600px;
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  color: #ccd6f6;
  margin-bottom: 2rem;
  font-weight: 700;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  color: #8892b0;
  margin-bottom: 2.5rem;
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Button = styled(motion.a)`
  padding: 1rem 2rem;
  display: inline-block;
  background: #64ffda;
  color: #0a192f;
  border-radius: 4px;
  font-size: 1rem;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #64ffda;

  &:hover {
    background: transparent;
    color: #64ffda;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: -15px;
    bottom: -15px;
    border: 2px solid #64ffda;
    border-radius: 8px;
    z-index: -1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  filter: grayscale(20%);
  transition: all 0.3s ease;

  &:hover {
    filter: none;
    transform: translate(-5px, -5px);
  }
`;

const Hero = () => {
  return (
    <HeroSection id="hero">
      <Container>
        <Grid>
          <Content>
            <Name
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Polimetla Manideep
            </Name>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I'm a{' '}
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'MERN Stack Developer',
                  2000,
                  'Programmer',
                  2000,
                  'Tech Explorer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: '#64ffda' }}
              />
            </Title>
            <Button
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </Button>
          </Content>
          <ImageContainer
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProfileImage 
              src="/ProfilePic.jpg" 
              alt="Polimetla Manideep"
            />
          </ImageContainer>
        </Grid>
      </Container>
    </HeroSection>
  );
};

export default Hero;
