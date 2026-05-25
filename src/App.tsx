/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

export default function App() {
  // Dual-state for seamless crossfading background video (eliminating black transition screens)
  const [activeTab, setActiveTab] = useState(0);
  const [key0, setKey0] = useState(0);
  const [key1, setKey1] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(prev => {
        const next = prev === 0 ? 1 : 0;
        // Warm up and refresh the inactive video 1000ms after fade out has completed
        if (next === 1) {
          setTimeout(() => setKey0(k => k + 2), 1000);
        } else {
          setTimeout(() => setKey1(k => k + 2), 1000);
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Data arrays
  const categories = [
    { name: 'Games', img: 'https://i.imgur.com/wFR50ca.jpeg' },
    { name: 'Sports', img: 'https://i.imgur.com/nErG04A.jpeg' },
    { name: 'Metaverse', img: 'https://i.imgur.com/aQjtPKL.jpeg' },
    { name: 'Anime 4', img: 'https://i.imgur.com/nsaggoZ.jpeg' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] font-sans text-white overflow-x-hidden relative selection:bg-[#ff4b4b] selection:text-white">
      {/* Hero Background Video */}
      <div 
        className="absolute top-0 left-0 w-full h-[900px] pointer-events-none z-0 overflow-hidden opacity-[0.16] mix-blend-luminosity"
        style={{
          maskImage: isMobile 
            ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 65%, rgba(0,0,0,0) 100%)'
            : 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 48%)',
          WebkitMaskImage: isMobile 
            ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 65%, rgba(0,0,0,0) 100%)'
            : 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 48%)',
        }}
      >
        {/* Layer 0 */}
        <iframe
          key={key0}
          src="https://player.vimeo.com/video/1195221170?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1"
          className={`absolute transition-opacity duration-1000 ease-in-out ${activeTab === 0 ? 'opacity-100' : 'opacity-0'}`}
          style={{
            position: 'absolute',
            top: isMobile ? '35%' : '50%',
            left: '50%',
            width: '100vh',
            height: '185vw',
            transform: `translate(-50%, -50%) rotate(-90deg) scale(${isMobile ? '0.92' : '0.72'})`,
            transformOrigin: 'center',
            minHeight: '100%',
            minWidth: '100%',
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Video Background A"
        ></iframe>

        {/* Layer 1 (Crossfade buffered) */}
        <iframe
          key={key1}
          src="https://player.vimeo.com/video/1195221170?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1"
          className={`absolute transition-opacity duration-1000 ease-in-out ${activeTab === 1 ? 'opacity-100' : 'opacity-0'}`}
          style={{
            position: 'absolute',
            top: isMobile ? '35%' : '50%',
            left: '50%',
            width: '100vh',
            height: '185vw',
            transform: `translate(-50%, -50%) rotate(-90deg) scale(${isMobile ? '0.92' : '0.72'})`,
            transformOrigin: 'center',
            minHeight: '100%',
            minWidth: '100%',
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Video Background B"
        ></iframe>
      </div>

      {/* Cinematic Vignette & Particle/Smoke Overlay Layer */}
      <div className="absolute top-0 left-0 w-full h-[900px] pointer-events-none z-[1] overflow-hidden">
        <style>{`
          @keyframes floatDust {
            0% { transform: translateY(80px) translateX(0) scale(0.6); opacity: 0; }
            20% { opacity: 0.45; }
            80% { opacity: 0.45; }
            100% { transform: translateY(-120px) translateX(15px) scale(1.1); opacity: 0; }
          }
          @keyframes smokeDrift {
            0% { transform: translateX(-4%) translateY(0) scale(1) rotate(0deg); opacity: 0.25; }
            50% { transform: translateX(4%) translateY(-3%) scale(1.06) rotate(2deg); opacity: 0.4; }
            100% { transform: translateX(-4%) translateY(0) scale(1) rotate(0deg); opacity: 0.25; }
          }
          .animate-dust-1 { animation: floatDust 8s infinite linear; }
          .animate-dust-2 { animation: floatDust 12s infinite linear; }
          .animate-dust-3 { animation: floatDust 15s infinite linear; }
          .animate-smoke { animation: smokeDrift 22s infinite ease-in-out; }
        `}</style>

        {/* Cinematic Vignette Gradients */}
        {/* Top Vignette - completely fades any remaining trace of top edge */}
        <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/90 to-transparent" />
        
        {/* Bottom Vignette - bleeds into blackness */}
        <div className="absolute bottom-0 left-0 w-full h-[450px] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/95 to-transparent" />
        
        {/* Left Vignette */}
        <div className="absolute top-0 left-0 h-[900px] w-[15%] bg-gradient-to-r from-[#0A0A0C] to-transparent hidden md:block" />
        
        {/* Right Vignette */}
        <div className="absolute top-0 right-0 h-[900px] w-[20%] bg-gradient-to-l from-[#0A0A0C] to-transparent hidden md:block" />

        {/* Dramatic Radial Lens Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0A0A0C_95%)] opacity-[0.80]" />

        {/* Animated Smoke/Ink Bleed fog layer */}
        <div className="absolute top-[20%] md:top-[25%] left-[-10%] w-[120%] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,75,75,0.06),transparent_65%)] animate-smoke filter blur-[60px]" />
        <div className="absolute top-[15%] md:top-[10%] right-[-10%] w-[100%] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_60%)] animate-smoke filter blur-[70px]" style={{ animationDelay: '3s' }} />

        {/* Floating cinematic dust particles */}
        <div className="absolute inset-0">
          {[
            { left: '15%', top: '30%', delay: '0s', size: '2px', speed: 'animate-dust-1' },
            { left: '45%', top: '35%', delay: '2s', size: '3px', speed: 'animate-dust-2' },
            { left: '75%', top: '28%', delay: '4s', size: '1.5px', speed: 'animate-dust-3' },
            { left: '25%', top: '40%', delay: '1s', size: '2.5px', speed: 'animate-dust-2' },
            { left: '60%', top: '32%', delay: '5s', size: '2px', speed: 'animate-dust-1' },
            { left: '85%', top: '42%', delay: '3s', size: '3.5px', speed: 'animate-dust-3' },
            { left: '10%', top: '45%', delay: '6s', size: '1.8px', speed: 'animate-dust-2' },
            { left: '50%', top: '25%', delay: '7s', size: '2.2px', speed: 'animate-dust-1' },
          ].map((dust, index) => (
            <div
              key={index}
              className={`absolute rounded-full bg-[#ff7373]/50 blur-[0.5px] ${dust.speed}`}
              style={{
                left: dust.left,
                top: dust.top,
                width: dust.size,
                height: dust.size,
                animationDelay: dust.delay,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Ambient Glowing Orbs Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#ff4b4b] opacity-[0.12] blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-[30%] left-[-10%] w-[35vw] h-[35vw] bg-[#f97316] opacity-[0.15] blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-[#ef4444] opacity-[0.08] blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10 pb-24">
        
        {/* Header / Nav */}
        <nav className="flex items-center justify-between py-6 md:py-8">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L24 12L12 24L0 12L12 0Z" fill="white" className="opacity-90"/>
              <path d="M12 0V24L0 12L12 0Z" fill="#ff4b4b"/>
            </svg>
            <span className="font-display font-bold text-xl tracking-wide uppercase">Qeeb</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex gap-12 text-[13px] font-semibold text-gray-400">
            <a href="#" className="text-white hover:text-white transition-colors">Explore</a>
            <a href="#" className="hover:text-white transition-colors">Collections</a>
            <a href="#" className="hover:text-white transition-colors">Creators</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </div>

          {/* CTA */}
          <button className="bg-[#ff4b4b] hover:bg-[#ff2020] text-white px-7 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(255,75,75,0.5)] hover:shadow-[0_0_35px_rgba(255,75,75,0.8)] border border-[#ff4b4b]/50">
            Connect Wallet
          </button>
        </nav>

        {/* Hero Section */}
        <main className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 pt-8 md:pt-16 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col z-10">
            <h2 className="text-[#ff4b4b] font-bold tracking-widest text-[13px] uppercase mb-4 drop-shadow-[0_0_8px_rgba(255,75,75,0.3)]">NFT Marketplace</h2>
            <h1 className="font-display font-black text-[48px] md:text-[68px] leading-[1.05] uppercase tracking-tight mb-8 drop-shadow-[0_0_20px_rgba(255,75,75,0.15)] relative">
              <span className="absolute -inset-4 bg-[#ff4b4b] blur-[80px] opacity-15 z-[-1] pointer-events-none"></span>
              Collect<br/>
              Rare Digital<br/>
              Artworks
            </h1>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 relative mb-16">
              <button className="bg-[#ff4b4b] hover:bg-[#ff2020] text-white px-9 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(255,75,75,0.6)] hover:shadow-[0_0_40px_rgba(255,75,75,0.9)] border border-[#ff4b4b]/50 hover:scale-105 z-10 w-[140px]">
                Explore
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 md:gap-16">
              <div>
                <div className="font-display font-bold text-[28px] md:text-[34px] tracking-tight hover:text-[#ff4b4b] transition-colors">50k</div>
                <div className="text-gray-400 text-[11px] font-semibold uppercase tracking-[0.1em] mt-1">Artwork</div>
              </div>
              <div>
                <div className="font-display font-bold text-[28px] md:text-[34px] tracking-tight hover:text-[#ff4b4b] transition-colors">35k</div>
                <div className="text-gray-400 text-[11px] font-semibold uppercase tracking-[0.1em] mt-1">Auction</div>
              </div>
              <div>
                <div className="font-display font-bold text-[28px] md:text-[34px] tracking-tight hover:text-[#ff4b4b] transition-colors">23k+</div>
                <div className="text-gray-400 text-[11px] font-semibold uppercase tracking-[0.1em] mt-1">Artist</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative w-[90%] sm:w-[400px] md:w-[460px] mx-auto md:mx-0 aspect-square mt-10 lg:mt-0 xl:mr-10 group">
            {/* Glowing Border FX */}
            <div className="absolute inset-[-4px] bg-gradient-to-tr from-[#f97316] via-[#ff4b4b] to-[#dc2626] rounded-[48px] blur-[8px] opacity-100 z-0 group-hover:blur-[12px] transition-all duration-500"></div>
            <div className="absolute inset-[-4px] bg-gradient-to-tr from-[#f97316] via-[#ff4b4b] to-[#dc2626] rounded-[48px] blur-[25px] opacity-60 z-0 group-hover:blur-[35px] group-hover:opacity-80 transition-all duration-500"></div>
            
            {/* Main AI Hero Image */}
            <img 
              src="https://i.imgur.com/9CapBRM.jpeg" 
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1614593504104-18fa5881cf73?q=80&w=800&fit=crop"; }}
              alt="Exclusive Digital Artwork" 
              className="absolute inset-0 w-full h-full object-cover rounded-[44px] z-10 bg-[#1A1A1C] shadow-2xl"
            />

            {/* Floating Circular Badge */}
            <div className="absolute -left-4 md:-left-14 -bottom-8 md:-bottom-10 w-[100px] md:w-[140px] h-[100px] md:h-[140px] bg-[#0A0A0C] border-[6px] border-[#0A0A0C] rounded-full z-20 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
               
               {/* Spinning Text SVG */}
               <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]">
                 <path id="textPathOut" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                 <text className="text-[9px] md:text-[10.5px] fill-white font-bold tracking-[0.18em] uppercase">
                   <textPath href="#textPathOut" startOffset="0%">
                     QEEB NFT MARKETPLACE • QEEB NFT MARKETPLACE • 
                   </textPath>
                 </text>
               </svg>
               
               {/* Center Play Button */}
               <div className="w-8 md:w-11 h-8 md:h-11 bg-white rounded-full flex items-center justify-center z-30 cursor-pointer hover:scale-110 hover:bg-gray-100 transition-all shadow-lg">
                 <Play size={18} className="fill-[#0A0A0C] text-[#0A0A0C] ml-1" />
               </div>
            </div>
          </div>
        </main>

        {/* Featured Products Section */}
        <section className="mt-24 md:mt-36">
          <h3 className="font-display font-bold text-lg uppercase tracking-[0.15em] mb-10">ANIMES</h3>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <button className="hidden md:flex absolute -left-5 top-[50%] -translate-y-1/2 w-10 h-10 bg-[#1F2025] text-white rounded-full items-center justify-center z-20 shadow-xl hover:bg-[#2A2B32] transition hover:scale-105 border border-white/5">
              <ArrowLeft size={18} />
            </button>
            <button className="hidden md:flex absolute -right-5 top-[50%] -translate-y-1/2 w-10 h-10 bg-[#1F2025] text-white rounded-full items-center justify-center z-20 shadow-xl hover:bg-[#2A2B32] transition hover:scale-105 border border-white/5">
              <ArrowRight size={18} />
            </button>
 
            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <div key={i} className="group cursor-pointer transition-all duration-500 relative overflow-hidden rounded-[24px] shadow-[0_0_25px_rgba(255,75,75,0.35)] border border-[#ff4b4b]/20 hover:border-[#ff4b4b]/50 hover:shadow-[0_0_35px_rgba(255,75,75,0.55)] hover:scale-102">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full aspect-[3/4] object-cover rounded-[24px] transition-transform duration-500 ease-out group-hover:scale-105" 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
