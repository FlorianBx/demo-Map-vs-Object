export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserCache {
  getUser(id: string): User | undefined;
  setUser(user: User): void;
  deleteUser(id: string): boolean;
  hasUser(id: string): boolean;
  getUserCount(): number;
}

export interface BenchmarkData {
  object: new () => UserCache;
  map: new () => UserCache;
  users: User[];
  operations: number;
}
