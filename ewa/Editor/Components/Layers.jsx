import { AppstoreOutlined, MailOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import { TreeOperator } from '../tree';
import { Tree, Button, Row, Col, Space, Modal, Card, Empty } from 'antd';
import { editorTree, componentsModal, activeElement } from '../store';
import { Flex } from './Flex';

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


	const titleRender = ({ title, key }) => {
		TreeOperator
		return (
			<Space>
				{title}
				<DeleteOutlined
					onClick={event => {
						const tree = new TreeOperator(state);
						tree.removeNode(TreeOperator.getPathFromKey(key))
						setState(tree.getTree());
						event.stopPropagation();
					}}
				/>
			</Space>
		)
	}

	return (
		<Tree
	      draggable
	      defaultExpandAll={true}
	      onDrop={onDrop}
	      onSelect={selectElement}
	      treeData={tree}
		  titleRender={titleRender}
	    />
	)
}
