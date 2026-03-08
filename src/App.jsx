/* src/App.jsx - FULL UNABRIDGED CODE */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const getFlareStyle = () => {
  const edgePositions = [
    { x: '5%', y: '5%' }, 
    { x: '85%', y: '5%' }, 
    { x: '5%', y: '80%' }, 
    { x: '85%', y: '80%' }
  ];
  const randomEdge = edgePositions[Math.floor(Math.random() * edgePositions.length)];
  return { '--flare-x': randomEdge.x, '--flare-y': randomEdge.y };
};

function App() {
  const headerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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

    const layers = gsap.utils.toArray('.section-layer');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    layers.forEach((layer, i) => {
      if (i === 0) return; 
      tl.fromTo(layer, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 });
      tl.to({}, { duration: 0.5 }); 
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="main-wrapper">
      <nav className="header" ref={headerRef}>
        <div className="logo">YCS STUDIO</div>
        <button className="glass-btn" style={{...getFlareStyle(), marginTop: 0, padding: '10px 24px', fontSize: '0.7rem'}}>Studio</button>
      </nav>

      <div className="scroll-track" ref={trackRef} style={{ height: '800vh' }}>
        <div className="sticky-viewport">
          
          <div className="section-layer bg-1" style={{ zIndex: 1 }}>
            <div className="liquid-glass-box">
              <h1>YCS<br/>STUDIO</h1>
              <p>Experience the next generation of creative digital design.</p>
              <button className="glass-btn" style={getFlareStyle()}>Explore Work</button>
            </div>
          </div>

          <div className="section-layer bg-2" style={{ zIndex: 2 }}>
            <div className="liquid-glass-box" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h1>STATIC</h1>
              <p>The previous section stays perfectly still while I flip over it.</p>
              <button className="glass-btn" style={getFlareStyle()}>React</button>
            </div>
          </div>

          <div className="section-layer bg-3" style={{ zIndex: 3 }}>
            <div className="liquid-glass-box">
              <h1>LIQUID</h1>
              <p>Realistic refractive edges and deep glass blurring.</p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="glass-btn" style={{...getFlareStyle(), marginTop:0}}>Refract</button>
                <button className="glass-btn" style={{...getFlareStyle(), marginTop:0}}>Focus</button>
              </div>
            </div>
          </div>

          {/* SECTION 04: CONTACT (APPLE REFINEMENT) */}
          <div className="section-layer bg-finale" style={{ zIndex: 4 }}>
            <div className="liquid-glass-box contact-glass-box">
              
              <div className="contact-left">
                <h2 className="contact-heading">START<br/>HERE.</h2>
                <div className="contact-details">
                  <div className="contact-item">
                    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>+91 8076 530 550</span>
                  </div>
                  <div className="contact-item">
                    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span>care@yangerila.com</span>
                  </div>
                  <div className="contact-item">
                    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span>Indirapuram</span>
                  </div>
                </div>
                <div className="map-container">
                  <iframe 
                    title="Yangerila Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.559312117564!2d77.3712!3d28.6133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzQ3LjkiTiA3N8KwMjInMTYuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                    allowFullScreen="" 
                    loading="lazy">
                  </iframe>
                </div>
              </div>

              <div className="contact-right">
                <h2 className="contact-heading">LET US<br/>CALL.</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Full Name *" className="glass-input" required />
                  <input type="tel" placeholder="Phone number *" className="glass-input" required />
                  <select className="glass-select" defaultValue="">
                    <option value="" disabled>Inquiry Type</option>
                    <option value="guitar">Guitar Journey</option>
                    <option value="studio">Creative Studio</option>
                  </select>
                  <textarea placeholder="Tell us more" className="glass-textarea"></textarea>
                  <button type="submit" className="submit-glass-btn" style={getFlareStyle()}>Submit Request</button>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default App;