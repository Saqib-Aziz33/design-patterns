## 1️⃣ Strategy Pattern

### 1. The Problem (Naive Approach)

You have a class that needs to **change behavior based on some condition**.

Example: Payment processing.

```ts
class PaymentService {
  pay(amount: number, method: string) {
    if (method === "card") {
      console.log("Processing card payment:", amount);
    } else if (method === "paypal") {
      console.log("Processing PayPal payment:", amount);
    } else if (method === "crypto") {
      console.log("Processing crypto payment:", amount);
    }
  }
}
```

### Problems ❌

- Violates **Open/Closed Principle**
- Adding a new method requires **editing the class**
- Large `if/else` blocks
- Hard to test individually

---

# Strategy Pattern Idea

Instead of **switching behavior inside a class**, you:

> Move each behavior into its own class and make them interchangeable.

The main class **receives the strategy** and uses it.

This follows:

**Composition over inheritance**

---

# TypeScript Implementation

## Example 1 — Payment Strategies

### Step 1 — Strategy Interface

```ts
interface PaymentStrategy {
  pay(amount: number): void;
}
```

---

### Step 2 — Concrete Strategies

```ts
class CardPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log("Paid with Card:", amount);
  }
}

class PaypalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log("Paid with PayPal:", amount);
  }
}

class CryptoPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log("Paid with Crypto:", amount);
  }
}
```

---

### Step 3 — Context Class

This class **uses the strategy**.

```ts
class PaymentService {
  constructor(private strategy: PaymentStrategy) {}

  processPayment(amount: number) {
    this.strategy.pay(amount);
  }
}
```

---

### Step 4 — Usage

```ts
const payment = new PaymentService(new PaypalPayment());

payment.processPayment(100);
```

Output:

```
Paid with PayPal: 100
```

To change behavior:

```ts
const payment = new PaymentService(new CryptoPayment());
payment.processPayment(100);
```

No code modification needed in `PaymentService`.

---

# Example 2 — Authentication Strategy (Very Real Backend Example)

Imagine an API supporting:

- JWT authentication
- API Key authentication

---

### Strategy Interface

```ts
interface AuthStrategy {
  authenticate(token: string): boolean;
}
```

---

### JWT Strategy

```ts
class JwtAuth implements AuthStrategy {
  authenticate(token: string): boolean {
    console.log("Validating JWT:", token);
    return true;
  }
}
```

---

### API Key Strategy

```ts
class ApiKeyAuth implements AuthStrategy {
  authenticate(token: string): boolean {
    console.log("Checking API Key:", token);
    return true;
  }
}
```

---

### Auth Service

```ts
class AuthService {
  constructor(private strategy: AuthStrategy) {}

  login(token: string) {
    return this.strategy.authenticate(token);
  }
}
```

---

### Usage

```ts
const auth = new AuthService(new JwtAuth());

auth.login("jwt-token");
```

---

# Why Strategy Pattern is Powerful

Benefits:

✅ Follows **Open/Closed Principle**
✅ Easy to **add new algorithms**
✅ **Test each strategy separately**
✅ Removes large conditional logic
✅ Promotes **dependency injection**

---

# Where You Already Use It (Without Knowing)

You’ve probably already used it in:

- **Passport.js authentication strategies**
- **Payment gateways (Stripe, PayPal)**
- **Sorting algorithms**
- **Compression algorithms**
- **React render strategies**

Example:

```ts
array.sort(compareFn);
```

`compareFn` is basically a **strategy**.

---

# Important TypeScript Insight

In **TypeScript/JavaScript**, strategies are often just **functions** instead of classes.

Example:

```ts
type DiscountStrategy = (price: number) => number;

const studentDiscount: DiscountStrategy = (price) => price * 0.8;
const vipDiscount: DiscountStrategy = (price) => price * 0.7;

function checkout(price: number, strategy: DiscountStrategy) {
  return strategy(price);
}

checkout(100, studentDiscount);
```

JS/TS favors **functional strategies** sometimes.
