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
