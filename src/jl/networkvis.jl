# AUTO GENERATED FILE - DO NOT EDIT

export networkvis

"""
    networkvis(;kwargs...)

A NetworkVis component.

Keyword arguments:
- `id` (String; optional)
- `graph` (Dict; optional)
- `label` (Dict; optional)
- `style` (Dict; optional)
"""
function networkvis(; kwargs...)
        available_props = Symbol[:id, :graph, :label, :style]
        wild_props = Symbol[]
        return Component("networkvis", "NetworkVis", "network_vis", available_props, wild_props; kwargs...)
end

