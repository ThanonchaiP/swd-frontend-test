import { User } from "@/types";

const STORAGE_KEY = "users";

function getAll(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function save(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function create(user: Omit<User, "id">): User {
  const users = getAll();
  const newUser: User = { ...user, id: crypto.randomUUID() };
  users.push(newUser);
  save(users);
  return newUser;
}

function update(id: string, updatedFields: Partial<User>): User | null {
  const users = getAll();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updatedFields };
  save(users);
  return users[index];
}

function remove(id: string): boolean {
  const users = getAll();
  const newUsers = users.filter((u) => u.id !== id);
  if (newUsers.length === users.length) return false;
  save(newUsers);
  return true;
}

function getById(id: string): User | undefined {
  return getAll().find((u) => u.id === id);
}

export const userService = {
  getAll,
  create,
  update,
  remove,
  getById,
};
