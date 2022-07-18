import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import { RenderComponents } from './render';
import { TreeOperator } from './tree';
import { Tree, Button, Row, Col, Space, Modal, Card, Empty } from 'antd';
import { editorTree, componentsModal, activeElement } from './store';
import { EwaConfig } from '../Renderer/index';
import { getComponentOptions } from '../Renderer/tree';
const { Header, Content, Footer, Sider } = Layout;


export function HelperTooltip() {
	const [cords, setCords] = useState({
		position: 'absolute',
		width: 100,
		height: 100,
		zIndex: 999,
		background: '#dfdfdf',
	})
	const [element, setElement] = useRecoilState(activeElement);

	useEffect(() => {
		const handler = (event) => {
			const targetElement = event.target.closest('.ewa-component');
			const isTree = event.target.closest('.draggable-tree');

			if(isTree) {
				return;
			}

			if(!targetElement && !isTree) {
				setElement(null);
			} else {
				setElement({
					node: targetElement,
					path: targetElement.attributes['data-ewa'].value.split('-').map(i => parseInt(i))
				});
			}
		}

		document.addEventListener('click', handler);

		return () => {
			document.removeEventListener('click', handler);
		}
	}, [])

	// Show helper tooltip
	useEffect(() => {
		setTimeout(() => {
			if(!element) {
				cords.display = 'none';
				return setCords(cords)
			}

			let elCords = element.node.getBoundingClientRect();
			
			cords.display = 'block';
			cords.left = `${elCords.left}px`;
			cords.top = `${elCords.top}px`;

			setCords(cords)
		}, 250)
	}, [element]);

	return (
		<div style={{
			...cords
		}}>
			helper circle
		</div>
	)
}


export function Layers() {
	const [state, setState] = useRecoilState(editorTree);
	const [element, setElement] = useRecoilState(activeElement);
	const tree = new TreeOperator(state).toAnt();

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

	const selectElement = (key) => {
		function loop(tree, keys, callback) {
			for(let index in tree) {
				index = parseInt(index)
				if(tree[index].key === key[0]) {
					callback(tree[index], [...keys, index])
					break;
				}

				if(tree[index].children) {
					loop(tree[index].children, [...keys, index], callback)
				}
			}
		}

		loop(tree, [0], (node, keys) => {
			setElement({
				node: document.querySelector(`[data-ewa="${TreeOperator.path(keys)}"]`),
				path: keys,
			});
		})
	}

	return (
		<Tree
	      className="draggable-tree"
	      draggable
	      defaultExpandAll={true}
	      onDrop={onDrop}
	      onSelect={selectElement}
	      treeData={tree}
	    />
	)
}

export function Options() {
	const [state, setState] = useRecoilState(editorTree);
	const [element, setElement] = useRecoilState(activeElement);
	const tree = new TreeOperator(state);

	if(!element) {
		return <Empty />
	}

	let el = tree.getNode(element.path.slice(1))
	

	return (
		<div></div>
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
		{/* Insert tooltip */}
		<HelperTooltip />
		{/* left */}
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
		{/* Content */}
		<Content style={{ height: '100vh', }}>
			<div style={{ background: '#fff', margin: 60 }}>
				{RenderComponents([0], state)}
			</div>
		</Content>
		{/* Right */}
		<Sider style={{ background: '#fff' }} width={250}>
			<Options />
		</Sider>
	</Layout>
  );
}