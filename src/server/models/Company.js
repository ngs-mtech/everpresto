import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Template = mongoose.model('Template');
const Document = mongoose.model('Document');
const Collection = mongoose.model('Collection');
const User = mongoose.model('User');

const CompanySchema = new Schema({
  name: {
    type: String,
    required: 'What\'s your company\'s name?'
  }
}, {
  timestamps: true
});

// Removes all associated documents before it is removed
CompanySchema.pre('remove', function(next) {
  Template.remove({_company: this._id}).exec();
  Document.remove({_company: this._id}).exec();
  Collection.remove({_company: this._id}).exec();
  User.remove({_company: this._id}).exec();
  next();
});

// STATICS
CompanySchema.statics.createWithUser = function(companyData, userData) {
  return new Promise((resolve, reject) => {
    const {name} = companyData;

    this.create({name}, (err, company) => {
      if (err) reject(err);
      // Creates the user as an admin of the company if the company was successfully created
      company = company.toObject();
      User.register(company._id, userData, 'admin')
        .then((user) => resolve({company, user}))
        .catch((err) => reject(err));
    });
  });
};

export default mongoose.model('Company', CompanySchema);