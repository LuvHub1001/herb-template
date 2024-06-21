import { Header, Footer } from "../components";

function withCommonLayout(Component: any) {
  const WrappedComponent = () => {
    return (
      <div>
        <Header />
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 200px)",
          }}
        >
          <Component />
        </div>

        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}

export default withCommonLayout;
