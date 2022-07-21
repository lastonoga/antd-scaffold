import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import { RenderComponents } from './render';
import { TreeOperator } from './tree';
import { Tree, Button, Row, Col, Space, Modal, Card, Empty } from 'antd';
import { editorTree, componentsModal, activeElement } from './store';
import { EwaConfig } from '../Renderer/index';
import { getComponentOptions } from '../Renderer/tree';
const { Header, Content, Footer, Sider } = Layout;
import { Collapse, Slider } from 'antd';

import { Layers } from './Components/Layers';
import { Options } from './Components/Options';
import { HelperTooltip } from './Components/Tooltip';



export function SpacePadding({ children }) {
	return <div style={{ padding: 20 }}>{children}</div>
}

export function Editor() {
	const [state, setState] = useRecoilState(editorTree);
	const [visible, setVisible] = useRecoilState(componentsModal);

  return (
	<Layout>
		{/* Insert tooltip */}
		<HelperTooltip />
		{/* left */}
		<Sider style={{ background: '#fff' }} width={250} className="ewa-configurable">
			<SpacePadding>
				<Space direction="vertical" size="middle" style={{ width: '100%' }}>
					<Button onClick={() => setVisible(true)} block>Add Component</Button>
					<Modal
        		visible={visible}
		        title="Select components"
		        onOk={() => setVisible(false)}
		        onCancel={() => setVisible(false)}
		        footer={[]}
		      >
		      	<Row gutter={[16, 16]}>
			        {Object.entries(EwaConfig.components).map(([name, Component]) => {
			        	return (
			        		<Col span={8}>
				        		<Card onClick={() => setState((new TreeOperator(state)).appendNode({
				        			component: name,
				        			label: name,
				        			children: [],
				        		}).getTree())}>
								      <p>{name}</p>
								    </Card>
							    </Col>
						    )
			        })}
		        </Row>
		      </Modal>
					<Layers />
				</Space>
			</SpacePadding>
		</Sider>
		{/* Content */}
		<Content style={{ height: '100vh', }}>
			<div style={{ background: '#fff', margin: 60 }}>
				{RenderComponents([0], state)}
			</div>
		</Content>
		{/* Right */}
		<Sider style={{ background: '#fff' }} width={250} className="ewa-configurable">
			<Options />
		</Sider>
	</Layout>
  );
}