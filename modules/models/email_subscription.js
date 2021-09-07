const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// email_subscription_data form schema
const email_subscription = new Schema({
    
    email:                { type: String, required: true },

});


// set this email_subscription_data model
const email_subscription_data_schema = mongoose.model('email_subscription_data', email_subscription);


