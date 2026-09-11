const Course = require("../models/Course");

const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Course ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create course",
      error: error.message
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update course",
      error: error.message
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json({
      message: "Course deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
};