
// required librarys we need

const generateHTML = require('./src/generateHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


// node modules
const fs = require('fs');
const inquirer = require('inquirer');

// an array to hold all of the info we get from the questions
const teamArray = [];

// this asks the questions for the manager
const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the managers name?',

        },
        {
            type: 'input',
            name: 'id',
            message: "what is the managers ID number?",
        },
        {
            type: 'input',
            name: 'email',
            message: "what is the managers email?",
        },
        {
            type: 'input',
            name: 'office',
            message: "what is the managers office number?",
        },
    ])
        // this is adding the info from the questions to the object we created for it
        .then(managerInput => {
            const { name, id, email, office } = managerInput;
            const manager = new Manager(name, id, email, office);

            teamArray.push(manager);
            console.log(manager);
        })
}
// asking the questions for the employees
const addEmployee = () => {
    console.log(`Adding employees to the team!`);

    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "What is this employees role?",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the employees name?',

        },

        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's github username.",
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school",
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
        .then(employeeData => {
            // data for employee types 

            let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
            let employee;
            // this is checking the information based on the user input
            if (role === "Engineer") {
                employee = new Engineer(name, id, email, github);

                console.log(employee);

            } else if (role === "Intern") {
                employee = new Intern(name, id, email, school);

                console.log(employee);
            }

            teamArray.push(employee);

            if (confirmAddEmployee) {
                return addEmployee(teamArray);
            } else {
                return teamArray;
            }
        })

};
// this is writing the file with the info from the user
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {

        if (err) {
            console.log(err);
            return;

        } else {
            console.log("Your page has been succesfully created!!")
        }
    })
};
// invoking all of the functions with the info from the user
addManager()
    .then(addEmployee)
    .then(teamArray => {
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });

