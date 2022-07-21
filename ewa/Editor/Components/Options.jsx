import { AppstoreOutlined, MailOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import { TreeOperator } from '../tree';
import { Tree, Button, Row, Col, Space, Modal, Card, Empty } from 'antd';
import { editorTree, componentsModal, activeElement } from '../store';
import { Collapse, Slider, Tabs, Select } from 'antd';
import { isAccessor } from '../../Renderer/Accessors'
import { isMutator } from '../../Renderer/Mutators'

export function Options() {
	const [state, setState] = useRecoilState(editorTree);
	const [element, setElement] = useRecoilState(activeElement);
	const tree = new TreeOperator(state);
    
    let component = null;
    if(element) {
        component = tree.getNode(element.path.slice(1))
    }

	const getOptions = () => {
		if(!element) {
			return {}
		}

		return component.options || {};
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
	const genExtra = (name) => {
        const value = getOption(name);
        const isDynamic = isAccessor(value) || isMutator(value);
        return (
            <Space>
                {isDynamic ? 'Dynamic' : 'Static'}
                <SettingOutlined
                    onClick={event => {
                        // If you don't want click extra trigger collapse, you can prevent this:
                        event.stopPropagation();
                    }}
                />
            </Space>
	    )
    };

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
        <Tabs defaultActiveKey="props" centered={true} tabBarGutter={50} tabBarStyle={{ margin: 0 }}>
            <Tabs.TabPane tab="Properties" key="props">
                <Collapse bordered={false}>
                    <Collapse.Panel header="Size" key="1" extra={genExtra('size')}>
                        <Slider value={getOption('size')} onChange={changeOption('size')} />
                    </Collapse.Panel>
                    <Collapse.Panel header="Size" key="2" extra={genExtra('size')}>
                        <Select style={{ width: '100%' }} value={getOption('size')} onChange={changeOption('size')} options={
                            [{
                                value: 'small',
                            }, {
                                value: 'medium',
                            }, {
                                value: 'large',
                            }]
                        } />
                    </Collapse.Panel>
                    <Collapse.Panel header="Align" key="3" extra={genExtra('align')}>
                        <Select style={{ width: '100%' }} value={getOption('align')} onChange={changeOption('align')} options={
                            [{
                                value: 'start',
                            }, {
                                value: 'end',
                            }, {
                                value: 'baseline',
                            }, {
                                value: 'center',
                            }]
                        } />
                    </Collapse.Panel>
                </Collapse>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Styles" key="styles">
                2
            </Tabs.TabPane>
        </Tabs>
	)
}