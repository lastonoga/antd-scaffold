import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
// ANTd
import React, { Suspense, useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// Page JSON
import Gen from '../lib/home'

// Recoil
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  isRecoilValue,
} from 'recoil';


// RecoilJS states – GLOBAL
let PageAtoms = {}
let PageStates = {}
let PageAPIs = {}

/**
 * Registered components with dynamic import
 * @type {Object}
 */
let Components = {
  SiteLayout,
  Col: dynamic(() => import('antd/lib/grid/col')),
  Row: dynamic(() => import('antd/lib/grid/row')),
  Select: dynamic(() => import('antd/lib/select')),
  Space: dynamic(() => import('antd/lib/space')),
  Input: dynamic(() => import('antd/lib/input/input')),
  Table: dynamic(() => import('antd/lib/table')),
}

/**
 * Main Layout
 */
function SiteLayout({ children }) {
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(15).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: '20px', background: '#fff' }}>
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  )
}

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

  return str.value(states);
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
      result[key] = value.value(states)
    }
  }

  return result;
}

// Create hooks for APIs
function ParseAPIs(apis) {
  for(let key in apis) {
    let states = getStates(apis[key])
    let deps = Object.entries(states).map(([state, recoil]) => recoil[0])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [state, setState] = useRecoilState(PageAtoms[key]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const loadData = async () => {
        setState({
          ...state,
          loading: true,
        })
        let response = null
        try {
          response = await PageAPIs[key].fetch(states);
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

      loadData();
    }, deps)
  }
}

/**
 * Component wrapper
 */
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

  ParseAPIs(node.apis || []);

  let DefinedStates = ParseOptionState(node.options || {});
  
  let Component = Components[node.component];
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
export default function Home() {
  
  CreateRecoilAtoms(Gen.states)
  CreateRecoilAtomsForApis(Gen.apis)

  return (
    RenderComponents([0], Gen.tree)
  )
}
