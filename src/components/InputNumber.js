import React  from 'react';
import PropTypes from 'prop-types';

export class InputNumber extends React.PureComponent {
	static propTypes = {
		value: PropTypes.number,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		disabled: PropTypes.bool
	};

	static defaultProps = {
		value: 0,
		disabled: false,
		onBlur: null,
		onChange: null
	};

	state = {
		value: this.props.value
	};

	onChange = (e) => {
		this.setState({
			value: parseInt(e.target.value)
		}, () => {
			this.props.onChange(this.state.value)
		});
	};

	render() {
		const {value} = this.state;
		const {disabled} = this.props;

		return (
			<input type='number' value={value} onChange={this.onChange} min={0} disabled={disabled} />
		);
	}
}