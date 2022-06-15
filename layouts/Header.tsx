import styled from "@emotion/styled";
import Link from "next/link";

const Routes = ["useform", "useFormContext", "usewatch", "usefieldarray"];

const UIHeader = styled("header", {
  label: "Header"
})(() => {
  return {};
});

const UINav = styled("nav", {
  label: "HeaderNav"
})(() => {
  return {};
});

const UIUl = styled("ul", {
  label: "HeaderUL"
})(() => {
  return {
    display: "flex",
    justifyContent: "space-evenly",
    borderLeft: "1px solid",
    borderBottom: "1px solid",
    borderTop: "1px solid"
  };
});

const UILi = styled("li", {
  label: "HeaderLi"
})(() => {
  return {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    borderRight: "1px solid"
  };
});

const A = styled("a")(() => {
  return {
    display: "block",
    padding: 6,
    cursor: "pointer"
  };
});

const Header = () => {
  return (
    <UIHeader>
      <UINav>
        <UIUl>
          {Routes.map(route => (
            <UILi key={route}>
              <Link href={route}>
                <A>{route}</A>
              </Link>
            </UILi>
          ))}
        </UIUl>
      </UINav>
    </UIHeader>
  );
};

export default Header;
