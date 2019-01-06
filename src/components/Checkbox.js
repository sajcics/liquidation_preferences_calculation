import React  from 'react';
import PropTypes from 'prop-types';

export class Checkbox extends React.PureComponent {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		disabled: PropTypes.bool,
		value: PropTypes.bool
	};

	static defaultProps = {
		disabled: false,
		value: false
	};

	state = {
		checked: this.props.value
	};

	onChange = (e) => {
		this.setState({
			checked: e.target.checked
		}, () => this.props.onChange(this.state.checked));
	};

	render() {
		const {disabled} = this.props;
		const {checked} = this.state;

		return (
			<input type="checkbox" checked={checked} disabled={disabled} onChange={this.onChange}/>
		);
	}
}