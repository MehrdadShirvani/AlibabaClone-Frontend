import { Button } from "@/components/ui/button";
import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import agent from "../api/agent";
import CityDropdown from "@/features/city/CityDropdown";
import TransportationSearchForm from "@/features/transportation/transportationSearchForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Button>Click me</Button>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          <h2>Choose the transportation search form</h2>
          <TransportationSearchForm />
        </div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {
        //console.log(agent.TransportationSearch());
      }
    </>
  );
}

export default App;
