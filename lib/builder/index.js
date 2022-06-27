// ANTd
import React, { Suspense, useEffect } from 'react';

// Recoil
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  isRecoilValue,
} from 'recoil';

import { Components } from './antd'

// RecoilJS states – GLOBAL
let PageAtoms = {}
// let PageStates = {}
let PageAPIs = {}
let PageApiLoaders = {}


/**
 * Create recoiljs atoms, etc
 */
function CreateRecoilAtomsForApis(apis) {
  for(let key in apis) {
    if(!key.includes(PageAtoms)) {
      PageAtoms[key] = atom({
        key: key,
        default: {
          response: null,
          loading: false,
          error: false,
        },
      });

      PageAPIs[key] = apis[key];
    }
  }
}

function CreateRecoilAtoms(states) {
  for(let key in states) {
    if(!key.includes(PageAtoms)) {
      PageAtoms[key] = atom({
        key: key,
        default: states[key],
      });
    }
  }
}

/**
 * Is value stateful
 */
function isState(value) {
  if(typeof value !== 'object') {
    return false;
  }

  return Object.keys(value).includes('states');
}

function isComponent(value) {
  if(typeof value !== 'object') {
    return false;
  }

  return typeof value.component !== 'undefined';
}

/**
 * Get all states from deps inside state JSON object 
 */
function getStates(value) {
  if(!isState(value)) {
    return false;
  }

  let states = {}
  for(let key of value.states) {
    if(!Object.keys(PageAtoms).includes(key)) {
      throw Error(`There is no state registered: ${key}`)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    states[key] = useRecoilState(PageAtoms[key]);
  }

  return states;
}

/**
 * Get states and generate value
 */
function getStateValue(str) {
  let states = getStates(str);

  if(states === false) {
    return false;
  }

  return str.value(getContext(states));
}

/**
 * Get states from Component Options (to make it stateful)
 * @param {[type]} options [description]
 */
function ParseOptionState(options) {
  let states = {}

  for(let key in options) {
    const value = options[key];
    if(isState(value)) {
      states = {
        ...states,
        ...getStates(value),
      }
    }
  }

  return states
}

/**
 * Replace option values with state
 */
function ParseOptions(states, options) {
  let result = { ...options }

  for(let key in options) {
    let value = options[key];

    if(isState(value)) {
      result[key] = value.value(getContext(states))
    }
  }

  return result;
}

function getApiLoader(key) {
  
}

// Create hooks for APIs
function ParseAPIs(apis) {
  let loaders = {}
  
  for(let key in apis) {
    const { manual = false } = apis[key]
    const states = getStates(PageAPIs[key])

    let deps = Object.entries(states).map(([state, recoil]) => recoil[0])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [state, setState] = useRecoilState(PageAtoms[key]);

    loaders[key] = async () => {
      setState({
        ...state,
        loading: true,
      })
      let response = null
      try {
        response = await PageAPIs[key].fetch(getContext(states));
      } catch (e) {
        setState({
          ...state,
          error: e,
        })
      } finally {
        setState({
          ...state,
          response,
          loading: false,
        })
      }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      !manual && loaders[key]();
    }, deps)
  }

  return loaders;
}

/**
 * Context
 */
let ComponentContext = {}

function createContext(options) {
  ComponentContext = {
    ...options
  }
}

function getContext(states) {
  return {
    ...ComponentContext,
    ...states,
  }
}

/**
 * Component wrapper
 */
function getComponent(name) {
  return Components[name];
}

function ComponentWrapper({ keys, node }) {
  const key = keys.join('-');

  if(isState(node)) {
    return getStateValue(node);
  }

  if(typeof node === 'string') {
    return node;
  }

  if(!isComponent(node)) {
    throw Error(`Undefined Node ${node}`)
  }

  let ApiLoaders = ParseAPIs(node.apis || []);
  let DefinedStates = ParseOptionState(node.options || {});

  createContext({
    apis: ApiLoaders,
    states: DefinedStates,
  })
  
  let Component = getComponent(node.component);
  let Options = ParseOptions(DefinedStates, node.options || {});

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


// Entire page
export function Build(Gen) {
  
  CreateRecoilAtoms(Gen.states)
  CreateRecoilAtomsForApis(Gen.apis)

  return (
    RenderComponents([0], Gen.tree)
  )
}
