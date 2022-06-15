import styled from "@emotion/styled";
import Description from "components/Description";
import { MouseEvent, useState } from "react";
import Raw from "rhf/useform/Raw";
import ReactHookForm from "rhf/useform/Rhf";
import Yup from "rhf/useform/Yup";

const ButtonNames = ["react", "rhf", "yup"] as const;

const UseFormRoot = styled("div", {
  label: "UseFormRoot"
})(() => {
  return {
    padding: "2rem 4rem"
  };
});

type Selected = "react" | "rhf" | "yup";

type TComponents = {
  [key in Selected]: React.ReactNode;
};

const Components: TComponents = {
  react: <Raw />,
  rhf: <ReactHookForm />,
  yup: <Yup />
};

const UseForm = () => {
  const [close, setClose] = useState(false);
  const [selected, setSelected] = useState<Selected | null>(null);

  const onChangeClose = () => setClose(prev => !prev);

  const onChangeSelected = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setSelected(e.currentTarget.name as Selected);
  };

  return (
    <UseFormRoot>
      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 600 }}>구현 내용</h3>
          <button onClick={onChangeClose}>{close ? "열기" : "닫기"}</button>
        </div>
        {!close && (
          <div>
            <h5 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              회원가입 폼
            </h5>

            <Description
              title="조건"
              descriptions={[
                "name, age, id, password, email 입력",
                "",
                "Type List",
                "age : number",
                "name, id, password, email : string"
              ]}
            />

            <Description
              title="추가 조건"
              descriptions={[
                "name : 5글자 이상, 10글자 이하",
                "age : 10살 이상, 100살 이하",
                "password : 영어만 가능",
                "email : @gmail.com 만 가능"
              ]}
            />

            <Description
              title="코드 확인 시 주의사항"
              descriptions={[
                "react, react-hook-form, react-hook-form + yup",
                "3가지로 구현하였으나 100% 동일한 기능은 아닐 수 있음."
              ]}
            />
          </div>
        )}
      </div>
      <div style={{ margin: "2rem 0" }}>
        {ButtonNames.map(name => (
          <button key={name} name={name} onClick={onChangeSelected}>
            {name} 보기
          </button>
        ))}
      </div>
      {selected && <>{Components[selected]}</>}
    </UseFormRoot>
  );
};

export default UseForm;
