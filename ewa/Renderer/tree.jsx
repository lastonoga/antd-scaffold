import { createAtoms, getContext, Atoms, makeOptionStateful } from './store'
import { runAdapters } from './Adapters'

import { isAccessor, accessorFactory } from './Accessors'
import { EwaContext } from './index';
import { Components } from '../../lib/builder/antd'

function getComponent(name) {
  return Components[name];
}

function isComponent(value) {
  if(typeof value !== 'object') {
    return false;
  }

  return typeof value.component !== 'undefined';
}

function ComponentWrapper({ keys, node }) {
  const context = getContext(node);

  if(isAccessor(node)) {
    return accessorFactory(node).get(context);
  }

  if(typeof node === 'string') {
    return node;
  }

  if(!isComponent(node)) {
    throw Error(`Undefined Node ${node}`)
  }

  runAdapters(context, node);

  let Component = getComponent(node.component);
  let Options = makeOptionStateful(context, node.options)

  // Render self-closed tags
  if(!node.children || (node.children && node.children.length === 0)) {
    return <Component {...Options} />
  }

  // Render nested components
  return (
    <Component {...Options}>
    {RenderComponents(keys, node.children || [])}
    </Component>
  )
}


/**
 * Tree renderer
 */
function RenderComponents(prev_index, components) {
  return components.map((node, i) => {
    const keys = [...prev_index, i];
    return <ComponentWrapper key={`${node.component}-${keys.join('-')}`} keys={keys} node={node} />
  })
}


export function ewa(root) {
  createAtoms(root)
  return (
    RenderComponents([0], root)
  );
}
