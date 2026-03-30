# Software design patterns

Design patterns using typescript

### Run typescript code

- In project root run `npm install`
- To run specific file run `npx tsx filename.ts`

### References

- [Geeks for geeks Design Patterns Tutorial](https://www.geeksforgeeks.org/system-design/software-design-patterns/)
- [Refactoring Guru](https://refactoring.guru/design-patterns)


---

## Software Design Patterns – Definitions & Categories

This document lists all the classic GoF (Gang of Four) design patterns, categorized into Creational, Structural, and Behavioral, along with concise definitions.

---

### **Creational Patterns**
Patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

1. **Singleton**
   - Ensures a class has only one instance and provides a global point of access to it.
   
2. **Factory Method**
   - Defines an interface for creating an object but lets subclasses decide which class to instantiate.
   
3. **Abstract Factory**
   - Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
   
4. **Builder**
   - Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
   
5. **Prototype**
   - Specifies the kinds of objects to create using a prototypical instance and creates new objects by copying this prototype.

---

### **Structural Patterns**
Patterns that deal with object composition, creating relationships between objects to form larger structures while keeping flexibility and efficiency.

1. **Adapter**
   - Converts the interface of a class into another interface clients expect, allowing incompatible interfaces to work together.
   
2. **Bridge**
   - Decouples an abstraction from its implementation so the two can vary independently.
   
3. **Composite**
   - Composes objects into tree structures to represent part-whole hierarchies, allowing clients to treat individual objects and compositions uniformly.
   
4. **Decorator**
   - Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing for extending functionality.
   
5. **Facade**
   - Provides a simplified interface to a larger body of code, such as a complex subsystem.
   
6. **Flyweight**
   - Uses sharing to support a large number of fine-grained objects efficiently.
   
7. **Proxy**
   - Provides a surrogate or placeholder for another object to control access to it.

---

### **Behavioral Patterns**
Patterns that focus on communication between objects, what goes on between objects and how they operate together.

1. **Chain of Responsibility**
   - Passes a request along a chain of handlers; each handler can either handle the request or pass it to the next handler in the chain.
   
2. **Command**
   - Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.
   
3. **Interpreter**
   - Defines a representation for a language’s grammar along with an interpreter that uses the representation to interpret sentences in the language.
   
4. **Iterator**
   - Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
   
5. **Mediator**
   - Defines an object that encapsulates how a set of objects interact, promoting loose coupling by preventing objects from referring to each other explicitly.
   
6. **Memento**
   - Captures and externalizes an object’s internal state so that the object can be restored to this state later without violating encapsulation.
   
7. **Observer**
   - Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
   
8. **State**
   - Allows an object to alter its behavior when its internal state changes; the object will appear to change its class.
   
9. **Strategy**
   - Defines a family of algorithms, encapsulates each one, and makes them interchangeable, letting the algorithm vary independently from clients that use it.
   
10. **Template Method**
    - Defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Lets subclasses redefine certain steps without changing the algorithm’s structure.
    
11. **Visitor**
    - Represents an operation to be performed on the elements of an object structure, allowing new operations to be defined without changing the elements themselves.

---
