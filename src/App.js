import './App.css';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

function App() {
  const [stage, setStage] = useState('box'); // Stages: 'box', 'propose', 'invitation', 'gallery'
  const [isHoveringYes, setIsHoveringYes] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update window size to keep the "No" button and Confetti in bounds
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // THE RUNAWAY FEATURE
  const moveButton = (e) => {
    // Randomly calculate new position within the screen boundaries
    const x = Math.random() * (windowSize.width - 150);
    const y = Math.random() * (windowSize.height - 100);
    
    e.target.style.position = 'fixed';
    e.target.style.left = `${x}px`;
    e.target.style.top = `${y}px`;
    e.target.style.zIndex = '999';
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        
        {/* STAGE 1: THE INITIAL BOX */}
        {stage === 'box' && (
          <motion.div 
            key="box" 
            className="proposal-box" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <h1 className="proposal-title" style={{ fontSize: '3rem' }}>For My Everything ❤️</h1>
            <p className="status-text">I have a secret for you...</p>
            <button className="gold-btn" onClick={() => setStage('propose')}>UNFOLD</button>
          </motion.div>
        )}

        {/* STAGE 2: THE PROPOSAL (WITH RUNAWAY BUTTON) */}
        {stage === 'propose' && (
          <motion.div 
            key="propose" 
            className="proposal-box" 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="character-section">
                <span className="boy-avatar">{isHoveringYes ? '🤩' : '🥺'}</span>
                <p className="status-text">{isHoveringYes ? "I'M SO HAPPY!" : "He's waiting..."}</p>
            </div>
            
            <motion.div className="floating-ring" animate={{ y: [0, -20, 0], rotateY: 360 }} transition={{ duration: 4, repeat: Infinity }}>💍</motion.div>

            <h1 className="proposal-title">Will you marry me?</h1>

            <div className="button-row">
              <button 
                className="yes-btn" 
                onMouseEnter={() => setIsHoveringYes(true)} 
                onMouseLeave={() => setIsHoveringYes(false)} 
                onClick={() => setStage('invitation')}
              >
                YES!
              </button>

              <button 
                className="no-btn" 
                onMouseEnter={moveButton} // Teleport on mouse over
                onTouchStart={moveButton} // Teleport on touch
              >
                No
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: THE SUCCESS INVITATION */}
        {stage === 'invitation' && (
          <motion.div key="invite" className="proposal-box" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} recycle={false} />
            <h1 className="proposal-title" style={{ fontSize: '3rem' }}>Forever Starts Now! ❤️</h1>
            <p className="status-text">Want to see our beautiful story?</p>
            <button className="gold-btn" onClick={() => setStage('gallery')}>View Memories ✨</button>
          </motion.div>
        )}

        {/* STAGE 4: THE MEMORY GALLERY */}
        {stage === 'gallery' && (
          <motion.div key="gallery" className="gallery-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <h1 className="gallery-title">Our Forever Memories</h1>
             <div className="photo-stream">
                <div className="photo-frame"><img src="/IMG-20251219-WA0022.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG_20250204_185915.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG-20251219-WA0019.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG-20251219-WA0018.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG-20251219-WA0012.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG-20251219-WA0016.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG-20251219-WA0009.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG-20251219-WA0006.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG_20250829_194338.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG_20250803_091258.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG_20250803_002505.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG_20250613_191108.jpg" alt="Memory" /></div>
                <div className="photo-frame"><img src="/IMG_20250204_185915.jpg" alt="Memory" /></div>
               
             </div>
             <button className="gold-btn" onClick={() => setStage('box')}>Back to Us ❤️</button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;