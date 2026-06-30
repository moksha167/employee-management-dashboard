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
    let currentPage = 1;
    let rowsPerPage = 5;
function displayEmployees() {

    let table = document.getElementById("employeeTable");
    table.innerHTML = "";

    if (employees.length === 0) {
        table.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;">
                No employees found
            </td>
        </tr>
        `;
        return;
    }

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;

    employees.slice(start, end).forEach((employee, index) => {

        table.innerHTML += `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.status}</td>
            <td>
                <button onclick="editEmployee(${start + index})">
                    Edit
                </button>

                <button onclick="deleteEmployee(${start + index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}
displayEmployees();
updateDashboard();
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
        updateDashboard();

        document.getElementById("name").value = "";
        document.getElementById("department").value = "";

    });

    function deleteEmployee(index) {

        employees.splice(index, 1);

        localStorage.setItem("employees", JSON.stringify(employees));

        displayEmployees();
        updateDashboard();

    }
    document.getElementById("searchInput").addEventListener("keyup", function() {

        let searchValue = this.value.toLowerCase();

        let filteredEmployees = employees
        .map((employee, index) => ({ employee, index }))
        .filter(item =>
            item.employee.name.toLowerCase().includes(searchValue)
        );

        let table = document.getElementById("employeeTable");

        table.innerHTML = "";

        filteredEmployees.forEach((item) => {

            table.innerHTML += `
            <tr>
                <td>${item.employee.name}</td>
                <td>${item.employee.department}</td>
                <td>${item.employee.status}</td>
                <td>
            <button onclick="editEmployee(${item.index})">
                Edit
            </button>

            <button onclick="deleteEmployee(${item.index})">
                Delete
            </button>
            </td>
            </tr>
            `;

        });

    });
    document.getElementById("departmentFilter").addEventListener("change", function() {

        let selectedDepartment = this.value;
        if (selectedDepartment === "All Departments") {
            displayEmployees();
            return;
        }

        let filteredEmployees = employees
            .map((employee, index) => ({ employee, index }))
            .filter(item => {

                if (selectedDepartment === "All Departments") {
                    return true;
                }

                return item.employee.department === selectedDepartment;

            });

        let table = document.getElementById("employeeTable");

        table.innerHTML = "";

        filteredEmployees.forEach((item) => {

            table.innerHTML += `
            <tr>
                <td>${item.employee.name}</td>
                <td>${item.employee.department}</td>
                <td>${item.employee.status}</td>
                <td>
                    <button onclick="editEmployee(${item.index})">
                        Edit
                    </button>

                    <button onclick="deleteEmployee(${item.index})">
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
            updateDashboard();

        }

    }
    document.getElementById("sortButton").addEventListener("click", function () {

        employees.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        localStorage.setItem("employees", JSON.stringify(employees));

        displayEmployees();
        updateDashboard();

    });
    document.getElementById("nextBtn").addEventListener("click", function () {

        if (currentPage * rowsPerPage < employees.length) {
            currentPage++;
            displayEmployees();
            updateDashboard();
        }

    });

    document.getElementById("prevBtn").addEventListener("click", function () {

        if (currentPage > 1) {
            currentPage--;
            displayEmployees();
            updateDashboard();
        }

    });
    function updateDashboard() {

        document.getElementById("totalEmployees").textContent = employees.length;

        document.getElementById("activeEmployees").textContent =
            employees.filter(employee => employee.status === "Active").length;

        let departments = [...new Set(employees.map(employee => employee.department))];

        document.getElementById("departmentCount").textContent = departments.length;

        document.getElementById("recentActivity").textContent =
            employees.length > 0
                ? "Last Added: " + employees[employees.length - 1].name
                : "No Activity";
    }