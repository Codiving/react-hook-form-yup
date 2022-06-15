import Description from "components/Description";
import ErrorMsg from "components/ErrorMsg";
import Form from "components/Form";
import { useState } from "react";
import { initErrors, initValue, Value } from "./common";

const Raw = () => {
  const [userData, setUserData] = useState<Value>(initValue);
  const [errors, setErrors] = useState(initErrors);

  const onHandleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === "age") {
      const number = Number(value);

      if (typeof number === "number" && !isNaN(number)) {
        setUserData(prev => ({
          ...prev,
          age: number
        }));
      }
      return;
    }

    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Form
        onSubmit={e => {
          e.preventDefault();

          const { name, age, id, password, email } = userData;
          const domain = email.split("@")[1];

          let isError = false;
          const errors = { ...initErrors };

          if (name.length > 10 || name.length < 5) {
            isError = true;
            errors.name = "최대 길이 10, 최소 길이 5 입니다.";
          }

          if (age < 10 || age > 100) {
            isError = true;
            errors.age = "나이는 10 ~ 100 사이 값이어야 합니다.";
          }

          if (!id) {
            isError = true;
            errors.id = "id는 필수 값입니다.";
          }

          const REG = /^[a-zA-Z]*$/;
          if (!REG.test(password)) {
            isError = true;
            errors.password = "비밀번호는 영어만 가능합니다.";
          }

          if (domain !== "gmail.com") {
            isError = true;
            errors.email = "gmail 형식이 아닙니다.";
          }

          if (isError) setErrors(errors);
          else setErrors(initErrors);
        }}
      >
        <input
          value={userData["name"]}
          onChange={onHandleUserData}
          placeholder="name"
          name="name"
          required
          maxLength={10}
          minLength={5}
        />
        {!!errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        <input
          value={userData["age"]}
          onChange={onHandleUserData}
          placeholder="age"
          name="age"
          required
          min={10}
          max={100}
        />
        {!!errors.age && <ErrorMsg>{errors.age}</ErrorMsg>}
        <input
          value={userData["id"]}
          onChange={onHandleUserData}
          placeholder="id"
          name="id"
          required
        />
        {!!errors.id && <ErrorMsg>{errors.id}</ErrorMsg>}
        <input
          value={userData["password"]}
          onChange={onHandleUserData}
          placeholder="password"
          name="password"
          required
          type="password"
          pattern="[a-zA-Z]+"
        />
        {!!errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        <input
          value={userData["email"]}
          onChange={onHandleUserData}
          placeholder="email"
          name="email"
          required
          type="email"
        />
        {!!errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        <input type="submit" />
      </Form>
      <Description
        mt={20}
        title="문제점"
        descriptions={[
          "사용자가 개발자 도구(F12)에 들어가 직접 input element의 속성을 지울 수 있다.",
          "예를들어 required를 삭제할 수 있고, maxLength, minLength와 같은 속성을 다 지울 수 있다.",
          "따라서 제출 눌렀을 때도 한번 더 검사를 해주어야 한다."
        ]}
      />
      <br />
      <a
        href="https://github.com/Codiving/react-hook-form-yup/blob/main/rhf/useform/Raw.tsx"
        target="_blank"
        rel="noreferrer"
      >
        코드 보러 가기
      </a>
    </>
  );
};

export default Raw;
