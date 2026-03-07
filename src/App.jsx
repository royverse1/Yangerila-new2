/* src/App.jsx - FULL UNABRIDGED CODE */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const headerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Header Visibility Logic (Hide on Scroll Down)
    const header = headerRef.current;
    ScrollTrigger.create({
      start: 'top top',
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(header, { yPercent: -100, duration: 0.5, ease: "power2.out" });
        } else {
          gsap.to(header, { yPercent: 0, duration: 0.5, ease: "power2.out" });
        }
      }
    });

    // 3. MASTER STACK TIMELINE
    const layers = gsap.utils.toArray('.section-layer');
    
    // We create a master timeline that controls the clipping of each layer
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    // The logic: Each layer wipes in, stays static, then the next layer wipes in.
    layers.forEach((layer, i) => {
      if (i === 0) return; // The first layer is already visible

      tl.fromTo(layer, 
        { clipPath: 'inset(100% 0% 0% 0%)' }, 
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          ease: 'none',
          duration: 1 
        }
      );
      
      // We add a 'blank' duration to hold the section in view before the next one starts
      tl.to({}, { duration: 0.5 }); 
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="main-wrapper">
      {/* GLASS HEADER */}
      <nav className="header" ref={headerRef}>
        <div className="logo">YCS STUDIO</div>
        <button className="glass-btn" style={{marginTop: 0, padding: '8px 20px', fontSize: '0.7rem'}}>Contact</button>
      </nav>

      {/* The scroll-track height (600vh) defines total scroll distance */}
      <div className="scroll-track" ref={trackRef} style={{ height: '700vh' }}>
        <div className="sticky-viewport">
          
          {/* SECTION 01: Hero */}
          <div className="section-layer bg-1" style={{ zIndex: 1 }}>
            <div className="liquid-glass-box">
              <h1>LIQUID<br/>GLASS</h1>
              <p>Realistic refractive textures for high-end digital experiences.</p>
              <button className="glass-btn">Explore Work</button>
            </div>
          </div>

          {/* SECTION 02: Wipe Transition */}
          <div className="section-layer bg-2" style={{ zIndex: 2 }}>
            <div className="liquid-glass-box" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h1>STATIC<br/>STACK</h1>
              <p>The previous section stays perfectly still while I flip over it.</p>
              <button className="glass-btn">See Proof</button>
            </div>
          </div>

          {/* SECTION 03: Tinted Interaction */}
          <div className="section-layer bg-3" style={{ zIndex: 3 }}>
            <div className="liquid-glass-box">
              <h1>TINTED</h1>
              <p>Custom glass tinting that adapts to the environment.</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button className="glass-btn" style={{background: 'rgba(255, 20, 147, 0.2)'}}>Pink</button>
                <button className="glass-btn" style={{background: 'rgba(0, 122, 255, 0.2)'}}>Blue</button>
              </div>
            </div>
          </div>

          {/* SECTION 04: Final Section */}
          <div className="section-layer bg-4" style={{ zIndex: 4 }}>
            <div className="section-content">
              <h1>FINALE</h1>
              <p>Experience the Yangerila standard of web development.</p>
              <button className="glass-btn" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Back to Top</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default App;