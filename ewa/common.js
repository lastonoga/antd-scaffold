import { EwaConfig } from './Renderer/index';


export function getComponentOptions(component) {
    if(!isComponent) {
        throw Error(`Not a component:${component}`);
    }

    const name = component.component;

    if(!EwaConfig.components[name]) {
      throw Error(`There is no component:${name} registered`);
    }
    
    return EwaConfig.components[name].options || [];
  }
  
  
  export function getComponent(name) {
    if(!EwaConfig.components[name]) {
      throw Error(`There is no component:${name} registered`);
    }
    return EwaConfig.components[name].component;
  }
  
  
export function isComponent(value) {
    if(typeof value !== 'object') {
      return false;
    }
  
    return typeof value.component !== 'undefined';
  }