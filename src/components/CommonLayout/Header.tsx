import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  height: 100px;
  background-color: black;
  font-weight: bold;
  font-size: 20px;
  color: white;
  justify-content: center;
  align-items: center;
`;

function Header() {
  return <HeaderWrapper>HEADER</HeaderWrapper>;
}

export default Header;
