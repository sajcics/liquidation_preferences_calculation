import React  from 'react';
import styled from 'styled-components';

import {Table, Button, InputNumber, InputText, Checkbox} from '../components';
import {defaultValues} from '../configs/defaultValues';
import {LiquidationPreferenceCalculation} from '../LiquidationPreferenceCalculation'

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
				<Table.Td><InputNumber onChange={this.onChangeData('ownership', index)} value={element.ownership}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('cap', index)} value={element.cap} disabled={element.isFounders}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('pp', index)} value={element.pp} disabled={element.isFounders}/></Table.Td>
				<Table.Td><InputNumber onChange={this.onChangeData('priority', index)} value={element.priority} disabled={element.isFounders}/></Table.Td>
			</Table.Tr>
		);
	}

	render() {
		const {data, companySold} = this.state;

		return (
			<StyledContainer>
				{/*<p><b>Rules:</b></p>
				<p>CAP can be <b>participating</b> with values 1-3, and <b>non-participating</b> with value 0.</p>
				<p>Participating preference or P.P. can holds values 1-3 (meaning: 1x participating preference)</p>
				<p>Priority has values from 1-N where value 1 is highest priority and N the lowest. Common shares always
				has lowest priority.</p>*/}

				Company is sold for $
				<InputNumber onChange={this.onChangeDataCompany} value={companySold}/>

				<Table>
					<Table.Head>
						<Table.Tr>
							<Table.Th>Share's class</Table.Th>
							<Table.Th>Founders?</Table.Th>
							<Table.Th>Shares</Table.Th>
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

				<Button onClick={this.onClickAddRow} padding={10} mt={20} mb={20}>Add new stakeholder</Button>
				<Button onClick={this.onClickCalculate} padding={10} mt={20} mb={20}>Calculate</Button>


			</StyledContainer>
		);
	}
}

const StyledContainer = styled.div`
	text-align: left;
`;
