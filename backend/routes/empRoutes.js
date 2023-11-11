import express from "express";
import { Emp } from "../models/empModel.js";

const router = express.Router();
let compRoles = ["employee", "supervisor", "senior supervisor", "admin"];

// Route to return all employees (Page -> Home.jsx)
router.get("/", async (req, res) => {
  try {
    const emp = await Emp.find({});

    // if the database is empty this will create a defalt admin so that the heirarchy works
    if (!emp) {
      const admin = {
        name: "admin",
        title: "admin",
        role: "admin",
      };
      Emp.create(admin);
    }

    return res.status(200).json({
      count: emp.length,
      data: emp,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to create a new employee (Page -> CreateEmp.jsx)
router.post("/create", async (req, res) => {
  try {
    if (!req.body.name || !req.body.title) {
      return res.status(400).send({
        message: "Send all required fields: name & title",
      });
    }
    const newEmp = {
      name: req.body.name,
      title: req.body.title,
      supervisor: "admin",
    };

    const emp = await Emp.create(newEmp);

    return res.status(201).send(emp);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to find an employee by id (Page -> ShowEmp.jsx)
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Emp.findById(id);

    return res.status(200).json(emp);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update employee (Page -> UpdateEmp.jsx)
router.put("/update/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.title || !req.body.role) {
      return res.status(400).send({
        message: "Send all required fields: name, title",
      });
    }
    if (
      req.body.role == "employee" ||
      req.body.role == "supervisor" ||
      req.body.role == "senior supervisor"
    ) {
      const { id } = req.params;
      const employeeToDelete = await Emp.findById(id);

      if (employeeToDelete) {
        // Clear the supervisory relationship for all employees supervised by the updated employee
        await Emp.updateMany(
          { supervisor: employeeToDelete.name },
          { $unset: { supervisor: 1 } }
        );
      }

      const result = await Emp.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(404).send({ message: "Employee not found" });
      }

      return res
        .status(200)
        .send({ message: "Employee role updated successfully" });
    } else {
      return res.status(400).send({
        message: "Invalid Role",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Rotue to delete employee (Page -> DeleteEmp.jsx)
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employeeToDelete = await Emp.findById(id);

    if (employeeToDelete) {
      // Clear the supervisory relationship for all employees supervised by the deleted employee
      await Emp.updateMany(
        { supervisor: employeeToDelete.name },
        { $unset: { supervisor: 1 } }
      );
    }

    const result = await Emp.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Employee not found" });
    }

    return res.status(200).send({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to send employee supervisor options (Page -> UpdateSupEmp.jsx)
router.get("/sup/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const empRole = await Emp.findById(id);
    var resData = [];

    let supRole;

    if (!empRole) {
      return res.status(404).send({ message: "Employee not found" });
    }

    if (empRole.role == compRoles[0]) {
      supRole = compRoles[1];
    } else if (empRole.role == compRoles[1]) {
      supRole = compRoles[2];
    } else {
      supRole = compRoles[3];
    }
    const supList = await Emp.find({ role: supRole });

    if (!supList) {
      return res.status(404).send({ message: "No eligible supervisors" });
    } else {
      supList.forEach((element) => {
        // console.log(element.name);
        resData.push(element.name);
      });
      return res.status(200).send(resData);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update employee supervisor (Page -> UpdateSupEmp.jsx)
router.put("/super/:id", async (req, res) => {
  try {
    if (!req.body.supervisor) {
      return res.status(400).send({
        message: "Send all required fields: supervisor",
      });
    }

    const { id } = req.params;
    const empRole = await Emp.findById(id);
    let supRole;
    let match;

    if (!empRole) {
      return res.status(404).send({ message: "Employee not found" });
    }

    if (empRole.role == compRoles[0]) {
      supRole = compRoles[1];
    } else if (empRole.role == compRoles[1]) {
      supRole = compRoles[2];
    } else {
      supRole = compRoles[3];
    }

    const supList = await Emp.find({ role: supRole });

    for (let x = 0; x < supList.length; x++) {
      if (req.body.supervisor == supList[x].name) {
        match = true;
        break;
      } else {
        match = false;
      }
    }

    if (match) {
      const result = await Emp.findByIdAndUpdate(id, req.body);
      if (!result) {
        return res.status(404).send({ message: "Employee not found" });
      }
      return res
        .status(200)
        .send({ message: "Employee supervisor updated successfully" });
    } else {
      return res.status(400).send({
        message: "Invalid Supervisor",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to view hierarchy (Page -> ShowHierarchy.jsx)
router.get("/viewchain", async (req, res) => {
  try {
    // Find the employee in the database
    const employee = await Emp.findOne({ role: "admin" });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Create a function to recursively get the chain of supervisors and subordinates
    const getChain = async (employee) => {
      const chain = {
        name: employee.name,
        title: employee.title,
        role: employee.role,
        subordinates: [],
      };

      //   if (employee.supervisor) {
      //     const supervisor = await Emp.findOne({ name: employee.supervisor });
      //     if (supervisor) {
      //       chain.supervisor = {
      //         name: supervisor.name,
      //         title: supervisor.title,
      //         role: supervisor.role,
      //       };
      //     }
      //   }

      const subordinates = await Emp.find({ supervisor: employee.name });
      for (const subordinate of subordinates) {
        const subChain = await getChain(subordinate);
        chain.subordinates.push(subChain);
      }

      return chain;
    };

    // Get the chain starting from the specified employee
    const employeeChain = await getChain(employee);

    res.json(employeeChain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
