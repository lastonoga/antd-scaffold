import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// ANTd
import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Select, Segmented } from '../Editor/Fields'
/**
 * Registered components with dynamic import
 * @type {Object}
 */
export const AntdComponents = {
  Layout: {
    component: dynamic(() => import('antd/lib/layout')),
  },
  Sider: {
    component: Sider,
  },
  Content: {
    component: Content,
  },
  Header: {
    component: Header,
  },
  Footer: {
    component: Footer,
  },
  Row: {
    component: dynamic(() => import('antd/lib/grid/row')),
    options: {
      align: Select('top', ['top', 'middle', 'bottom']),
      gutter: Select([10, 20]),
      justify: Select('start', [
        'start',
        'end',
        'center',
        'space-around',
        'space-between',
        'space-evenly'
      ]),
    }
  },
  Col: {
    component: dynamic(() => import('antd/lib/grid/col')),
  },
  Select: {
    component: dynamic(() => import('antd/lib/select')),
  },
  Space: {
    component: dynamic(() => import('antd/lib/space')),
    options: {
      align: Select('top', ['top', 'middle', 'bottom']),
      size: Segmented('medium', ['small', 'medium', 'large']),
    },
  },
  Input: {
    component: dynamic(() => import('antd/lib/input/Input')),
  },
  Table: {
    component: dynamic(() => import('antd/lib/table')),
  },
  Button: {
    component: dynamic(() => import('antd/lib/button')),
    options: {
      size: Select('medium', ['small', 'medium', 'large']),
    },
  },
  Popover: {
    component: dynamic(() => import('antd/lib/popover')),
  },
}