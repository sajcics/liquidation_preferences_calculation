export class LiquidationPreferenceCalculation {
	founders = [];
	investors = [];
	allStakeholders = [];
	moneyLeft = null;

	constructor(data, companySold) {
		const _data = data.map((e) => e);

		const founders = _data.filter(item => item.isFounders);
		const investors = _data.filter(item => !item.isFounders).sort((a,b) => {
			if (a.priority > b.priority) {
				return 1;
			} else if (a.priority < b.priority) {
				return -1
			}

			return 0;
		});

		this.founders = founders;
		this.investors = investors;
		this.allStakeholders = _data;
		this.moneyLeft = companySold;
	}

	calculate() {
		this.distributeProRata();
		this.distributeLeftOversCap();

		this.calculateNewOwnershipPercentage();
		this.distributeToAllStakeholders();

		console.log(this.allStakeholders);
	}

	/* calculate how much money left to distribute to all stakeholders */
	distributeProRata() {
		for (const record of this.investors) {
			const invested = record.invested;
			const pp = record.pp;
			const payment = invested * pp; //how much money investor should get back


			if (this.moneyLeft - payment >= 0) {
				this.moneyLeft -= payment;
			} else {
				this.moneyLeft = 0;
			}
		}
		console.log("money left", this.moneyLeft)
	}

	/* calculate if CAP is profitable than to convert to common shares*/
	distributeLeftOversCap() {
		for (const record of this.investors) {
			const cap = record.cap;
			const invested = record.invested;
			const pp = record.pp;
			const ownership = record.ownership;

			const ownershipPart = this.moneyLeft * ownership / 100;
			const maxPaymentWithCAP = cap * invested; //how much is maximum CAP
			const fullPP = pp * invested;

			const payment = ownershipPart + fullPP;

			if (payment > maxPaymentWithCAP) { //reached maximum
				if (ownershipPart <= maxPaymentWithCAP) { //compare if full CAP is more profitable without CAP
					record.earned = maxPaymentWithCAP;
					this.moneyLeft -= maxPaymentWithCAP - invested;
					record.paidUp = true;
					record.ownership = 0;
					this.calculateNewOwnershipPercentage(); // calculate new ownership of stakeholders
				} else {
					this.moneyLeft += invested;
					record.invested = 0;
				}
			}
		}
	}

	/* calculate new ownership percentage in case if any stakeholder was paid */
	calculateNewOwnershipPercentage() {
		let percentageSum = 0;

		for (const record of this.allStakeholders) {
			if (!record.paidUp) {
				percentageSum += record.ownership;
			}
		}

		if (percentageSum !== 100) {
			const percentageUnit = (100 - percentageSum) / percentageSum;
			//calculate for each new percent of ownership
			for (const record of this.allStakeholders) {
				if (!record.paidUp) {
					const newOwnership = (percentageUnit * record.ownership) + record.ownership;
					record.ownership = newOwnership;
				}
			}
		}
	}

	distributeToAllStakeholders() {
		for (const record of this.allStakeholders) {
			if (!record.paidUp) {
				const fullPP = (record.pp || 0) * record.invested;
				record.earned = fullPP + (this.moneyLeft * record.ownership / 100);
			}
		}
	}
}