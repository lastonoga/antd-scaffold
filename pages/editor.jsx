import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
	getItem('Pages', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
	getItem('Components', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
];


export default function Editor() {



    return (
        <Layout>
		  <Layout>
		    <Sider style={{ background: '#fff' }} width={250}>
				<Menu mode="inline" items={items}></Menu>
		    </Sider>
		    <Content style={{ height: '100vh', }}>
		    	<div style={{ background: '#fff', margin: 60 }}>
		    		main content
		    	</div>
		    </Content>
		    <Sider style={{ background: '#fff' }} width={250}>
			    right sidebar
			</Sider>
		  </Layout>
		</Layout>

    );
}