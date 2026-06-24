let employees = [
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

    displayEmployees();

    document.getElementById("name").value = "";
    document.getElementById("department").value = "";

});

function deleteEmployee(index) {

    employees.splice(index, 1);

    displayEmployees();

}