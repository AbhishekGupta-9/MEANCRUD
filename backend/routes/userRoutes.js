"use strict";


import express from "express";
import { saveEmployee, getEmployees, getEmployeeDetails, updateEmployee, deleteEmployee } from "../controller/employees/index";
import { upload } from "../middleware/uploadFile.js";

const userRoutes = express.Router();
userRoutes.post("/saveEmployee", upload.single("profilePicture"), saveEmployee);
userRoutes.get("/getEmployees", getEmployees);

userRoutes.get("/getEmployeeDetails", getEmployeeDetails);

userRoutes.put("/updateEmployee", upload.single("profilePicture"), updateEmployee);

userRoutes.put("/deleteEmployee", deleteEmployee);



export default userRoutes;

