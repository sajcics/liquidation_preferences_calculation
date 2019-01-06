import React, {Fragment} from 'react';
import styled from 'styled-components';

import {Table, Button, InputNumber, InputText, Checkbox, Text} from '../components';
import {defaultValues} from '../configs/defaultValues';
import {LiquidationPreferenceCalculation} from '../LiquidationPreferenceCalculation'

/*
 * tips:
 * - references
 * - validation
 * - result show
 * - font import
 * - comments
 */

export class LiquidationCalculation extends React.PureComponent {
	state = {
		data: defaultValues,
		companySold: 35000000
	};

	/* function to add new stackholder */
	onClickAddRow = () => {
		const {data} = this.state;
		const newRecord = {
			name: '',
			shares: 0,
			invested: 0,
			ownership: 0
		};

		data.push(newRecord);
		const _data = data.map(e => e); //change reference

		this.setState({data: _data});
	};

	onChangeData = (property, index) => (value) => {
		const {data} = this.state;
		const record = data[index];
		record[property] = value;

		const _data = data.map(e => e);
		this.setState({
			data: _data
		});
	};

	onChangeDataCompany = (value) => {
		this.setState({
			companySold: value
		});
	};

	onClickCalculate = (e) => {
		const {data, companySold} = this.state;
		const instance = new LiquidationPreferenceCalculation(data, companySold);
		instance.calculate()
	};

	renderRow(element, index) {
		return (
			<Table.Tr key={`element.name[${index}]`}>
				<Table.Td><InputText onChange={this.onChangeData('name', index)} value={element.name}/></Table.Td>
				<Table.Td><Checkbox onChange={this.onChangeData('isFounders', index)} value={element.isFounders}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('shares', index)} value={element.shares}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('invested', index)} value={element.invested}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('ownership', index)} value={element.ownership} max={100}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('cap', index)} value={element.cap} disabled={element.isFounders} max={3}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('pp', index)} value={element.pp} disabled={element.isFounders} max={10}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('priority', index)} value={element.priority} disabled={element.isFounders} max={9999}/></Table.Td>
			</Table.Tr>
		);
	}

	render() {
		const {data, companySold} = this.state;

		return (
			<StyledContainer>
				<Rules />

				<Text mt={30} mb={20} pb={10} pr={5}>Company is sold for $</Text>
				<InputNumber onChange={this.onChangeDataCompany} value={companySold}/>

				<Table>
					<Table.Head>
						<Table.Tr>
							<Table.Th>Share's class/name</Table.Th>
							<Table.Th>Founders?</Table.Th>
							<Table.Th>Numbers of shares</Table.Th>
							<Table.Th>Invested in $</Table.Th>
							<Table.Th>Ownership in %</Table.Th>
							<Table.Th>CAP</Table.Th>
							<Table.Th>P.P.</Table.Th>
							<Table.Th>Priority</Table.Th>
						</Table.Tr>
					</Table.Head>
					<Table.Body>
						{data.map((element, index) => this.renderRow(element, index))}
					</Table.Body>
				</Table>

				<Button onClick={this.onClickAddRow} padding={10} mt={20} mb={20} mr={10}>Add new stakeholder</Button>
				<Button onClick={this.onClickCalculate} padding={10} mt={20} mb={20}>Calculate</Button>


			</StyledContainer>
		);
	}
}

export class Rules extends React.Component {
	render() {
		return (
			<Fragment>
				<Text fontWeight={800} mt={30}>Description</Text>
				<Text display="block">
					Calculate how much every investor gets paid in corporate liquidation situation, for example company is sold.
					For every investor you can define:
				</Text>
				<Text display="block" pt={0}>-
					<Text fontWeight={800}>priority</Text>
					- who will gets first payment
				</Text>
				<Text display="block">
					- <Text fontWeight={800}>invested</Text>
					- how much money investor invested so far in shares, for example: investor A invested in share A 60.000 EUR
				</Text>
				<Text display="block">
					- <Text fontWeight={800}> ownership </Text>
					- how many percent investor owns shares, for example: investor A owns 15% of share A
				</Text>
				<Text display="block">
					- <Text fontWeight={800}>CAP</Text>
					- maximum payment from invested money. Usually is 1x-3x. for example: if investor A has invested 600.000EUR and CAP is 2x
					than the maximum amount he can be paid off is 1.2M EUR. CAP is calculated only for investors who participate in
					distribution of common stock.
				</Text>
				<Text display="block">
					- <Text fontWeight={800}>PP</Text>
					- participate preference is amount that will investor gets. It can be from 1x to 10x. For example, if investor
					has invested 600.000EUR and participate preference is 3x than he will gets from preferred stock 18.000.000 EUR.
				</Text>
			</Fragment>
		)
	}
}


const StyledContainer = styled.div`
	text-align: left;
	padding: 0 40px;
`;
