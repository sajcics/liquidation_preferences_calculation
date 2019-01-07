import React  from 'react';
import styled from 'styled-components';

export class BeautyHeader extends React.PureComponent {

	render() {
		return (
			<StyledContaner>
				Liquidation preference calculator
			</StyledContaner>

		);
	}
}

const StyledContaner = styled.div`
	text-align: center;
	font-size: 50px;
	padding: 50px;
	background: #C14343;
	color: #f5f5f5;
	font-family: Pacifico;
	vertical-align: center;
`