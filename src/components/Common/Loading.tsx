import styled from "styled-components";
import { CircularProgress } from "@mui/material/";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
}

export default Loading;
