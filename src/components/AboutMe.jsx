import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: #0a192f;
  color: #8892b0;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
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
    gap: 3rem;
  }
`;

const AnimationContainer = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    border: 2px solid #64ffda;
    border-radius: 10px;
    z-index: 0;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    position: relative;
    z-index: 1;
  }
`;

const Content = styled.div`
  max-width: 600px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ccd6f6;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60%;
    height: 4px;
    background: #64ffda;
    border-radius: 2px;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #8892b0;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(100, 255, 218, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(100, 255, 218, 0.1);
  }
`;

const SkillTitle = styled.h3`
  color: #64ffda;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const SkillDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Highlight = styled.span`
  color: #64ffda;
`;

const AboutMe = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AboutSection id="about">
      <Container>
        <Grid>
          <AnimationContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://cdn.dribbble.com/users/1059583/screenshots/4171367/coding-freak.gif"
              alt="Coding Animation"
            />
          </AnimationContainer>
          <Content>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionTitle variants={itemVariants}>
                About Me
              </SectionTitle>
              <Paragraph variants={itemVariants}>
                I am an enthusiastic and driven <Highlight>full-stack developer</Highlight> with a focus on the MERN stack 
                (<Highlight>MongoDB, Express.js, React, Node.js</Highlight>). Through personal projects and internships, 
                I have developed a strong understanding of both front-end and back-end technologies, with a passion for 
                creating seamless user experiences and efficient, scalable back-end systems.
              </Paragraph>
              <SkillsGrid variants={containerVariants}>
                <SkillCard variants={itemVariants}>
                  <SkillTitle>Full Stack Development</SkillTitle>
                  <SkillDescription>
                    Creating modern and responsive web applications using React.js for front-end 
                    and Node.js for robust back-end services.
                  </SkillDescription>
                </SkillCard>
                <SkillCard variants={itemVariants}>
                  <SkillTitle>Backend Experience</SkillTitle>
                  <SkillDescription>
                    Developing scalable server-side applications with Node.js, integrating MongoDB 
                    and PostgreSQL databases, and building RESTful APIs.
                  </SkillDescription>
                </SkillCard>
                <SkillCard variants={itemVariants}>
                  <SkillTitle>Cloud & Data Visualization</SkillTitle>
                  <SkillDescription>
                    Proficient in Firebase for real-time databases and Apache Superset for creating 
                    insightful data visualizations and dashboards.
                  </SkillDescription>
                </SkillCard>
                <SkillCard variants={itemVariants}>
                  <SkillTitle>System Expertise</SkillTitle>
                  <SkillDescription>
                    Proficient in Linux and Fedora operating systems for development and deployment tasks, 
                    constantly exploring new tools and technologies.
                  </SkillDescription>
                </SkillCard>
              </SkillsGrid>
            </motion.div>
          </Content>
        </Grid>
      </Container>
    </AboutSection>
  );
};

export default AboutMe;
