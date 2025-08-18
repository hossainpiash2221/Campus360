// ----- Initialize sample food and awaited people if not set -----
// if (!localStorage.getItem('foods')) {
//     localStorage.setItem('foods', JSON.stringify([
//       { name: "Thai Soup", price: 300, image: "soup.jpg" },
//       { name: "Sandwich", price: 200, image: "sandwitch.jpg" }
//     ]));
//   }
//   if (!localStorage.getItem('awaited')) {
//     localStorage.setItem('awaited', JSON.stringify([
//       { name: "John Doe", item: "Thai Soup" },
//       { name: "Jane Smith", item: "Sandwich" }
//     ]));
//   }
  
  const foodList = document.getElementById("foodList");
  const awaitedList = document.getElementById("awaitedList");
  
  function loadFoods() {
    const foodList = document.getElementById("foodList");
    foodList.innerHTML = "";
    const foods = JSON.parse(localStorage.getItem("foods") || "[]");
  
    foods.forEach((food, index) => {
      const card = document.createElement("div");
      card.className = "border p-4 rounded shadow-sm bg-white";
  
      card.innerHTML = `
        <h3 class="font-semibold text-lg">${food.name}</h3>
        <img src="${food.image}" alt="${food.name}" class="h-32 w-full object-cover rounded mb-2">
        <p>Price: Tk ${food.price}</p>
        <p>Quantity: ${food.quantity}</p>
        <p>Category: ${food.category}</p>
        <button onclick="deleteFood(${index})" class="mt-2 bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      `;
  
      foodList.appendChild(card);
    });
  }
  
  
  function loadAwaited() {
    awaitedList.innerHTML = "";
    const awaited = JSON.parse(localStorage.getItem("awaited") || "[]");
    awaited.forEach((person, index) => {
      const div = document.createElement("div");
      div.className = "border p-4 rounded flex justify-between items-center";
      div.innerHTML = `
        <div>
          <strong>${person.name}</strong> - waiting for <em>${person.item}</em>
        </div>
        <button onclick="confirmPerson(${index})" class="bg-blue-500 text-white px-3 py-1 rounded">Confirm</button>`;
      awaitedList.appendChild(div);
    });
  }
  
  document.getElementById("addFoodForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("foodName").value.trim();
    const price = parseFloat(document.getElementById("foodPrice").value);
    const quantity = parseInt(document.getElementById("foodQty").value);
    const category = document.getElementById("foodCategory").value;
    const imageInput = document.getElementById("foodImage");
    const file = imageInput.files[0];
  
    if (!name || !price || !quantity || !category || !file) {
      alert("Please fill all fields.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function () {
      const base64Image = reader.result;
      const foodData = {
        name,
        price,
        quantity,
        category,
        image: base64Image  // saving as base64
      };
  
      const foods = JSON.parse(localStorage.getItem("foods") || "[]");
  
      // Prevent duplicate food name
      if (foods.some(f => f.name.toLowerCase() === name.toLowerCase())) {
        alert("Food with this name already exists.");
        return;
      }
  
      foods.push(foodData);
      localStorage.setItem("foods", JSON.stringify(foods));
  
      alert("Food added successfully!");
      this.reset();
      loadFoods();
    };
    reader.readAsDataURL(file); // convert image to base64
  });
  
  
  function deleteFood(index) {
    const foods = JSON.parse(localStorage.getItem("foods") || "[]");
    foods.splice(index, 1);
    localStorage.setItem("foods", JSON.stringify(foods));
    loadFoods();
  }
  
  function editFood(index) {
    const foods = JSON.parse(localStorage.getItem("foods") || "[]");
    const food = foods[index];
    const newName = prompt("Edit food name:", food.name);
    const newPrice = prompt("Edit food price:", food.price);
    const newImage = prompt("Edit image path:", food.image);
    if (newName && newPrice && newImage) {
      foods[index] = { name: newName, price: parseFloat(newPrice), image: newImage };
      localStorage.setItem("foods", JSON.stringify(foods));
      loadFoods();
    }
  }
  
  function confirmPerson(index) {
    const awaited = JSON.parse(localStorage.getItem("awaited") || "[]");
    alert(`${awaited[index].name}'s order confirmed.`);
    awaited.splice(index, 1);
    localStorage.setItem("awaited", JSON.stringify(awaited));
    loadAwaited();
  }
  
  // Initial Load
  loadFoods();
  loadAwaited();
  