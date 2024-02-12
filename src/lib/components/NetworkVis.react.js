import React, { Component } from "react";
import defaultsDeep from "lodash/fp/defaultsDeep";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import intersectionWith from "lodash/intersectionWith";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const diff = (current, next, field = "id") => {
    // consider caching this value between updates
    const nextIds = new Set(next.map((item) => item[field]));
    const removed = current.filter((item) => !nextIds.has(item[field]));

    const unchanged = intersectionWith(next, current, isEqual);

    const updated = differenceWith(
        intersectionWith(next, current, (a, b) => a[field] === b[field]),
        unchanged,
        isEqual
    );

    const added = differenceWith(
        differenceWith(next, current, isEqual),
        updated,
        isEqual
    );

    return {
        removed,
        unchanged,
        updated,
        added,
    };
};


class NetworkVis extends Component {
    constructor(props) {
        super(props);
        this.updateGraph = this.updateGraph.bind(this);
        this.defaultEvent = {
            'hoverNode': (event) => {
                console.log('hoverNode event');
                this.props.setProps(props => ({
                    ...props,
                    label: { x: event.event.clientX, y: event.event.clientY }
                })
                )
                // this.forceUpdate();
            }
        }
        this.container = React.createRef();
    }

    componentDidMount() {
        this.edges = new DataSet();
        this.edges.add(this.props.graph.edges);
        this.nodes = new DataSet();
        this.nodes.add(this.props.graph.nodes);
        this.updateGraph();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        let nodesChange = !isEqual(this.props.graph.nodes, nextProps.graph.nodes);
        let edgesChange = !isEqual(this.props.graph.edges, nextProps.graph.edges);
        let optionsChange = !isEqual(this.props.options, nextProps.options);
        let eventsChange = !isEqual(this.props.events, nextProps.events);

        if (nodesChange) {
            const idIsEqual = (n1, n2) => n1.id === n2.id;
            const nodesRemoved = differenceWith(this.props.graph.nodes, nextProps.graph.nodes, idIsEqual);
            const nodesAdded = differenceWith(nextProps.graph.nodes, this.props.graph.nodes, idIsEqual);
            const nodesChanged = differenceWith(
                differenceWith(nextProps.graph.nodes, this.props.graph.nodes, isEqual),
                nodesAdded
            );
            this.patchNodes({ nodesRemoved, nodesAdded, nodesChanged });
        }

        if (edgesChange) {
            const {
                removed: edgesRemoved,
                added: edgesAdded,
                updated: edgesChanged,
            } = diff(this.props.graph.edges, nextProps.graph.edges);

            this.patchEdges({ edgesRemoved, edgesAdded, edgesChanged });
        }

        if (optionsChange) {
            this.Network.setOptions(nextProps.options);
        }

        if (eventsChange) {
            let events = this.props.events || this.defaultEvent;
            for (let eventName of Object.keys(events)) this.Network.off(eventName, events[eventName]);

            events = nextProps.events || this.defaultEvent;
            for (let eventName of Object.keys(events)) this.Network.on(eventName, events[eventName]);
        }

        return false;
    }

    componentDidUpdate() {
        this.updateGraph();
    }

    patchEdges({ edgesRemoved, edgesAdded, edgesChanged }) {
        this.edges.remove(edgesRemoved);
        this.edges.add(edgesAdded);
        this.edges.update(edgesChanged);
    }

    patchNodes({ nodesRemoved, nodesAdded, nodesChanged }) {
        this.nodes.remove(nodesRemoved);
        this.nodes.add(nodesAdded);
        this.nodes.update(nodesChanged);
    }

    updateGraph() {
        let defaultOptions = {
            physics: {
                stabilization: true
            },
            autoResize: false,
            edges: {
                smooth: true,
                color: "#000000",
                width: 0.5,
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5
                    }
                }
            },
            interaction: { hover: true }
        };

        // merge user provied options with our default ones
        let options = defaultsDeep(defaultOptions, this.props.options);

        this.Network = new Network(
            this.container.current,
            Object.assign({}, this.props.graph, {
                edges: this.edges,
                nodes: this.nodes
            }),
            options
        );

        if (this.props.getNetwork) {
            this.props.getNetwork(this.Network);
        }

        if (this.props.getNodes) {
            this.props.getNodes(this.nodes);
        }

        if (this.props.getEdges) {
            this.props.getEdges(this.edges);
        }


        // Add user provided events to network
        // let events = this.props.events || {};
        let events = this.props.events || this.defaultEvent;
        for (let eventName of Object.keys(events)) {
            this.Network.on(eventName, events[eventName]);
        }
    }

    render() {
        // const { identifier } = this.state;
        const { id, style } = this.props;
        console.log(this.props);
        return <div id={id} ref={this.container} style={style} />
    }
}

NetworkVis.defaultProps = {
    graph: {},
    style: { width: "100%", height: "100%" }
};
NetworkVis.propTypes = {
    id: PropTypes.string,
    graph: PropTypes.object,
    style: PropTypes.object,
    getNetwork: PropTypes.func,
    getNodes: PropTypes.func,
    getEdges: PropTypes.func,
    setProps: PropTypes.func,
    label: PropTypes.object,
};


// NetworkVis.defaultProps = {
//     labelPosition: { x: 0, y: 0 },
//     labelVisible: false,
//     labelText: ''
// };

// NetworkVis.propTypes = {
//     /**
//      * The ID used to identify this component in Dash callbacks.
//      */
//     id: PropTypes.string,
//     nodes: PropTypes.arrayOf(object),
//     edges: PropTypes.arrayOf(object),
//     labelPosition: PropTypes.object,
//     labelVisible: PropTypes.bool,
//     labelText: PropTypes.string,
//     selectedNodeId: PropTypes.any,
//     selectedEdgeId: PropTypes.any,

//     /**
//      * Dash-assigned callback that should be called to report property changes
//      * to Dash, to make them available for callbacks.
//      */
//     setProps: PropTypes.func
// };

export default NetworkVis;
