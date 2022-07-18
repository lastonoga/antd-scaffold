import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// ANTd
import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Select, Checkbox } from '../Editor/Fields'
/**
 * Registered components with dynamic import
 * @type {Object}
 */
export const AntdComponents = {
  Row: {
    component: dynamic(() => import('antd/lib/grid/row')),
    options: {
      align: new Select('top', ['top', 'middle', 'bottom']),
      gutter: new Select([10, 20]),
      wrap: new Checkbox(true),
      justify: new Select('start', [
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
    options: {
    }
  },
  Select: {
    component: dynamic(() => import('antd/lib/select')),
    options: [
      new Select('options', 'test_1', [{
        label: 'Test 0',
        value: 'test',
      }, {
        label: 'Test 1',
        value: 'test_1',
      }, {
        label: 'Test 2',
        value: 'test_2',
      }]),
    ]
  },
  Space: {
    component: dynamic(() => import('antd/lib/space')),
  },
  Input: {
    component: dynamic(() => import('antd/lib/input/Input')),
  },
  Table: {
    component: dynamic(() => import('antd/lib/table')),
  },
  Button: {
    component: dynamic(() => import('antd/lib/button')),
  },
  Popover: {
    component: dynamic(() => import('antd/lib/popover')),
  },
}