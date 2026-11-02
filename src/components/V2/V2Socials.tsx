import React from 'react';
import { motion } from "motion/react";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Mail, FileDown } from 'lucide-react';

export function V2Socials() {
  const socials = [
    {
      name: 'GitHub',
      label: 'SOURCE / J0seph-Mart1n',
      url: 'https://github.com/J0seph-Mart1n',
      icon: <FaGithub size={20} />
    },
    {
      name: 'LinkedIn',
      label: 'NETWORK / joseph-martin',
      url: 'https://www.linkedin.com/in/joseph-martin-656360228/',
      icon: <FaLinkedin size={20} />
    },
    {
      name: 'Twitter',
      label: 'FEED / @JoSEPhMaRtin001',
      url: 'https://x.com/JoSEPhMaRtin001',
      icon: <FaTwitter size={20} />
    },
    {
      name: 'Email',
      label: 'TRANSMIT / jmkl0987@gmail.com',
      url: 'mailto:jmkl0987@gmail.com',
      icon: <Mail size={20} />
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, margin: "-50px" }}
      className="w-full bg-[#FFFFF8] border-t-2 border-black py-16 px-6 relative"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold mb-2">
            <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black" />
            COMMUNICATION CHANNELS // VECTOR TERMINAL
          </div>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
            LET'S CONNECT
          </h3>
          <div className="w-20 h-1.5 bg-[#FFEE00] border border-black mx-auto mt-3" />
          <p className="font-sans text-neutral-700 max-w-md mx-auto text-sm md:text-base mt-4 font-medium">
            Open for full-time engineering roles, distributed systems projects, and cutting-edge AI collaborations.
          </p>
        </div>
        
        {/* Social Link Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#FAF7E8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 text-black group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 group-hover:scale-110 transition-transform">{social.icon}</span>
                <span className="font-mono text-xs font-bold uppercase">{social.name}</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-500 group-hover:text-black font-semibold">
                &rarr;
              </span>
            </a>
          ))}
        </div>

        {/* Primary Resume Download Button */}
        <a
          href="/resume.pdf"
          download="Joseph_Martin_Resume.pdf"
          className="flex items-center gap-3 px-8 py-4 bg-[#FFEE00] hover:bg-[#FAFF00] text-black font-mono font-black text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <FileDown size={20} />
          <span>DOWNLOAD CURRICULUM VITAE (PDF)</span>
        </a>

        {/* Technical Footer Signature */}
        <div className="mt-16 pt-6 border-t border-black/15 w-full flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-neutral-600 gap-2">
          <span>JOSEPH MARTIN &bull; ARCHITECTURAL SPECIFICATION 2026</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#FFEE00] border border-black inline-block"></span>
            ALL SYSTEMS NOMINAL
          </span>
        </div>
      </div>
    </motion.div>
  );
}
