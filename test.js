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
  const startButton = document.getElementById("startButton");
  const selectedBagInfo = document.getElementById("selectedBagInfo");
  const restartButton = document.getElementById("restartButton");
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content");
  const closeModal = document.querySelector(".close");
  const selectedBagOption = document.getElementById("selectedBagOption");
  const randomBagOption = document.getElementById("randomBagOption");
  
  let selectedBag = null;
  let computerSelectedBag = null;
  let gameInProgress = false;
  
  // ... (rest of the code, including selectRandomBag and calculateDifference functions)
  function selectRandomBag() {
    return bagData[Math.floor(Math.random() * bagData.length)];
  }
  
  function calculateDifference(value1, value2) {
    return Math.abs(value1 - value2);
  }

  function navPage() {
    setTimeout(function(){ window.location.href = "win.html"; }, 1500);
    }
  function showRandomBagAndDifference() {
    computerSelectedBag = selectRandomBag();
    selectedBagInfo.textContent = `Your bag ${selectedBag.name} with value ${selectedBag.value} and Random selected bag: ${computerSelectedBag.name} with a value of $${computerSelectedBag.value}.`;
  
    const userDifference = calculateDifference(
      selectedBag.value,
      computerSelectedBag.value
    );
    selectedBagInfo.textContent += ` Your difference is $${userDifference}.`;
    if (selectedBag.value > computerSelectedBag.value) {
      selectedBagInfo.textContent += " You win!";
      navPage()  
      
    } else {
      selectedBagInfo.textContent += " You lose!";
    }
  
    restartButton.style.display = "block";

  }
  function showModalWithOptions() {
    modal.style.display = "block";
  
    selectedBagOption.addEventListener("click", () => {
      selectedBag = bag;
      closeModalListener();
      setTimeout(() => {
        showRandomBagAndDifference();
      }, 1000);
    });
  
    randomBagOption.addEventListener("click", () => {
      selectedBag = randomBag;
      closeModalListener();
      setTimeout(() => {
        showRandomBagAndDifference();
      }, 1000);
    });
  }
  
  function checkSelectedBag(bag) {
    randomBag = selectRandomBag();
    showModalWithOptions();
  }
  
  function closeModalListener() {
    modal.style.display = "none";
    selectedBagOption.removeEventListener("click", closeModalListener);
    randomBagOption.removeEventListener("click", closeModalListener);
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
        selectedBagInfo.textContent = `You selected bag: ${selectedBag.name}.`;

        setTimeout(() => {
          showRandomBagAndDifference();
        }, 1000);
      }
    });
  });
  
  // ... (rest of the code, including bagData forEach loop)
  
  startButton.addEventListener("click", () => {
    selectedBagInfo.textContent = `You started the game. Choose a bag to continue.`;
    startButton.style.display = "none";
    gameInProgress = true;
    bagContainer.classList.remove("disabled");
  });
  
  restartButton.addEventListener("click", () => {
    selectedBagInfo.textContent = `You restarted the game. Choose a bag to continue.`;
    restartButton.style.display = "none";
    gameInProgress = true;
  
    shuffleArray(possibleValues);
  
    // Reset bag values based on new possibleValues
    bagData.forEach((bag, index) => {
      bag.value = possibleValues[index];
      const bagValueElement =
        bagContainer.children[index].querySelector("p:nth-child(2)");
    });
  
    // Clear selected bag and reset game status
    selectedBag = null;
  });
  
  // Initialize game
  const playerNameElement = document.getElementById("playerName");
  const playerName = localStorage.getItem("playerName");
  playerNameElement.textContent = playerName ? `Welcome, ${playerName}!` : "Welcome, Player";
  const goBack = document.getElementById("backButton");
  goBack.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  
  // Initialize game
  initializeGame();
  