import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

const Loader = () => {
  return (
    <div>
      <MoonLoader color="#3ed4dc" cssOverride={override} />
    </div>
  );
};
export default Loader;
