const playerFactory = (name) => {
  let armada = [];

  armada.push(shipFactory(0,name),shipFactory(2,name),shipFactory(3,name),shipFactory(6,name));

  return {name, armada}
}
