/*
 * @file: index.js
 * @description: It contains function layer for employee collection.
 * @author: Abhishek
 */

const mongoose =require ('mongoose');
const DbSchema =require ('./db-schema.js');

class Employees {
  static saveEmployee(payload) {
    return this(payload).save();
  }
}

DbSchema.loadClass(Employees);


module.exports = mongoose.model('employees', DbSchema, 'employees');
