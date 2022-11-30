const mongoose = require('mongoose');
const listSchema = mongoose.Schema({
		color: {
			type: String,
			enum: ['red','green','blue','white'],
			required:  true
		},
		title: {
			type: String,
			required: true
		},
		content: {
			type: [{
					item: {
						type: String,
						required: true
					},
					checked: {
						type: Boolean,
						required: true
					},
					_id: false
				}]
		}
	});

const List = new mongoose.model('List', listSchema);

module.exports = List;