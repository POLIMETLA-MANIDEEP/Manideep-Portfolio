import React from 'react';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import MyServices from './components/MyServices';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Certifications from './components/Certifications';
import CareerLine from './components/CareerLine';
import SideNav from './components/SideNav';
import Contact from './components/Contact';
import SocialNav from './components/SocialNav';
import './App.css';

function App() {
  return (
    <div>
      <SideNav />
      <SocialNav />
      <Hero />
      <AboutMe />
      <CareerLine />
      <Skills />
      <MyServices />
      <Projects />
      <Internship />
      <Certifications />
      <Contact />
    </div>
  );
}

export default App;
