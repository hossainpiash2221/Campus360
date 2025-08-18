import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  return (
    <div className="bg-[#300386] bg-opacity-75 fixed w-full z-40 mb-12 shadow-md">
      <nav className="container mx-auto p-4 text-white flex justify-evenly items-center">
        <h1 className="text-2xl font-bold">
          Campus360 <br /> <span className="ml-3">Solution</span>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Main Menu
            </Link>
          </li>
          <li>
            <Link to="/cafeteria" className="hover:text-gray-300">
              Cafeteria
            </Link>
          </li>
          <li>
            <Link to="/trackBus" className="hover:text-gray-300">
              Transport
            </Link>
          </li>
          <li>
            <a href="#clubs" className="hover:text-gray-300">
              Clubs
            </a>
          </li>
          <li>
            <a href="#communication" className="hover:text-gray-300">
              Communication Hub
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          <button className="btn btn-outline glass text-white">
            <img src="./public/user.jpg" alt="" className="w-5 h-5 rounded-full" />
            {currentUser ? (
              <span className="ml-1 font-semibold">{currentUser.firstName}</span>
            ) : (
              "Register Now"
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
