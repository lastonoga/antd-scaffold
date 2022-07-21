import { getComponent, isComponent } from '../common';
import { isAccessor, } from '../Renderer/Accessors'
import { isMutator, } from '../Renderer/Mutators'
import { TreeOperator } from './tree';



function makeOptionStateless(options) {
    let statelessOptions = {}

    for(let key in options) {
      const option = options[key];
      if(!isAccessor(option) && !isMutator(option)) {
        statelessOptions[key] = option;
      }
    }

    if(!statelessOptions.className) {
        statelessOptions.className = '';
    }

    statelessOptions.className += ` ewa-component`

    return statelessOptions;
}

function ComponentWrapper({ keys, node }) {

    if(!isComponent(node)) {
      return node;
    }

    let Component = getComponent(node.component);
    let Options = makeOptionStateless(node.options);

    // Render self-closed tags
    if (!node.children || (node.children && node.children.length === 0)) {
        return <Component {...Options} />
    }

    // Render nested components
    return (
        <Component {...Options} data-ewa={TreeOperator.path(keys)}>
          {RenderComponents(keys, node.children || [])}
        </Component>
    )
}


/**
 * Tree renderer
 */
export function RenderComponents(prev_index, components) {
    return components.map((node, i) => {
        const keys = [...prev_index, i];
        return <ComponentWrapper key={TreeOperator.uid(node, keys)} keys={keys} node={node} />
    })
}