import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiCodechef } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

const NavContainer = styled.div`
  position: fixed;
  left: 20px;
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

const NavItem = styled(motion.a)`
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
  text-decoration: none;

  &:hover {
    background: rgba(100, 255, 218, 0.2);
    transform: scale(1.1);

    .tooltip {
      opacity: 1;
      transform: translateX(10px);
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  left: 50px;
  background: #112240;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  color: #64ffda;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.2);

  &:after {
    content: '';
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #112240;
  }
`;

const socialItems = [
  { 
    id: 'github', 
    label: 'GitHub', 
    icon: <FaGithub />,
    url: 'https://github.com/yourusername' 
  },
  { 
    id: 'linkedin', 
    label: 'LinkedIn', 
    icon: <FaLinkedinIn />,
    url: 'https://linkedin.com/in/yourusername' 
  },
  { 
    id: 'instagram', 
    label: 'Instagram', 
    icon: <FaInstagram />,
    url: 'https://instagram.com/yourusername' 
  },
  { 
    id: 'twitter', 
    label: 'Twitter', 
    icon: <FaTwitter />,
    url: 'https://twitter.com/yourusername' 
  },
  { 
    id: 'codechef', 
    label: 'CodeChef', 
    icon: <SiCodechef />,
    url: 'https://codechef.com/users/yourusername' 
  },
  { 
    id: 'gmail', 
    label: 'Gmail', 
    icon: <MdEmail />,
    url: 'mailto:manideep9476@gmail.com?subject=Portfolio Contact' 
  }
];

const SocialNav = () => {
  return (
    <NavContainer>
      {socialItems.map((item) => (
        <NavItem
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.icon}
          <Tooltip className="tooltip">{item.label}</Tooltip>
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default SocialNav;
