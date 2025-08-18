import React, { useState, useEffect } from "react";

// Constants
const DAYS_OF_WEEK = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const MEAL_CATEGORIES = [
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Morning Snacks", value: "Morning Snacks" },
  { label: "Evening Snacks", value: "Evening Snacks" },
];

const DEFAULT_FOODS = [
  { name: "Poratha 1 pcs", price: 10, image: "Paratha_with_lentil.jpg" },
  { name: "Noodles", price: 50, image: "noodles.jpg" },
  { name: "Fried Rice", price: 120, image: "fried rice.jpg" },
  { name: "Khichuri", price: 90, image: "khichuri.jpg" },
  { name: "Sandwitch", price: 10, image: "sandwitch.jpg" },
];

// Helper functions
const loadFromLocalStorage = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) ? parsed.length > 0 : Object.keys(parsed).length > 0) {
        return parsed;
      }
    } catch {
      // ignore parse error
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

const Navbar = ({ currentUser }) => (
  <div className="bg-[#300386] bg-opacity-75 fixed w-full z-40 mb-12 shadow-md">
    <nav className="container mx-auto p-4 text-white flex justify-evenly items-center">
    <h1 className="text-2xl font-bold text-yellow-300">
                Campus<span className='text-red-500'>360</span> <br />
                <hr />
                <span className="ml-5 font-bold font-normal">Solution</span>
              </h1> 
      <ul className="flex space-x-4">
        <li><a href="/" className="hover:text-gray-300">Main Menu</a></li>
        <li><a href="/cafeteria" className="hover:text-gray-300">Cafeteria</a></li>
        <li><a href="/trackBus" className="hover:text-gray-300">Transport</a></li>
        <li><a href="#clubs" className="hover:text-gray-300">Clubs</a></li>
        <li><a href="#communication" className="hover:text-gray-300">Communication Hub</a></li>
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

const FoodItemRow = ({ item, index, onCheckboxChange, onQuantityChange }) => {
  return (
    <tr className="hover:glass">
      <td>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onCheckboxChange(index)}
          style={{ width: "20px", height: "20px" }}
        />
      </td>
      <td>
        <div className="flex items-center gap-3">
          {item.image && (
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={item.image} alt={item.foodName} className="object-cover" />
              </div>
            </div>
          )}
          <div className="font-bold">{item.foodName}</div>
        </div>
      </td>
      <td>{item.price} TK</td>
      <td className="text-white">
          <select
            value={item.quantity}
            onChange={(e) => onQuantityChange(index, parseInt(e.target.value))}
            style={{ padding: "4px", borderRadius: "4px" }}
          >
            {[1, 2, 3, 4].map((qty) => (
              <option key={qty} value={qty}>{qty}</option>
            ))}
          </select>
      </td>
      <td>{item.checked ? item.price * item.quantity : 0} TK</td>
    </tr>
  );
};

const WeeklyMealPlanTable = ({ weeklyMealPlan }) => {

  // console.log(weeklyMealPlan);
  // Helper to calculate daily bill
  const calculateDailyBill = (day) => {
    if (!weeklyMealPlan[day]) return 0;
    let total = 0;
    for (const meal of MEAL_CATEGORIES) {
      const items = weeklyMealPlan[day][meal.value];
      if (items && Array.isArray(items)) {
        for (const item of items) {
          total += item.price * item.quantity;
        }
      }
    }
    return total;
  };

  // // Helper to get status from localStorage
  // const getStatus = (day) => {
  //   const status = localStorage.getItem(`mealStatus-${day}`);
  //   return status ? status : "Unpaid";
  // };

  return (
    <table className="table text-white container mx-auto shadow-md bg-[#300386] bg-opacity-25 w-full">
      <thead className="text-white bg-[#300386]">
        <tr className="text-xl glass">
          <th>Day</th>
          {MEAL_CATEGORIES.map((meal) => (
            <th key={meal.value}>{meal.label}</th>
          ))}
          <th>Daily Bill</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="">
        {DAYS_OF_WEEK.map((day) => (
          <React.Fragment key={day}>
            <tr className="hover:glass">
              <th className="glass bg-[#300386] bg-opacity-50">{day}</th>
              {MEAL_CATEGORIES.map((meal) => (
                <td key={meal.value} className="text-left">
                  {weeklyMealPlan[day] && weeklyMealPlan[day][meal.value] && Array.isArray(weeklyMealPlan[day][meal.value]) ? (
                    <ul className="list-disc list-inside">
                      {weeklyMealPlan[day][meal.value].map((item, idx) => (
                        <li key={idx}>
                          {item.foodName} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
                </td>
              ))}
              <td>{calculateDailyBill(day)} TK</td>
              <td>{weeklyMealPlan[day] && weeklyMealPlan[day].status ? weeklyMealPlan[day].status : "Unpaid"}</td>
            </tr>
            <tr>
              <th className="glass bg-[#300386] bg-opacity-25 text-sm italic">Pickup Time</th>
              {MEAL_CATEGORIES.map((meal) => (
                <td key={meal.value} className="text-left text-sm italic">
                  {weeklyMealPlan[day] && weeklyMealPlan[day].pickupTimes && weeklyMealPlan[day].pickupTimes[meal.value]
                    ? weeklyMealPlan[day].pickupTimes[meal.value]
                    : "-"}
                </td>
              ))}
              <td colSpan="2"></td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

const FoodRequest = () => {
  // State management
  const [foods, setFoods] = useState(() => loadFromLocalStorage("foods", DEFAULT_FOODS));
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [selectedMealCategory, setSelectedMealCategory] = useState("Breakfast");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(() => 
    loadFromLocalStorage("weeklyMealPlan", {})
  );
  const [waitTime, setWaitTime] = useState(0);

  // New state for pickup times per meal category
  const [pickupTimes, setPickupTimes] = useState(() => {
    // Try to load from weeklyMealPlan for selectedDay if exists
    const plan = loadFromLocalStorage("weeklyMealPlan", {});
    if (plan[selectedDay] && plan[selectedDay].pickupTimes) {
      return plan[selectedDay].pickupTimes;
    }
    // Default pickup times object
    return {};
  });
  
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  // Effects
  useEffect(() => {
    // Initialize selected items from foods
    setSelectedItems(
      foods.map((food) => ({
        foodName: food.name,
        price: food.price,
        quantity: 1,
        checked: false,
        image: food.image || "",
      }))
    );
  }, [foods]);

  useEffect(() => {
    // Update wait time every 5 seconds
    const updateWaitTime = () => {
      const randomTime = Math.floor(Math.random() * 10) + 5;
      setWaitTime(randomTime);
    };
    updateWaitTime();
    const intervalId = setInterval(updateWaitTime, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Update pickupTimes when selectedDay or selectedMealCategory changes
  useEffect(() => {
    const plan = loadFromLocalStorage("weeklyMealPlan", {});
    if (plan[selectedDay] && plan[selectedDay].pickupTimes) {
      setPickupTimes(plan[selectedDay].pickupTimes);
    } else {
      setPickupTimes({});
    }
  }, [selectedDay]);

  // Handlers
  const handleCheckboxChange = (index) => {
    setSelectedItems((prev) => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], checked: !newItems[index].checked };
      return newItems;
    });
  };

  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return;
    setSelectedItems((prev) => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], quantity: newQty };
      return newItems;
    });
  };

  // New handler for pickup time change per meal category
  const handlePickupTimeChange = (e) => {
    const newTime = e.target.value;
    setPickupTimes((prev) => ({
      ...prev,
      [selectedMealCategory]: newTime,
    }));
  };

  const handlePayment = () => {
    const selectedItemsForMeal = selectedItems.filter((item) => item.checked);

    if (selectedItemsForMeal.length === 0) {
      alert("Please select at least one food item before payment.");
      return;
    }

    // Check if selectedDay is paid, prevent changes
    const currentStatus = localStorage.getItem(`mealStatus-${selectedDay}`);
    if (currentStatus === "Paid") {
      alert(`Cannot change items for ${selectedDay} as it is already paid.`);
      return;
    }

    setWeeklyMealPlan((prevPlan) => {
      const newPlan = { ...prevPlan };
      if (!newPlan[selectedDay]) {
        newPlan[selectedDay] = {};
      }
      // Store array of objects with foodName, quantity, price
      newPlan[selectedDay][selectedMealCategory] = selectedItemsForMeal.map(item => ({
        foodName: item.foodName,
        quantity: item.quantity,
        price: item.price,
      }));
      // Store pickup times object for the day
      newPlan[selectedDay].pickupTimes = {
        ...newPlan[selectedDay].pickupTimes,
        [selectedMealCategory]: pickupTimes[selectedMealCategory] || "",
      };
      // Add current user name as unique id for admin recognition
      newPlan[selectedDay].userName = currentUser ? currentUser.firstName : "Guest";

      // Add status for admin recognition, default to "Unpaid"
      if (!newPlan[selectedDay].status) {
        newPlan[selectedDay].status = "Unpaid";
      }

      console.log("Updated weeklyMealPlan:", newPlan);

      localStorage.setItem("weeklyMealPlan", JSON.stringify(newPlan));

      // Also store each day's info separately for other pages
      Object.entries(newPlan).forEach(([day, meals]) => {
        localStorage.setItem(`mealPlan-${day}`, JSON.stringify(meals));
      });

      return newPlan;
    });

    alert("Payment completed and weekly meal plan updated!");
    setSelectedItems((prev) =>
      prev.map((item) => ({ ...item, checked: false, quantity: 1 }))
    );
  };

  // Derived values
  const totalBill = selectedItems.reduce((acc, item) => {
    return item.checked ? acc + item.price * item.quantity : acc;
  }, 0);

  // Pickup time options based on meal category
  const pickupTimeOptions = selectedMealCategory === "Breakfast"
    ? ["7:45", "8:00", "8:15"]
    : (selectedMealCategory === "Lunch" || selectedMealCategory === "Morning Snacks" || selectedMealCategory === "Evening Snacks")
    ? ["1:00 pm", "1:30 pm"]
    : [];

  return (
    <div className="bg-[#5800ff] text-white min-h-screen  glass">
      <Navbar currentUser={currentUser} />
      
      <br /><br />

      <div className="bg-fixed bg-cover bg-center p-6 rounded-lg">
        {/* Cafeteria status */}
        <div className="text-center mb-4 text-lg font-semibold" id="cafeteria-status">
          Estimated wait time: {waitTime} mins
        </div>

        {/* Main menu section */}
        <section className="flex flex-col items-center justify-center">
          <div className="bg-[#300386]  p-10 w-full max-w-3xl rounded-lg text-white gl">
            <h2 className="text-2xl font-bold mb-4 text-center">Cafeteria Menu</h2>

            
            <div className="flex items-center justify-center mb-4 gap-4">
            <label className="block font-semibold mb-2">Select Day:</label>
              <select
                id="day"
                className="w-2/4 p-2 border rounded text-white bg-[#300386]"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                disabled={localStorage.getItem(`mealStatus-${selectedDay}`) === "Paid"}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              {/* Pickup time dropdown */}
              <select
                id="pickupTime"
                className="w-1/4 p-2 border rounded text-white bg-[#300386]"
                value={pickupTimes[selectedMealCategory] || ""}
                onChange={handlePickupTimeChange}
                disabled={localStorage.getItem(`mealStatus-${selectedDay}`) === "Paid" || pickupTimeOptions.length === 0}
              >
                {pickupTimeOptions.length > 0 ? (
                  pickupTimeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))
                ) : (
                  <option value="">Select pickup time</option>
                )}
              </select>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Choose your desired Meals</h2>

            {/* Meal category selection */}
            <div className="flex justify-between items-center shadow-md p-5 glass bg-[#300386] bg-opacity-50 rounded mb-4">
              {MEAL_CATEGORIES.map((meal) => (
                <div key={meal.value} className="flex gap-3 items-center">
                  <p>{meal.label}</p>
                  <input
                    type="radio"
                    name="mealCategory"
                    className="radio radio-info"
                    value={meal.value}
                    checked={selectedMealCategory === meal.value}
                    onChange={(e) => setSelectedMealCategory(e.target.value)}
                    disabled={localStorage.getItem(`mealStatus-${selectedDay}`) === "Paid"}
                  />
                </div>
              ))}
            </div>

            {/* Food items table */}
            <div className="mb-4 h-[300px] overflow-y-auto my-auto rounded bg-[#300386] glass bg-opacity-25">
              <div className="overflow-x-auto">
                <table className="table text-white w-full">
                  <thead>
                    <tr className="text-white shadow">
                      <th></th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item, index) => (
                      <FoodItemRow
                        key={index}
                        item={item}
                        index={index}
                        onCheckboxChange={handleCheckboxChange}
                        onQuantityChange={handleQuantityChange}
                        disabled={localStorage.getItem(`mealStatus-${selectedDay}`) === "Paid"}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment section */}
            <div className="text-lg font-semibold">
              Total Bill: <span id="total">{totalBill}</span> Tk
            </div>
            <div className="mt-4">
              {/* <p>Have to pay: <span id="pay">{totalBill / 2}</span> Tk</p> */}
              <button
                className="bg-primary cursor  text-white px-4 py-2 rounded mt-2 hover:glass "
                onClick={handlePayment}
                disabled={localStorage.getItem(`mealStatus-${selectedDay}`) === "Paid"}
              >
                Add Items
              </button>
            </div>
          </div>
        </section>

        {/* Weekly meal plan */}
        <div className="mt-10 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Weekly Meal Plan</h2>
          <WeeklyMealPlanTable weeklyMealPlan={weeklyMealPlan} />
        </div>
      </div>
    </div>
  );
};

export default FoodRequest;
