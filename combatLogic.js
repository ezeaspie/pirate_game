const combatLoop = () => {
  //Move this up one loop since this is only for combat sequences.
  let player = playerFactory();
  let opponent = playerFactory();
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

  $(".opponent .ship").on("click", function() {
    let selectedShip = $(this).attr("data-shipid");
    for (var i = 0; i < player.armada.length; i++) {
      player.armada[i].fireCannons(opponent, selectedShip);
    }
    console.log("end");
  });


  return html;
}

combatLoop();
