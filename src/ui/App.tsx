import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useStatistics } from "./useStatistics";
import { cpuUsage } from "os-utils";

function App() {
  // const [count, setCount] = useState(0);
  const statistics = useStatistics(10);

  const cpuUsage = useMemo(
    () => statistics.map((stats) => stats.cpuUsage),
    [statistics]
  );

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => console.log(view));
  }, []);

  return (
    <>
      <div>
        <h6 style={{ fontSize: 14 }}>CPU usage</h6>
        {cpuUsage.map((cpu, idx) => {
          return (
            <div key={idx}>
              <div
                style={{
                  backgroundColor: "green",
                  color: "blue",
                }}
              >
                {cpu}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
