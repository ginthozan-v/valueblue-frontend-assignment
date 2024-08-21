import { useRef, useState, useMemo, useCallback } from 'react';
import Diagram from './components/Diagram';
import Dropdown from './components/Dropdown';
import SavingButton from './components/SavingButton';
import { getRandomColor } from './utils';

import './App.css';

function App() {
  const diagramRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  const nodes = useMemo(
    () =>
      [...Array(1000).keys()].map((key) => ({
        key: key,
        text: `Label ${key}`,
        color: getRandomColor(),
        loc: `${(key % 50) * 200} ${Math.floor(key / 50) * 100}`,
      })),
    []
  );

  const links = useMemo(
    () =>
      [...Array(5000).keys()].map((key) => ({
        key: -(key + 1),
        from: key * 2,
        to: key * 2 + 1,
        text: `${key * 2} to ${key * 2 + 1}`,
      })),
    []
  );

  const handleDiagramChange = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 5000);
  }, []);

  // CHANGE FONT SIZE OF THE NODE
  const changeNodeFontSize = useCallback(
    (e, obj) => {
      handleDiagramChange();
      const diagram = diagramRef?.current?.getDiagram();
      const selectedNode = diagram.findNodeForKey(Number(obj.part.data.key));
      if (selectedNode) {
        diagram.startTransaction('change text size');
        const graphObject = selectedNode.findObject('TEXT');
        if (graphObject) {
          graphObject.scale *= 2;
        }
        diagram.commitTransaction('change text size');
      }
    },
    [handleDiagramChange]
  );

  // CHANGE FONT SIZE OF THE LINK
  const changeLinkFontSize = useCallback(
    (e, obj) => {
      handleDiagramChange();
      const diagram = diagramRef?.current?.getDiagram();
      const selectedLink = diagram.findLinkForKey(Number(obj.part.data.key));
      if (selectedLink) {
        diagram.startTransaction('change text size');
        const graphObject = selectedLink.findObject('TEXT');
        if (graphObject) {
          graphObject.scale /= 2;
        }
        diagram.commitTransaction('change text size');
      }
    },
    [handleDiagramChange]
  );

  const handleHighlightSelectedNode = useCallback(
    (value) => {
      handleDiagramChange();
      const diagram = diagramRef?.current?.getDiagram();
      diagram.startTransaction('highlight');

      diagram.nodes.each((node) => {
        const shape = node.findObject('SHAPE');
        if (shape) {
          shape.fill = node.data.color;
          shape.stroke = null;
        }
      });

      const selectedNode = diagram.findNodeForKey(Number(value));
      if (selectedNode) {
        const shape = selectedNode.findObject('SHAPE');
        shape.fill = 'green';
        shape.stroke = 'red';
        diagram.commandHandler.scrollToPart(selectedNode);
      }
      diagram.commitTransaction('highlight');
    },
    [handleDiagramChange]
  );
  return (
    <div className="App">
      <div className="header">
        <div>
          <h2>Valueblue Assignment</h2>
          <p>Ginthozan</p>
        </div>

        <div className="btn-group">
          <Dropdown
            optionList={nodes}
            handleChange={handleHighlightSelectedNode}
          />
          <SavingButton isLoading={isSaving} />
        </div>
      </div>
      <Diagram
        diagramRef={diagramRef}
        nodes={nodes}
        links={links}
        changeNodeFontSize={changeNodeFontSize}
        changeLinkFontSize={changeLinkFontSize}
        handleDiagramChange={handleDiagramChange}
      />
    </div>
  );
}

export default App;
