import React, { useState } from 'react';
import MentorSelect from './MentorSelect';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
	const [mentor, setMentor] = useState(null);

	const verifyAndSet = (mentorId) => {
		setMentor(mentorId);
        navigate("/");
	};

	const resetMentor = () => {
		setMentor(null);
        navigate('/');
	};

    const navLinkStyles = {
		color: '#6A63F5',
		textDecoration: 'none',
		marginLeft: '20px',
	};

	return (
		<div className="app">
			{!mentor ? (
				<MentorSelect verifyAndSet={verifyAndSet} />
			) : (
				<div className="mentor-dash-con">
					<div className="nav-con">
						<div className="nav">
							<NavLink to="student-assign" style={navLinkStyles}>
								Assign Student
							</NavLink>
							<NavLink to="marks-assign" style={navLinkStyles}>
								Assign Marks
							</NavLink>
						</div>
						<div cl>
							<p>Current mentor id: {mentor}</p>
							<button onClick={resetMentor}>Change Mentor</button>
						</div>
					</div>

					<Outlet />
				</div>
			)}
		</div>
	);
};

export default Homepage;
