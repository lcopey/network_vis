# AUTO GENERATED FILE - DO NOT EDIT

#' @export
networkVis <- function(id=NULL, getEdges=NULL, getNetwork=NULL, getNodes=NULL, graph=NULL, label=NULL, style=NULL) {
    
    props <- list(id=id, getEdges=getEdges, getNetwork=getNetwork, getNodes=getNodes, graph=graph, label=label, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'NetworkVis',
        namespace = 'network_vis',
        propNames = c('id', 'getEdges', 'getNetwork', 'getNodes', 'graph', 'label', 'style'),
        package = 'networkVis'
        )

    structure(component, class = c('dash_component', 'list'))
}
