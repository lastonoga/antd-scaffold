import { createContext } from 'react';
export { ewa } from './tree'

// Accessors
import { SimpleSingleAccessor } from './Accessors/SimpleSingleAccessor';
import { DictAccessor } from './Accessors/DictAccessor';
import { DomAccessor } from './Accessors/DomAccessor';

// Mutators
import { SimpleSingleMutator } from './Mutators/SimpleSingleMutator';

// Adapters
import { ApiAdapter } from './Adapters/ApiAdapter'
import { StateAdapter } from './Adapters/StateAdapter'

// Connectors
import { AntdComponents } from '../Connectors/Antd'


// Main Config
export let EwaConfig = {
    mutators: [
        SimpleSingleMutator,
    ],
    accessors: [
        SimpleSingleAccessor,
        DictAccessor,
        DomAccessor,
    ],
    adapters: [
        ApiAdapter,
        StateAdapter,
    ], // hooks
    // interceptors, // middleware
    components: {
        ...AntdComponents,
    },
    // showcase, // TODO: UI Kit theme editor
}


export function EwaRoot({
    children,
    components = [],
}) {
    EwaConfig.components = {
        ...EwaConfig.components,
        ...components,
    }
    return children;
}