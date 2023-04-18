import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import Homepage from './compnoents/Homepage';
import AssignMarks from './compnoents/AssignMarks';
import AllStudents from './compnoents/AllStudents';
import AssignedStudents from './compnoents/AssignedStudents';
import UnassignedStudents from './compnoents/UnassignedStudents';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Homepage />}>
					<Route index element={<Navigate to="student-assign" />} />
					<Route
						path="student-assign"
						element={<h1>Student Assign</h1>}
					/>
					<Route path="marks-assign" element={<AssignMarks />}>
						<Route path="all-students" element={<AllStudents />} />
						<Route
							path="assigned-students"
							element={<AssignedStudents />}
						/>
						<Route
							path="unassigned-students"
							element={<UnassignedStudents />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
