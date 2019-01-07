import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
			<StyledInput type='text' value={value} onChange={this.onChange}/>
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
`;