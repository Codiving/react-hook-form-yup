const STRING_NAME = ["name", "id", "password", "email"] as const;
const NUMBER_NAME = ["age"] as const;
export const NAME = [
  STRING_NAME[0],
  ...NUMBER_NAME,
  ...STRING_NAME.slice(1)
] as const;

type StringName = typeof STRING_NAME[number];
type NumberName = typeof NUMBER_NAME[number];

export type Value = {
  [key in StringName]: string;
} & {
  [key in NumberName]: number;
};

export const initValue: Value = {
  name: "",
  age: 0,
  id: "",
  password: "",
  email: ""
};

export const initErrors = {
  name: "",
  age: "",
  id: "",
  password: "",
  email: ""
};

export const errorMsg = {
  required: "필수 값입니다.",
  onlyEnglish: "영어만 가능합니다."
};

export const validation = {
  name: { min: 5, max: 10 },
  age: { min: 10, max: 100 }
};
