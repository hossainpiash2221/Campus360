
import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Foodrequest from '../pages/FoodRequest';

export const CafeteriaPage = () => {
  // State for foods and cart
  const [allFoods, setAllFoods] = useState([]);
  const [displayedFoods, setDisplayedFoods] = useState([]);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial state setup
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pickupStatusVisible, setPickupStatusVisible] = useState(false);
  const [waitingTime, setWaitingTime] = useState(10);
  const [queueCount, setQueueCount] = useState(5);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load foods from localStorage on mount
  useEffect(() => {
    const foodsFromStorage = JSON.parse(localStorage.getItem("foods") || "[]");

    setAllFoods(foodsFromStorage);
    setDisplayedFoods(foodsFromStorage);
  }, []);

  // Load current user from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const ordersFromStorage = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(ordersFromStorage);
  }, []);

  // Filter foods by category and search query
  useEffect(() => {
    let filtered = allFoods;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (food) => food.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setDisplayedFoods(filtered);
  }, [allFoods, selectedCategory, searchQuery]);

  // Pickup queue simulation effect
  useEffect(() => {
    if (!pickupStatusVisible) return;

    let currentWaitingTime = waitingTime;
    let currentQueueCount = queueCount;

    const updateQueue = () => {
      if (currentQueueCount > 0) {
        currentQueueCount--;
        currentWaitingTime = Math.max(currentWaitingTime - 2, 0);
        setQueueCount(currentQueueCount);
        setWaitingTime(currentWaitingTime);
        setTimeout(updateQueue, 5000);
      }
    };
    updateQueue();
  }, [pickupStatusVisible]);

  // Add to cart handler
  const addToCart = (foodName, price) => {
    if (cart.find((item) => item.foodName === foodName)) {
      alert("Already in cart.");
      return;
    }
    setCart([...cart, { foodName, price }]);
  };

  // Update cart after adding/removing items
  const updateCart = () => {
    // This function is not needed explicitly since cart state drives UI
  };

  // Place order handler
  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const userOrderId = prompt("Enter your Order ID:");
    const pickupTimeInput = document.getElementById("pickupTimeInput");
    const pickupTime = pickupTimeInput ? pickupTimeInput.value : "";

    if (!userOrderId || !pickupTime) {
      alert("Please provide Order ID and Pickup Time.");
      return;
    }

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    // Check stock and update quantities
    const foodsCopy = [...allFoods];
    let outOfStock = [];

    cart.forEach((item) => {
      const foodItem = foodsCopy.find((f) => f.name === item.foodName);
      if (foodItem && foodItem.quantity > 0) {
        foodItem.quantity -= 1;
      } else {
        outOfStock.push(item.foodName);
      }
    });

    if (outOfStock.length > 0) {
      alert(`The following items are out of stock or unavailable: ${outOfStock.join(", ")}`);
      return;
    }

    // Save updated foods to localStorage and state
    localStorage.setItem("foods", JSON.stringify(foodsCopy));
    setAllFoods(foodsCopy);

    // Create order object
    const order = {
      id: userOrderId,
      time: new Date().toLocaleString(),
      pickupTime,
      items: [...cart],
      total,
      status: "Pending",
    };

    // Save order to localStorage and state
    const updatedOrders = [...orders, order];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);

    alert("Order placed successfully!");
    setCart([]);
  };

  // Filter by category handler
  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Search input handler
  const searchMenu = (e) => {
    setSearchQuery(e.target.value);
  };

  // Edit order handler (placeholder)
  const editOrder = (orderId) => {
    alert("Edit logic for Order ID: " + orderId);
    // Add update logic or modal here
  };

  // Calculate waiting minutes for orders
  const calculateWaitingMinutes = (pickupTimeStr, orderTimeStr) => {
    const now = new Date();
    const orderTime = new Date(orderTimeStr);
    const pickupTime = new Date(`${now.toDateString()} ${pickupTimeStr}`);
    const waitingMinutes = Math.max(Math.ceil((pickupTime - now) / 60000), 0);
    return waitingMinutes;
  };

  // Sort orders by pickup time
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.pickupTime) - new Date(b.pickupTime)
  );

  return (
    <>
      <div className="bg-[#5800ff] text-white glass min-h-screen">
        {/* Navbar */}
        <div className="bg-[#300386] bg-opacity-75 fixed w-full z-40 mb-12 shadow-md">
          <nav className="container mx-auto p-4 text-white flex justify-evenly items-center">
            <h1 className="text-2xl font-bold">
              Campus360 <br /> <span className="ml-3">Solution</span>
            </h1>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Main Manu
                </Link>
              </li>
              <li>
                <a href="cafeteria.html" className="hover:text-gray-300">
                  Cafeteria
                </a>
              </li>
              <li>
                <a href="trackBus.html" className="hover:text-gray-300">
                  Transport
                </a>
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
                  <span className="ml-1 font-semibold">
                    {currentUser.firstName}
                  </span>
                ) : null}

              </button>
              <div>

              </div>
            </div>
          </nav>
        </div>
        <br />
        <br />

        <div
          className="bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('bg-cafe.jpg')" }}
        >
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center text-center">
            <div className="bg-[rgba(48,3,134,0.8)] bg-opacity-75 p-10 rounded-lg text-white animate-fade-in-up">
              <h2 className="text-4xl font-bold">Food request for next week</h2>
              <p className="mt-4 text-2xl">
                Please submit your food request for next week by selecting your desired meals from our menu.
              </p>

              <button className="btn btn-primary glass mt-5"><Link to="/foodrequest">
                Get Started
              </Link></button>

            </div>
          </section>
          <style>
            {`
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }
          `}
          </style>
        </div>

        {/* Order Section */}
        <div className="container mx-auto p-10 shadow-md">
          <div className="flex items-center space-x-4 justify-between mt-12">
            <input
              id="searchInput"
              type="text"
              placeholder="Search in menu"
              className="focus:outline focus:bg-[rgba(48,3,134,0.5)] text-white border rounded-lg px-4 py-2 text-sm w-72"
              value={searchQuery}
              onChange={searchMenu}
            />

            <ul className="flex space-x-4 text-sm font-semibold">
              {["All", "Breakfast", "Morning Snaks", "Lunch", "Evening Snaks", "Food Request"].map(
                (category) => (
                  <li key={category}>
                    <button
                      className={`category-btn rounded-lg p-3 hover:outline focus:border ${selectedCategory === category ? "border border-white" : ""
                        }`}
                      data-category={category}
                      onClick={() => filterByCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex pt-20 px-6 container mx-auto">
          {/* Left Section: Food Items */}
          <div className="w-3/4 pr-4">
            <h2 className="text-2xl font-bold mb-2">🔥 Available Foods</h2>
            <p className="mb-4">Choice your desire meals</p>

            <div id="foodList" className="grid grid-cols-2 gap-4">
              {displayedFoods.map((food) => (
                <div
                  key={food.name}
                  className="bg-[#300386] p-4 shadow-md rounded-lg flex items-center space-x-4 justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{food.name}</h3>
                    <p className="text-sm">
                      from Tk <span className="text-yellow-300 font-semibold"> {food.price}</span>
                    </p>
                    <p className="text-sm">Available for {food.category}</p>
                    <p className="text-xs text-gray-500">Available: {food.quantity}</p>
                  </div>
                  <div className="flex gap-4">
                    <img src={food.image} alt={food.name} className="w-16 h-16 rounded-lg" />
                    <button
                      onClick={() => addToCart(food.name, food.price)}
                      className="bg-[#5800ff] p-2 rounded-lg text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Order Summary (Sidebar) */}
          <div className="w-1/4 bg-[#300386] text-white shadow-md p-4 rounded-lg h-[500px] overflow-y-auto my-auto">
            <h2 className="text-lg font-bold text-center">Your Cart</h2>
            <div className="flex justify-between items-center my-2">
              <button className="btn glass px-4 py-2 rounded-lg text-sm text-white">
                Standard (30 - 45 mins)
              </button>
              <button
                id="pickupBtn"
                className="btn glass px-4 py-2 rounded-lg text-sm text-white"
                onClick={() => setPickupStatusVisible(!pickupStatusVisible)}
              >
                Pick-up
              </button>
            </div>

            {/* Pick-up Status */}
            {pickupStatusVisible && (
              <div id="pickupStatus" className="p-2 rounded-md mt-2">
                <p className="text-sm font-semibold">
                  Estimated Waiting Time: <span id="waitingTime">{waitingTime}</span> mins
                </p>
                <p className="text-sm">
                  People in queue: <span id="queueCount">{queueCount}</span>
                </p>
              </div>
            )}

            <hr className="my-2" />

            {/* Cart Items */}
            <h3 className="font-semibold mb-2">Your Items</h3>
            <div id="cartItems" className="flex flex-col space-y-2">
              {cart.map((item) => (
                <div key={item.foodName} className="flex justify-between">
                  <p>{item.foodName}</p>
                  <p className="font-semibold">Tk {item.price}</p>
                </div>
              ))}
            </div>

            <hr className="my-2" />
            <h3 className="font-semibold mb-2">Popular with your order</h3>
            <div className="flex space-x-2 overflow-x-auto">
              {/* Popular items can be added here if data available */}
            </div>

            <hr className="my-2" />
            <div>
              <div className="flex justify-between p-4">
                <div>
                  <h3 className="font-semibold">Total</h3>
                  <p className="text-lg font-bold" id="totalPrice">
                    Tk {cart.reduce((acc, item) => acc + item.price, 0)}
                  </p>
                </div>
                <input
                  id="pickupTimeInput"
                  type="time"
                  className="p-2 text-gray-600 border rounded ml-2"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  onClick={placeOrder}
                  id="placeOrderBtn"
                  className="btn text-white btn-primary bg-[#1800ff] hover:bg-blue-700"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Awaited Peoples Section */}
        <h1 className="text-2xl font-bold mb-2 text-center mt-10 shadow-md container mx-auto p-4">
          Awatied Peoples
        </h1>
        <div className="w-2/4 overflow-x-auto container mx-auto h-[500px] overflow-y-auto my-auto shadow-md">
          <table className="table">
            <thead>
              <tr className="text-white bg-[#300386] bg-opacity-75 rounded-lg">
                <th></th>
                <th>Id</th>
                <th>Items</th>
                <th>Pickup time</th>
                <th>Waiting Time</th>
                <th>Status</th>
                <th>Need to Pay</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="orderTableBody" className="h-[500px] my-auto shadow-md overflow-x-auto overflow-y-auto">
              {sortedOrders.map((order, index) => {
                const waitingMinutes = calculateWaitingMinutes(order.pickupTime, order.time);
                const orderTime = new Date(order.time);
                const now = new Date();
                const timeDiffSeconds = Math.floor((now - orderTime) / 1000);
                const editable = timeDiffSeconds <= 60;

                return (
                  <tr key={`${order.id}-${index}`} className="glass rounded-lg">
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <ul>{order.id}</ul>
                      </div>
                    </td>
                    <td>
                      <ul>{order.items.map((item, idx) => <li key={`${item.foodName}-${idx}`}>{item.foodName}</li>)}</ul>
                    </td>
                    <td>{order.pickupTime}</td>
                    <td>{waitingMinutes} min</td>
                    <td>{order.status}</td>
                    <th className="flex items-center gap-2">
                      <button className="btn btn-ghost btn-xs">{order.total}/=</button>
                      {editable ? (
                        <button
                          onClick={() => editOrder(order.id)}
                          className="btn btn-sm btn-warning text-white"
                        >
                          Edit
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">Edit expired</span>
                      )}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <hr className="mt-10" />
        <section className="container mx-auto">
          <footer className="footer text-white p-10 justify-evenly">
            <nav>
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
          </footer>
          <footer className="footer border-base-300 border-t px-10 py-4">
            <aside className="grid-flow-col items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-current"
              >
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
              </svg>
              <p>
                ACME Industries Ltd.
                <br />
                Providing reliable tech since 1992
              </p>
            </aside>
            <nav className="md:place-self-center md:justify-self-end">
              <div className="grid grid-flow-col gap-4">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </nav>
          </footer>
        </section>
      </div>
      <></>
    </>
  );
};

export default CafeteriaPage;
