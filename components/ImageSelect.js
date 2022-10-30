import styled from "styled-components";

export const Image = styled.img`
  width: 40px;
  cursor: pointer;
`;

export const InactiveImage = styled.img`
  width: 40px;
  opacity: 30%;
  cursor: pointer;
`;

const ImageSelect = ({ active, logo, onClick }) => {
  const handleClick = (bc) => {
    const data = blockchains.map((x) => {
      x.active = x.title == bc.title;

      return x;
    });
    setAppState((prev) => ({ ...prev, blockchains: data }));
  };

  if (active) return <Image src={logo} onClick={onClick} />;
  return <InactiveImage src={logo} onClick={onClick} />;
};

export default ImageSelect;
