import { User } from "@/types";

const STORAGE_KEY = "users";

function getAll(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function save(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function create(user: Omit<User, "id">): User[] {
  const users = getAll();
  const newUser: User = { ...user, id: crypto.randomUUID() };
  users.push(newUser);
  save(users);
  return users;
}

function update(id: string, updatedFields: Partial<User>): User[] | null {
  const users = getAll();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updatedFields };
  save(users);
  return users;
}

function remove(id: string): User[] | null {
  const users = getAll();
  const newUsers = users.filter((u) => u.id !== id);
  if (newUsers.length === users.length) return null;
  save(newUsers);
  return newUsers;
}

function removeByIds(userId: string[]): User[] | null {
  const users = getAll();
  const newUsers = users.filter((user) => !userId.includes(user.id));
  if (newUsers.length === users.length) return null;
  save(newUsers);
  return newUsers;
}

function removeAll(): void {
  save([]);
}

function mockData(): User[] {
  save(mock_users);
  return mock_users;
}

export const userService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
  removeByIds,
  mockData,
};

const mock_users = [
  {
    title: "mr.",
    firstname: "Thanonchai",
    lastname: "Paliwong",
    nationality: "american",
    gender: "Female",
    phone: "+66-0624925424",
    expectedSalary: "20000",
    birthday: "2023/12/04",
    id: "49c6ce35-c9d1-446e-8131-8714d4fdf76c",
    citizenID: "123-3434-2345345-345345-345345",
    passport: "asdadsasd",
  },
  {
    title: "ms.",
    firstname: "Suda",
    lastname: "Wongchai",
    nationality: "thai",
    gender: "Female",
    phone: "+66-0987654321",
    expectedSalary: "25000",
    birthday: "1995/07/21",
    id: "f7e91c89-1eaf-4821-b620-84a5fdab55cc",
    citizenID: "123-4567-8910111-121314-151617",
    passport: "A12345678",
  },
  {
    title: "mr.",
    firstname: "John",
    lastname: "Doe",
    nationality: "american",
    gender: "Male",
    phone: "+1-4165550123",
    expectedSalary: "30000",
    birthday: "1988/02/14",
    id: "e2906a74-e25d-47a4-9d3a-b3401f2538cd",
    citizenID: "987-6543-2109876-543210-123456",
    passport: "B98765432",
  },
  {
    title: "mrs.",
    firstname: "Emily",
    lastname: "Clark",
    nationality: "american",
    gender: "Female",
    phone: "+44-7123456789",
    expectedSalary: "28000",
    birthday: "1990/11/02",
    id: "adc6c210-1531-4ab3-81c4-bf18c3f6b49a",
    citizenID: "111-2222-3333333-444444-555555",
    passport: "C11223344",
  },
  {
    title: "mr.",
    firstname: "Somchai",
    lastname: "Prasert",
    nationality: "thai",
    gender: "Male",
    phone: "+66-0812345678",
    expectedSalary: "22000",
    birthday: "1992/05/10",
    id: "6deeb4c0-90a5-4a8b-9421-fd8d45d70eae",
    citizenID: "666-7777-8888888-999999-000000",
    passport: "T99887766",
  },
  {
    title: "ms.",
    firstname: "Lalisa",
    lastname: "Manoban",
    nationality: "thai",
    gender: "Female",
    phone: "+66-0612345678",
    expectedSalary: "50000",
    birthday: "1997/03/27",
    id: "7fa0ccde-9a3e-4bde-ae90-cd3f2a8a0b4a",
    citizenID: "777-8888-9999999-000000-111111",
    passport: "K12345678",
  },
  {
    title: "mr.",
    firstname: "David",
    lastname: "Smith",
    nationality: "france",
    gender: "Male",
    phone: "+61-412345678",
    expectedSalary: "32000",
    birthday: "1985/06/30",
    id: "00afc1c1-1bc2-4d7f-9d0e-e693df5b5a6f",
    citizenID: "111-3333-2222222-333333-444444",
    passport: "AU654321",
  },
  {
    title: "mrs.",
    firstname: "Samantha",
    lastname: "Lee",
    nationality: "france",
    gender: "Female",
    phone: "+65-81234567",
    expectedSalary: "27000",
    birthday: "1991/09/15",
    id: "d3a6ec13-324b-4c66-9404-bd89b7bb8912",
    citizenID: "123-9999-8888888-777777-666666",
    passport: "SG987654",
  },
  {
    title: "mr.",
    firstname: "Anan",
    lastname: "Chaiyo",
    nationality: "thai",
    gender: "Male",
    phone: "+66-0912345678",
    expectedSalary: "18000",
    birthday: "1996/04/12",
    id: "5e1b3f8b-c62e-4d5b-bd44-1e0b25c51e6c",
    citizenID: "888-7777-6666666-555555-444444",
    passport: "T11112222",
  },
  {
    title: "ms.",
    firstname: "Sara",
    lastname: "O'Connor",
    nationality: "france",
    gender: "Female",
    phone: "+353-851234567",
    expectedSalary: "29000",
    birthday: "1993/08/19",
    id: "bfd95c85-96ae-4b64-9e7f-f3f73b9024aa",
    citizenID: "444-3333-2222222-111111-000000",
    passport: "IR321123",
  },
  {
    title: "mr.",
    firstname: "Chen",
    lastname: "Li",
    nationality: "france",
    gender: "Male",
    phone: "+86-13912345678",
    expectedSalary: "31000",
    birthday: "1989/12/01",
    id: "e1092f6c-eac7-4e80-aea4-4c6f09b55a9e",
    citizenID: "999-8888-7777777-666666-555555",
    passport: "CH123456",
  },
  {
    title: "mrs.",
    firstname: "Maria",
    lastname: "Gomez",
    nationality: "thai",
    gender: "Female",
    phone: "+34-612345678",
    expectedSalary: "24000",
    birthday: "1994/01/25",
    id: "6d07f457-ecf4-40d7-b8a1-4196810f86e5",
    citizenID: "111-2222-3333333-444444-555555",
    passport: "ES765432",
  },
  {
    title: "ms.",
    firstname: "Meena",
    lastname: "Chand",
    nationality: "thai",
    gender: "Female",
    phone: "+91-9876543210",
    expectedSalary: "26000",
    birthday: "1998/10/30",
    id: "0b0f6d1e-5880-4b89-9474-d3e586807437",
    citizenID: "234-5678-9012345-678901-234567",
    passport: "IN123321",
  },
  {
    title: "mr.",
    firstname: "Ali",
    lastname: "Khan",
    nationality: "thai",
    gender: "Male",
    phone: "+92-3001234567",
    expectedSalary: "23000",
    birthday: "1990/03/18",
    id: "c8234d5b-9986-4c38-a147-dde8804c09e5",
    citizenID: "345-6789-0123456-789012-345678",
    passport: "PK987123",
  },
  {
    title: "ms.",
    firstname: "Yuki",
    lastname: "Tanaka",
    nationality: "thai",
    gender: "Female",
    phone: "+81-8012345678",
    expectedSalary: "35000",
    birthday: "1992/06/05",
    id: "a613498e-e80e-44b8-b7b4-f3c3c1973174",
    citizenID: "456-7890-1234567-890123-456789",
    passport: "JP321987",
  },
];
