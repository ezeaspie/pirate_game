const portFactory = (config) => {

  /*
  config = {
    name="portName",
    townHall = undefined OR townHall Object.
    warehouse = undefined OR warehouse object.
    shipYard = undefined OR shipYard object.
    magic - undefined OR magic object.
    bank = undefined OR bank object.
    marketplace = marketplace object.
  }
  */

  const renderHTML = () => {
    let townHall = ``;
    let shipYard = ``;
    let bank = ``;
    let warehouse = ``;
    let magic = ``;

    if (townHall != undefined) {
      townHall = `<li id="th">TownHall</li>`
    }
    if (shipYard != undefined) {
      shipYard = `<li id="sh">ShipYard</li>`
    }
    if (bank != undefined) {
      bank = `<li id="bk">Bank</li>`
    }
    if (warehouse != undefined) {
      warehouse = `<li id="wh">Warehouse</li>`
    }
    if (magic != undefined) {
      magic = `<li id="mg">Magic</li>`
    }

    let html = `
      <div>
        <h1>${config.name}</h1>
        <ul>
          <li>Market</li>
          ${townHall}
          ${shipYard}
          ${bank}
          ${magic}
          ${warehouse}
          <li id="travel">Ship</li>
        <ul>
      </div>
    `
    $("#game").html(html);

    /*$("#th").on("click", function() {
      .../
    });*/

    $("#travel").on("click", function() {
      startTravel();
    });
    return html;
  }

  return {name,renderHTML}
}
