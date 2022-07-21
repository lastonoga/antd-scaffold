import { createGlobalContext, getContext } from './context';
import { makeOptionStateful } from './options'
import { runAdapters } from './Adapters'

import { isAccessor, accessorFactory } from './Accessors'
import { getComponentOptions, getComponent, isComponent } from '../common'


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
export function RenderComponents(prev_index, components) {
  return components.map((node, i) => {
    const keys = [...prev_index, i];
    return <ComponentWrapper key={`${node.component}-${keys.join('-')}`} keys={keys} node={node} />
  })
}


export function ewa(root) {
  createGlobalContext(root)
  return (
    RenderComponents([0], root)
  );
}
