{
  // ****************** ANTI PATTERN ******************
  class PaymentService {
    pay(amount: number, method: string) {
      if (method === "card") {
        console.log("Processing card payment:", amount);
      } else if (method === "paypal") {
        console.log("Processing PayPal payment:", amount);
      } else if (method === "crypto") {
        console.log("Processing crypto payment:", amount);
      } else {
        console.log("Unknown payment method:", method);
      }
    }
  }

  const paymentService = new PaymentService();
  paymentService.pay(100, "card");
  paymentService.pay(200, "paypal");
  paymentService.pay(300, "crypto");
  paymentService.pay(400, "cash");
}
