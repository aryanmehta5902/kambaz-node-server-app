import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllAssignments() {
  return await model.find();
}

export async function getAssignmentsForCourse(courseId) {
  return await model.find({ course: courseId });
}

export async function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return await model.create(newAssignment);
}

export async function removeAssignment(assignmentId) {
  return await model.findByIdAndDelete(assignmentId);
}

export async function updateAssignment(assignmentId, assignmentUpdates) {
  return await model.findByIdAndUpdate(assignmentId, assignmentUpdates, { new: true });
}