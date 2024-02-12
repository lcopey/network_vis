# AUTO GENERATED FILE - DO NOT EDIT

export networkvis

"""
    networkvis(;kwargs...)

A NetworkVis component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `edges` (Array of Dicts; optional)
- `labelPosition` (Dict; optional)
- `labelText` (String; optional)
- `labelVisible` (Bool; optional)
- `nodes` (Array of Dicts; optional)
- `selectedEdgeId` (Bool | Real | String | Dict | Array; optional)
- `selectedNodeId` (Bool | Real | String | Dict | Array; optional)
"""
function networkvis(; kwargs...)
        available_props = Symbol[:id, :edges, :labelPosition, :labelText, :labelVisible, :nodes, :selectedEdgeId, :selectedNodeId]
        wild_props = Symbol[]
        return Component("networkvis", "NetworkVis", "network_vis", available_props, wild_props; kwargs...)
end

