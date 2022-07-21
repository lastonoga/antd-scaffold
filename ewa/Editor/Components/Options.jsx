import { AppstoreOutlined, MailOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import { TreeOperator } from '../tree';
import { Tree, Button, Row, Col, Space, Modal, Card, Empty } from 'antd';
import { editorTree, componentsModal, activeElement } from '../store';
import { Collapse, Slider } from 'antd';

export function Options() {
	const [state, setState] = useRecoilState(editorTree);
	const [element, setElement] = useRecoilState(activeElement);
	const tree = new TreeOperator(state);

	const getOptions = () => {
		if(!element) {
			return {}
		}

		let el = tree.getNode(element.path.slice(1))
		return el.options || {};
	}

	const [options, setOptions] = useState(getOptions());

	const getOption = (name) => {
		return options[name] || null;
	}

	const changeOption = (name) => {
		return (value) => setOptions({
			...options,
			[name]: value,
		})
	}

	// cog
	// One icon is needed to configure dynamic parts: Accessors/Mutators/Adapters
	// Second one ... ???
	const genExtra = () => (
		<Space>
			<MailOutlined
				onClick={event => {
				// If you don't want click extra trigger collapse, you can prevent this:
				event.stopPropagation();
				}}
			/>
			<SettingOutlined
				onClick={event => {
				// If you don't want click extra trigger collapse, you can prevent this:
				event.stopPropagation();
				}}
			/>
		</Space>
	);

	// Update default options whenever element is changed
	useEffect(() => {
		setOptions(getOptions())
	}, [element]);

	// Update real state with new values
	useEffect(() => {
		if(!element) {
			return;
		}

		let el = tree.getNode(element.path.slice(1))
		el.options = options;
		setState(tree.getTree());
	}, [options])
	
	if(!element) {
		return <Empty />
	}

	return (
		<Collapse bordered={false}>
			<Collapse.Panel header="Size" key="1" extra={genExtra()}>
				<Slider value={getOption('size')} onChange={changeOption('size')} />
			</Collapse.Panel>
		</Collapse>
	)
}