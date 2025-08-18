import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  // State for foods and awaited people
  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem("foods");
    if (saved) return JSON.parse(saved);
    // Initialize sample foods if none
    const initialFoods = [
      { name: "Thai Soup", price: 300, image: "soup.jpg", quantity: 1, category: "Lunch" },
      { name: "Sandwich", price: 200, image: "sandwich.jpg", quantity: 1, category: "Breakfast" }
    ];
    localStorage.setItem("foods", JSON.stringify(initialFoods));
    return initialFoods;
  });

  const [awaited, setAwaited] = useState(() => {
    const saved = localStorage.getItem("awaited");
    if (saved) return JSON.parse(saved);
    // Initialize sample awaited if none
    const initialAwaited = [
      { name: "John Doe", item: "Thai Soup" },
      { name: "Jane Smith", item: "Sandwich" }
    ];
    localStorage.setItem("awaited", JSON.stringify(initialAwaited));
    return initialAwaited;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Form refs
  const foodNameRef = useRef(null);
  const foodPriceRef = useRef(null);
  const foodQtyRef = useRef(null);
  const foodCategoryRef = useRef(null);
  const foodImageRef = useRef(null);

  // Order filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Effect to sync foods to localStorage
  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  // Effect to sync awaited to localStorage
  useEffect(() => {
    localStorage.setItem("awaited", JSON.stringify(awaited));
  }, [awaited]);

  // Effect to sync orders to localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Add new food handler
  const handleAddFood = (e) => {
    e.preventDefault();

    const name = foodNameRef.current.value.trim();
    const price = parseFloat(foodPriceRef.current.value);
    const quantity = parseInt(foodQtyRef.current.value);
    const category = foodCategoryRef.current.value;
    const file = foodImageRef.current.files[0];

    if (!name || !price || !quantity || !category || !file) {
      alert("Please fill all fields.");
      return;
    }

    // Prevent duplicate food name
    if (foods.some(f => f.name.toLowerCase() === name.toLowerCase())) {
      alert("Food with this name already exists.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const base64Image = reader.result;
      const newFood = {
        name,
        price,
        quantity,
        category,
        image: base64Image
      };
      setFoods(prev => [...prev, newFood]);
      alert("Food added successfully!");
      e.target.reset();
    };
    reader.readAsDataURL(file);
  };

  // Delete food handler
  const deleteFood = (index) => {
    if (window.confirm(`Are you sure you want to delete "${foods[index].name}"?`)) {
      setFoods(prev => {
        const newFoods = [...prev];
        newFoods.splice(index, 1);
        return newFoods;
      });
    }
  };

  // Confirm awaited person handler
  const confirmPerson = (index) => {
    alert(`${awaited[index].name}'s order confirmed.`);
    setAwaited(prev => {
      const newAwaited = [...prev];
      newAwaited.splice(index, 1);
      return newAwaited;
    });
  };

  // Filtered orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchId = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || order.status === statusFilter;
    return matchId && matchStatus;
  });

  // Update order status handler
  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  // Delete order handler
  const deleteOrder = (id) => {
    if (window.confirm(`Are you sure you want to delete order "${id}"?`)) {
      setOrders(prev => prev.filter(order => order.id !== id));
    }
  };
  const [currentUser, setCurrentUser] = useState(null);
  // Load current user from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // New state for active section in sidebar
  const [activeSection, setActiveSection] = useState("addFood");

  return (
    <>
      <nav className=" bg-[#300386] mx-auto p-4 flex justify-evenly items-center text-white">
      <h1 className="text-2xl font-bold text-yellow-300">
                Campus<span className='text-red-500'>360</span> <br />
                <hr />
                <span className="ml-5 font-bold font-normal">Solution</span>
              </h1> 
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Main Menu
            </Link>
          </li>
          <li>
            <Link to="/cafeteriapage" className="hover:text-gray-300">
              Cafeteria
            </Link>
          </li>
          <li>
            <Link to="/reservation" className="hover:text-gray-300">
              Transport
            </Link>
          </li>
          <li>
            <Link to="/reservation" className="hover:text-gray-300">
              Clubs
            </Link>
          </li>
          <li>
            <Link to="/reservation" className="hover:text-gray-300">
              Communication Hub
            </Link>
          </li>
        </ul>
        <button className="btn btn-outline glass text-white">
          <img src="/user.jpg" alt="" className="w-5 h-5 rounded-full" />
          {currentUser ? (
            <span className="ml-1 font-semibold">Admin</span>
          ) : null}
        </button>
      </nav>

      <div className="flex min-h-screen bg-[#5800ff] glass tx p-6">
        {/* Left Sidebar */}
        <div className="w-64  m bg-[#300386] text-white rounded shadow p-4 flex flex-col space-y-4 bg-[#5800ff]">
          <button
            className={`py-2 px-4 rounded text-left ${activeSection === "addFood" ? "bg-[#5800ff] text-white" : "hover:bg-[#5800ff]"
              }`}
            onClick={() => setActiveSection("addFood")}
          >
            Add New Food Item
          </button>
          <button
            className={`py-2 px-4 rounded text-left ${activeSection === "availableFood" ? "bg-[#5800ff] text-white" : "hover:bg-[#5800ff]"
              }`}
            onClick={() => setActiveSection("availableFood")}
          >
            Available Foods
          </button>
          <button
            className={`py-2 px-4 rounded text-left ${activeSection === "allOrders" ? "bg-[#5800ff] text-white" : "hover:bg-[#5800ff]"
              }`}
            onClick={() => setActiveSection("allOrders")}
          >
            All Orders
          </button>
          <button
            className={`py-2 px-4 rounded text-left ${activeSection === "weeklyMealPlan" ? "bg-[#5800ff] text-white" : "hover:bg-[#5800ff]"
              }`}
            onClick={() => setActiveSection("weeklyMealPlan")}
          >
            Weekly Meal Plan
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 ml-6 min-h-screen">
{activeSection === "addFood" && (
  <div className="flex justify-center items-center min-h-[80vh]">
    <div className="card bg-white p-8 rounded shadow-md max-w-md w-full">
      <h2 className="card-title mb-4">Add New Food Item</h2>
      <form id="addFoodForm" className="space-y-4" onSubmit={handleAddFood}>
        <div className="form-control w-full">
          <input
            type="text"
            id="foodName"
            placeholder="Food Name"
            className="input input-bordered w-full"
            ref={foodNameRef}
            required
          />
        </div>
        <div className="form-control w-full">
          <input
            type="number"
            id="foodPrice"
            placeholder="Price (Tk)"
            className="input input-bordered w-full"
            ref={foodPriceRef}
            required
          />
        </div>
        <div className="form-control w-full">
          <input
            type="number"
            id="foodQty"
            placeholder="Quantity"
            className="input input-bordered w-full"
            ref={foodQtyRef}
            required
          />
        </div>
        <div className="form-control w-full">
          <select
            id="foodCategory"
            className="select select-bordered w-full"
            ref={foodCategoryRef}
            required
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Morning Snacks">Morning Snacks</option>
            <option value="Lunch">Lunch</option>
            <option value="Evening Snacks">Evening Snacks</option>
          </select>
        </div>
        <div className="form-control w-full">
          <input
            type="file"
            id="foodImage"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            ref={foodImageRef}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Food
        </button>
      </form>
    </div>
  </div>
)}

          {activeSection === "availableFood" && (
            <div className="bg-[#5800ff] p-6 md:p-10 rounded shadow max-w-full min-h-screen   mx-auto">
              <h2 className="text-4xl text-white text-center font-semibold mb-4">Available Foods</h2>
              <div id="foodList" className="space-y-4 h-full overflow-y-auto">
                {foods.length === 0 && <p>No foods available.</p>}
                {foods.map((food, index) => (
                  <div key={index} className="border p-4 rounded shadow-sm bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={food.image} alt={food.name} className="h-20 w-20 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold text-lg">{food.name}</h3>
                        <p>Price: Tk {food.price}</p>
                        <p>Quantity: {food.quantity}</p>
                        <p>Category: {food.category}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteFood(index)} className="bg-red-500 text-white px-3 py-1 rounded self-start md:self-auto">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "allOrders" && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white text-center">All Orders</h2>

              <div className="flex flex-col md:flex-row justify-between items-center my-4 px-4  text-white gap-4">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search by Order ID..."
                  className="p-2 border rounded w-full md:w-1/2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  id="statusFilter"
                  className="p-2 border rounded w-full md:w-1/4"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div id="orderList" className="space-y-4 max-h-screen overflow-y-auto">
                {filteredOrders.length === 0 && <p className="text-gray-500 text-center">No matching orders found.</p>}
                {filteredOrders.map((order, orderIndex) => (
                  <div key={`${order.id}-${orderIndex}`} className="glass p-4 shadow-md rounded-lg bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
                      <p><strong>Order Time:</strong> {order.time}</p>
                      <p><strong>Pickup Time:</strong> {order.pickupTime}</p>
                      <p>Status: <span id={`status-${order.id}`} className="font-semibold">{order.status}</span></p>
                    </div>
                    <div>
                      <ul className="list-disc pl-6 mt-2 max-h-40 overflow-y-auto">
                        {order.items.map((item, idx) => (
                          <li key={idx}>{item.foodName} - Tk {item.price}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="mt-2 font-semibold">Total: Tk {order.total}</p>
                      <div className="mt-3 flex gap-3 flex-wrap justify-start md:justify-end">
                        <button onClick={() => updateOrderStatus(order.id, "Confirmed")} className="bg-green-500 text-white px-3 py-1 rounded flex-grow md:flex-grow-0">Confirm</button>
                        <button onClick={() => updateOrderStatus(order.id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded flex-grow md:flex-grow-0">Reject</button>
                        <button onClick={() => deleteOrder(order.id)} className="bg-gray-500 text-white px-3 py-1 rounded flex-grow md:flex-grow-0">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "weeklyMealPlan" && (
            <div className="bg-white p-4 rounded shadow max-w-full md:max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">Weekly Meal Plan</h2>
              <p>Weekly meal plan content goes here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
