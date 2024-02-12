# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class NetworkVis(Component):
    """A NetworkVis component.


Keyword arguments:

- id (string; optional)

- graph (dict; optional)

- label (dict; optional)

- style (dict; default { width: "100%", height: "100%" })"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'network_vis'
    _type = 'NetworkVis'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, graph=Component.UNDEFINED, style=Component.UNDEFINED, getNetwork=Component.UNDEFINED, getNodes=Component.UNDEFINED, getEdges=Component.UNDEFINED, label=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'graph', 'label', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'graph', 'label', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(NetworkVis, self).__init__(**args)
