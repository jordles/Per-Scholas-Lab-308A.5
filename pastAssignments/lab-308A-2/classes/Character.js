export default class Character { //we must export Character for our adventurer to extend it
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
    this.companion = null;
  }


  roll (mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`)
    return result
  }

  loot(...items) {
    const roll = this.roll()
    if (roll > 5) {
      console.log(`${this.name} looting area for items...
        found ${items}`)
      
        this.inventory.push(...items)
    } else {
      console.log(`${this.name} was unlucky and found nothing :(`)
    }
  }
}