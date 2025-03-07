import React from 'react';
import styled from 'styled-components';

export class Td extends React.Component {
	render() {
		return (
			<td>
				{this.props.children}
			</td>
		);
	}
}

export class Tr extends React.Component {
	render() {
		return (
			<tr>{this.props.children}</tr>
		)
	}
}

export class Th extends React.Component {
	render() {
		return (
				<th>{this.props.children}</th>
		);
	}
}

export class Body extends React.Component {
	render() {
		return (
			<tbody>{this.props.children}</tbody>
		);
	}
}

export class Head extends React.Component {
	render() {
		return (
			<thead>{this.props.children}</thead>
		);
	}
}

export class Table extends React.PureComponent {
	static Td = Td;
	static Tr = Tr;
	static Th = Th;
	static Body = Body;
	static Head = Head;

	render() {
		return (
			<StyledTable>
				{this.props.children}
			</StyledTable>
		);
	}
}

const StyledTable = styled.table`
	padding: 5px;
	background: #f5f5f5;
	width: 100%;
	box-shadow: 0 0 2px #282c34;
	
	th {
		font-size: 13px;
	}
`;