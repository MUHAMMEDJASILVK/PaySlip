
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();




// MIDDLEWARE

app.use(cors());
app.use(express.json());




// MONGODB CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017/payrollDB")
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log(err);

});




// EMPLOYEE SCHEMA

const employeeSchema = new mongoose.Schema({

    employeeName: {
        type: String
    },

    employeeId: {
        type: String
    },

    designation: {
        type: String
    },

    joiningDate: {
        type: String
    },

    basicSalary: {
        type: Number
    },

    hra: {
        type: Number
    },

    da: {
        type: Number
    },

    allowances: {
        type: Number
    },

    esi: {
        type: Number
    },

    pf: {
        type: Number
    }

});




// MODEL

const Employee = mongoose.model("Employee", employeeSchema);






// ==========================================
// ADD EMPLOYEE
// ==========================================

app.post("/addEmployee", async (req, res) => {

    try {

        const employee = new Employee({

            employeeName: req.body.employeeName,
            employeeId: req.body.employeeId,
            designation: req.body.designation,
            joiningDate: req.body.joiningDate,

            basicSalary: req.body.basicSalary,

            hra: req.body.hra,
            da: req.body.da,
            allowances: req.body.allowances,

            esi: req.body.esi,
            pf: req.body.pf

        });

        await employee.save();

        res.send("Employee Added Successfully");

    } catch (error) {

        console.log(error);

        res.status(500).send("Failed To Add Employee");
    }
});






// ==========================================
// GET ALL EMPLOYEES
// ==========================================

app.get("/employees", async (req, res) => {

    try {

        const employees = await Employee.find();

        res.json(employees);

    } catch (error) {

        console.log(error);

        res.status(500).send("Failed To Fetch Employees");
    }
});






// ==========================================
// GET SINGLE EMPLOYEE
// ==========================================

app.get("/employee/:id", async (req, res) => {

    try {

        const employee = await Employee.findById(req.params.id);

        res.json(employee);

    } catch (error) {

        console.log(error);

        res.status(500).send("Failed To Fetch Employee");
    }
});






// ==========================================
// UPDATE EMPLOYEE
// ==========================================

app.put("/updateEmployee/:id", async (req, res) => {

    try {

        await Employee.findByIdAndUpdate(

            req.params.id,

            {

                employeeName: req.body.employeeName,
                employeeId: req.body.employeeId,
                designation: req.body.designation,
                joiningDate: req.body.joiningDate,

                basicSalary: req.body.basicSalary,

                hra: req.body.hra,
                da: req.body.da,
                allowances: req.body.allowances,

                esi: req.body.esi,
                pf: req.body.pf
            }

        );

        res.send("Employee Updated Successfully");

    } catch (error) {

        console.log(error);

        res.status(500).send("Failed To Update Employee");
    }
});






// ==========================================
// DELETE EMPLOYEE
// ==========================================

app.delete("/deleteEmployee/:id", async (req, res) => {

    try {

        const id = req.params.id;

        await Employee.findByIdAndDelete(id);

        res.send("Employee Deleted Successfully");

    } catch (error) {

        console.log(error);

        res.status(500).send("Delete Failed");
    }
});






// ==========================================
// SERVER
// ==========================================

app.listen(5000, () => {

    console.log("Server Running On Port 5000");

});
