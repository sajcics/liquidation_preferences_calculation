import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Button extends React.PureComponent {

	static propTypes = {
		onClick: PropTypes.func.isRequired,
		padding: PropTypes.number,
		mt: PropTypes.number,
		mb: PropTypes.number
	};

	static defaultProps = {
		padding: 0,
		mt: 0,
		mb: 0
	};

	render() {
		const {onClick, mb, mt, padding} = this.props;

		return (
			<StyledButton
				onClick={onClick}
				mt={mt}
				mb={mb}
				padding={padding}
			>{this.props.children}</StyledButton>
		)
	}
}

const StyledButton = styled.button`
	background: white;
	padding: 5px;
	${(props) => props.padding ? `padding: ${props.padding}px;` : null}
	${(props) => props.mt ? `margin-top: ${props.mt}px;` : null}
	${(props) => props.mb ? `margin-bottom: ${props.mb}px;` : null}
`;