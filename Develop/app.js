const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function app() {

  function manager() {
    console.log("Here is your team");
    inquirer.prompt([
      {
        type: "input",
        name: "NameOfManger",
        message: "What is the name of your manager?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "A name is required";
        }
      },
      {
        type: "input",
        name: "idOfManager",
        message: "What is the ID of your manager?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "The number needs to be larger than zero";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What the email of your manager?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "A valid email is needed";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the office number of your manager?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "The number needs to be larger than zero";
       
        }
      }
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
    ]).then(answers => {
      const manager = new Manager(answers.NameOfManger, answers.idOfManager, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.idOfManager);
      team();
    });
  }

  function team() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "None"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        engineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        makeTeam();
      }
    });
  }

  function engineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "nameOfEngineer",
        message: "What is the name of your engineer?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "At least one character is needed.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "The number needs to be larger than zero";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "At least one character is needed.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.nameOfEngineer, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      team();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "A name is required";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is in use. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "The number needs to be larger than zero";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "At least one character is needed.";
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      team();
    });
  }

  function makeTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  manager();

}


app();





