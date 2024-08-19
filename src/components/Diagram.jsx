import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

const Diagram = ({ nodes, links, handleClickContextMenuButton }) => {
    const initDiagram = () => {
        const diagram = new go.Diagram({
            'undoManager.isEnabled': true,
            'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
            'linkingTool.portGravity': 20,
            'relinkingTool.fromHandleArchetype': new go.Shape('Triangle',
                { width: 10, height: 10, fill: 'limegreen', segmentIndex: 0, cursor: 'pointer' }),
                    model:  new go.GraphLinksModel({
                        linkKeyProperty: 'key',
                    }),
        });

        diagram.nodeTemplate = new go.Node('Auto', {
            resizable: true,
            selectionObjectName: 'NODE',
            width: 70,
            height: 70
        })
            .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
            .add(
                new go.Shape('Circle', {
                    name: 'SHAPE',
                    fill: 'white',
                    strokeWidth: 0,
                }).bind('fill', 'color'),
                new go.TextBlock({ margin: 8, editable: true }).bindTwoWay('text')
            );

        diagram.linkTemplate = new go.Link().add(
            new go.Shape(),
            new go.Shape({ toArrow: 'Standard' }),
            new go.TextBlock().bind('text')
        );

        return diagram;
    }

    return (
        <ReactDiagram
            initDiagram={initDiagram}
            divClassName="diagram-component"
            nodeDataArray={nodes}
            linkDataArray={links}
        />
    );
};

export default Diagram;
