/* -------------------------------------------------------------------------- */
/*    WE GRAB THE FOLLOWING EXPORTED CLASSES AND IMPORT THEM INTO SCRIPT.JS   */
/* -------------------------------------------------------------------------- */

import Adventurer from "./classes/Adventurer.js"
import Companion from "./classes/Companion.js"
import AdventurerFactory from "./classes/AdventurerFactory.js"

//What do i know? : 
//We know that adventurer class is an extension of Character class, and robin inherited properties and methods from Character class, like an inventory and a roll method. 
//We know that the companion class is an extension of the Character class, and the companion class inherited properties and methods from Character class. Companions have different inventory items added compared to adventurers and they both have a unique parameter in their constructor to call with. 
//We know attach and lendAHand methods are unique only to the companion class and they are not inherited from Character class.

/* -------- WE CREATE A NEW ADVENTURER NAMED ROBIN AND HE IS A WIZARD ------- */
const robin = new Adventurer('Robin', 'Wizard')
robin.loot("sword", "potion", "potion", "artifact") //add the following loot to our inventory
robin.health = 50 //set our health to 50
robin.useHealthPotion() //use our health potion; we know it only heals 25 health, thats why we call it twice. 
robin.useHealthPotion() 

/* -------- WE CREATE A NEW COMPANION NAMED LEO AND HE IS A CAT ------- */
const leo = new Companion('Leo', 'Cat')
leo.attach(robin) //attach the companion to robin
leo.lendAHand('KitKat bar', robin) //leo gives robin a KitKat bar

// leo.sayInspirationalQuote()

/* -------- WE CREATE A NEW COMPANION NAMED FRANK AND HE IS A FLEA ------- */
const frank = new Companion('Frank', 'Flea')
frank.attach(leo) //attach the companion to leo
// frank.sayInspirationalQuote()
frank.lendAHand('potion', leo) //frank gives leo a potion

const healerFactory = new AdventurerFactory("Wizard") //we make a new factory for healers. 

const gandalf = healerFactory.generate('Gandalf') //we use the generate method from the class to create a new adventurer (which utilizes the adventurer class)
const radagastTheBrown = healerFactory.generate('Radagast')


gandalf.duel(radagastTheBrown) //we use the duel method so two adventurers can duel; since these characters are created from the same class, they both have access to duel