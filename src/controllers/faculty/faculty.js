import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';
    const sortedFaculty = getSortedFaculty(sortBy);
    //res.render('faculty', { faculty: sortedFaculty });
    res.render('faculty/list', { 
      name: ` ${sortedFaculty.name}`, 
      title: `${sortedFaculty.title}`, 
      department: `${sortedFaculty.department}`,
      currentSort: sortBy,
      faculty: sortedFaculty
    });
};

const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);

    // If faculty member doesn't exist, return 404 error
    if (!facultyMember) {
        const err = new Error(`Faculty ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', { 
      name: ` ${facultyMember.name}`, 
      title: `${facultyMember.title}`, 
      department: `${facultyMember.department}`,
      faculty: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };