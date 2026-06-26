let employees = JSON.parse(localStorage.getItem("employees")) || [
    {
        name: "Rahul",
        department: "IT",
        status: "Active"
    },
    {
        name: "Priya",
        department: "HR",
        status: "Active"
    }
];

function displayEmployees() {

    let table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach((employee, index) => {

        table.innerHTML += `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.status}</td>
            <td>
                <button onclick="editEmployee(${index})">
                    Edit
                </button>

                <button onclick="deleteEmployee(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}

displayEmployees();

document.getElementById("employeeForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;

    if (name === "" || department === "") {
        alert("Please fill all fields");
        return;
    }

    employees.push({
        name: name,
        department: department,
        status: "Active"
    });
    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

    document.getElementById("name").value = "";
    document.getElementById("department").value = "";

});

function deleteEmployee(index) {

    employees.splice(index, 1);

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

}
document.getElementById("searchInput").addEventListener("keyup", function() {

    let searchValue = this.value.toLowerCase();

    let filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchValue)
    );

    let table = document.getElementById("employeeTable");

    table.innerHTML = "";

    filteredEmployees.forEach((employee, index) => {

        table.innerHTML += `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.status}</td>
            <td>
                <button onclick="deleteEmployee(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

});
document.getElementById("departmentFilter").addEventListener("change", function() {

    let selectedDepartment = this.value;

    let filteredEmployees = employees.filter(employee => {

        if (selectedDepartment === "All Departments") {
            return true;
        }

        return employee.department === selectedDepartment;

    });

    let table = document.getElementById("employeeTable");

    table.innerHTML = "";

    filteredEmployees.forEach((employee, index) => {

        table.innerHTML += `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.status}</td>
            <td>
                <button onclick="deleteEmployee(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

});
function editEmployee(index) {

    let newName = prompt("Enter new employee name:", employees[index].name);

    let newDepartment = prompt("Enter new department:", employees[index].department);

    if (newName !== null && newDepartment !== null && newName !== "" && newDepartment !== "") {

        employees[index].name = newName;
        employees[index].department = newDepartment;

        localStorage.setItem("employees", JSON.stringify(employees));

        displayEmployees();

    }

}
document.getElementById("sortButton").addEventListener("click", function () {

    employees.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

});