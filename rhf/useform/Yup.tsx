import { yupResolver } from "@hookform/resolvers/yup";
import Description from "components/Description";
import ErrorMsg from "components/ErrorMsg";
import Form from "components/Form";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { errorMsg, initValue, NAME, validation } from "./common";

const schema = yup.object({
  name: yup
    .string()
    .required(errorMsg.required)
    .max(validation.name.max, `최대 길이 ${validation.name.max} 입니다.`)
    .min(validation.name.min, `최소 길이 ${validation.name.min} 입니다.`),
  age: yup
    .number()
    .required(errorMsg.required)
    .typeError("숫자만 가능합니다.")
    .max(validation.age.max, `최대 나이는 ${validation.age.max} 입니다.`)
    .min(validation.age.min, `최소 나이는 ${validation.age.min} 입니다.`),
  id: yup.string().required(errorMsg.required),
  password: yup
    .string()
    .required(errorMsg.required)
    .test("notEnglish", "영어만 가능합니다.", value => {
      if (!value) return false;

      const REG = /^[a-zA-Z]*$/;
      return REG.test(value);
    }),
  email: yup
    .string()
    .required(errorMsg.required)
    .email("email 형식이 아닙니다.")
    .test("notGmail", "gmail만 가능합니다.", value => {
      if (!value) return false;
      const splited = value.split("@");
      if (splited[1] === "gmail.com") return true;
      return false;
    })
});

const Yup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    defaultValues: initValue,
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <>
          {NAME.map(name => {
            return (
              <React.Fragment key={name}>
                <input placeholder={name} {...register(name)} />
                {!!errors[name] && <ErrorMsg>{errors[name]?.message}</ErrorMsg>}
              </React.Fragment>
            );
          })}

          <input type="submit" />
        </>
      </Form>
      <Description
        title="문제점"
        descriptions={[
          "숫자 타입 input인데 초기값이 0이면 012345 이런 식으로 값이 들어간다."
        ]}
        mt={20}
      />
      <br />
      <a
        href="https://github.com/Codiving/react-hook-form-yup/blob/main/rhf/useform/Yup.tsx"
        target="_blank"
        rel="noreferrer"
      >
        코드 보러 가기
      </a>
    </>
  );
};

export default Yup;
