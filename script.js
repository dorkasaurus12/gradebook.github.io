// Create a gradebook object
const gradebook = {
    categories: [],
    assignments: [],
    accounts: {
        students: [],
        staff: []
    }
};

// Function to add category and update UI
function addCategoryHandler() {
    const categoryInput = document.getElementById('category-input');
    const categoryName = categoryInput.value;
    if (categoryName) {
        addCategory(categoryName);
        displayCategories();
        categoryInput.value = '';
    } else {
        alert('Please enter a category name');
    }
}

// Function to display categories in the UI
function displayCategories() {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.innerHTML = '';
    gradebook.categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category;
        categoriesList.appendChild(li);
    });
}

// Function to add assignment with due date and grade
function addAssignment(assignmentName, dueDate, grade) {
    gradebook.assignments.push({ name: assignmentName, dueDate: dueDate, grade: grade, submissions: {} });
}

// Function to add student account
function addStudent(name, id) {
    const student = { name: name, id: id, grades: {} };
    gradebook.accounts.students.push(student);
    gradebook.assignments.forEach(assignment => {
        student.grades[assignment.name] = null;
    });
}

// Function to add staff account
function addStaff(name, id) {
    const staff = { name: name, id: id };
    gradebook.accounts.staff.push(staff);
}

// Function to submit assignment by student
function submitAssignment(studentId, assignmentName, grade) {
    const student = gradebook.accounts.students.find(student => student.id === studentId);
    if (student) {
        const assignment = gradebook.assignments.find(assignment => assignment.name === assignmentName);
        if (assignment) {
            student.grades[assignmentName] = grade;
            assignment.submissions[studentId] = grade;
        } else {
            console.log('Assignment not found');
        }
    } else {
        console.log('Student not found');
    }
}

// Sample usage
addCategory('Homework');
addCategory('Exams');

addAssignment('Homework 1', '2022-10-10', 85);
addAssignment('Exam 1', '2022-11-05', 90);

addStudent('Alice', 'A123');
addStudent('Bob', 'B456');

addStaff('Teacher1', 'T789');

// Student Alice submits Homework 1
submitAssignment('A123', 'Homework 1', 80);
