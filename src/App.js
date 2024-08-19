import './App.css';
import { useState } from 'react';
import Diagram from './components/Diagram';
import { getRandomColor } from './utils';

function App() {
  const [nodes, setNodes] = useState(
    [...Array(1000).keys()].map((key) => ({
      key: key,
      text: 'Label ' + key,
      color: getRandomColor(),
      loc: `${(key % 50) * 200} ${Math.floor(key / 50) * 100}`,
    }))
  );

  const [links, setLinks] = useState(
    [...Array(5000).keys()].map((key) => ({
      key: -(key + 1),
      from: key * 2,
      to: key * 2 + 1,
      text: `${key * 2} to ${key * 2 + 1}`,
    }))
  );

  return (
    <div className="App">
      <Diagram nodes={nodes} links={links} />
    </div>
  );
}

export default App;
