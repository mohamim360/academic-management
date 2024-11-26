
import React from 'react';
import {  Layout,  theme } from 'antd';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import { sidebarItemsGenerator } from './utils/sidebarItemsGenerator'; // Import the generator function
import { useAppSelector } from './redux/hooks'; // Import to get the user role
import { selectCurrentUser } from './redux/features/auth/authSlice'; // Selector for current user
import { adminPaths } from './routes/admin.routes';
import { facultyPaths } from './routes/faculty.routes';
import { studentPaths } from './routes/student.routes';

const {  Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Get the current user role from the Redux store
  const currentUser = useAppSelector(selectCurrentUser);

  // Based on the role, determine which paths to show
  let sidebarItems = [];
  if (currentUser?.role === 'admin') {
    sidebarItems = sidebarItemsGenerator(adminPaths, 'admin');
  } else if (currentUser?.role === 'faculty') {
    sidebarItems = sidebarItemsGenerator(facultyPaths, 'faculty');
  } else if (currentUser?.role === 'student') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sidebarItems = sidebarItemsGenerator(studentPaths, 'student');
  }

  return (
    <ProtectedRoute role={undefined}>
  
        <Layout> {/* Nested layout for sidebar and main content */}
          <Content style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          
            <div
              style={{
                background: colorBgContainer,
                flex: 1, // Ensure that this div takes up the remaining space
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <MainLayout /> {/* Main content area takes full height */}
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', height: '64px' }}> {/* Fixed footer height */}
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
     
    </ProtectedRoute>
  );
};

export default App;
