import { Adapter } from './Adapter'
import React, { Suspense, useEffect } from 'react';
import { atom } from 'recoil';
import { hasContext, getFromContext, createState, createWaitingValues } from '../context'

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

    globalContext(ctx) {
		if(hasContext(ctx, this.key)) {
            console.error(`Atom key:${this.key} is already defined. Please, use unique names for dynamic variables`);
        }

        ctx[this.key] = atom({
            key: this.key,
            default: {
                response: null,
                loading: false,
                error: false,
            },
        });
	}

    async request(ctx) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([{
                        key: '1',
                        name: ctx.test,
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
            }, 500)
        })
    }

    get depsKey() {
        return `${this.key}__deps`;
    }

    localContext(globalCtx, ctx) {
        createState(ctx, this.key, getFromContext(globalCtx, this.key));
        createWaitingValues(ctx, this.depsKey, this.deps.map(dep => getFromContext(globalCtx, dep)))
    }

    component(ctx) {
        const { getter: state, setter: setState } = getFromContext(ctx, this.key)
        const deps = getFromContext(ctx, this.depsKey)
        
        const depsContext = {}
        for(let index in this.deps) {
            depsContext[this.deps[index]] = deps[index];
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const run = async () => {

                if(state.loading) {
                    return;
                }
        
                setState({
                    ...state,
                    loading: true,
                })
        
                let response = null
                
                try {
                    response = await this.request(depsContext);
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
            !this.manual && run();
        }, deps)
    }
}