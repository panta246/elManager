import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./useStatistics";

function App() {
  // const [count, setCount] = useState(0);
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("cpu");
  const cpuUsage = useMemo(
    () => statistics.map((stats) => stats.cpuUsage),
    [statistics]
  );
  const ramUsage = useMemo(
    () => statistics.map((stats) => stats.ramUsage),
    [statistics]
  );
  const storageUsage = useMemo(
    () => statistics.map((stats) => stats.storageUsage),
    [statistics]
  );

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "cpu":
        return cpuUsage;
      case "ram":
        return ramUsage;
      case "storage":
        return storageUsage;
    }
  }, [activeView, cpuUsage, ramUsage, storageUsage]);

  return (
    <>
      <div>
        <h6 style={{ fontSize: 14 }}>{activeView}</h6>
        {activeUsages.map((cpu, idx) => {
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
