// https://refactoring.guru/design-patterns/abstract-factory

// Connection interface
interface DBConnection {
  connect(): void;
}

// Repository interface
interface UserRepository {
  getUser(id: string): void;
}

// MySQL implementations
class MySQLConnection implements DBConnection {
  connect(): void {
    console.log("Connected to MySQL database");
  }
}

class MySQLUserRepository implements UserRepository {
  getUser(id: string): void {
    console.log(`Fetching user ${id} from MySQL`);
  }
}

// MongoDB implementations
class MongoConnection implements DBConnection {
  connect(): void {
    console.log("Connected to MongoDB");
  }
}

class MongoUserRepository implements UserRepository {
  getUser(id: string): void {
    console.log(`Fetching user ${id} from MongoDB`);
  }
}


// Abstract Factory interface
interface DatabaseFactory {
  createConnection(): DBConnection;
  createUserRepository(): UserRepository;
}


// Concrete Factory
class MySQLFactory implements DatabaseFactory {
  createConnection(): DBConnection {
    return new MySQLConnection();
  }

  createUserRepository(): UserRepository {
    return new MySQLUserRepository();
  }
}

class MongoFactory implements DatabaseFactory {
  createConnection(): DBConnection {
    return new MongoConnection();
  }

  createUserRepository(): UserRepository {
    return new MongoUserRepository();
  }
}


(function main() {
  // Using MySQL Factory
  const mysqlFactory = new MySQLFactory();
  const mysqlConnection = mysqlFactory.createConnection();
  const mysqlUserRepo = mysqlFactory.createUserRepository();

  mysqlConnection.connect();
  mysqlUserRepo.getUser("1");

  // Using MongoDB Factory
  const mongoFactory = new MongoFactory();
  const mongoConnection = mongoFactory.createConnection();
  const mongoUserRepo = mongoFactory.createUserRepository();

  mongoConnection.connect();
  mongoUserRepo.getUser("1");
})()