import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 9999;
`;

const NavContainer = styled(motion.div)`
  position: fixed;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: rgba(17, 34, 64, 0.8);
  padding: 15px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.2);
`;

const NavItem = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${props => props.isActive ? 'rgba(100, 255, 218, 0.3)' : 'rgba(100, 255, 218, 0.1)'};
  color: #64ffda;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.2);
    transform: scale(1.1);

    .tooltip {
      opacity: 1;
      transform: translateX(-10px);
    }
  }

  &:focus {
    outline: none;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  right: 50px;
  background: #112240;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  color: #64ffda;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.2);

  &:after {
    content: '';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #112240;
  }
`;

const navItems = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '💻' },
  { id: 'services', label: 'Services', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'certifications', label: 'Certifications', icon: '📜' },
  { id: 'contact', label: 'Contact', icon: '✉️' }
];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Wrapper
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <NavContainer animate={{ right: isVisible ? '20px' : '-80px' }}>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            isActive={activeSection === item.id}
            onClick={() => handleNavClick(item.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
            <Tooltip className="tooltip">{item.label}</Tooltip>
          </NavItem>
        ))}
      </NavContainer>
    </Wrapper>
  );
};

export default SideNav;
