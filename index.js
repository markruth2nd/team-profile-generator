const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { choices } = require("yargs");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const idList = []
const teamMembers = []

const appMenu = ()=>{
    function buildTeam(){

    }
    function addIntern(){
        
    }
    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "what is your engineer's name?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please input engineer's name."
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "what is your engineer's ID?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please input engineer's ID."
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "what is your engineer's email address?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please input engineer's email address."
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "what is your engineer's Githib Username?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please input engineer's Githib Username."
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub,);
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            console.log(engineer)
            createTeam()
        })
    }

    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which Team member would you like to choose?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't know"
                ]
            }
        ]).then(userChoice =>{
            if(userChoice.memberChoice === "Engineer"){
                /* BUILD ENGINEER TO ADD HERE */
                addEngineer();
            }else if(userChoice.memberChoice === "Inter"){
                /* BUILD INTERN TO ADD HERE */
                addIntern();
            }
            else{
                /* BUILD WITHOUT CHOICE TO ADD HERE */
                buildTeam();
            }
        })
    }

    function createManager(){
        console.log("Add Team here..");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Please advise your managers Name?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please input Manager's name."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your managers ID?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please add your Manager's ID."
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your Team managers email address?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please add your Team Manager's email address."
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your managers Contact Number?",
                validate: answer =>{
                    if(answer !== ""){
                        return true
                    }
                    return "please add your Team Manager's contact number."
                }
            },
        ]).then(answers =>{
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            teamMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })
    }

    createManager();
}

appMenu();