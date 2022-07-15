import { EwaConfig } from '../Renderer';
import { isAccessor, } from '../Renderer/Accessors'
import { isMutator, } from '../Renderer/Mutators'


function getComponent(name) {
    if (!EwaConfig.components[name]) {
        throw Error(`There is no component:${name} registered`);
    }
    return EwaConfig.components[name];
}

function isComponent(value) {
  if(typeof value !== 'object') {
    return false;
  }

  return typeof value.component !== 'undefined';
}

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
        <Component {...Options} data-ewa={`${node.component}-${keys.join('-')}`}>
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
        return <ComponentWrapper key={`${node.component}-${keys.join('-')}`} keys={keys} node={node} />
    })
}