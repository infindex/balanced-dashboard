Balanced.Invoice = Balanced.Model.extend({
	source: Balanced.Model.belongsTo('source', 'Balanced.FundingInstrument'),

	from_date: function() {
		var period = this.get('period');
		if(!period) {
			return period;
		}
		return period[0];
	}.property('period'),
	to_date: function() {
		var period = this.get('period');
		if(!period) {
			return period;
		}
		return period[1];
	}.property('period'),

	subtotal: function() {
		var total = this.get('total_fee');
		var adjustments = this.get('adjustments_total_fee');
		if(Ember.isNone(total) || Ember.isNone(adjustments)) {
			return undefined;
		}
		return total - adjustments;
	}.property('total_fee', 'adjustments_total_fee'),

	is_scheduled: function() {
		return this.get('state') === 'scheduled';
	}.property('state'),

	reversal_fee: function() {
		return 0;
	}.property()
});

Balanced.TypeMappings.addTypeMapping('invoice', 'Balanced.Invoice');
