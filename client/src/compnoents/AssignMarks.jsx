import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AssignMarks = () => {

	const navLinkStyles = {
		color: '#6A63F5',
		textDecoration: 'none',
		marginLeft: '20px',
	};

	return (
		<div className="student-assign-con">
			<NavLink to="all-students" style={navLinkStyles}>
				ALL
			</NavLink>
			<NavLink to="assigned-students" style={navLinkStyles}>
				assigned-students
			</NavLink>
			<NavLink to="unassigned-students" style={navLinkStyles}>
				Unassigned-students
			</NavLink>
			<Outlet />
		</div>
	);
};

export default AssignMarks;
