import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

const Diagram = ({ diagramRef, nodes, links }) => {
    const initDiagram = () => {
        const diagram = new go.Diagram({
            'undoManager.isEnabled': true,
            'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
            model: new go.GraphLinksModel({
                linkKeyProperty: 'key',
            }),
        });

        function changeNodeFontSize(e, obj) {
            const selectedNode = diagram.findNodeForKey(Number(obj.part.data.key));
            if (selectedNode !== null) {
                diagram.startTransaction('change text size');
                const graphObject = selectedNode.findObject('NODE');
                if (graphObject !== null) {
                    graphObject.scale *= 2;
                }
                diagram.commitTransaction('change text size');
            }
        }

        function changeLinkFontSize(e, obj) {
            const selectedLink = diagram.findLinkForKey(Number(obj.part.data.key));
            if (selectedLink !== null) {
                diagram.startTransaction('change text size');
                const graphObject = selectedLink.findObject('NODE');
                if (graphObject !== null) {
                    graphObject.scale /= 2;
                }
                diagram.commitTransaction('change text size');
            }
        }

        // NODES
        diagram.nodeTemplate = new go.Node('Auto', {
            contextMenu: go.GraphObject.build('ContextMenu')
                .add(
                    go.GraphObject.build('ContextMenuButton', {
                        click: (e, obj) => changeNodeFontSize(e, obj)
                    })
                        .add(new go.TextBlock('change the font size'))
                ),
            resizable: true,
            selectionObjectName: 'NODE',
            width: 70,
            height: 70,
        })
            .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
            .add(
                new go.Shape('Circle', {
                    name: 'SHAPE',
                    strokeWidth: 0,
                    portId: "",
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: "pointer"
                })
                    .bind('fill', 'color'),

                new go.TextBlock({ name: 'NODE', margin: 8 })
                    .bindTwoWay('text')
                    .bindTwoWay('font')
            );

        // LINK BETWEEN NODES
        diagram.linkTemplate = new go.Link({
            contextMenu: go.GraphObject.build('ContextMenu')
                .add(
                    go.GraphObject.build('ContextMenuButton', {
                        click: (e, obj) => changeLinkFontSize(e, obj)
                    })
                        .add(new go.TextBlock('change the font size'))
                ),
            reshapable: true,
            resegmentable: true,
            relinkableFrom: true,
            relinkableTo: true,
            adjusting: go.LinkAdjusting.Stretch
        })
            .bindTwoWay('points')
            .bindTwoWay('fromSpot', 'fromSpot', go.Spot.parse, go.Spot.stringify)
            .bindTwoWay('toSpot', 'toSpot', go.Spot.parse, go.Spot.stringify)
            .add(
                new go.Shape(),
                new go.Shape({ toArrow: 'Standard' }),
                new go.TextBlock({ name: 'NODE', segmentOffset: new go.Point(0, -10) })
                    .bind('text')
                    .bindTwoWay('font')

            );

        return diagram;
    }

    return (
        <ReactDiagram
            ref={diagramRef}
            initDiagram={initDiagram}
            divClassName="diagram-component"
            nodeDataArray={nodes}
            linkDataArray={links}
        />
    );
};

export default Diagram;
