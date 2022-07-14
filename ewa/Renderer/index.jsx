import { createContext } from 'react';
export { ewa } from './tree'

export const EwaContext = createContext('ewa');


export function EwaRoot({
    children,
    config,
    mutators, // getters
    accessors, // setters
    adapters, // hooks
    interceptors, // middleware
    components, // registered components
    showcase, // TODO: UI Kit theme editor
}) {
    return (
        <EwaContext.Provider value={config}>
			{children}
 		</EwaContext.Provider>
    )
}