import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// ANTd
import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

/**
 * Registered components with dynamic import
 * @type {Object}
 */
export const Components = {
  SiteLayout,
  Col: dynamic(() => import('antd/lib/grid/col')),
  Row: dynamic(() => import('antd/lib/grid/row')),
  Select: dynamic(() => import('antd/lib/select')),
  Space: dynamic(() => import('antd/lib/space')),
  Input: dynamic(() => import('antd/lib/input/input')),
  Table: dynamic(() => import('antd/lib/table')),
  Button: dynamic(() => import('antd/lib/button')),
  Popover: dynamic(() => import('antd/lib/popover')),
}


/**
 * Main Layout
 */
export function SiteLayout({ children }) {
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
