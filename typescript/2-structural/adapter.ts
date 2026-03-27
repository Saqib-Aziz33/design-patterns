// https://refactoring.guru/design-patterns/adapter

/**
 * ==============================================================================
 * DESIGN PATTERN: ADAPTER
 * ==============================================================================
 * 
 * 1. EXPLANATION:
 *    The Adapter pattern is a structural design pattern that allows objects 
 *    with incompatible interfaces to collaborate. It acts as a wrapper between 
 *    two objects, converting the interface of one class into another interface 
 *    that the client expects.
 * 
 * 2. WHY IT IS USED:
 *    - Integration: Enables existing classes to work with others without modifying 
 *      their source code.
 *    - Reusability: Allows you to reuse existing classes that don't match the 
 *      required interface.
 *    - Decoupling: Separates the client from the implementation details of the 
 *      adaptee.
 * 
 * 3. WHEN TO USE IT:
 *    - When you want to use an existing class, but its interface doesn't match 
 *      what you need.
 *    - When you need to use several existing subclasses, but it's impractical 
 *      to adapt their interface by subclassing every one.
 *    - When integrating legacy systems with new code.
 * 
 * 4. REAL WORLD EXAMPLE:
 *    - Power Adapter: Converting a US plug (110V) to fit an EU socket (220V).
 *    - Language Translator: Converting a message from English to Spanish so a 
 *      Spanish-speaking client can understand.
 *    - Data Serialization: Converting XML data from a legacy system into JSON 
 *      for a modern frontend.
 * 
 * ==============================================================================
 * TYPESCRIPT IMPLEMENTATION
 * ==============================================================================
 */

// 1. Target Interface
// This is the interface the Client expects.
interface PaymentProcessor {
    pay(amount: number): void;
}

// 2. Adaptee Class
// This is the existing class with an incompatible interface.
// Imagine this is a legacy library or a 3rd party SDK.
class LegacyPayPalGateway {
    public transferFunds(amount: number, currency: string): void {
        console.log(
            `[Legacy PayPal] Transferring ${amount} ${currency} via old API...`
        );
    }
}

// 3. Adapter Class
// Implements the Target interface and wraps the Adaptee.
// It translates the calls from the client to the adaptee.
class PayPalAdapter implements PaymentProcessor {
    private paypalGateway: LegacyPayPalGateway;

    constructor(paypalGateway: LegacyPayPalGateway) {
        this.paypalGateway = paypalGateway;
    }

    // The client calls this method...
    public pay(amount: number): void {
        // ...but the adapter converts it to what the legacy system expects.
        // We assume USD for this example to simplify the adaptation.
        const currency = "USD";
        this.paypalGateway.transferFunds(amount, currency);
    }
}

// 4. Client Code
// The client works with the Target interface (PaymentProcessor).
// It doesn't know about the LegacyPayPalGateway.
function processCheckout(processor: PaymentProcessor, amount: number) {
    console.log("--- Checkout Started ---");
    processor.pay(amount);
    console.log("--- Checkout Complete ---\n");
}

// ==============================================================================
// EXECUTION
// ==============================================================================

(function main() {
    // Create the legacy service (Adaptee)
    const legacyService = new LegacyPayPalGateway();

    // Wrap it in the Adapter
    const adapter = new PayPalAdapter(legacyService);

    // The client uses the adapter as if it were a standard PaymentProcessor
    processCheckout(adapter, 100);

    // Note: Without the adapter, processCheckout would not accept legacyService
    // because LegacyPayPalGateway does not implement PaymentProcessor.
})()