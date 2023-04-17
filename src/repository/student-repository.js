const { Student } = require("../models/index");

class StudentRepository {
  async createStudent(data) {
    try {
      const student = await Student.create(data);
    } catch (error) {
      console.log("Something went wrong in the Repository Layer");
      throw { error };
    }
  }
}
