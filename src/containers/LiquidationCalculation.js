import React, {Fragment} from 'react';
import styled from 'styled-components';

import {Table, Button, InputNumber, InputText, Checkbox, Text} from '../components';
import {defaultValues} from '../configs/defaultValues';
import {LiquidationPreferenceCalculation} from '../LiquidationPreferenceCalculation'

export class LiquidationCalculation extends React.PureComponent {
	state = {
		data: defaultValues,
		companySold: 35000000,
		calculated: [],
		errorMessages: []
	};

	/* function to add new shareholder */
	onClickAddRow = () => {
		const {data} = this.state;
		const newRecord = {
			name: '',
			shares: 0,
			invested: 0,
			ownership: 0,
			pp: 1
		};

		data.push(newRecord);
		const _data = data.map(e => e); //change reference

		this.setState({data: _data});
	};

	/* when input data of shareholders updates then update state*/
	onChangeData = (property, index) => (value) => {
		const {data} = this.state;
		const record = data[index];
		record[property] = value;

		const _data = data.map(e => e);
		this.setState({
			data: _data
		});
	};

	/* when value is changed for how many company is sold, then change the state */
	onChangeDataCompany = (value) => {
		this.setState({
			companySold: value
		});
	};

	/* calculate liquidation preference */
	onClickCalculate = () => {
		const {data, companySold} = this.state;
		const instance = new LiquidationPreferenceCalculation(data, companySold);

		if (this.validateData()) {
			const calculated = instance.calculate();
			this.setState({
				calculated
			});
		}
	};

	/* render every row of table per shareholder */
	renderRow(element, index) {
		return (
			<Table.Tr key={`element.name[${index}]`}>
				<Table.Td><InputText onChange={this.onChangeData('name', index)} value={element.name || `Share ${index}`}/></Table.Td>
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
		const {data, companySold, calculated, errorMessages} = this.state;

		return (
			<StyledContainer>
				<Rules />

				<Text mt={30} mb={20} pb={10} pr={5}>Company is sold for $</Text>
				<InputNumber onChange={this.onChangeDataCompany} value={companySold}/>

					<Table>
						<Table.Head>
							<Table.Tr>
								<Table.Th>Share's class/name *</Table.Th>
								<Table.Th>Founders?</Table.Th>
								<Table.Th>Numbers of shares</Table.Th>
								<Table.Th>Invested in $ *</Table.Th>
								<Table.Th>Ownership in % *</Table.Th>
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

				{errorMessages.length > 0 && errorMessages.map((record, index) =>
					<Text display="block" color="red" key={index}>{record}</Text>
				)}

				<Text display="block" fontWeight={1000} mt={30}>Results: </Text>
				{calculated.length > 0 && calculated.map((record, index) =>
					<Text display="block" fontSize={18} key={`${record.name}_${index}`}>
						{record.name} should get:
						<Text fontWeight={800} pl={10}>${record.earned.toFixed(2)}</Text>

						{record.comments && <Text pl={10}>({record.comments})</Text>}
					</Text>
				)}

				{(calculated.length === 0 || !calculated) && <Text>To see results click 'calculate'</Text>}

			</StyledContainer>
		);
	}

	/* validate data before any calculations */
	validateData() {
		const {data} = this.state;
		const errorMessages = [];
		let sumPercentage = 0;

		for (const record of data) {
			if (!record.name) {
				errorMessages.push(`Some record don't have defined name`);
			} else {
				if (!record.ownership) {
					errorMessages.push(`${record.name} don't have defined ownership`);
				} else if (record.ownership > 100) {
					errorMessages.push(`${record.name} can't have ownership more than 100%`);
				} else if (record.ownership < 0) {
					errorMessages.push(`${record.name} can't have ownership less than 0%`);
				} else {
					sumPercentage += record.ownership;
				}

				if (!record.pp && !record.isFounders) {
					errorMessages.push(`${record.name} don't have defined P.P. - participate preference`);
				}

				if (!record.cap && !record.isFounders) {
					errorMessages.push(`${record.name} don't have defined CAP`);
				}

				if (record.invested === null) {
					errorMessages.push(`${record.name} don't have defined how much he/she invested`);
				}
			}
		}

		if (sumPercentage > 100) {
			errorMessages.push(`Sum of ownership for all shareholders should not be more than 100%`);
		}

		if (errorMessages.length > 0) {
			this.setState({
				errorMessages
			});

			return false;
		}

		return true;
	}
}

/* description of project */
export class Rules extends React.Component {
	render() {
		return (
			<Fragment>
				<Text fontWeight={800} mt={30}>Description</Text>
				<Text display="block">
					Calculate how much every investor gets paid in corporate liquidation situation, for example company is sold. There are
					two type of shares Common and Preferred. Common share usually owns founders, and preferred investors. The main
					difference between this two shares is that Common share have voting rights but Preferred don't, and
					stakeholders with Preferred shares are paid off before stakeholders with Common shares. When is time to
					distribute money through stakeholders, it is important for investors to get the more money than can get.
					In case when investor has Preferred share but is more profitable to convert to Common or similar situations.

					For every investor you can define:
				</Text>
				<Text display="block" pt={0} pl={40}>
					- <Text fontWeight={800}>priority</Text>
					- who will gets first payment
				</Text>
				<Text display="block" pl={40}>
					- <Text fontWeight={800}>invested</Text>
					- how much money investor invested so far in shares, for example: investor A invested in share A 60.000 EUR (optional)
				</Text>
				<Text display="block" pl={40}>
					- <Text fontWeight={800}> ownership </Text>
					- how many percent investor owns shares, for example: investor A owns 15% of share A
				</Text>
				<Text display="block" pl={40}>
					- <Text fontWeight={800}>CAP</Text>
					- maximum payment from invested money. Usually is 1x-3x. for example: if investor A has invested 600.000EUR and CAP is 2x
					than the maximum amount he will be paid off is 1.2M EUR. CAP is calculated only for investors who participate in
					distribution of common stock.
				</Text>
				<Text display="block" pl={40}>
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
	padding: 0 140px;
`;
