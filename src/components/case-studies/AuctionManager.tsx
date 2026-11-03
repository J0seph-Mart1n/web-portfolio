import React from 'react';
import { ImageSlider } from '@/components/ImageSlider';
import { ProjectData } from '@/data/projects';

export function AuctionManager({ project }: { project: ProjectData }) {
  return (
    <>
      <ImageSlider 
        images={[
          { src: "/images/AuctionManager/1_Dashboard.png", caption: "Dashboard Page" },
          { src: "/images/AuctionManager/2_Pre_Auction.png", caption: "Pre-Auction Page" },
          { src: "/images/AuctionManager/3_Live_Auction.png", caption: "Live Auction Page" },
          { src: "/images/AuctionManager/4_Post_Auction.png", caption: "Post-Auction Page" }
        ]}
        color={project.color}
      />

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Project Overview
        </h2>
        <p className="text-neutral-800 leading-relaxed text-base md:text-lg font-medium">
          AuctionManager is an end-to-end full-stack solution for organizing and managing live auctions. The platform addresses the complete lifecycle of an auction event across three distinct phases: Pre-Auction, Live Auction, and Post-Auction. Organizers can maintain an inventory of items, rapidly record fast-paced bids and sales during live events, and analyze financial performance and payments post-event via a centralized dashboard.
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Project Structure &amp; Architecture
        </h2>

        <div className="w-full border-2 border-black bg-[#FAF7E8] shadow-[6px_6px_0px_#000] p-4 md:p-6 overflow-hidden">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3 pb-2 border-b border-black/20 flex justify-between">
            <span>// SYSTEM TOPOLOGY DIAGRAM</span>
            <span>[ARCH-02]</span>
          </div>
          <img 
            src="/images/AuctionManager/Architecture.png" 
            alt="AuctionManager Architecture Diagram" 
            className="w-full h-auto object-contain border border-black bg-white"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Core Workflows &amp; Views
        </h2>
        <p className="text-neutral-800 leading-relaxed text-base md:text-lg mb-6 font-medium">
          The frontend is structurally divided into four primary views, each tailored to a specific stage of the auction lifecycle:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">01. Pre-Auction View</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Used before the event to catalog inventory, define item numbers, and set starting amounts. Acts as the staging ground for the auction.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">02. Live Auction View</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              A streamlined, fast-response interface designed for the pace of a live event, enabling organizers to rapidly record winning bids, bidder details, and payment methods.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">03. Post-Auction View</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Facilitates the wrap-up process. Organizers review all recorded sales, confirm completed payments, and handle outstanding balances or reconciliations.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">04. Dashboard View</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              A centralized analytics hub providing a real-time overview of event performance, total revenue, and overarching statistics.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          The Solution &amp; Technical Stack
        </h2>
        <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
          <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
          <p className="text-neutral-800 leading-relaxed mb-4 mt-2 font-medium">
            Built as a full-stack web application designed for speed, transactional reliability, and ease of use:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-neutral-800 font-medium">
            <li><strong className="font-bold text-black">Frontend (Vue 3 &amp; Vite):</strong> Leveraged the Composition API and Pinia for reactive state management, ensuring the UI responds instantaneously to organizer inputs.</li>
            <li><strong className="font-bold text-black">Backend (Node.js &amp; Express):</strong> Developed a RESTful API to handle high-speed CRUD operations for auction inventory and sales records.</li>
            <li><strong className="font-bold text-black">Database (PostgreSQL &amp; Prisma):</strong> Utilized PostgreSQL for relational data storage, tracking item descriptions, starting bids, final sale prices, bidder names, ward info, and payment statuses with end-to-end Prisma type safety.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Results &amp; Impact
        </h2>
        <div className="border-l-4 border-[#FFEE00] pl-4 py-2 bg-[#FAF7E8] border-y border-r border-black p-4">
          <p className="text-neutral-800 leading-relaxed text-base md:text-lg font-medium">
            By digitizing the workflow, organizers catalog items beforehand, record sales with minimal clicks during live bidding, and immediately generate post-auction reports—guaranteeing accurate financial tracking and eliminating manual spreadsheet errors.
          </p>
        </div>
      </section>
    </>
  );
}
