import Adventurer from "./Adventurer.js"; //we must important adventurer class so we may use it in our generate method

export default class AdventurerFactory {  //we must export the class so that it can be used in script.js
  constructor (role) {
    this.role = role;
    this.adventurers = [];
  }
  generate (name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer
  }
  findByIndex (index) {
    return this.adventurers[index];
  }
  findByName (name) {
    return this.adventurers.find((a) => a.name === name);
  }
}