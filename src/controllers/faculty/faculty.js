import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyListPage = async (req, res) => {
    const sortBy = req.query.sort || 'name';
    const sortedFaculty = await getSortedFaculty(sortBy);
    //res.render('faculty', { faculty: sortedFaculty });
    res.render('faculty/list', { 
      name: ` ${sortedFaculty.name}`, 
      title: 'Faculty Directory', 
      department: `${sortedFaculty.department}`,
      currentSort: sortBy,
      faculty: sortedFaculty
    });
};

const facultyDetailPage = async (req, res, next) => {
    const facultyId = req.params.facultyId;
    const facultyMember = await getFacultyBySlug(facultyId);

    // If faculty member doesn't exist, return 404 error
    //if (!facultyMember) {
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', { 
      name: ` ${facultyMember.name}`, 
      title: `${facultyMember.name}`, 
      department: `${facultyMember.department}`,
      faculty: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };