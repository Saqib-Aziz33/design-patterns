// https://refactoring.guru/design-patterns/bridge

/**
 * ==============================================================================
 * DESIGN PATTERN: BRIDGE
 * ==============================================================================
 * 
 * 1. EXPLANATION:
 *    The Bridge pattern is a structural design pattern that divides a large 
 *    class or a set of closely related classes into two separate hierarchies: 
 *    Abstraction and Implementation. These two hierarchies can be developed 
 *    independently of each other.
 * 
 *    - Abstraction: Provides high-level control logic (e.g., a Remote Control).
 *    - Implementation: Defines the interface for implementation objects (e.g., 
 *      a TV, a Radio).
 *    - The Abstraction holds a reference to the Implementation and delegates 
 *      work to it.
 * 
 * 2. WHY IT IS USED:
 *    - Prevents Class Explosion: Without Bridge, if you have N shapes and M 
 *      colors, you might need N*M subclasses (RedCircle, BlueCircle, RedSquare...). 
 *      With Bridge, you have N + M classes.
 *    - Independent Evolution: You can change the implementation (e.g., switch 
 *      from TV to Radio) without changing the abstraction (Remote).
 *    - Open/Closed Principle: You can introduce new abstractions or implementations 
 *      without modifying existing code.
 * 
 * 3. WHEN TO USE IT:
 *    - When you want to split a monolithic class that has several variants of 
 *      functionality (e.g., UI framework supporting multiple OS).
 *    - When you need to switch implementations at runtime.
 *    - When both the abstraction and its implementation should be extensible 
 *      by subclassing.
 * 
 * 4. REAL WORLD EXAMPLE:
 *    - Remote Controls (Abstraction) and Devices (Implementation): A universal 
 *      remote works with TVs, Radios, or ACs. The remote logic doesn't change 
 *      based on the device.
 *    - GUI Frameworks: Widgets (Abstraction) can be rendered on Windows, macOS, 
 *      or Linux (Implementation) using native APIs.
 *    - Persistence Layers: Business Logic (Abstraction) can save data to SQL, 
 *      NoSQL, or File System (Implementation).
 * 
 * ==============================================================================
 * TYPESCRIPT IMPLEMENTATION
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. IMPLEMENTATION HIERARCHY
// -----------------------------------------------------------------------------

// The Implementation interface declares methods for all concrete implementation classes.
// Note: In Bridge pattern, "Implementation" refers to the Implementor hierarchy, 
// not just the code implementation of the Abstraction.
interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// Concrete Implementation: TV
class TV implements Device {
    private power: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    public isEnabled(): boolean { return this.power; }
    public enable(): void {
        this.power = true;
        console.log("TV: Powered ON");
    }
    public disable(): void {
        this.power = false;
        console.log("TV: Powered OFF");
    }
    public getVolume(): number { return this.volume; }
    public setVolume(percent: number): void {
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        this.volume = percent;
        console.log(`TV: Volume set to ${percent}%`);
    }
    public getChannel(): number { return this.channel; }
    public setChannel(channel: number): void {
        this.channel = channel;
        console.log(`TV: Channel set to ${channel}`);
    }
}

// Concrete Implementation: Radio
class Radio implements Device {
    private power: boolean = false;
    private volume: number = 50;
    private frequency: number = 89.5; // Radio uses frequency instead of channel

    public isEnabled(): boolean { return this.power; }
    public enable(): void {
        this.power = true;
        console.log("Radio: Powered ON");
    }
    public disable(): void {
        this.power = false;
        console.log("Radio: Powered OFF");
    }
    public getVolume(): number { return this.volume; }
    public setVolume(percent: number): void {
        this.volume = percent;
        console.log(`Radio: Volume set to ${percent}%`);
    }
    // Adapting channel concept to frequency for Radio
    public getChannel(): number { return this.frequency; }
    public setChannel(channel: number): void {
        this.frequency = channel;
        console.log(`Radio: Frequency set to ${channel}MHz`);
    }
}

// -----------------------------------------------------------------------------
// 2. ABSTRACTION HIERARCHY
// -----------------------------------------------------------------------------

// The Abstraction provides high-level control logic.
// It holds a reference to a Device object (the Implementation).
class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    public togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    public volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    public volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    public channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    public channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

// Refined Abstraction: Adds extra features without changing the Device interface.
class AdvancedRemote extends RemoteControl {
    constructor(device: Device) {
        super(device);
    }

    public mute(): void {
        console.log("Muting device...");
        this.device.setVolume(0);
    }
}

// -----------------------------------------------------------------------------
// 3. CLIENT CODE
// -----------------------------------------------------------------------------

function runBridgeExample() {
    console.log("--- Using Basic Remote with TV ---");
    const tv = new TV();
    const basicRemote = new RemoteControl(tv);

    basicRemote.togglePower(); // Turns TV on
    basicRemote.volumeUp();    // Delegates to TV
    basicRemote.channelUp();   // Delegates to TV

    console.log("\n--- Using Advanced Remote with Radio ---");
    const radio = new Radio();
    // We can swap the Implementation (Device) at runtime easily
    const advancedRemote = new AdvancedRemote(radio);

    advancedRemote.togglePower(); // Turns Radio on
    advancedRemote.mute();        // New feature specific to AdvancedRemote
    advancedRemote.channelUp();   // Delegates to Radio (adjusts frequency)

    console.log("\n--- Swapping Implementation ---");
    // We can even connect the same remote to a different device
    advancedRemote.device = tv;
    advancedRemote.togglePower(); // Now controls TV
}

// Execute the example
runBridgeExample();