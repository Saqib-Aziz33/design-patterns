// https://refactoring.guru/design-patterns/prototype

/**
 * ==============================================================================
 * DESIGN PATTERN: PROTOTYPE
 * ==============================================================================
 * 
 * 1. EXPLANATION:
 *    The Prototype pattern is a creational design pattern that allows cloning 
 *    existing objects instead of creating new ones from scratch. It provides 
 *    an interface for creating copies of specific objects.
 * 
 * 2. WHY IT IS USED:
 *    - Performance: Creating a new object can be costly (e.g., requires database 
 *      calls, heavy computations, or complex initialization). Cloning is often 
 *      faster.
 *    - Decoupling: The client code doesn't need to know the concrete class of 
 *      the object it is copying, only the interface.
 *    - Flexibility: You can produce distinct objects that have similar properties 
 *      without subclassing.
 * 
 * 3. WHEN TO USE IT:
 *    - When your code shouldn't depend on the concrete classes of objects you 
 *      need to copy.
 *    - When creating objects is more expensive than copying existing ones.
 *    - When you need to keep the number of subclasses to a minimum (instead of 
 *      using Factory Method with many subclasses for configurations).
 * 
 * 4. REAL WORLD EXAMPLE:
 *    - Document Editors: Copying and pasting content (cloning a text block or 
 *      shape with all its properties).
 *    - Game Development: Spawning multiple enemies with the same base stats 
 *      (health, speed, weapon) but different positions.
 *    - Database Records: Cloning a row to create a similar record with a new ID.
 * 
 * ==============================================================================
 * TYPESCRIPT IMPLEMENTATION
 * ==============================================================================
 */

// 1. The Prototype Interface
// Declares the cloning method.
interface Prototype {
  clone(): Prototype;
}

// 2. Concrete Prototype
// Implements the cloning method.
class GameEnemy implements Prototype {
  public name: string;
  public health: number;
  public position: { x: number; y: number };
  public inventory: string[];

  constructor(
    name: string, 
    health: number, 
    x: number, 
    y: number, 
    inventory: string[]
  ) {
    this.name = name;
    this.health = health;
    this.position = { x, y };
    this.inventory = inventory;
  }

  // The clone method creates a new instance with the same property values.
  // Note: For complex objects, you might need a Deep Copy instead of shallow copy.
  clone(): Prototype {
    // Creating a new instance using the current object's data
    // We spread the inventory array to ensure it's a new reference (deep copy for array)
    const clonedEnemy = new GameEnemy(
      this.name,
      this.health,
      this.position.x,
      this.position.y,
      [...this.inventory] 
    );
    return clonedEnemy;
  }

  // Helper method to display state
  displayState(): void {
    console.log(
      `Enemy: ${this.name} | HP: ${this.health} | Pos: (${this.position.x}, ${this.position.y}) | Items: ${this.inventory.join(', ')}`
    );
  }
}

// 3. Client Code
// The client works with any object that implements the Prototype interface.
(function main() {
  // 1. Create a base prototype (configured once)
  const baseEnemy = new GameEnemy("Orc", 100, 0, 0, ["Sword", "Shield"]);

  console.log("--- Original Base Enemy ---");
  baseEnemy.displayState();

  // 2. Clone the prototype to create variations without re-configuring everything
  const enemy1 = baseEnemy.clone() as GameEnemy;
  enemy1.position = { x: 10, y: 20 }; // Set unique position
  
  const enemy2 = baseEnemy.clone() as GameEnemy;
  enemy2.position = { x: 50, y: 60 };
  enemy2.name = "Elite Orc"; // Modify specific properties
  enemy2.health = 150;

  // 3. Verify that cloning created independent objects
  // Changing enemy1 inventory should not affect baseEnemy or enemy2
  enemy1.inventory.push("Potion");

  console.log("\n--- Cloned Enemy 1 ---");
  enemy1.displayState();

  console.log("\n--- Cloned Enemy 2 ---");
  enemy2.displayState();

  console.log("\n--- Original Base Enemy (Unchanged) ---");
  baseEnemy.displayState();
})()