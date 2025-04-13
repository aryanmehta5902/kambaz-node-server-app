import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        try {
            const {assignmentId} = req.params;
            const assignmentUpdates = req.body;
            const updatedAssignment = await dao.updateAssignment(assignmentId, assignmentUpdates);
            res.json(updatedAssignment);
        } catch (error) {
            res.status(500).json({ message: "Error updating assignment", error: error.message });
        }
    });
    
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        try {
            const {courseId} = req.params;
            const assignments = await dao.getAssignmentsForCourse(courseId);
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving assignments", error: error.message });
        }
    });
    
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        try {
            const {assignmentId} = req.params;
            await dao.removeAssignment(assignmentId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: "Error deleting assignment", error: error.message });
        }
    });
    
    app.post("/api/assignments/create", async (req, res) => {
        try {
            const assignment = req.body;
            const newAssignment = await dao.createAssignment(assignment);
            res.json(newAssignment);
        } catch (error) {
            res.status(500).json({ message: "Error creating assignment", error: error.message });
        }
    });
    
    app.get("/api/assignments", async (req, res) => {
        try {
            const assignments = await dao.getAllAssignments();
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving assignments", error: error.message });
        }
    });
}