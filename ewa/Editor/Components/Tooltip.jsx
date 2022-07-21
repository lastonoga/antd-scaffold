import { AppstoreOutlined, MailOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import { TreeOperator } from '../tree';
import { Tree, Button, Row, Col, Space, Modal, Card, Empty } from 'antd';
import { editorTree, componentsModal, activeElement } from '../store';

export function HelperTooltip() {
	const [cords, setCords] = useState({
		position: 'absolute',
		width: 100,
		height: 100,
		zIndex: 999,
		background: '#dfdfdf',
		opacity: 0.2,
	})
	const [element, setElement] = useRecoilState(activeElement);

	useEffect(() => {
		const handler = (event) => {
			const targetElement = event.target.closest('.ewa-component');
			const isTree = event.target.closest('.ewa-configurable');

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
