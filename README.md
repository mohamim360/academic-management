# Frontend Application for Academic Management System

This repository contains the frontend implementation for the Academic Management System. This system is designed to provide role-based management for **administrators**, **faculty**, and **students** in an educational institution. It enables streamlined workflows such as user and course management, academic scheduling, and course registration.

---

## **Key Features**

### 1. **Role-Based Access Control**
- **Admin**:
  - Manage users (admins, faculty, and students).
  - Oversee academic departments, faculties, and semesters.
  - Create and manage courses, assign them to faculties, and track registration.
- **Faculty**:
  - Manage assigned courses.
  - View and manage enrolled students.
- **Student**:
  - View course offerings.
  - Register for courses and view personalized schedules.

### 2. **Comprehensive User Management**
- Add, update, and delete users with role-based attributes.
- Assign academic roles and departments.
- Manage user authentication and access control using JWT.

### 3. **Academic Structure Management**
- Create and manage:
  - Academic faculties.
  - Academic departments.
  - Academic semesters (with start and end dates, min/max credits).

### 4. **Course and Semester Management**
- Administer course details, prerequisites, and assigned faculties.
- Track course offerings and semester registrations.
- Enable students to view and register for available courses.

### 5. **Dynamic UI Components**
- Modular and reusable UI components for forms, layouts, and dashboards.
- Custom date pickers, dropdowns, and time pickers integrated for seamless data entry.

### 6. **State Management**
- Centralized state management using Redux Toolkit for scalable and maintainable data flow.

### 7. **Secure Authentication**
- Implements login, logout, and token-based user authentication.

---

## **Project Structure**
The project is built using **React**, **TypeScript**, and **Vite**. The structure is modular and follows best practices for scalability, making it easy to extend and maintain.

### **Directory Overview**

#### `src`
- **`assets`**: Contains images and static assets (e.g., logos, icons).
- **`components`**:
  - **Form**: Contains reusable form elements like:
    - `PHDatePicker`: Date picker for forms.
    - `PHInput`: Standard text input field.
    - `PHSelect`: Dropdown selection component.
    - `PHTimePicker`: Time selection component.
  - **Layout**:
    - `AdminLayout`: Layout for admin pages.
    - `MainLayout`: General layout for the application.
    - `ProtectedRoute`: Handles route access based on authentication and roles.
    - `Sidebar`: Dynamic sidebar generation for role-based navigation.
- **`constants`**: Stores global constants (e.g., semester details).
- **`pages`**:
  - Contains all pages grouped by user roles and features:
    - **Admin**: Pages for managing users, academic structures, and courses.
    - **Faculty**: Pages for viewing assigned courses and students.
    - **Student**: Pages for course registration and schedules.
- **`redux`**:
  - **Hooks**: Contains custom Redux hooks.
  - **Store**: Centralized store configuration.
  - **Features**: Modular slices for different functionalities like:
    - Admin management (user, course, academic management).
    - Faculty and student-specific features.
    - Authentication (login/logout/token verification).
- **`routes`**: Centralized routing configuration for admin, faculty, and student roles.
- **`schemas`**: Form validation schemas for academic and course management.
- **`types`**: TypeScript type definitions for better type safety.
- **`utils`**: Utility functions for common tasks like route generation and sidebar configuration.

---

## **Installation and Setup**

### **Prerequisites**
- **Node.js**: Ensure Node.js (v16 or higher) is installed.
- **Package Manager**: npm or yarn.
- **Backend**: A running backend service (refer to the backend repository README for setup).

### **Steps**
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the application**:
   Start the development server:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Lint and format code**:
   To ensure clean and consistent code:
   ```bash
   npm run lint
   ```

---

## **Usage**

### **Authentication**
- Access different dashboards based on user roles.
- Secure login/logout using JWT.

### **Admin Features**
- Manage users:
  - Create, update, or delete admins, faculty, and students.
  - Assign academic roles and departments.
- Manage academics:
  - Add, update, or delete academic faculties, departments, and semesters.
- Manage courses:
  - Create new courses, set prerequisites, and assign faculties.
  - Track semester course offerings and registrations.

### **Faculty Features**
- View and manage courses assigned by admin.
- Manage student enrollments.

### **Student Features**
- View available courses for the semester.
- Register for courses and view schedules.

---

## **Core Technologies**

### **Frontend Stack**
- **React**: Component-based frontend framework.
- **TypeScript**: Adds type safety to JavaScript.
- **Redux Toolkit**: Simplified state management.
- **Vite**: Fast development server and build tool.
- **React Router**: Routing for multi-page navigation.

### **Styling**
- **CSS**: Included for basic styling, with potential integration of libraries like Tailwind or Material-UI.

---

## **Important Files**

### Entry Points
- **`App.tsx`**: Main entry point of the application.
- **`main.tsx`**: Initializes the app with React and Redux.

### Pages
- **Admin Pages**:
  - `AdminDashboard.tsx`: Overview of admin-specific features.
  - `AcademicDepartment.tsx`: Manage academic departments.
  - `CreateAcademicSemester.tsx`: Add new semesters.
- **Faculty Pages**:
  - `FacultyDashboard.tsx`: Overview of assigned courses.
  - `MyCourses.tsx`: Manage course content and enrolled students.
- **Student Pages**:
  - `StudentDashboard.tsx`: View schedule and semester progress.
  - `OfferedCourse.tsx`: Course registration interface.

### Redux
- **State Management**:
  - `authSlice.ts`: Handles authentication state.
  - `admin.api.ts`: Manages admin-related API calls (e.g., course creation).
  - `facultyCourses.api.ts`: Handles faculty-specific APIs.
  - `studentCourseManagement.api.ts`: Manages student course-related features.

---

## **ER Diagram Integration**
This frontend application integrates with the backend using the provided **ER Diagram**, which defines the relationships between users, courses, semesters, and academic entities. All API interactions align with these relationships for seamless integration.

---

## **Future Enhancements**
- **Real-Time Features**:
  - Add WebSocket support for notifications and live updates.
- **Enhanced UI/UX**:
  - Integrate advanced design frameworks (e.g., Material-UI or Chakra UI).
- **Data Analytics**:
  - Visual dashboards for admins to track academic progress.

---
