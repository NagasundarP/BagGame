const proceedButton = document.getElementById("proceedButton");
const usernameInput = document.getElementById("username");

proceedButton.addEventListener("click", () => {
  const playerName = usernameInput.value.trim();
  if (playerName !== "") {
    localStorage.setItem("playerName", playerName);
    window.location.href = "game.html";
  }
  else{
    alert("Please enter a valid name");
  }
});
