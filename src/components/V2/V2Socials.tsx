import React from 'react';
import { motion } from "motion/react";

export function V2Socials() {
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/J0seph-Mart1n',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/joseph-martin-656360228/',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://x.com/JoSEPhMaRtin001',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:jmkl0987@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, margin: "-50px" }}
      className="flex flex-col items-center gap-8 py-16 px-6 bg-zinc-900/60 backdrop-blur-xl border-t border-white/10 w-full"
    >
      <div className="text-center">
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Let's Connect</h3>
        <p className="font-sans text-zinc-400 max-w-md mx-auto text-sm md:text-base">
          Feel free to reach out for collaborations, opportunities, or just a friendly chat!
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group flex justify-center items-center w-16 h-16 md:w-15 md:h-15 rounded-full bg-white/5 border border-white/10 hover:bg-[#87BCDE]/10 hover:border-[#87BCDE]/50 hover:scale-110 shadow-lg hover:shadow-[0_0_20px_rgba(135,188,222,0.3)] transition-all duration-300"
          >
            <div className="text-zinc-400 group-hover:text-[#87BCDE] transition-colors duration-300">
              {social.icon}
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
