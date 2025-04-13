// import Database from "../Database/index.js";
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";


export default function CourseRoutes(app) {

    const findUsersForCourse = async (req, res) => {
        try {
            const { cid } = req.params;
            const users = await enrollmentsDao.findUsersForCourse(cid);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.get("/api/courses/:cid/users", findUsersForCourse);
    
    app.delete("/api/courses/:courseId", async (req, res) => {
        try {
            const { courseId } = req.params;
            const status = await dao.deleteCourse(courseId);
            res.send(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const modules = await modulesDao.findModulesForCourse(courseId);
            res.json(modules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/courses", async (req, res) => {
        try {
            const courses = await dao.findAllCourses();
            console.log("Courses", courses);
            res.send(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        try {
            const { courseId } = req.params;
            const courseUpdates = req.body;
            const status = await dao.updateCourse(courseId, courseUpdates);
            res.send(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
          await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }
     
        res.json(course);
      });
     

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const module = {
                ...req.body,
                course: courseId,
            };
            const newModule = await modulesDao.createModule(module);
            res.send(newModule);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}