import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import './UI.css';

function UI() {
    const [currentSection, setCurrentSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const sections = [
        { id: 'home', name: 'HOME', icon: '🏠' },
        { id: 'about', name: 'ABOUT', icon: '👨‍💻' },
        { id: 'projects', name: 'PROJECTS', icon: '🚀' },
        { id: 'skills', name: 'SKILLS', icon: '⚡' },
        { id: 'contact', name: 'CONTACT', icon: '📧' }
    ];

    const projects = [
        { name: 'VoiceReact', tech: 'React + Three.js', status: '완료' },
        { name: '3D Portfolio', tech: 'React + WebGL', status: '진행중' },
        { name: 'AI Chat Bot', tech: 'Node.js + OpenAI', status: '기획' }
    ];

    return (
        <div className="ui-overlay">
      {/* 네비게이션 */}
            <nav className="main-nav">
        <motion.button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
          ☰
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  className="nav-menu"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
              >
              {sections.map((section) => (
                  <motion.button
                      key={section.id}
                      className={`nav-item ${currentSection === section.id ? 'active' : ''}`}
                      onClick={() => setCurrentSection(section.id)}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                  >
                  <span className="nav-icon">{section.icon}</span>
                  <span className="nav-text">{section.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

            {/* 메인 컨텐츠 */}
            <main className="main-content">
        <AnimatePresence mode="wait">
          {currentSection === 'home' && (
              <motion.div
                  key="home"
                  className="section"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
              >
              <h1 className="hero-title">
                안녕하세요! 👋<br />
                <span className="gradient-text">프론트엔드 개발자</span><br />
                김개발입니다
              </h1>
              <p className="hero-subtitle">
                React와 Three.js로 몰입감 있는<br />
                웹 경험을 만들어갑니다 ✨
              </p>
            </motion.div>
          )}

            {currentSection === 'projects' && (
                <motion.div
                    key="projects"
                    className="section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                >
              <h2 className="section-title">🚀 프로젝트</h2>
              <div className="projects-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="project-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                    <h3>{project.name}</h3>
                    <p>{project.tech}</p>
                    <span className={`status ${project.status}`}>
                      {project.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            )}

            {currentSection === 'skills' && (
                <motion.div
                    key="skills"
                    className="section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                >
              <h2 className="section-title">⚡ 기술 스택</h2>
              <div className="skills-grid">
                {['React', 'Three.js', 'TypeScript', 'Node.js', 'WebGL', 'GLSL'].map((skill, index) => (
                    <motion.div
                        key={skill}
                        className="skill-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            )}
        </AnimatePresence>
      </main>

            {/* 소셜 링크 */}
            <div className="social-links">
        {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
            <motion.a
                key={social}
                href="#"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
            >
            {social}
          </motion.a>
        ))}
      </div>
    </div>
    );
}

export default UI;