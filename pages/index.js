import styles from '../styles/Home.module.css'
import React, { Suspense, useEffect } from 'react';
import { ewa } from '../ewa/index.js';


const options = [{
    label: 'test1',
    value: 'test1',
}, {
    label: 'test2',
    value: 'test2',
}, {
    label: 'test3',
    value: 'test3',
}]

// Entire page
export default function Home() {
    return ewa([{
            component: 'SiteLayout',
            options: {},
            children: [{
                    component: "Space",
                    children: [{
                        adapters: [{
                            name: 'StateAdapter',
                            key: 'test',
                            value: 'test2',
                        }],
                        component: "Select",
                        options: {
                            defaultValue: 'test1',
                            onChange: {
                                __type: 'mutator',
                                name: 'SimpleSingleMutator',
                                dep: 'test'
                            },
                            options,
                        },
                    }, {
                        __type: 'accessor',
                        name: 'SimpleSingleAccessor',
                        dep: 'test'
                    }]
                }],
            }]);
    }