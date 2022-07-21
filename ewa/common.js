import { EwaConfig } from './Renderer/index';


export function getComponentOptions(name) {
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