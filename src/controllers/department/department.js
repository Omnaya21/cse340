import { getAllCourses, getCourseById, getCoursesByDepartment, getSortedSections } from '../../models/catalog/catalog.js';

// Route handler for the course catalog list page
const departmentPage = (req, res) => {
    const departments = getCoursesByDepartment();

    res.render('department', {
        title: 'Department Courses',
        departments: departments
    });
};

// Route handler for individual course detail pages
const departmentCourseDetailPage = (req, res, next) => {
    const courseId = req.params.courseId;
    const course = getCourseById(courseId);

    // If course doesn't exist, create 404 error
    if (!course) {
        const err = new Error(`Course ${courseId} not found`);
        err.status = 404;
        return next(err);
    }

    // Handle sorting if requested
    const sortBy = req.query.sort || 'time';
    const sortedSections = getSortedSections(course.sections, sortBy);

    res.render('course-detail', {
        title: `${course.id} - ${course.title}`,
        course: { ...course, sections: sortedSections },
        currentSort: sortBy
    });
};

export { departmentPage, departmentCourseDetailPage };