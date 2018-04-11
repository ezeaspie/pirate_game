const combatLoop = () => {
  //Move this up one loop since this is only for combat sequences.
  let player = playerFactory("player");
  let opponent = playerFactory("opponent");
  let shipAttackOrder = [];
  let turn = 0;

  //AI module
  opponentAttackLogic = () => {
    let selectedShip = shipAttackOrder[turn];
    let selectionId = 0;
    let totalDamageOutput = selectedShip.calculateTotalDamage();
    console.log(totalDamageOutput);

    const checkForKillerBlow = () => {
      let playerShipArray = []
      for (var i = 0; i < shipAttackOrder.length; i++) {
        if (shipAttackOrder[i].owner == "player") {
          let htmlTarget = $(".player").find(`*[data-shipid="${i}"]`);
          htmlTarget = htmlTarget.find("meter");
          let healthValue = htmlTarget.val();
          let shipId = i;
          playerShipArray.push({healthValue,shipId});
        }
      }
      console.log(playerShipArray);
      for (var i = 0; i < playerShipArray.length; i++) {
        if (playerShipArray[i].healthValue <= totalDamageOutput) {
          console.log("I can kill this guy in a shot.");
          return playerShipArray[i].shipId
        }
        else {
          console.log("I can't kill anyone in one shot.");
        }
      }
    }

    const generateRandomNumber = (min,max) => {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber;
    }
    let selectionArray = [];
    for (var i = 0; i < shipAttackOrder.length; i++) {
      if (shipAttackOrder[i].owner == "player") {
        let value = i;
        selectionArray.push(value);
      }
    }
    if (checkForKillerBlow() != undefined) {
      selectionId = checkForKillerBlow();
    }
    else {
      let random = generateRandomNumber(0,selectionArray.length-1);
      selectionId = selectionArray[random];
    }
    return selectionId;
  }

  for (var i = 0; i < player.armada.length; i++) {
    shipAttackOrder.push(player.armada[i]);
    shipAttackOrder.push(opponent.armada[i]);
  }
  shipAttackOrder.sort(function(a, b){
    return b.speed-a.speed
  });
  for (var i = 0; i < shipAttackOrder.length; i++) {
    shipAttackOrder[i].id = i;
    console.log(shipAttackOrder[i].id);
  }
  console.log(shipAttackOrder);

  const generateGameboard = () => {
    let playerHtml = "";
    let opponentHtml = "";

    for (var i = 0; i < shipAttackOrder.length; i++) {
      if (shipAttackOrder[i].owner == "player") {
        playerHtml += shipAttackOrder[i].generateHTML(i);
      }
      else {
        opponentHtml += shipAttackOrder[i].generateHTML(i);
      }
    }
    let html = `
    <div class="opponentMenu">
    </div>
    <div class="opponent">
      ${opponentHtml}
    </div>
    <div class="player">
      ${playerHtml}
    </div>
    <div class="menu">
    </div>
    `
    $("#game").html(html);

    $(".opponent .ship").on("click", function(e) {
      let shipID = $(this).attr("data-shipid");
      takeTurn(shipID,e);
    });

    return html;
  }

  generateGameboard();

  const takeTurn = (shipID,e) => {

    const isGameOver = () => {
      playerShipArray = [];
      opponentShipArray = [];
      for (var i = 0; i < shipAttackOrder.length; i++) {
        if (shipAttackOrder[i].owner == "player") {
          let value = shipAttackOrder.slice(i,1);
          playerShipArray.push(value);
        }
        else {
          let value = shipAttackOrder.slice(i,1);
          opponentShipArray.push(value);
        }
      }
      if (playerShipArray.length === 0 || opponentShipArray.length === 0) {
        console.log("DEADER THAN DANKBOIS CHANNEL");
      }
    }
    //Basic Turn Logic.

    if (shipAttackOrder[turn] === undefined) {
      console.log('NEXT CYCLE');
      turn = 0;
    }
    if (shipAttackOrder[turn].owner == "player") {
      let target = shipAttackOrder[shipID];

      console.log("USER " + turn);
      shipAttackOrder[turn].fireCannons(opponent, target,shipID,e,turn);
      if (target.isDead()) {
        console.log(true);
        if (shipID < turn){
          console.log(shipAttackOrder);
          shipAttackOrder.splice(shipID,1);
          turn--;
          generateGameboard();
        //Specific ID's for each ship are needed to select freely.
        }
        else {
          shipAttackOrder.splice(shipID,1);
          console.log(shipAttackOrder);
          generateGameboard();
        }
        isGameOver();
      }
      turn++;
    }
    else {
      let target = shipAttackOrder[shipID];

      console.log("OPPONENT " + turn);
      shipAttackOrder[turn].fireCannons(player,target, shipID,e,turn);
      if (target.isDead()) {
        console.log(true);
        if (shipID < turn){
          console.log(shipAttackOrder);
          shipAttackOrder.splice(shipID,1);
          turn--;
          generateGameboard();
        //Specific ID's for each ship are needed to select freely.
        }
        else {
          shipAttackOrder.splice(shipID,1);
          console.log(shipAttackOrder);
          generateGameboard();
        }
        isGameOver();
      }
      turn++;
    }
    //Check for next turn and give turn to current attacker. AI or player.
    if (shipAttackOrder[turn] === undefined) {
      console.log('NEXT CYCLE');
      turn = 0;
    }
    if (shipAttackOrder[turn].owner == "opponent") {
      let opponentTarget = opponentAttackLogic();
      takeTurn(opponentTarget);
    }
  }

  if (shipAttackOrder[turn].owner == "opponent") {
    let opponentTarget = opponentAttackLogic();
    takeTurn(opponentTarget);
  }

}

combatLoop();
