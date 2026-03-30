# Global State Management Made Easy

### Let's be honest, React's state management is pretty shit. From writing a complicated provider to wrapping our component inside that provider component is not the cleanest way to do it. It creates a dependency of the state with the structure. If I want to make the context available to a new component tommorow, It requires me to update the structure to accomodate the component inside the provider and we dont wanna do that. Don't worry, there is a simpler way.

## Installation

```terminal
> npm install mz-shared-state
```

## Usage

### Let's say we want to share a counter between two components. We will first create a central provider and instantiate our shared state.

```code
//countStateProvider.js
import SharedState from "mz-shared-state";


let countState = new SharedState(0);


export default countState;
```

### We now want to share this instance of shared state between components or code files.

```code
//Component1.jsx
import countState from "./countStateProvider.js";
import { useState, useEffect } from "react";

export default function Component1() {
  const [localCount, setLocalCount] = useState(null);

  useEffect(() => {
    let unsubscribe = countState.subscribe(setLocalCount);

    //cleanup during unmounting
    return () => unsubscribe();
  }, []);

  function increment() {
    countState.publish(localCount + 1);
  }

  return (
    <>
      <p>{localCount}</p>
      <button onClick={increment}>+</button>
    </>
  );
}

```

```code
//App.jsx
import Component1 from "./Component1";

function App() {
  return (
    <>
      <Component1></Component1>
      <Component1></Component1>
    </>
  );
}

export default App;
```

![alt text](output.png)
