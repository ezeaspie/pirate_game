const combatLoop = () => {
  //Move this up one loop since this is only for combat sequences.
  let player = playerFactory("player");
  let opponent = playerFactory("opponent");
  //Start
  let playerHtml = '';
  let opponentHtml = '';

  console.log(player,opponent)

  for (var i = 0; i < player.armada.length; i++) {
    playerHtml += player.armada[i].generateHTML(i);
  }
  for (var i = 0; i < opponent.armada.length; i++) {
    opponentHtml += opponent.armada[i].generateHTML(i);
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

  let shipAttackOrder = [];
  for (var i = 0; i < player.armada.length; i++) {
    shipAttackOrder.push(player.armada[i]);
    shipAttackOrder.push(opponent.armada[i]);
  }
  shipAttackOrder.sort(function(a, b){
    return b.speed-a.speed
  });
  console.log(shipAttackOrder);

  let turn = 0;

  const takeTurn = (selectedShip) => {
    //Basic Turn Logic.
    if (shipAttackOrder[turn] === undefined) {
      console.log('NEXT CYCLE');
      turn = 0;
    }
    if (shipAttackOrder[turn].owner == "player") {
      let target = opponent.armada[selectedShip];

      console.log("USER " + turn);
      shipAttackOrder[turn].fireCannons(opponent, selectedShip);
      if (target.isDead()) {
        console.log(true);
      }
      turn++;
    }
    else {
      let target = player.armada[selectedShip];

      console.log("OPPONENT " + turn);
      shipAttackOrder[turn].fireCannons(player,selectedShip);
      if (target.isDead()) {
        console.log(true);
        if (selectedShip < turn)
        //Specific ID's for each ship are needed to select freely.
        }
      }
      turn++;
    }
    //Check for next turn and give turn to current attacker. AI or player.
    if (shipAttackOrder[turn] === undefined) {
      console.log('NEXT CYCLE');
      turn = 0;
    }
    if (shipAttackOrder[turn].owner == "opponent") {
      takeTurn(0);
    }
  }

  $(".opponent .ship").on("click", function() {
    let selectedShip = $(this).attr("data-shipid");
    takeTurn(selectedShip);
  });

  if (shipAttackOrder[turn].owner == "opponent") {
    takeTurn(0);
  }

  return html;
}

combatLoop();
