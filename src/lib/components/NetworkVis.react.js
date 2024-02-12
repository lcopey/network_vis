import React, { useEffect, useRef } from 'react';
import PropTypes, { object, } from 'prop-types';
import { Network } from 'vis-network';
import styled from 'styled-components';

const PopUp = styled.div`
        border: 1px solid #dedede;
        border-radius: 2px;
        background: #fefefeaa;
        margin: 10px;
        padding: 10px;
        white-space: pre-line;
        position: fixed;
    `

const Label = (props) => {
    const { text, x, y, visible } = props;
    const display = visible ? 'initial' : 'none';
    const style = {
        display: display,
        top: `${y}px`,
        left: `${x}px`
    }
    return <PopUp style={style}> {text}</PopUp >
}



/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
const NetworkVis = (props) => {
    const { id,
        nodes,
        edges,
        labelPosition,
        labelVisible,
        labelText,
        setProps } = props;
    const visJsRef = useRef(null);

    const onHover = (event, attrName, refArray) => {
        const hovered = refArray.find(item => event[attrName] === item.id);
        const text = Object
            .entries(hovered)
            .map(item => item.join(': '))
            .join('\n');
        setProps(props => ({
            ...props,
            labelPosition: { x: event.event.clientX, y: event.event.clientY },
            labelVisible: true,
            labelText: text
        }));
    };

    const onBlur = (event) => {
        setProps(props => ({ ...props, labelVisible: false }));
    };

    const onSelect = (event, attrName) => {
        const propName = attrName === 'nodes' ? 'selectedNodeId' : 'selectedEdgeId';
        if (event[attrName]?.length === 1) {
            setProps(props => ({ ...props, [propName]: event[attrName][0] }));
        }
    }
    const onDeselect = (event, attrName) => {
        const propName = attrName === 'nodes' ? 'selectedNodeId' : 'selectedEdgeId';
        setProps(props => ({ ...props, [propName]: undefined }));
    }

    useEffect(() => {
        const network =
            visJsRef.current &&
            new Network(
                visJsRef.current,
                { nodes, edges },
                {
                    autoResize: true,
                    interaction: { hover: true, navigationButtons: false },
                    height: '100%',
                    width: '100%',
                }
            );
        network?.on("selectNode", (event) => { onSelect(event, 'nodes'); });
        network?.on('selectEdge', (event) => { onSelect(event, 'edges'); });
        network?.on('deselectNode', (event) => onDeselect(event, 'nodes'));
        network?.on('deselectEdge', (event) => onDeselect(event, 'edges'));
        network?.on("hoverNode", (event) => onHover(event, 'node', nodes));
        network?.on('blurNode', onBlur);
        network?.on('hoverEdge', (event) => onHover(event, 'edge', edges));
        network?.on('blurEdge', onBlur);
        network?.on('dragging', (event) => {
            setProps(props => ({ ...props, labelVisible: false }));
        });
    }, [visJsRef, nodes, edges]);

    console.log(props.selectedEdgeId, props.selectedNodeId);

    return (
        <div>
            <div id={id} ref={visJsRef} />
            <Label
                text={labelText}
                x={labelPosition.x}
                y={labelPosition.y}
                visible={labelVisible}
            />
        </div>
    );
}

NetworkVis.defaultProps = {
    labelPosition: { x: 0, y: 0 },
    labelVisible: false,
    labelText: ''
};

NetworkVis.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,
    nodes: PropTypes.arrayOf(object),
    edges: PropTypes.arrayOf(object),
    labelPosition: PropTypes.object,
    labelVisible: PropTypes.bool,
    labelText: PropTypes.string,
    selectedNodeId: PropTypes.any,
    selectedEdgeId: PropTypes.any,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

export default NetworkVis;
