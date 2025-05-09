import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  background: #0a192f;
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ccd6f6;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #64ffda;
    border-radius: 2px;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: #112240;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #233554;
  position: relative;
  overflow: hidden;
  &:hover::before {
    opacity: 1;
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
`;

const ProjectTitle = styled.h3`
  color: #e6f1ff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: #8892b0;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: #1d4ed8;
  color: #e6f1ff;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
`;

const ProjectLink = styled.a`
  color: #64ffda;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const projectsData = [
  {
    title: "React Weather App",
    description: "A weather application built with React that shows current weather and 5-day forecast.",
    image: "/projects/Project-1.png",
    technologies: ["React", "Node.js", "OpenWeather API"],
    link: "https://manideep-weather-app.netlify.app"
  },
  {
    title: "Groceries List App",
    description: "A Simple ToDo List builded using React used to add the Items and Edit or delete them. Not Hosted by code is available in the github",
    image: "/projects/Project-2.png",
    technologies: ["HTML", "CSS", "React"]
  },
  {
    title: "JWT Authentication Demo",
    description: "A Sample Login and SignUp page which perform authentication. Shows the working of webTokens. Code is available in the github.",
    image: "/projects/Project-3.png",
    technologies: ["HTML", "CSS", "React", "Express", "MongoDB", "NodeJS"]
  },
  {
    title: "Student CRUD App",
    description: "Perform CRUD operations using MongoDB. Hosted on Netlify.",
    image: "/projects/Project-4.png",
    link: "https://manideep-crud-app.netlify.app",
    technologies: ["React", "Express", "MongoDB", "NodeJS"]
  },
  {
    title: "Student Portfolio",
    description: "Portfolio showcasing my work and technologies. Hosted on Netlify.",
    image: "/projects/Project-5.png",
    link: "https://pm-portfolio-site.netlify.app",
    technologies: ["React", "Express", "MongoDB", "NodeJS"]
  },
  {
    title: "AI-Powered Chatbot – Real-time Conversational Assistant",
    description: "An AI-powered chatbot built with the MERN stack and shadcn/ui for real-time conversations, featuring a clean UI, seamless API integration, and responsive design.",
    image: "/projects/Project-6.png",
    link: "https://pm-chatbot.netlify.app",
    technologies: ["React.js", "Tailwind CSS", "shadcn/ui", "Node.js", "Express.js", "MongoDB", "OpenAI API", "JWT Auth" ]
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.technologies.includes(filter))
      );
    }
  }, [filter]);

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>My Projects</SectionTitle>
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index}>
              <ProjectImage src={project.image} alt={project.title} />
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.technologies.map((tech, techIndex) => (
                  <TechTag key={techIndex}>{tech}</TechTag>
                ))}
              </TechStack>
              {project.link && (
                <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                  View Live Demo →
                </ProjectLink>
              )}
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
