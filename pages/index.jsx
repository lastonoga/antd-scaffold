import styles from '../styles/Home.module.css'
import React, { Suspense, useEffect } from 'react';
import { ewa } from '../ewa/index.js';

// Entire page
export default function Home() {
    return ewa([{
        component: 'SiteLayout',
        options: {},
        children: [{
            component: "Space",
            children: [
            {
                adapters: [{
                    name: 'StateAdapter',
                    key: 'test',
                    value: 'test2',
                }],
                component: "Select",
                options: {
                    value: {
                        __type: 'accessor',
                        name: 'SimpleSingleAccessor',
                        dep: 'test'
                    },
                    onChange: {
                        __type: 'mutator',
                        name: 'SimpleSingleMutator',
                        dep: 'test'
                    },
                    options: [{
                        label: 'test1',
                        value: 'test1',
                    }, {
                        label: 'test2',
                        value: 'test2',
                    }, {
                        label: 'test3',
                        value: 'test3',
                    }],
                },
            }, {
                component: 'Popover',
                options: {
                    content: {
                        __type: 'accessor',
                        name: 'DomAccessor',
                        children: [{
                            component: "Select",
                            options: {
                                value: {
                                    __type: 'accessor',
                                    name: 'SimpleSingleAccessor',
                                    dep: 'test'
                                },
                                onChange: {
                                    __type: 'mutator',
                                    name: 'SimpleSingleMutator',
                                    dep: 'test'
                                },
                                options: [{
                                    label: 'test1',
                                    value: 'test1',
                                }, {
                                    label: 'test2',
                                    value: 'test2',
                                }, {
                                    label: 'test3',
                                    value: 'test3',
                                }],
                            },
                        }],
                    },
                },
                children: [{
                    __type: 'accessor',
                    name: 'SimpleSingleAccessor',
                    dep: 'test'
                }]
            }]
        }, {
            adapters: [{
                name: 'ApiAdapter',
                key: 'tableData',
                deps: ['test'],
                config: {
                    url: '123',
                    method: 'post',
                    params: [1,2,3],
                }
            }],
            component: "Table",
            options: {
                columns: [
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                  },
                  {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                  },
                ],
                dataSource: {
                    __type: 'accessor',
                    name: 'DictAccessor',
                    dep: 'tableData.response'
                },
                loading: {
                    __type: 'accessor',
                    name: 'DictAccessor',
                    dep: 'tableData.loading'
                },
            }
        }],
    }]);
}