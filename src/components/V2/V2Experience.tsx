import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function V2Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const data = [
    {
      date: "2021 - 2025",
      title: "AISSMS College of Engineering",
      role: "B.E. in Computer Engineering",
      badge: "ACADEMIC // CIPHERS CLUB",
      description: [
        "Pursued a comprehensive degree in Computer Engineering, specializing in Backend Systems, Machine Learning, and Automation.",
        "Served as Co-Head of Programming at the CIPHERS Club, directing competitive programming seminars, hackathons, and software engineering workshops.",
        "Built diverse production applications ranging from Python/Selenium automation and predictive ML models to full-stack web applications."
      ]
    },
    {
      date: "Mar 2025 - Aug 2025",
      title: "Cognizant",
      role: "Software Engineering Intern",
      badge: "ENTERPRISE // QUALITY ASSURANCE",
      description: [
        "Built behavior-driven test frameworks using Java, Selenium, Cucumber BDD, and Gherkin with Log4j logging for automated test verification.",
        "Spearheaded a 5-member QA team to automate a civic District Portal, testing complex workflows including event booking and dynamic seat reservation.",
        "Managed Git branching, peer code reviews, and test case distribution, accelerating sprint delivery turnaround by 25%."
      ]
    },
    {
      date: "Aug 2025 - Aug 2026",
      title: "Cognizant",
      role: "Programmer Analyst Trainee",
      badge: "PRODUCTION // AUTOMATION PIPELINES",
      description: [
        "Automated 120+ end-to-end regression test cases across cross-system workflows using Python, Selenium, and Robot Framework.",
        "Orchestrated automated test jobs in Jenkins and locally, streaming test results, defect metrics, and logs to Jira and qTest.",
        "Participated in client status meetings and daily standups, ensuring test scripting progress met strict quality milestones."
      ]
    },
    {
      date: "Aug 2026 - Present",
      title: "Cognizant",
      role: "Programmer Analyst",
      badge: "ARCHITECTURE // QUALITY ENGINEERING",
      description: [
        "Lead test automation architecture and CI/CD quality pipelines in Jenkins, cutting regression cycle time and defect escapes by 35%.",
        "Drive quality engineering across Agile releases, conducting root-cause analyses and collaborating with engineering teams to unblock production deliverables."
      ]
    }
  ];

  const totalSegments = data.length - 1;
  const activeLineWidth = isAutoPlaying 
    ? (activeIndex === totalSegments ? 100 : (activeIndex / totalSegments) * 100 + (progress / 100) * (100 / totalSegments)) 
    : (activeIndex / totalSegments) * 100;

  // Auto-play timer logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const DURATION = 6000;
    const TICK = 16;
    const step = (100 / DURATION) * TICK;

    const timer = setInterval(() => {
      setProgress((prev) => prev + step);
    }, TICK);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  useEffect(() => {
    if (progress >= 100 && isAutoPlaying) {
      setActiveIndex((current) => (current + 1) % data.length);
      setProgress(0);
    }
  }, [progress, isAutoPlaying, data.length]);

  const handleNodeClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setProgress(100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto py-12 px-4"
    >
      {/* Persona Section Header */}
      <div className="text-center mb-14">
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
          EXPERIENCE
        </h3>
        <div className="w-20 h-1.5 bg-[#FFEE00] border border-black mx-auto mt-3" />
      </div>

      {/* Persona Neo-Brutalist Timeline Stepper */}
      <div className="relative w-full mb-12">
        <div className="relative flex justify-between w-full">
          
          {/* Base Track */}
          <div 
            className="absolute top-[54px] h-3 z-0" 
            style={{ 
              left: `${(1 / (2 * data.length)) * 100}%`, 
              width: `${(1 - 1 / data.length) * 100}%` 
            }}
          >
            <div className="absolute left-0 w-full h-[3px] bg-black/20 top-1/2 -translate-y-1/2" />
            <motion.div 
              className="absolute left-0 h-[4px] bg-[#FFEE00] border-y border-black top-1/2 -translate-y-1/2"
              animate={{ width: `${activeLineWidth}%` }}
              transition={{ duration: isAutoPlaying ? 0 : 0.4, ease: "easeInOut" }}
            />
          </div>

          {data.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <div 
                key={index} 
                onClick={() => handleNodeClick(index)}
                className="flex flex-col items-center cursor-pointer group flex-1 basis-0 min-w-0 px-0.5 sm:px-2"
              >
                {/* Year Stamp */}
                <div className={`h-12 shrink-0 flex items-end justify-center pb-2 text-[10px] sm:text-xs md:text-sm leading-tight font-mono font-bold tracking-tight sm:tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-black' : 'text-neutral-500 group-hover:text-black'
                }`}>
                  <span className="text-center">{item.date}</span>
                </div>

                {/* Node Box */}
                <motion.div 
                  className={`w-6 h-6 border-2 border-black z-10 transition-all duration-300 shrink-0 flex items-center justify-center ${
                    isActive 
                      ? 'bg-[#FFEE00] shadow-[3px_3px_0px_#000] scale-110' 
                      : isPast 
                      ? 'bg-[#FFEE00] shadow-[1px_1px_0px_#000]' 
                      : 'bg-[#FFFFF8] group-hover:bg-[#FFEE00]/40'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-black" />
                </motion.div>

                {/* Organization Label */}
                <div className={`mt-3 w-full text-center font-mono text-[10px] sm:text-xs md:text-sm leading-tight uppercase tracking-tight sm:tracking-wide break-words transition-colors duration-300 ${
                  isActive ? 'text-black font-extrabold' : 'text-neutral-600 group-hover:text-black'
                }`}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Box: Persona Neo-Brutalist Card */}
      <div className="w-full relative overflow-hidden bg-[#FFFFF8] border-2 border-black shadow-[6px_6px_0px_#000]">
        {/* Top Yellow Bar */}
        <div className="w-full h-2 bg-[#FFEE00] border-b-2 border-black" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="p-8 md:p-10 flex flex-col justify-center"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-black/15">
              <div className="inline-block px-3 py-1 bg-[#FFEE00] text-black font-mono font-bold text-xs uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000]">
                {data[activeIndex].badge}
              </div>
              <div className="font-mono text-xs text-neutral-500 font-bold">
                TIMEFRAME: {data[activeIndex].date}
              </div>
            </div>
            
            <h4 className="text-2xl md:text-3xl font-black text-black mb-1 uppercase tracking-tight">
              {data[activeIndex].role}
            </h4>
            
            <div className="text-base md:text-lg text-neutral-700 font-mono font-bold mb-6">
              @ {data[activeIndex].title}
            </div>
            
            <div className="text-neutral-800 text-sm md:text-base leading-relaxed">
              <ul className="space-y-3">
                {data[activeIndex].description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#FFEE00] border border-black mt-2 shrink-0" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card Footer Status */}
        <div className="w-full py-2 px-6 bg-neutral-100 border-t border-black flex justify-between items-center font-mono text-[10px] text-neutral-600">
          <span>NODE {activeIndex + 1} OF {data.length}</span>
        </div>
      </div>
    </motion.div>
  );
}
