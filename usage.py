from dash import Dash, Input, Output, callback, html

import network_vis

app = Dash(__name__)

nodes = "ABCDEFG"
edges = "AB,BC,BE,FG,AF,DE,AG"
edges = [{"from": nodes.index(i), "to": nodes.index(j)} for i, j in edges.split(",")]
nodes = [{"id": n, "label": label} for n, label in enumerate(nodes)]

network = network_vis.NetworkVis(
    id="network",
    graph=dict(
        nodes=nodes,
        edges=edges,
    )
)
output = html.Div(id="output")
app.layout = html.Div([network, output], style={"height": "600px"})


@callback(Output(output, "children"), Input(network, "id"))
def display_output(value):
    return "You have entered {}".format(value)


if __name__ == "__main__":
    app.run_server(debug=True)
