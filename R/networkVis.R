# AUTO GENERATED FILE - DO NOT EDIT

#' @export
networkVis <- function(id=NULL, edges=NULL, labelPosition=NULL, labelText=NULL, labelVisible=NULL, nodes=NULL, selectedEdgeId=NULL, selectedNodeId=NULL) {
    
    props <- list(id=id, edges=edges, labelPosition=labelPosition, labelText=labelText, labelVisible=labelVisible, nodes=nodes, selectedEdgeId=selectedEdgeId, selectedNodeId=selectedNodeId)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'NetworkVis',
        namespace = 'network_vis',
        propNames = c('id', 'edges', 'labelPosition', 'labelText', 'labelVisible', 'nodes', 'selectedEdgeId', 'selectedNodeId'),
        package = 'networkVis'
        )

    structure(component, class = c('dash_component', 'list'))
}
