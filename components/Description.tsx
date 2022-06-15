import styled from "@emotion/styled";

const DescriptionRoot = styled("div", {
  label: "Description"
})<{ $mt?: number; $mb?: number }>(({ $mt, $mb }) => {
  return {
    marginTop: $mt,
    marginBottom: $mb ?? 30
  };
});

const Title = styled("h3")(() => {
  return {
    fontWeight: 600,
    marginBottom: 10
  };
});

interface IDescription {
  title: string;
  descriptions: string[];
  mt?: number;
  mb?: number;
}

const Description = (props: IDescription) => {
  const { title, descriptions, mb, mt } = props;
  return (
    <DescriptionRoot $mb={mb} $mt={mt}>
      <Title>{title}</Title>
      {descriptions.map((description, index) => {
        if (description === "") return <br key={index} />;
        return <p key={index}>{description}</p>;
      })}
    </DescriptionRoot>
  );
};

export default Description;
