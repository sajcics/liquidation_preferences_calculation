import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Text extends React.PureComponent {
	static propTypes = {
		pt: PropTypes.number,
		pb: PropTypes.number,
		pr: PropTypes.number,
		pl: PropTypes.number,
		mt: PropTypes.number,
		mb: PropTypes.number,
		fontWeight: PropTypes.oneOf([300, 800, 1000]),
		display: PropTypes.oneOf(['block', 'inline-block']),
		fontSize: PropTypes.number,
		color: PropTypes.oneOf(["red", "black"])
	};

	static defaultProps = {
		pt: 4,
		pb: 4,
		pl: 0,
		pr: 0,
		mt: 0,
		mb: 0,
		display: 'inline-block',
		fontSize: 25,
		color: 'black'
	};


	render() {
		const {pt, pb, pr, pl, fontWeight, display, mt, mb, fontSize, color} = this.props;

		return (
			<StyledText
				pt={pt}
				pb={pb}
				pl={pl}
				pr={pr}
				fontWeight={fontWeight}
				display={display}
				mt={mt}
				mb={mb}
				fontSize={fontSize}
				color={color}>
					{this.props.children}
			</StyledText>
		);
	}
}

const StyledText = styled.span`
	text-align: justify;
	font-size: ${props => props.fontsize}px;
	padding-top: ${props => props.pt}px;
	padding-bottom: ${props => props.pb}px;
	padding-left: ${props => props.pl}px;
	padding-right: ${props => props.pr}px;
	margin-top: ${props => props.mt}px;
	margin-bottom: ${props => props.mb}px;
	${(props) => props.fontWeight ? `font-weight: ${props.fontWeight};`: null};
	display: ${props => props.display};
	font-family: Arimo;
	line-height: 1.5;
	${(props) => props.color ? `color: ${props.color}` : null}
`