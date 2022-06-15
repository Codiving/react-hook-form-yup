import Description from "components/Description";
import ErrorMsg from "components/ErrorMsg";
import Form from "components/Form";
import { FieldErrors, useForm } from "react-hook-form";
import { initValue, Value } from "./common";

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Value>({
    mode: "onSubmit",
    defaultValues: initValue
  });

  const onValid = (data: Value) => {
    console.log("# onValid", data);
  };

  const onInValid = (errors: FieldErrors) => {
    console.log("# onInValid", errors);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <input
          {...register("name", {
            required: "이름은 필수 값입니다.",
            minLength: {
              value: 5,
              message: "이름은 5글자 이상이어야합니다."
            },
            maxLength: {
              value: 10,
              message: "이름은 10글자 이하이어야 합니다."
            }
          })}
          placeholder="name"
        />
        {errors?.name?.message && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        <input
          {...register("age", {
            required: "나이는 필수 값입니다.",
            valueAsNumber: true,
            validate: {
              numberType: value => value > 0 || "숫자만 가능합니다."
            },
            min: {
              value: 10,
              message: "나이는 10살 이상이어야 합니다."
            },
            max: {
              value: 100,
              message: "나이는 100살 이하이어야 합니다."
            }
          })}
          placeholder="age"
        />
        {errors?.age?.message && <ErrorMsg>{errors.age.message}</ErrorMsg>}
        <input
          {...register("id", { required: "id는 필수 값 입니다." })}
          placeholder="id"
        />
        {errors?.id?.message && <ErrorMsg>{errors.id.message}</ErrorMsg>}
        <input
          {...register("password", {
            required: "비밀번호는 필수 값입니다.",
            pattern: {
              value: /^[a-zA-Z]*$/,
              message: "비밀번호는 영어만 가능합니다."
            }
          })}
          type="password"
          placeholder="password"
        />
        {errors?.password?.message && (
          <ErrorMsg>{errors.password.message}</ErrorMsg>
        )}
        <input
          {...register("email", {
            required: "email은 필수 값 입니다.",
            validate: {
              domainCheck: email =>
                email.split("@")[1] === "gmail.com" || "gmail만 가능합니다."
            }
          })}
          type="email"
          placeholder="email"
        />

        {errors?.email?.message && <ErrorMsg>{errors.email.message}</ErrorMsg>}

        <input type="submit" />
      </Form>
      <Description
        mt={20}
        title="문제점"
        descriptions={[
          "모든 validation 처리를 할 수 있으나 깔끔하게 되지 않는다."
        ]}
      />
    </>
  );
};

export default ReactHookForm;
