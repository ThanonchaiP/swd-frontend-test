/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dayjs } from "dayjs";

export type ShapeType =
  | "square"
  | "circle"
  | "ellipse"
  | "parallelogram"
  | "trapezoid"
  | "rectangle"
  | "left"
  | "right"
  | "top-bottom";

export type User = {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenID?: string;
  gender: string;
  phone: string;
  passport?: string;
  expectedSalary: string;
};

export type UserFormValues = User & {
  birthday: Dayjs | any;
};
