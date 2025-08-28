import type { User, UserCache, BenchmarkData } from "./main.types";
import { generateUsers } from "./utils";
import { logger } from "./logger";

const USERS_COUNT = 1000000;
const NUMBER_OF_OPERATIONS = 100000;

class ObjectBasedUserCache implements UserCache {
  private users: { [key: string]: User } = {};

  getUser(id: string): User | undefined {
    return this.users[id];
  }

  setUser(user: User): void {
    this.users[user.id] = user;
  }

  deleteUser(id: string): boolean {
    if (this.users[id]) {
      delete this.users[id];
      return true;
    }
    return false;
  }

  hasUser(id: string): boolean {
    return id in this.users;
  }

  getUserCount(): number {
    return Object.keys(this.users).length;
  }
}

class MapBasedUserCache implements UserCache {
  private users = new Map<string, User>();

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  setUser(user: User): void {
    this.users.set(user.id, user);
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }

  hasUser(id: string): boolean {
    return this.users.has(id);
  }

  getUserCount(): number {
    return this.users.size;
  }
}

const users = generateUsers(USERS_COUNT);

const datas: BenchmarkData = {
  object: ObjectBasedUserCache,
  map: MapBasedUserCache,
  users,
  operations: NUMBER_OF_OPERATIONS
};

logger(datas);
