const bcrypt = require("bcrypt");
const User = require("../models/User-model");
const Employee = require('../models/Employee-Model');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign(
        { _id },
        process.env.SECRET,
        { expiresIn: "2h" }
    );
};

exports.empLogin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({
                error: "No employee application found."
            });
        }
        if (employee.status === "Pending") {
            return res.status(400).json({
                error: "Your application is still pending admin approval."
            });
        }
        if (employee.status === "Rejected") {
            return res.status(400).json({
                error: "Your application has been rejected. Try Signing again later"
            });
        }
        const user = await User.findOne({
            email: employee.email
        });
        if (!user) {
            return res.status(400).json({
                error: "Employee account not created yet."
            });
        }
        const match = await bcrypt.compare(
            password,
            user.password
        );
        if (!match) {
            return res.status(400).json({
                error: "Invalid Password"
            });
        }
        const token = createToken(user._id);
        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


exports.MakeEmp = async (req ,res) => {
    try {
        const { name , email ,phone ,password } = req.body
        const exist = await Employee.findOne({ email })
        if (exist) {
            return res.status(400).json({
                error: "Application already submitted."
            });
        }
    const employee = await Employee.create({name,email,phone,password});
        res.status(201).json({
            message: "Application submitted successfully.",
            employee
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

};

exports.AllEmps = async (req, res) => {
    try {
        const employees = await Employee
            .find({})
            .sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.EmpReq = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Invalid Employee ID"
        });
    }
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                error: "Employee Request Not Found"
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.updateEmp = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Invalid Employee ID"
        });
    }
    try {
        const employee = await Employee.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        if (!employee) {
            return res.status(404).json({
                error: "Employee Request Not Found"
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.deleteEmp = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Invalid Employee ID"
        });
    }
    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({
                error: "Employee Request Not Found"
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.approveEmp =  async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Invalid Employee ID"
        });
    }
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                error: "Employee Request Not Found"
            });
        }
        if (employee.status === "Approved") {
            return res.status(400).json({
                error: "Employee already approved"
            });
        }
        const existingUser = await User.findOne({
            email: employee.email
        });
        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(employee.password, salt);
        await User.create({
            name: employee.name,
            email: employee.email,
            password: hash,
            role: "employee"
        });
        employee.status = "Approved";
        await employee.save();
        res.status(200).json({
            message: "Employee Approved Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

