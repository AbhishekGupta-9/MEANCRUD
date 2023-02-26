/*
 * @file: db-schema.js
 * @description: It contains db schema for employees.
 * @author: Abhishek
 */

const mongoose = require("mongoose");

const Employees = new mongoose.Schema(
    {
        firstName: {
            type: String,
            default: null,
            required: true,
        },
        lastName: {
            type: String,
            default: null,
            required: true,
        },
        email: {
            type: String,
            default: null,
            required: true,
        },
        phoneNumber: {
            type: Number,
            default: null,
            required: true
        },
        profilePicture: {
            type: String,
            default: null,
            required: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = Employees;
