const inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool(
  {
    user: "postgres",
    password: "",
    host: "localhost",
    database: "employees_db",
  },
//   console.log(`Successfully connected to employees_db!`)
);

pool.connect();

const mainQst = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "main",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

const addDptQst = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "newDptName",
  },
];

const addRoleQst = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "newRoleName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "newRoleSalary",
  },
  {
    type: "list",
    message: "Which department does the role belong to?",
    name: "newRoleDpt",
    choices: [],
  },
];

const addEmpQst = [
  {
    type: "input",
    message: `What is the employee's first name?`,
    name: "newEmpFstName",
  },
  {
    type: "input",
    message: `What is the employee's last name?`,
    name: "newEmpLstName",
  },
  {
    type: "list",
    message: `What is the employee's role?`,
    name: "newEmpRole",
    choices: [],
  },
  {
    type: "list",
    message: `Who is the employee's manager?`,
    name: "newEmpMngr",
    choices: [],
  },
];

const updEmpRoleQst = [
  {
    type: "list",
    message: `Which employee's role do you want to update?`,
    name: "updEmpRoleName",
    choices: [],
  },
  {
    type: "list",
    message: `Which role do you want to assign the selected employee?`,
    name: "updEmpRoleRole",
    choices: [],
  },
];

function getDptChoices() {
  return pool
    .query("SELECT id, name FROM department")
    .then((res) => res.rows.map((row) => ({ name: row.name, value: row.id })))
    .catch((err) => {
      console.error("Error querying departments:", err);
      return [];
    });
}

function getRoleChoices() {
  return pool
    .query("SELECT id, title FROM role")
    .then((res) => res.rows.map((row) => ({ name: row.title, value: row.id })))
    .catch((err) => {
      console.error("Error querying role:", err);
      return [];
    });
}

function getMngrChoices() {
  return pool
    .query("SELECT id, first_name, last_name FROM employee")
    .then((res) => {
      const managers = res.rows.map((row) => ({
        name: `${row.first_name} ${row.last_name}`,
        value: row.id,
      }));

      managers.unshift({
        name: "None",
        value: null,
      });
      return managers;
    })
    .catch((err) => {
      console.error("Error querying managers:", err);
      return [];
    });
}

function updateEmpChoices() {
  return pool
    .query("SELECT id, first_name, last_name FROM employee")
    .then((res) =>
      res.rows.map((row) => ({
        name: `${row.first_name} ${row.last_name}`,
        value: row.id,
      }))
    )
    .catch((err) => {
      console.error("Error querying employees:", err);
      return [];
    });
}

function empTracker() {
  inquirer.prompt(mainQst).then((res) => {
    const choice = res.main;
    if (choice === "View All Employees") {
      viewEmps();
    } else if (choice === "Add Employee") {
      addEmp();
    } else if (choice === "Update Employee Role") {
      updEmpRole();
    } else if (choice === "View All Roles") {
      viewRoles();
    } else if (choice === "Add Role") {
      addRole();
    } else if (choice === "View All Departments") {
      viewDpts();
    } else if (choice === "Add Department") {
      addDpt();
    } else {
      return;
    }
  });
}

function viewDpts() {
  pool
    .query("SELECT * FROM department")
    .then((result) => {
      console.table(result.rows);
      empTracker();
    })
    .catch((err) => {
      console.error("Error querying departments:", err);
      empTracker();
    });
}

function viewRoles() {
  pool
    .query("SELECT * FROM role")
    .then((result) => {
      console.table(result.rows);
      empTracker();
    })
    .catch((err) => {
      console.error("Error querying roles:", err);
      empTracker();
    });
}

const empQuery = `
    SELECT
        e.id,
        e.first_name,
        e.last_name,
        r.title,
        d.name AS department,
        r.salary,
        m.first_name || ' ' || m.last_name AS "manager"
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d on r.department = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
`;

function viewEmps() {
  pool
    .query(empQuery)
    .then((result) => {
      console.table(result.rows);
      empTracker();
    })
    .catch((err) => {
      console.error("Error querying employees:", err);
      empTracker();
    });
}

function addDpt() {
  inquirer.prompt(addDptQst).then((res) => {
    pool
      .query("INSERT INTO department (name) VALUES ($1)", [res.newDptName])
      .then(() => {
        console.log(`Added ${res.newDptName} to the database.`);
        empTracker();
      })
      .catch((err) => {
        console.error("Error adding to the database:", err);
        empTracker();
      });
  });
}

function addRole() {
  getDptChoices().then((departments) => {
    addRoleQst[2].choices = departments;
    // console.log(departments);

    inquirer.prompt(addRoleQst).then((res) => {
      //   console.log(res);

      pool
        .query(
          "INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)",
          [res.newRoleName, res.newRoleSalary, res.newRoleDpt]
        )
        .then(() => {
          console.log(`Added ${res.newRoleName} to the database.`);
          empTracker();
        })
        .catch((err) => {
          console.error("Error adding to the database:", err);
          empTracker();
        });
    });
  });
}

function addEmp() {
  getRoleChoices().then((roles) => {
    addEmpQst[2].choices = roles;
    // console.log(roles);

    getMngrChoices().then((managers) => {
      addEmpQst[3].choices = managers;
      //   console.log(managers);

      inquirer.prompt(addEmpQst).then((res) => {
        // console.log(res);

        pool
          .query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
            [
              res.newEmpFstName,
              res.newEmpLstName,
              res.newEmpRole,
              res.newEmpMngr,
            ]
          )
          .then(() => {
            console.log(
              `Added ${res.newEmpFstName} ${res.newEmpLstName} to the database.`
            );
            empTracker();
          })
          .catch((err) => {
            console.error("Error adding to the database:", err);
            empTracker();
          });
      });
    });
  });
}

function updEmpRole() {
  updateEmpChoices().then((employees) => {
    updEmpRoleQst[0].choices = employees;

    getRoleChoices().then((roles) => {
      updEmpRoleQst[1].choices = roles;

      inquirer.prompt(updEmpRoleQst).then((res) => {
        pool
          .query("UPDATE employee SET role_id = $1 WHERE id =$2", [
            res.updEmpRoleRole,
            res.updEmpRoleName,
          ])
          .then(() => {
            console.log(`Updated employee's role`);
            empTracker();
          })
          .catch((err) => {
            console.error(`Error updating employee's role:`, err);
            empTracker();
          });
      });
    });
  });
}

empTracker();
