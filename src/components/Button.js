import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Button extends React.PureComponent {

	static propTypes = {
		onClick: PropTypes.func.isRequired,
		padding: PropTypes.number,
		mt: PropTypes.number,
		mb: PropTypes.number,
		mr: PropTypes.number,
		ml: PropTypes.number,
		submitting: PropTypes.bool
	};

	static defaultProps = {
		padding: 0,
		mt: 0,
		mb: 0,
		display: 'block',
		submitting: false
	};

	render() {
		const {onClick, mb, mt, padding, mr, ml, submitting} = this.props;

		return (
			<StyledButton
				onClick={onClick}
				mt={mt}
				mb={mb}
				padding={padding}
				mr={mr}
				ml={ml}
				type={submitting ? 'submit' : null}
			>{this.props.children}</StyledButton>
		)
	}
}

const StyledButton = styled.button`
	background: white;
	padding: ${(props) => props.padding}px;
	margin-top: ${(props) => props.mt}px;
	margin-bottom: ${(props) => props.mb}px;
	margin-left: ${(props) => props.ml}px;
	margin-right: ${(props) => props.mr}px;
	border: none;
	
	:active {
		background: #C14343;
		color: #f5f5f5
	}
`;