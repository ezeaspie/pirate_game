const startTravel = (currentPort) => {
  let html = `
  <ul>
    <li id="0" class="port">Union Harbor</li>
    <li id="1" class="port">Chantilly</li>
    <li id="2" class="port">Cape Spear</li>
    <li id="3" class="port">Acantilado</li>
    <li id="4" class="port">La Noria</li>
  </ul>
  `

  $("#game").html(html);

  let portArray = [portFactory(uh),portFactory("Chantilly"),portFactory("Cape Spear"),portFactory("Acantilado"),portFactory("La Noria")];

  for (var i = 0; i < portArray.length; i++) {
    let value = i;
    $(`#${i}`).on("click", function () {
      console.log(value);
      portArray[value].renderHTML();
    });
  }
}

startTravel();
