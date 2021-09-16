import "./styles.css";
import { Counter } from "./Counter";

export default function App() {
  return (
    <div className="App">
      <>
        <div style={{ height: "120vh" }}>
          <h1>scroll down to trigger animation</h1>
        </div>
        <div className="row">
          {[{ value: "24hours" }, { value: "890km/h" }, { value: "100%" }].map(
            ({ value }, idx: number) => (
              <div key={idx} className="col-4">
                <Counter amount={value} duration={24} />
              </div>
            )
          )}
        </div>
        <div style={{ height: "50vh" }}></div>
      </>
    </div>
  );
}
