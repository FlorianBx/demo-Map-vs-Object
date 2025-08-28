import { User, UserCache } from './main.types';

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i}`,
    name: `User ${i}`,
    email: `user${i}@example.com`
  }));
}

export function benchmarkCache(cache: UserCache, users: User[], operations: number): number {
  const start = performance.now();

  users.forEach(user => cache.setUser(user));

  for (let i = 0; i < operations; i++) {
    const randomId = `user-${Math.floor(Math.random() * users.length)}`;
    cache.getUser(randomId);
    cache.hasUser(randomId);

    if (i % 1000 === 0) {
      cache.getUserCount();
    }

    if (i % 5000 === 0) {
      cache.deleteUser(randomId);
    }
  }

  return performance.now() - start;
}
