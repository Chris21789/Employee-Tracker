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
)

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
        choices: [],
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
        choice: [],
    },
    {
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'newEmpMngr',
        choice: [],
    },
];

const updEmpRoleQst = [
    {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'updEmpRoleName',
        choice: [],
    },
    {
        type: 'list',
        message: `Which role do you want to assign the selected employee?`,
        name: 'updEmpRoleRole',
        choice: [],
    },
];

function empTracker () {

};

function viewDpt () {

};

function viewRole () {

};

function viewEmp () {

};

function addDpt () {

};

function addRole () {
    
};

function addEmp () {
    
};

function updEmpRole () {
    
};
