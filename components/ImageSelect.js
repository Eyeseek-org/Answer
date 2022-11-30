import styled from 'styled-components';

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
  if (active) return <Image src={logo} onClick={onClick} alt="icon" />;
  return <InactiveImage src={logo} onClick={onClick} alt="icon" />;
};

export default ImageSelect;
