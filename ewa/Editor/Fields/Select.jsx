import { Select as SelectAntd } from 'antd';

export function Select(defaultValue, options) {
	return ({ getOption, changeOption }) => {
		const selectOptions = options.map(value => ({
			value,
		}))
	
		let value = defaultValue;
	
		if(getOption) {
			value = getOption;
		}

		return <SelectAntd style={{ width: '100%' }} value={value} onChange={changeOption} options={selectOptions} />
	}
}
