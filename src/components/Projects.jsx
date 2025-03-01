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
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 0%, rgba(100, 255, 218, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, #64ffda, transparent);
    top: -50%;
    left: -50%;
    transform: translateY(100%);
    transition: transform 0.6s ease;
    opacity: 0.1;
  }

  &:hover::after {
    transform: translateY(-100%);
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

const TechStack = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled(motion.span)`
  background: #1d4ed8;
  color: #e6f1ff;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
`;

const ProjectLink = styled(motion.a)`
  color: #64ffda;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #64ffda;
  color: #64ffda;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &.active {
    background: #64ffda;
    color: #0a192f;
  }

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }
`;

const projectsData = [
  {
    title: "React Weather App",
    description: "A weather application built with React that shows current weather and 5-day forecast.",
    image: "/weather-app.jpg",
    technologies: ["React", "Node.js", "OpenWeather API"],
    link: "https://weather-app.demo"
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
    description: "Application which perform all the CRUD operations. Register, Search, Update, and Delete Student Details. Mongo Cloud is used as database Storage. Hosted the website using Netlify.",
    image: "/projects/Project-4.png",
    link: "https://manideep-crud-app.netlify.app",
    technologies: ["HTML", "CSS", "React", "Express", "MongoDB", "NodeJS"]
  },
  {
    title: "Student Portfolio",
    description: "A Attractive Portfolio describing my Technologies and Projects. Also having Feature to contact Me using viewer-details. Hosted the website using Netlify.",
    image: "/projects/Project-5.png",
    link: "https://pm-portfolio-site.netlify.app",
    technologies: ["HTML", "CSS", "React", "Express", "MongoDB", "NodeJS"]
  }
];

const Projects = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  const filters = ['all', 'React', 'Node.js', 'MongoDB', 'Express'];

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => 
          project.technologies.includes(filter)
        )
      );
    }
  }, [filter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const tagVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <ProjectsSection id="projects" ref={containerRef}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My Projects
        </SectionTitle>

        <FilterContainer
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filters.map((filterName) => (
            <FilterButton
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={filter === filterName ? 'active' : ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterName}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <ProjectImage 
                src={project.image} 
                alt={project.title}
                variants={imageVariants}
                whileHover="hover"
              />
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.technologies.map((tech, techIndex) => (
                  <TechTag 
                    key={techIndex}
                    variants={tagVariants}
                    whileHover="hover"
                  >
                    {tech}
                  </TechTag>
                ))}
              </TechStack>
              {project.link && (
                <ProjectLink 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
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
