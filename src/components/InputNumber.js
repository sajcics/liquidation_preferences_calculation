import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class InputNumber extends React.PureComponent {
	static propTypes = {
		value: PropTypes.number,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		disabled: PropTypes.bool,
		max: PropTypes.number
	};

	static defaultProps = {
		value: 0,
		disabled: false,
		onBlur: null,
		onChange: null,
		max: null
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
		const {disabled, max} = this.props;

		return (
			<StyledInput type='number' value={value} onChange={this.onChange} min={0} disabled={disabled} max={max} step="any"/>
		);
	}
}

const StyledInput = styled.input`
	border: none;
	padding: 5px;
	font-size: 16px;
	
	:focus {
		border: 1px solid #C14343;
		box-shadow: 0 0 5px #C14343;
		outline: none;
	}
	
	:disabled {
		background: #607D8B;
		opacity: 0.2;
		color: black;
	}
`;