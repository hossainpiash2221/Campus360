import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",
        {
          firstName,
          lastName,
          email,
          phone,
          date,
          time,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Reservation successful!");

      // Reset form
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setTime("");
      setDate("");

      navigate("/success");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!"
      );
    }
  };

  return (
    <section className="  bg-red-200" id="reservation">
      
     
        <div className=" min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"   style={{ backgroundImage: "url('bg-cafe.jpg')" }}>
          <div className="w-full max-w-xl bg-[#300386] text-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Registration</h1>

            <form onSubmit={handleReservation} className="space-y-6">
              {/* Name & ID */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="ID"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Password & Occupation */}
              <div className="flex flex-col md:flex-row gap-4 ">
              
                  <input
                    type="password"
                    placeholder="Password"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {/* <span
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Password"]');
                      if (input.type === 'password') input.type = 'text';
                      else input.type = 'password';
                    }}
                    className="absolute right-3 top-3 text-lg cursor-pointer"
                    title="Show/Hide Password"
                  >
                    👁️
                  </span> */}
               
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                 className="flex-1 p-3 border bg-[#300386] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Occupation
                  </option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Staff">Staff</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button
                  type="submit"
                  className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center gap-2"
                >
                  Register Now <HiOutlineArrowNarrowRight />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/reservationlist')}
                  className="w-full md:w-1/2 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Go for Login
                </button>
              </div>
            </form>
          </div>
        </div>
     
    </section>
  );
};

export default Reservation;
