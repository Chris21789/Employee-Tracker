const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
    {
        user:'',
        password:'',
        host: 'localhost',
        database: 'employees_db',
    },
    console.log(`Successfully connected to employees_db!`)    
);

pool.connect();

const mainQst = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'main',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
        ],
    },
];

const addDptQst = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'newDptName',
    },
];

const addRoleQst = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'newRoleName',
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'newRoleSalary',
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'newRoleDpt',
        choices: dptChoices,
    },
];

const addEmpQst = [
    {
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'newEmpFstName',
    },
    {
        type: 'input',
        message: `What is the employee's last name?`,
        name: 'newEmpLstName',
    },
    {
        type: 'list',
        message: `What is the employee's role?`,
        name: 'newEmpRole',
        choices: roleChoices,
    },
    {
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'newEmpMngr',
        choices: mngrChoices,
    },
];

const updEmpRoleQst = [
    {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'updEmpRoleName',
        choices: empChoices,
    },
    {
        type: 'list',
        message: `Which role do you want to assign the selected employee?`,
        name: 'updEmpRoleRole',
        choices: roleChoices,
    },
];

async function getDptChoices () {
    try {
        const dptChoices = await pool.query('SELECT name FROM department');
        return dptChoices.rows.map(row =>  row.name);
    } catch (err) {
        console.error('Error querying department:', err);
        return [];
    }
};

async function getRoleChoices () {
    try {
        const roleChoices = await pool.query('SELECT id, title FROM role');
        return roleChoices.rows.map(row =>  ({ name: row.title, value: row.id }));
    } catch (err) {
        console.error('Error querying role:', err);
        return [];
    }
};

async function getMngrChoices () {
    try {
        const mngrChoices = await pool.query('SELECT id, first_name, last_name FROM employee');
        return mngrChoices.rows.map(row =>  ({ name: `${row.first_name} ${row.last_name}`, value: row.id }));
    } catch (err) {
        console.error('Error querying department:', err);
        return [];
    }
};

async function getEmpChoices () {
    try {
        const empChoices = await pool.query('SELECT id, first_name, last_name FROM employee');
        return empChoices.rows.map(row =>  ({ name: `${row.first_name} ${row.last_name}`, value: row.id }));
    } catch (err) {
        console.error('Error querying department:', err);
        return [];
    }
};

async function empTracker () {

};

async function viewDpt () {

};

async function viewRole () {

};

async function viewEmp () {

};

async function addDpt () {

};

async function addRole () {
    
};

async function addEmp () {
    
};

async function updEmpRole () {
    
};
