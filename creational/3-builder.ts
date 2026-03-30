// https://refactoring.guru/design-patterns/builder

/**
The Builder Pattern is used to construct complex objects step-by-step, allowing you to create different representations of an object using the same construction process.

It’s especially useful when:

An object has many optional parameters
You want to avoid constructor hell (too many arguments)
You want readable and flexible object creation
 */

class HttpRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;

  constructor(builder: HttpRequestBuilder) {
    this.method = builder.method;
    this.url = builder.url;
    this.headers = builder.headers;
    this.body = builder.body;
    this.timeout = builder.timeout;
  }

  send() {
    console.log("Sending Request:");
    console.log({
      method: this.method,
      url: this.url,
      headers: this.headers,
      body: this.body,
      timeout: this.timeout,
    });
  }
}

class HttpRequestBuilder {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;

  constructor(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  setHeaders(headers: Record<string, string>): this {
    this.headers = headers;
    return this;
  }

  setBody(body: any): this {
    this.body = body;
    return this;
  }

  setTimeout(timeout: number): this {
    this.timeout = timeout;
    return this;
  }

  build(): HttpRequest {
    return new HttpRequest(this);
  }
}

// Usage
(function main() {
  const request = new HttpRequestBuilder("POST", "/api/users")
    .setHeaders({ Authorization: "Bearer token" })
    .setBody({ name: "John", age: 30 })
    .setTimeout(5000)
    .build();

  request.send();
});
