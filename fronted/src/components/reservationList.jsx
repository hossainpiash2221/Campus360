// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ReservationList = () => {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     // Fetch reservations when the component mounts
//     axios.get("http://localhost:4000/api/v1/reservation")
//       .then((res) => {
//         setReservations(res.data);  // Set reservations to state
//       })
//       .catch((err) => {
//         console.error("Error fetching reservations", err);
//       });
//   }, []);

//   return (
//     <div className="reservations-list">
//       <h2>All Reservations</h2>
//       {reservations.length > 0 ? (
//         <ul>
//           {reservations.map((reservation) => (
//             <li key={reservation._id} className="reservation-item">
//               <p><strong>{reservation.firstName} {reservation.lastName}</strong></p>
//               <p>Date: {reservation.date} at {reservation.time}</p>
//               <p>Email: {reservation.email}</p>
//               <p>Phone: {reservation.phone}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No reservations available.</p>
//       )}
//     </div>
//   );
// };

// export default ReservationList;


import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import React Router's useNavigate
import toast from "react-hot-toast";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('student'); // New state for occupation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch reservations when the component mounts
    axios.get("http://localhost:4000/api/v1/reservation")
      .then((res) => {
        setReservations(res.data);  // Set reservations to state
      })
      .catch((err) => {
        console.error("Error fetching reservations", err);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if login credentials match any reservation data
    const matchedReservation = reservations.find(
      (reservation) =>
        reservation.firstName === firstName && reservation.date === lastName
    );

    if (matchedReservation) {
      setIsLoggedIn(true); // Mark the user as logged in
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(matchedReservation)); // Save current user to localStorage
      if (occupation === 'staff') {
        navigate('/adminpage'); // Redirect to registration page
      } else {
        navigate('/success'); // Redirect to success page
      }

    } else {
      alert('Invalid login credentials.');
    }
  };

  return (
    <section>
      <div className="reservation-list  bg-red-200 ">
        {!isLoggedIn ? (
          <div className=" min-h-screen flex items-center justify-center bg-[url('/campus360.jpg')] bg-fixed bg-cover bg-center  "  >

            <div className="min-h-screen flex items-center justify-center ">
              <div className="w-full max-w-md text-white p-8 rounded-2xl shadow-lg bg-[#300386]">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Username */}
                  <div>
                    {/* <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">User Name</label> */}
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      placeholder='User Name'
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Occupation dropdown */}
                  <div className="mt-4">
                    <select
                      id="occupation"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="student">Student</option>
                      <option value="staff">Staff</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>

                  {/* ID (Password with toggle) */}
                  <div className="relative">
                    {/* <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">ID</label> */}
                    <input
                      type="password"
                      id="lastName"
                      value={lastName}
                      placeholder='Password'
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <span
                      onClick={() => {
                        const input = document.getElementById('lastName');
                        input.type = input.type === 'password' ? 'text' : 'password';
                      }}
                      className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                      title="Show/Hide Password"
                    >
                      👁️
                    </span> */}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/reservation')}
                      className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Go for Registration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2>All Reservations</h2>
            {reservations.length > 0 ? (
              <ul>
                {reservations.map((reservation) => (
                  <li key={reservation._id} className="reservation-item">
                    <p><strong>{reservation.firstName} {reservation.lastName}</strong></p>
                    <p>Date: {reservation.date} at {reservation.time}</p>
                    <p>Email: {reservation.email}</p>
                    <p>Phone: {reservation.phone}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reservations available.</p>
            )}
            <button onClick={() => navigate('/reservation')}>Go to Reservation Details</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationList;
