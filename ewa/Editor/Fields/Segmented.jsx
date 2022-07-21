import { Segmented as SegmentedAntd } from 'antd';

export function Segmented(defaultValue, options) {
	return ({ getOption, changeOption }) => {
		let value = defaultValue;
	
		if(getOption) {
			value = getOption;
		}

		return <SegmentedAntd value={value} onChange={changeOption} options={options} />;
	}
}
