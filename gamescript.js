const playerNameElement = document.getElementById("playerName");
const playerName = localStorage.getItem("playerName");
playerNameElement.textContent = playerName ? `Welcome, ${playerName}!` : "Welcome, Player";
const goBack = document.getElementById("backButton");
  goBack.addEventListener("click", () => {
      window.location.href = "index.html";
  });

const bagData = [
    { name: "Bag 1" },
    { name: "Bag 2" },
    { name: "Bag 3" },
    { name: "Bag 4" },
    { name: "Bag 5" },
    { name: "Bag 6" },
    { name: "Bag 7" },
    { name: "Bag 8" },
    { name: "Bag 9" },
    { name: "Bag 10" },
    { name: "Bag 11" },
    { name: "Bag 12" },
    { name: "Bag 13" },
    { name: "Bag 14" },
    { name: "Bag 15" },
    { name: "Bag 16" },
  ];
  
  const minValue = 500;
  const maxValue = 250000;
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  const possibleValues = Array.from(
    { length: maxValue - minValue + 1 },
    (_, index) => index + minValue
  );
  shuffleArray(possibleValues);
  
  const bagContainer = document.getElementById("bagContainer");
  const selectedBagInfo = document.getElementById("selectedBagInfo");
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content");
  const closeModal = document.querySelector(".close");


  let selectedBag = null;
  let computerSelectedBag = null;
  let gameInProgress = false;

  
  function selectRandomBag() {
    return bagData[Math.floor(Math.random() * bagData.length)];
  }
  
  function calculateDifference(value1, value2) {
    return Math.abs(value1 - value2);
  }
  

  function checkSelectedBag(bag) {
    randomBag = selectRandomBag();
    secondRandomBag = selectRandomBag();
    const randomBagString = JSON.stringify(randomBag);
    const secondBagString = JSON.stringify(secondRandomBag);
    const originalBagString = JSON.stringify(bag);

    // Construct the URL with query parameters
    const url = `selectbag.html?secondRandombag=${encodeURIComponent(secondBagString)}&randomBag=${encodeURIComponent(randomBagString)}&originalBag=${encodeURIComponent(originalBagString)}`;

    // Redirect to the new page
    window.location.href = url;
    }

  bagData.forEach((bag, index) => {

    bag.value = possibleValues[index];
  
    const bagElement = document.createElement("div");
    bagElement.classList.add("bag");
  
    const bagName = document.createElement("p");
    bagName.textContent = bag.name;
    bagName.classList.add("bagName");

  
    const bagValue = document.createElement("p");
    // bagValue.textContent = `$${bag.value}`;
  
    bagElement.appendChild(bagName);
    bagElement.appendChild(bagValue);
  
    bagContainer.appendChild(bagElement);
  
    bagElement.addEventListener("click", () => {
      if (gameInProgress && !selectedBag) {
        selectedBag =  checkSelectedBag(bag);
      }
    });
  });
  
  window.addEventListener("load", () => {
    selectedBagInfo.textContent = `You started the game. Choose a bag to continue.`;
    startButton.style.display = "none";
    gameInProgress = true;
    bagContainer.classList.remove("disabled");
    shuffleArray(possibleValues);
  
  });
