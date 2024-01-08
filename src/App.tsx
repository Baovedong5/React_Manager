import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { decrement, increment } from "./redux/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Button from "react-bootstrap/Button";

function App() {
  // const count = useSelector((state: RootState) => state.count.value);

  const count = useAppSelector((state) => state.count.value);

  const dispatch = useAppDispatch();

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
        <Button variant="warning">Test Bootstrap</Button>
        <div>
          <button onClick={() => dispatch(increment())}>Increase</button>
          <button onClick={() => dispatch(decrement())}>Decrease</button>
        </div>
      </div>
    </>
  );
}

export default App;
