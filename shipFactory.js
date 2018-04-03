const shipFactory = (type) => {
  let name = '';
  let health = 0;
  let maxHealth = 0;
  let cannons = [];
  let cannonCapacity = 0;
  let capacity = 0;

  const generateRandomNumber = (min,max) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  generateHTML = (id='') => {
    let html = `
    <div class="ship ${name.toLowerCase()}" data-shipId="${id}">
      <div class="maxHealth-bar">
      <meter value="${health}" min="0" max="${maxHealth}"></meter>
      </div>
      <div class="ship-image">
      </div>
    </div>`

    return html;
  }

  takeDamage = (amount,targetShip) => {
    health -= amount;
    let html = `<meter value="${health}" min="0" max="${maxHealth}"></meter>`;
    console.log("damage: " + amount + "health: "  + health);
    let selectedShip = $(".opponent").find(`*[data-shipid="${targetShip}"]`);
    selectedShip.find(".maxHealth-bar").html(html);
  }

  fireCannons = (targetPlayer, targetShip) => {
    let target = targetPlayer.armada[targetShip];
    for (var i = 0; i < cannons.length; i++) {
      let random = generateRandomNumber(0,100);
      if (cannons[i].accuracy > random) {
        console.log("Hit! " + random);
        target.takeDamage(cannons[i].damage,targetShip);
      }
      else {
        console.log("Miss!" + random);
      }
    }
  }

  if (type == 0) {
    name = "Dhow";
    maxHealth = generateRandomNumber(50,100);
    cannonCapacity = generateRandomNumber(1,3);
    capacity = generateRandomNumber(80,150);
  }
  if (type == 1) {
    name = "Sloop";
    maxHealth = generateRandomNumber(70,150);
    cannonCapacity = generateRandomNumber(1,3);
    capacity = generateRandomNumber(50,100);
  }
  if (type == 2) {
    name = "Schooner";
    maxHealth = generateRandomNumber(100,200);
    cannonCapacity = generateRandomNumber(2,3);
    capacity = generateRandomNumber(100,200);
  }
  if (type == 3) {
    name = "Junk";
    maxHealth = generateRandomNumber(150,220);
    cannonCapacity = generateRandomNumber(1,3);
    capacity = generateRandomNumber(100,250);
  }
  if (type == 3) {
    name = "Junk";
    maxHealth = generateRandomNumber(150,220);
    cannonCapacity = generateRandomNumber(1,3);
    capacity = generateRandomNumber(100,250);
  }
  if (type == 4) {
    name = "Carrack";
    maxHealth = generateRandomNumber(180,250);
    cannonCapacity = generateRandomNumber(1,4);
    capacity = generateRandomNumber(200-250);
  }
  if (type == 5) {
    name = "Galleon";
    maxHealth = generateRandomNumber(250,350);
    cannonCapacity = generateRandomNumber(2,4);
    capacity = generateRandomNumber(250,500);
  }
  if (type == 6) {
    name = "Frigate";
    maxHealth = generateRandomNumber(150,230);
    cannonCapacity = generateRandomNumber(3,4);
    capacity = (50,200);
  }
  if (type == 7) {
    name = "Man o' War";
    maxHealth = generateRandomNumber(300,350);
    cannonCapacity = generateRandomNumber(4,5);
    capacity = generateRandomNumber(400,500);
  }
  health = maxHealth;

  for (var i = 0; i < cannonCapacity; i++) {
    cannons.push(cannonFactory(0));
  }

  return {name, health, maxHealth, cannons, cannonCapacity, capacity, generateHTML, takeDamage, fireCannons}

}
