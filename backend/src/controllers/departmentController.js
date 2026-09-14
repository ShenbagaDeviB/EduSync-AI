const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();

    res.status(201).json(department);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Department ID or code already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create department",
      error: error.message
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch departments",
      error: error.message
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update department",
      error: error.message
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    res.status(200).json({
      message: "Department deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete department",
      error: error.message
    });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
};