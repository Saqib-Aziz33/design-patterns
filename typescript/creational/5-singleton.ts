// https://refactoring.guru/design-patterns/singleton

/**
 * ==============================================================================
 * DESIGN PATTERN: SINGLETON
 * ==============================================================================
 * 
 * 1. EXPLANATION:
 *    The Singleton pattern is a creational design pattern that ensures a class 
 *    has only one instance and provides a global point of access to it. It 
 *    involves a static method that controls the creation of the object.
 * 
 * 2. WHY IT IS USED:
 *    - Controlled Access: Guarantees that only one instance exists, preventing 
 *      conflicts (e.g., two database writers overwriting each other).
 *    - Global State: Provides a global access point to a shared resource without 
 *      using global variables.
 *    - Resource Management: Useful for managing heavy resources like database 
 *      connections or file handlers that should not be duplicated.
 * 
 * 3. WHEN TO USE IT:
 *    - When exactly one instance of a class is needed.
 *    - When you need a global point of access to that instance.
 *    - When lazy initialization is desired (the instance is created only when 
 *      first requested).
 * 
 * 4. REAL WORLD EXAMPLE:
 *    - Logging Service: All parts of the application should log to the same file 
 *      or stream using the same logger instance.
 *    - Database Connection: Managing a single pool or connection to avoid 
 *      exceeding connection limits.
 *    - Configuration Manager: Loading settings once and accessing them globally 
 *      throughout the app.
 * 
 * ==============================================================================
 * TYPESCRIPT IMPLEMENTATION
 * ==============================================================================
 */

class Logger {
  // 1. Static property to hold the single instance
  private static instance: Logger;
  
  // Property to simulate state
  private logCount: number = 0;

  // 2. Private Constructor
  // Prevents direct instantiation via 'new Logger()' from outside the class
  private constructor() {
    console.log("Logger initialized (only happens once).");
  }

  // 3. Static Public Method
  // Provides the global access point to the instance
  public static getInstance(): Logger {
    // Lazy initialization: Create instance only if it doesn't exist
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Business logic method
  public log(message: string): void {
    this.logCount++;
    console.log(`[Log #${this.logCount}]: ${message}`);
  }

  public getLogCount(): number {
    return this.logCount;
  }
}

// ==============================================================================
// CLIENT CODE
// ==============================================================================

(function main() {
  console.log("--- Attempting to create multiple Loggers ---\n");

  // Client 1 gets the instance
  const logger1 = Logger.getInstance();
  logger1.log("System started");

  // Client 2 gets the instance (should be the same object)
  const logger2 = Logger.getInstance();
  logger2.log("User logged in");

  // Client 3 gets the instance
  const logger3 = Logger.getInstance();
  logger3.log("Data saved");

  console.log("\n--- Verifying Singleton Identity ---");
  
  // Check if all references point to the same memory location
  const isSameInstance = (logger1 === logger2) && (logger2 === logger3);
  console.log(`All variables point to the same instance: ${isSameInstance}`);
  
  // Check cumulative state (logCount should be 3, not reset)
  console.log(`Total logs recorded by shared instance: ${logger1.getLogCount()}`);

  // Uncommenting the line below would cause a TypeScript Error:
  // const logger4 = new Logger(); // Error: Constructor is private
})()