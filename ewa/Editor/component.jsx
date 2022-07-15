import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import { RenderComponents } from './render';
import { TreeOperator } from './tree';
import { Tree, Button, Row, Col, Space, Modal, Card } from 'antd';
import { editorTree, componentsModal } from './store';
import { EwaConfig } from '../Renderer/index';
const { Header, Content, Footer, Sider } = Layout;


export function HelperTooltip() {
	const [cords, setCords] = useState({ top: 0, left: 0, display: 'none' })
	const [activeElement, setActiveElement] = useState(null);

	useEffect(() => {
		const handler = (event) => {
			// console.log(event);
			const targetElement = event.toElement.closest('.ewa-component');
			if(!targetElement) {
				setActiveElement(targetElement);
			}

			if(activeElement !== targetElement) {
				setActiveElement(targetElement);
			}
		}

		document.addEventListener('mousemove', handler);

		return () => {
			document.removeEventListener('mousemove', handler);
		}

	}, [])

	useEffect(() => {
		// if(!activeElement) {
		// 	return;
		// }
		// console.warn(activeElement);
	}, [activeElement]);

	return (
		<div style={{
			position: 'absolute',
		}}>+</div>
	)
}


export function Layers() {
	const [state, setState] = useRecoilState(editorTree);

	const onDrop = (info) => {
		const getPath = (pos) => pos.split('-').splice(1).map(i => parseInt(i));

		let dropPath = getPath(info.node.pos);
		const dragPath = getPath(info.dragNode.pos);

		const dropToGap = info.dropToGap;
		let dropPosition = info.dropPosition;
		let dropElementIndex = -1;

		const tree = new TreeOperator(state);

		if(!dropToGap) {
			dropPosition = 0;
		} else {
			dropElementIndex = dropPath.pop();
			if(dropPosition < 0) {
				dropPosition = 0;
			}
		}
		
		tree.moveNode(dragPath, dropPath, dropPosition);		

		setState(tree.getTree());
	}

	return (
		<Tree
	      className="draggable-tree"
	      draggable
	      blockNode
	      defaultExpandAll={true}
	      onDrop={onDrop}
	      treeData={new TreeOperator(state).toAnt()}
	    />
	)
}

export function SpacePadding({ children }) {
	return <div style={{ padding: 20 }}>{children}</div>
}

export function Editor() {
	const [state, setState] = useRecoilState(editorTree);
	const [visible, setVisible] = useRecoilState(componentsModal);

  return (
	<Layout>
		<HelperTooltip />
		<Sider style={{ background: '#fff' }} width={250}>
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
		<Content style={{ height: '100vh', }}>
			<div style={{ background: '#fff', margin: 60 }}>
				{RenderComponents([0], state)}
			</div>
		</Content>
		<Sider style={{ background: '#fff' }} width={250}>
			right sidebar
		</Sider>
	</Layout>
  );
}