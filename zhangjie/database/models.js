module.exports = {
	user: {
		name: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	works: {
		name: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		type: {
			type: String,
			required: true
		},
		image_url: {
			type: String
		},
		create_date: {
			type: Date,
			default: Date.now
		}
	},
	message:{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		workId:{
			type: String,
			required: true
		},
		create_date: {
			type: Date,
			default: Date.now
		}
	},
	personResume:{
		name: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		phone:{
			type:String,
			required:true
		},
		description: {
			type: String
		},
		skill:{
			type:String,
			required:true
		},
		avatar:{
			type:String
		},
		create_date: {
			type: Date,
			default: Date.now
		}
	}
};
