import { atom } from 'recoil';

export const componentsModal = atom({
	key: 'componentsModal',
    default: false,
});

export const editorTree = atom({
    key: 'editorTree',
    default: [{
    	component: 'Space',
    	layer: 'Space 1',
    	children: [{
	    	component: 'Button',
	    	layer: 'Btn 1',
	    	children: ['test 1']
	    }, {
	    	component: 'Button',
	    	layer: 'Btn 2',
	    	children: ['test 2']
	    }, {
	    	component: 'Button',
	    	layer: 'Btn 3',
	    	children: ['test 3']
	    }]
    }, {
    	component: 'Space',
    	layer: 'Space 2',
    	children: [{
	    	component: 'Button',
	    	layer: 'Btn 21',
	    	children: ['test 21']
	    }, {
	    	component: 'Button',
	    	layer: 'Btn 22',
	    	children: ['test 22']
	    }, {
	    	component: 'Button',
	    	layer: 'Btn 23',
	    	children: ['test 23']
	    }]
    }],
})