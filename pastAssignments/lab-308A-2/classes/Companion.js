import Character from "./Character.js" //we import the Character class, so our companion can extend it

export default class Companion extends Character { //we must export the Companion class so that it can be used in script.js
  constructor(name, type) {
    super(name)
    this.type = type
    this.inventory.push('potion', 'KitKat bar')
  }

  attach(adventurer) {
    adventurer.companion = this
  }

  // leo.lendAHand('potion', robin)
  lendAHand(item, character) {
    const foundItemIndex = this.inventory.indexOf(item)
    if (foundItemIndex >= 0) {
      character.inventory.push(item);
      this.inventory.splice(foundItemIndex, 1)
      console.log(`${this.name} lended ${character.name} a ${item}`)
    } else {
      console.log(`${this.name} does not have ${item} in their inventory`)
    }
  }

  async sayInspirationalQuote() {
    const response = await fetch('https://api.realinspire.tech/v1/quotes/random')
    const data = await response.json()
    console.log(`${this.name} says: ${data[0].content}`)
  }
}