const shipFactory = (type,owner) => {
  let name = '';
  let health = 0;
  let maxHealth = 0;
  let cannons = [];
  let cannonCapacity = 0;
  let capacity = 0;
  let cannonAudio = new Audio("./cannon.wav");

  const generateRandomNumber = (min,max) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }
  calculateTotalDamage = () => {
    let total = 0;
    for (var i = 0; i < cannons.length; i++) {
      total += cannons[i].damage;
    }
    return total;
  }


  generateHTML = (id) => {
    let cannonHTML = '';

    for (var i = 0; i < cannons.length; i++) {
      cannonHTML += `<span class='projectile ${i}'></span>`;
    }

    let html = `
    <div class="ship ${name.toLowerCase()}" data-shipId="${id}">
      <div class="cannonballs">
      ${cannonHTML}
      </div>
      <p>${name}</p>
      <div class="maxHealth-bar">
      <p>${health}/${maxHealth}</p>
      <meter value="${health}" min="0" max="${maxHealth}"></meter>
      </div>
      <div class="ship-image">
      </div>
    </div>`

    return html;
  }

  takeDamage = (amount,id, targetPlayer,e) => {
    const checkForCannonBreak = () => {
      if (generateRandomNumber(0,100) <= 1) {
        let num = generateRandomNumber(0,cannons.length-1);
        console.log("CANNON BREAK!");
        $(".infotext").addClass("cannonbreak");
        setTimeout(function(){
          $(".infotext").removeClass("cannonbreak");
        },2000)
        if (cannons.length != 0) {
          cannons.splice(num,1);
        }
        else {
          console.log("NO CANNONS LEFT ON THIS SHIP");
        }
      }
    }
    checkForCannonBreak();
    health -= amount;
    let html = `
      <p>${health}/${maxHealth}</p>
      <meter value="${health}" min="0" max="${maxHealth}"></meter>`;
    console.log("damage: " + amount + "health: "  + health);
    let cannonHTML = "";
    for (var i = 0; i < cannons.length; i++) {
      cannonHTML += `<span class='projectile ${i}'></span>`;
    }
    let selectedShip = $(`*[data-shipid="${id}"]`);
    selectedShip.find(".maxHealth-bar").html(html);
    selectedShip.find(".cannonballs").html(cannonHTML);
  }

  isDead = (id) => {
    if (health <= 0) {
      $(`*[data-shipid="${id}"]`).addClass("sinking");
      setTimeout(function(){
        $(`*[data-shipid="${id}"]`).removeClass("sinking");
      },3000);
      return true;
    }
    else {
      return false;
    }
  }

  fireCannons = (targetPlayer, targetShipObject, shipID,e,playerShipID) => {
    console.log(shipID);
    for (let i = 0; i < cannons.length; i++) {
      let random = generateRandomNumber(0,100);
      let id = i;

      const handleAnimation = (playerShip, e, animationStatus) => {
        playerShip = $(`*[data-shipid=${playerShipID}]`).find(`.${i}`);
        offset = playerShip.offset();
        let xcoord = undefined;
        let ycoord = undefined;
        let enemyCoords = $(`*[data-shipid=${shipID}]`).offset();
        if (animationStatus == "hit") {
          playerShip.addClass("animatedhit");
          if(targetShipObject.owner == "opponent"){
            xcoord = e.clientX - offset.left;
            ycoord = -1 * e.clientY;
          }
          else{
            xcoord = enemyCoords.left - offset.left;
            ycoord = enemyCoords.top;
          }
        }
        if (animationStatus == "miss") {
          playerShip.addClass("animatedmiss");
          if(targetShipObject.owner == "opponent"){
            xcoord = e.clientX - offset.left - 200;
            ycoord = -1 * e.clientY + 150;
          }
          else{
            xcoord = enemyCoords.left - offset.left - 200;
            ycoord = enemyCoords.top - 250;
          }
          
        }
        playerShip.css('--mouse-x', xcoord);
        playerShip.css('--mouse-y', ycoord);
        setTimeout(function(){
          playerShip.removeClass("animatedhit animatedmiss");
          console.log("removed classes");
        },3000);
      }

      if (cannons[id].accuracy > random) {
        cannonAudio.play();
        handleAnimation(playerShipID,e, "hit");
        targetShipObject.takeDamage(cannons[id].damage,shipID,targetPlayer,e);
      }
      else {
        handleAnimation(playerShipID,e,"miss");
      }
    }
  }

  if (type == 0) {
    name = "Dhow";
    maxHealth = generateRandomNumber(50,100);
    cannonCapacity = generateRandomNumber(1,3);
    capacity = generateRandomNumber(80,150);
    speed = generateRandomNumber(70,90);
  }
  if (type == 1) {
    name = "Sloop";
    maxHealth = generateRandomNumber(70,150);
    cannonCapacity = generateRandomNumber(1,3);
    capacity = generateRandomNumber(50,100);
    speed = generateRandomNumber(65,95);
  }
  if (type == 2) {
    name = "Schooner";
    maxHealth = generateRandomNumber(100,200);
    cannonCapacity = generateRandomNumber(2,3);
    capacity = generateRandomNumber(100,200);
    speed = generateRandomNumber(50,80);
  }
  if (type == 3) {
    name = "Junk";
    maxHealth = generateRandomNumber(150,220);
    cannonCapacity = generateRandomNumber(1,3);
    capacity = generateRandomNumber(100,250);
    speed = generateRandomNumber(65,85);
  }
  if (type == 4) {
    name = "Carrack";
    maxHealth = generateRandomNumber(180,250);
    cannonCapacity = generateRandomNumber(1,4);
    capacity = generateRandomNumber(200-250);
    speed = generateRandomNumber(70,95);
  }
  if (type == 5) {
    name = "Galleon";
    maxHealth = generateRandomNumber(250,350);
    cannonCapacity = generateRandomNumber(2,4);
    capacity = generateRandomNumber(250,500);
    speed = generateRandomNumber(50,75);
  }
  if (type == 6) {
    name = "Frigate";
    maxHealth = generateRandomNumber(150,230);
    cannonCapacity = generateRandomNumber(3,4);
    capacity = generateRandomNumber(50,200);
    speed = generateRandomNumber(40,70);
  }
  if (type == 7) {
    name = "Man o' War";
    maxHealth = generateRandomNumber(300,350);
    cannonCapacity = generateRandomNumber(4,5);
    capacity = generateRandomNumber(400,500);
    speed = generateRandomNumber(60,95);
  }
  health = maxHealth;

  for (var i = 0; i < cannonCapacity; i++) {
    cannons.push(cannonFactory(0));
  }

  return {name, health, maxHealth,speed,cannons, cannonCapacity, capacity, isDead, generateHTML, owner, takeDamage, calculateTotalDamage, fireCannons}

}
