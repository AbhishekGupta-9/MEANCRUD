import mongoose from "mongoose";
import Employees, { find } from "../../models/employee/index";

export const saveEmployee = async (req, res) => {
    try {
        const emailExist = await Employees.findOne({ email: req.body.email, isDeleted: false });
        if (emailExist) {
            return res.status(400).json({
                status: false,
                statusCode: 400,
                message: 'Email Already Exist',
            });
        }
        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            profilePicture: req.file ? req.file.path : ''
        };
        console.log('payload', payload)
        const employee = await Employees.saveEmployee(payload);
        if (employee) {
            return res.status(200).json({
                status: true,
                statusCode: 200,
                message: 'Employee Added Successfully.',
            });
        }
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Something went wrong!',
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Internal server error!',
        });
    }
};

export const getEmployees = async (req, res) => {
    try {
        let condition = {};

        condition = {
            ...condition,
            isDeleted: false,
        };
        const result = await Employees.find(condition);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Data fetched successfully',
            data: result
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Internal server error!',
        });
    }
};

export const getEmployeeDetails = async (req, res) => {
    try {
        console.log('req.query.employeeId', req.query.employeeId);
        const employee = await Employees.findOne({ _id: mongoose.Types.ObjectId(req.query.employeeId) });

        if (employee) {
            return res.status(200).json({
                status: true,
                statusCode: 200,
                message: 'Data fetched successfully',
                data: employee
            });
        }
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Employee Not found!',
        });
    } catch (e) {
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Internal server error!',
        });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        Employees.updateOne(
            { _is: mongoose.Types.ObjectId(req.body._id) },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    profilePicture: req.file ? req.file.path : ''
                }
            },
            (err, result) => {
                if(err){
                    return res.status(400).json({
                        status: false,
                        statusCode: 400,
                        message: 'Something went wrong!',
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        statusCode: 200,
                        message: 'Employee Updated successfully',
                        data: result
                    });
                }
            }
        );
    } catch (e) {
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Internal server error!',
        });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        Employees.updateOne(
            { _is: mongoose.Types.ObjectId(req.body._id) },
            {
                $set: {
                    isDeleted: true
                }
            },
            (err, result) => {
                if(err){
                    return res.status(400).json({
                        status: false,
                        statusCode: 400,
                        message: 'Something went wrong!',
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        statusCode: 200,
                        message: 'Employee Deleted successfully',
                        data: result
                    });
                }
            }
        );
    } catch (e) {
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: 'Internal server error!',
        });
    }
};