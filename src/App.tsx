import { Suspense } from "react";
import { ErrorBoundary, Loading } from "./components";
import "./App.css";

const A = () => {
  throw new Error();
};

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Loading />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
