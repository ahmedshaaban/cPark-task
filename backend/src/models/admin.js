import mongoose from 'mongoose';

const Admin = mongoose.model('Admin', { email: String, password: String });

export default Admin;
