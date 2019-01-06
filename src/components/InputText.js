import React  from 'react';
import PropTypes from 'prop-types';

export class InputText extends React.PureComponent {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func.isRequired
	};

	static defaultProps = {
		value: 0
	};

	state = {
		value: this.props.value
	};

	onChange = (e) => {
		this.setState({
			value: e.target.value
		}, () => {
			this.props.onChange(this.state.value)
		});
	};

	render() {
		const {value} = this.state;

		return (
			<input type='text' value={value} onChange={this.onChange}/>
		);
	}
}