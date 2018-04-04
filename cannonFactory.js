const cannonFactory = (type) => {
  let name = "";
  let damage = "";
  let space = 10;
  let cost = 0;
  let accuracy = 0;
  let fireSpeed = 0;

  const generateRandomNumber = (min,max) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  if (type == 0) {
    name = "Light Cannon";
    damage = generateRandomNumber(5,15);
    accuracy = generateRandomNumber(80,95);
  }
  if (type == 1) {
    name = "Heavy Cannon";
    damage = generateRandomNumber(15,25);
    accuracy = generateRandomNumber(75,95);
  }
  if (type == 2) {
    name = "Naval Gun";
    damage = generateRandomNumber(25,50);
    accuracy = generateRandomNumber(85,90);
  }

  return {name, damage,accuracy,fireSpeed}
}
