import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { useCallback } from 'react';

const Diagram = ({
    diagramRef,
    nodes,
    links,
    changeNodeFontSize,
    changeLinkFontSize,
    handleDiagramChange,
}) => {
    
    // CREATE CONTEXT MENU BUTTON
    const createContextMenuButton = (text, action) =>
        go.GraphObject.make("ContextMenuButton",
            go.GraphObject.make(go.TextBlock, text),
            { click: action }
        );

    // CREATE NODES
    const createNodeTemplate = useCallback(() => (
        go.GraphObject.make(go.Node, 'Auto',
            {
                resizable: true,
                selectionObjectName: 'NODE',
                width: 70,
                height: 70,
                contextMenu: go.GraphObject.make(go.Adornment, 'Vertical',
                    createContextMenuButton('Change Font Size', changeNodeFontSize)
                ),
            },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            go.GraphObject.make(go.Shape, 'Circle', {
                strokeWidth: 4,
                stroke: null,
                name: 'SHAPE',
                portId: '',
                fromLinkable: true,
                toLinkable: true,
                cursor: 'pointer',
            }, new go.Binding('fill', 'color')),
            go.GraphObject.make(go.TextBlock, {
                margin: 8,
                font: '10px Verdana',
                name: 'TEXT',
            },
                new go.Binding('text').makeTwoWay(),
                new go.Binding('font').makeTwoWay())
        )
    ), [changeNodeFontSize]);

    // CREATE LINKS
    const createLinkTemplate = useCallback(() => (
        go.GraphObject.make(go.Link,
            {
                reshapable: true,
                resegmentable: true,
                relinkableFrom: true,
                relinkableTo: true,
                adjusting: go.LinkAdjusting.Stretch,
                contextMenu: go.GraphObject.make(go.Adornment, 'Vertical',
                    createContextMenuButton('Change Font Size', changeLinkFontSize)
                ),
            },
            new go.Binding('points').makeTwoWay(),
            new go.Binding('fromSpot', 'fromSpot', go.Spot.parse).makeTwoWay(go.Spot.stringify),
            new go.Binding('toSpot', 'toSpot', go.Spot.parse).makeTwoWay(go.Spot.stringify),
            go.GraphObject.make(go.Shape),
            go.GraphObject.make(go.Shape, { toArrow: 'Standard' }),
            go.GraphObject.make(go.TextBlock, {
                name: 'TEXT',
                segmentOffset: new go.Point(0, -10),
            },
                new go.Binding('text').makeTwoWay(),
                new go.Binding('font').makeTwoWay())
        )
    ), [changeLinkFontSize]);

    // INITIALIZE THE DIAGRAM AND MEMOIZE
    const initDiagram = useCallback(() => {
        const diagram = go.GraphObject.make(go.Diagram, {
            'undoManager.isEnabled': true,
            model: go.GraphObject.make(go.GraphLinksModel, {
                linkKeyProperty: 'key',
            }),
        });

        diagram.nodeTemplate = createNodeTemplate();
        diagram.linkTemplate = createLinkTemplate();

        return diagram;
    }, [createNodeTemplate, createLinkTemplate]);

    return (
        <ReactDiagram
            ref={diagramRef}
            initDiagram={initDiagram}
            divClassName="diagram-component"
            nodeDataArray={nodes}
            linkDataArray={links}
            onModelChange={handleDiagramChange}
        />
    );
};

export default Diagram;
