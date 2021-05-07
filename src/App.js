import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import './App.css';

function CountComponent(props) {
  const countRef = useRef(0);
  useEffect(() => {
    countRef.current = countRef.current + 1;
  });
  return (<div className="counter">
            <p>Current count: {countRef.current} </p>
          </div>);
}

const MemoCountComponent = React.memo( (props) =>  {
  const countRef = useRef(0);
  useEffect(() => {
    countRef.current = countRef.current + 1;
  });
  return (<div className="counter">
            <p>Current count: {countRef.current} </p>
          </div>);
});

const MemoPropsCountComponent = React.memo( (props) => {
  const otherCountRef = useRef(0);
  const testString = 'hello';
  useEffect(() => {
    otherCountRef.current++;
  });
  return (<div className="counter">
            <p>Current count: {otherCountRef.current} </p>
            <p> Function:  {props.stringFunction(testString)} </p>
            <p> Data: {JSON.stringify(props.data)} </p>
          </div>);
});

function App() {
  const [message, setMessage] = useState("");

  const exampleData = {test: "Oui Monsieur"};
  // eslint-disable-next-line
  const memoizedData = useMemo(() => exampleData,[]);

  const stringFunction = (s) => s.split("").reverse().join("");
  const memoizedCB = useCallback(stringFunction, []);

  return (
    <div className="App">
      <header className="App-header">
        Testing rendering of React components
        <input type="text" placeholder="Type something" onChange={ (e) => setMessage(e.target.value)  } />
        <p> {message} </p>
      </header>
      <main>
        <div> <p>Regular Component</p><CountComponent /> </div>
        <div> <p>Using <code>memo</code></p><MemoCountComponent /></div>
        <div> <p>Using <code>memo</code> with props </p><MemoPropsCountComponent data={exampleData} stringFunction={stringFunction} /></div>
        <div> <p>Using <code>memo</code> with <code>useMemo</code> and regular function</p><MemoPropsCountComponent data={memoizedData} stringFunction={stringFunction} /></div>
        <div> <p>Using <code>memo</code> with <code>useMemo</code> and <code>useCallback</code></p><MemoPropsCountComponent data={memoizedData} stringFunction={memoizedCB} /></div>
        
      </main>

    </div>
  );
}

export default App;
