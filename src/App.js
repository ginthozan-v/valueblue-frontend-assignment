import './App.css';
import { useRef, useState } from 'react';
import Diagram from './components/Diagram';
import { getRandomColor } from './utils';
import Dropdown from './components/Dropdown';

function App() {
  const diagramRef = useRef(null);

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

  const handleHighlightSelectedNode = (value) => {
    const diagram = diagramRef?.current?.getDiagram();
    const selectedNode = diagram.findNodeForKey(Number(value));
    diagram.startTransaction('highlight');
    diagram.select(selectedNode);
    diagram.commandHandler.scrollToPart(selectedNode);
    diagram.commitTransaction('highlight');
  };

  return (
    <div className="App">
      <div className="header">
        <div>
          <h2>Valueblue Assignment</h2>
          <p>Ginthozan</p>
        </div>

        <Dropdown
          optionList={nodes}
          handleChange={handleHighlightSelectedNode}
        />
      </div>
      <Diagram diagramRef={diagramRef} nodes={nodes} links={links} />
    </div>
  );
}

export default App;
