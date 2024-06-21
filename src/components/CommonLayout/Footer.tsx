import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  justify-content: center;
  align-items: center;
  background-color: grey;
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

function Footer() {
  return <FooterWrapper>Footer</FooterWrapper>;
}

export default Footer;
