import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// DB Variables
const appSettings = {
  databaseURL: "YOUR DATABASE URL"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDatabase = ref(database, "shoppingList");

// On DB Update
onValue(shoppingListInDatabase, function(snapshot) {
  if (!snapshot.exists()) {
    shoppingListEl.innerHTML = "No items here... yet";
    shoppingListEl.style.fontSize = "20px";
    return;
  }
  let shoppingListArray = Object.entries(snapshot.val());

  shoppingListEl.innerHTML = "";

  for (let i = 0; i < shoppingListArray.length; i++) {
    let currentItem = shoppingListArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];
    addItemToShoppingList(currentItem);
  }
})

// HTML Variables
const addButtonEl = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");


// On button click
addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value;
  if (inputValue === "") {
    alert("You must write something");
    return;
  }
  console.log(inputValue);
  addItemToShoppingList(inputValue);
  addItemToDatabase(inputValue);
  inputFieldEl.value = "";
});

// On Item click


function addItemToDatabase(item) {
  push(shoppingListInDatabase, item);
}

function addItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  

  let newEl = document.createElement("li");

  
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function() {
    let exactLocationOfItemInDatabase = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDatabase);
   
  }
  )
  shoppingListEl.append(newEl);
  
}
