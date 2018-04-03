const playerFactory = (name) => {
  let armada = [];

  armada.push(shipFactory(0),shipFactory(2),shipFactory(3),shipFactory(6));

  return {name, armada}
}
