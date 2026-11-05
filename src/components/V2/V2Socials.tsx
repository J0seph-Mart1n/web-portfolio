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
      icon: <FaGithub size={18} />
    },
    {
      name: 'LinkedIn',
      label: 'NETWORK / joseph-martin',
      url: 'https://www.linkedin.com/in/joseph-martin-656360228/',
      icon: <FaLinkedin size={18} />
    },
    {
      name: 'Twitter',
      label: 'FEED / @JoSEPhMaRtin001',
      url: 'https://x.com/JoSEPhMaRtin001',
      icon: <FaTwitter size={18} />
    },
    {
      name: 'Email',
      label: 'TRANSMIT / jmkl0987@gmail.com',
      url: 'mailto:jmkl0987@gmail.com',
      icon: <Mail size={18} />
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, margin: "-50px" }}
      className="w-full bg-[#FFFFF8] border-t-2 border-black py-8 sm:py-10 px-4 md:px-8 relative"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">
            LET'S CONNECT
          </h3>
          <div className="w-16 h-1 bg-[#FFEE00] border border-black mx-auto mt-2" />
          <p className="font-sans text-neutral-700 max-w-md mx-auto text-xs md:text-sm mt-2.5 font-medium">
            Open for full-time engineering roles, distributed systems projects, and cutting-edge AI collaborations.
          </p>
        </div>
        
        {/* Social Link Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl mb-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 bg-[#FAF7E8] hover:bg-[#FFEE00] border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 text-black group cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="shrink-0 group-hover:scale-110 transition-transform">{social.icon}</span>
                <span className="font-mono text-xs font-bold uppercase truncate">{social.name}</span>
              </div>
              <span className="font-mono text-xs text-neutral-500 group-hover:text-black font-semibold shrink-0">
                &rarr;
              </span>
            </a>
          ))}
        </div>

        {/* Primary Resume Download Button */}
        <a
          href="/resume.pdf"
          download="Joseph_Martin_Resume.pdf"
          className="flex items-center gap-2 px-6 py-2.5 bg-[#FFEE00] hover:bg-[#FAFF00] text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <FileDown size={16} />
          <span>DOWNLOAD RESUME (PDF)</span>
        </a>

        {/* Technical Footer Signature */}
        <div className="mt-8 pt-4 border-t border-black/15 w-full flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-neutral-600 gap-2">
          <span>JOSEPH MARTIN &bull; 2026</span>
        </div>
      </div>
    </motion.div>
  );
}
