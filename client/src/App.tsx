import Router from "./Router";
import {CiDark} from "react-icons/ci";
import {FiSun} from "react-icons/fi";
import {useLogIN} from "../ContextLog";

const App = () => {
  const {dark, setdark} = useLogIN();

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "0",

          right: "0",
          margin: "1rem",
          zIndex: 100,
        }}
      >
        {dark ? (
          <FiSun
            size="2rem"
            style={{
              color: dark ? "rgb(103 232 249)" : "black",
            }}
            onClick={() => setdark(false)}
          />
        ) : (
          <CiDark
            size="2rem"
            style={{
              color: dark ? "rgb(103 232 249)" : "rgb(103 232 249)",
            }}
            onClick={() => setdark(true)}
          />
        )}
      </div>

      <Router />
    </div>
  );
};

export default App;
