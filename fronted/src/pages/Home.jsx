import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import Reservation from '../components/Reservation';
import ReservationList from "../components/ReservationList";
// import AdminDashboard from "../pages/AdminDashboard";
import AdminPage from '../pages/AdminPage';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#5800ff] text-white">
        {/* Background with fixed image */}
        <div className="bg-[url('/campus360.jpg')] bg-fixed bg-cover bg-center">

          {/* Navbar */}
          <div className="bg-[#300386] bg-opacity-75 fixed w-full z-40 shadow-md">
            <nav className="container mx-auto p-4 flex justify-evenly items-center">
              <h1 className="text-2xl font-bold text-yellow-300">
                Campus<span className='text-red-500'>360</span> <br />
                <hr />
                <span className="ml-5 font-bold font-normal">Solution</span>
              </h1>
              <ul className="flex space-x-4">
                <li> <Link to="/" className="hover:text-gray-300">
                  Main Manu
                </Link></li>
                <li> <Link to="/reservation" className="hover:text-gray-300">
                Cafeteria
                </Link></li>
                <li> <Link to="/reservation" className="hover:text-gray-300">
                Transport
                </Link></li>
                <li> <Link to="/reservation" className="hover:text-gray-300">
                Clubs
                </Link></li>
                <li> <Link to="/reservation" className="hover:text-gray-300">
                Communication Hub
                </Link></li>
                {/* <li><a href="/" className="hover:text-gray-300">Main Menu</a></li>
              <li><a href="/login.html" className="hover:text-gray-300">Cafeteria</a></li>
              <li><a href="/transport" className="hover:text-gray-300">Transport</a></li>
              <li><a href="/clubs" className="hover:text-gray-300">Clubs</a></li>
              <li><a href="/communication" className="hover:text-gray-300">Communication Hub</a></li> */}
              </ul>
              <div className="flex space-x-4">
                <button></button>

                <button className='btn' onClick={() => navigate('/reservationlist')}><img className="w-6" src="/search.png" alt="search" />Login</button>
                <button className="btn btn-outline glass text-white" onClick={() => navigate('/reservation')}>Register Now</button>

              </div>
            </nav>
          </div>I

          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center text-center">
            <div className="bg-[rgba(88,0,255,.85)] bg-opacity-75 p-10 rounded-lg animate-fade-in-up">
              <h2 className="text-4xl font-bold">Welcome to Campus360</h2>
              <p className="mt-4 text-2xl">
                A platform to enhance your campus experience with easy access to cafeteria,
                transport, and club activities.
              </p>
              <a
                href="#services"
                className="mt-6 inline-block px-6 py-3 bg-[#1800ff] hover:bg-blue-700 rounded-lg text-white"
              >
                Get Started
              </a>
            </div>
          </section>
        </div>

        {/* Animation style */}
        <style>
          {`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        `}
        </style>

        {/* Our Services Section */}
        <section id="services" className="container mx-auto p-10">
          <h4 className="text-4xl font-bold text-center mb-10">Our Services</h4>
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { title: "Cafeteria", desc: "Pre-order meals, check wait times, manage food preferences.", img: "/caf.jpg" },
              { title: "Transport", desc: "Check bus seats and vote for scheduling.", img: "/transport.jpg" },
              { title: "Clubs", desc: "Get event updates and join campus club activities.", img: "/club.jpg" },
              { title: "Communication Hub", desc: "Connect with students and alumni for research and networking.", img: "/communication_hub.jpg" }
            ].map((service, i) => (
              <div key={i} className="card glass w-80">
                <figure className="h-64"><img src={service.img} alt={service.title} className="w-full h-full object-cover" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{service.title}</h2>
                  <p>{service.desc}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Facilities Section */}
        <section className="container mx-auto p-10">
          <h4 className="text-4xl font-bold text-center mb-10">Upcoming Facilities</h4>
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { title: "Student Portal", desc: "View academic records, class schedules, and assignments.", img: "/student.jpg" },
              { title: "Teachers Portal", desc: "Manage materials, track students, and communicate easily.", img: "/teacher.jpg" },
              { title: "Staff Management", desc: "Oversee administrative staff, tasks, and schedules.", img: "/staff.jpg" }
            ].map((item, i) => (
              <div key={i} className="card glass w-80">
                <figure className="h-64"><img src={item.img} alt={item.title} className="w-full h-full object-cover" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>{item.desc}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Explore</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#5800ff] p-10 text-white">
          <div className="flex flex-wrap justify-evenly">
            {[
              { title: "Services", links: ["Branding", "Design", "Marketing", "Advertisement"] },
              { title: "Company", links: ["About us", "Contact", "Jobs", "Press kit"] },
              { title: "Legal", links: ["Terms of use", "Privacy policy", "Cookie policy"] }
            ].map((section, i) => (
              <nav key={i}>
                <h6 className="footer-title">{section.title}</h6>
                {section.links.map((link, idx) => (
                  <a key={idx} className="link link-hover block">{link}</a>
                ))}
              </nav>
            ))}
          </div>
          <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm">
            © 2025 Campus360. All rights reserved.
          </div>
        </footer>
      </div>
      <Reservation />
      <ReservationList />
      <AdminPage></AdminPage>

    </>
  )
}

export default Home