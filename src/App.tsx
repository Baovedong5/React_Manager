import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { increment } from "./redux/counter/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.count.value);

  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>My current count = {count} </h1>
        <div>
          <button onClick={() => dispatch(increment())}>Increase + 1</button>
        </div>
      </div>
    </>
  );
}

export default App;
