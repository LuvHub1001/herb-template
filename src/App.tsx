import { Suspense } from "react";
import { ErrorBoundary, Loading } from "./components";
import "./App.css";

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
