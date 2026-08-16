import React from 'react';
import { Layers, Cpu } from 'lucide-react';
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

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Project Overview
        </h2>
        <p className="text-zinc-400 leading-relaxed text-lg">
          AuctionManager has the name suggests is an end-to-end solution for organizing and managing live auctions. The idea came up when we needed to conduct auctions in our church and we didn't had a proper Auction Manager system. It addresses the workflow of an auction event in three distinct phases: Pre-Auction, Live Auction, and Post-Auction. The platform allows organizers to maintain an inventory of items, quickly record fast-paced bids and sales during the live event, and analyze performance and payments post-event via a centralized dashboard. 
        </p>
      </section>

      

      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 mt-16">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Project Structure & Architecture
        </h2>

        <div className="w-full flex justify-center mb-12 bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
          <img 
            src="/images/AuctionManager/Architecture.png" 
            alt="AuctionManager Architecture Diagram" 
            className="w-full h-auto object-contain rounded-lg shadow-lg"
          />
        </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Core Workflows & Views
        </h2>
        <div className="text-zinc-400 leading-relaxed text-lg space-y-4">
          <p>
            The frontend is structurally divided into four primary views, each tailored to a specific stage of the auction lifecycle:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Pre-Auction View:</strong> Used before the event to catalog the inventory, define item numbers, and set starting amounts. It acts as the staging ground for the auction.</li>
            <li><strong>Live Auction View:</strong> A streamlined, fast-response interface designed for the chaos of the live event. It enables the organizer to rapidly record winning bids, the bidder's name and ward, and their chosen payment method without missing a beat.</li>
            <li><strong>Post-Auction View:</strong> Facilitates the wrap-up process. Organizers use this view to review all recorded sales, confirm which items have been paid for, and handle any outstanding balances or data corrections.</li>
            <li><strong>Dashboard View:</strong> A centralized analytics hub that provides a high-level overview of the event's performance, total revenue, and overarching statistics.</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          The Solution & Architecture
        </h2>
        <div className="text-zinc-400 leading-relaxed text-lg space-y-4">
          <p>
            I built a robust full-stack web application designed for speed, reliability, and ease of use.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Frontend (Vue 3 & Vite):</strong> Leveraged the Composition API and Pinia for reactive state management, ensuring the UI responds instantly to organizer inputs. Tailwind CSS was used to create a clean, modern, and accessible interface with specialized views for each auction phase (Pre-Auction, Live Auction, Post-Auction, and Dashboard).</li>
            <li><strong>Backend (Node.js & Express):</strong> Developed a RESTful API to handle CRUD operations for auction inventory and sales records seamlessly.</li>
            <li><strong>Database (PostgreSQL & Prisma):</strong> Utilized PostgreSQL for reliable relational data storage, tracking everything from item descriptions and starting bids to final sale prices, bidder names, ward information, and payment methods. Prisma ORM was integrated to provide end-to-end type safety and smooth database migrations.</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          The Challenge
        </h2>
        <p className="text-zinc-400 leading-relaxed text-lg">
          Organizing a live auction involves handling large volumes of items and maintaining precise records of sales, bidders, and payment statuses in a high-stress, fast-paced environment. Traditional paper-based or basic spreadsheet methods often lead to human errors, lost data, and difficulties in calculating total revenue or tracking unpaid items after the event concludes. The system needed to be highly responsive to keep up with the auctioneer's pace while ensuring transactional reliability.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Results & Impact
        </h2>
        <p className="text-zinc-400 leading-relaxed text-lg">
          The resulting application dramatically streamlines the auction management process. By digitizing the workflow, organizers can catalog items beforehand, record sales with minimal clicks during the chaos of the live event, and instantly generate post-auction reports. This guarantees accurate financial tracking, reduces administrative overhead, and ensures a transparent and smooth experience for both organizers and bidders.
        </p>
      </section>
    </>
  );
}
