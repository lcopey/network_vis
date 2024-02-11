/* eslint no-magic-numbers: 0 */
import React, { useState } from 'react';

import { NetworkVis } from '../lib';

const App = () => {

    const [state, setState] = useState({
        nodes: [
            { id: 1, label: 'A' },
            { id: 2, label: 'B' },
            { id: 3, label: 'C' },
            { id: 4, label: 'D' },
            { id: 5, label: 'E' },
            { id: 6, label: 'F' }],
        edges: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 2, to: 4 },
            { from: 4, to: 5 },
            { from: 4, to: 6 }
        ]
    }
    );
    const setProps = (newProps) => {
        setState(newProps);
    };

    return (
        <div>
            <NetworkVis
                setProps={setProps}
                {...state}
            />
        </div>
    )
};


export default App;
