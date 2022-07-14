import { ewa } from '../ewa/index.js';

export default function Test() {
	return ewa([{
		// adapters: [{
		// 	type: 'StateAdapter',
		// 	key: 'test',
		// 	value: 'test2',
		// }],
		component: 'SiteLayout',
		options: {},
		// children: [],
	}]);
}