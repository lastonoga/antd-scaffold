import { Adapter } from './Adapter'
import React, { Suspense, useEffect } from 'react';

export class ApiAdapter extends Adapter {

    static name() {
        return 'ApiAdapter';
    }

    constructor({ key, deps = [], manual = false, config }) {
        super()
        this.key = key;
        this.deps = deps;
        this.manual = manual;
        this.config = config;
    }

    getAtoms() {
        return [{
            key: this.key,
            value: {
                response: null,
                loading: false,
                error: false,
            },
        }]
    }

    getAtomKeys() {
        return [this.key, ...this.deps];
    }

    async request(ctx) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([{
                        key: '1',
                        name: ctx.test.get,
                        age: 32,
                        address: '10 Downing Street',
                    },
                    {
                        key: '2',
                        name: 'John',
                        age: 42,
                        address: '10 Downing Street',
                    }
                ])
            }, 1500)
        })
    }

    async run(ctx) {
    	let { get: state, set: setState } = ctx[this.key];

    	if(state.loading) {
    		return;
    	}

        setState({
            ...state,
            loading: true,
        })

        let response = null
        
        try {
            response = await this.request(ctx);
        } catch (e) {
            setState({
                ...state,
                error: e,
            })
        } finally {
            setState({
                ...state,
                response,
                loading: false,
            })
        }

        return response;
    }

    component(ctx) {
        let deps = this.deps.map(dep => ctx[dep].get)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            !this.manual && this.run(ctx);
        }, deps)
    }
}