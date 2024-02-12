# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class NetworkVis(Component):
    """A NetworkVis component.
    ExampleComponent is an example component.
    It takes a property, `label`, and
    displays it.
    It renders an input with the property `value`
    which is editable by the user.

    Keyword arguments:

    - id (string; optional):
        The ID used to identify this component in Dash callbacks.

    - edges (list of dicts; optional)

    - labelPosition (dict; default { x: 0, y: 0 })

    - labelText (string; default '')

    - labelVisible (boolean; default False)

    - nodes (list of dicts; optional)

    - selectedEdgeId (boolean | number | string | dict | list; optional)

    - selectedNodeId (boolean | number | string | dict | list; optional)"""

    _children_props = []
    _base_nodes = ["children"]
    _namespace = "network_vis"
    _type = "NetworkVis"

    @_explicitize_args
    def __init__(
        self,
        id=Component.UNDEFINED,
        nodes=Component.UNDEFINED,
        edges=Component.UNDEFINED,
        labelPosition=Component.UNDEFINED,
        labelVisible=Component.UNDEFINED,
        labelText=Component.UNDEFINED,
        selectedNodeId=Component.UNDEFINED,
        selectedEdgeId=Component.UNDEFINED,
        **kwargs
    ):
        self._prop_names = [
            "id",
            "edges",
            "labelPosition",
            "labelText",
            "labelVisible",
            "nodes",
            "selectedEdgeId",
            "selectedNodeId",
        ]
        self._valid_wildcard_attributes = []
        self.available_properties = [
            "id",
            "edges",
            "labelPosition",
            "labelText",
            "labelVisible",
            "nodes",
            "selectedEdgeId",
            "selectedNodeId",
        ]
        self.available_wildcard_properties = []
        _explicit_args = kwargs.pop("_explicit_args")
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(NetworkVis, self).__init__(**args)
