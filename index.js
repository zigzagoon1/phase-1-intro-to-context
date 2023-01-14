// Your code here

const testEmployee = {
    firstName: "Kelly", 
    familyName: "Mark",
    title: "Game Developer",
    payPerHour: "20",
    timeInEvents: [{
        type: "TimeIn",
        hour: "0900",
        date: "2023-01-13"
    },
    {
        type: "TimeIn",
        hour: "0900",
        date: "2023-01-14"
    }],
    timeOutEvents: [{
        type: "TimeOut",
        hour: "1700",
        date: "2023-01-13"
    },
    {
        type: "TimeOut",
        hour: "1700",
        date: "2023-01-14"
    }]   
}

function createEmployeeRecord(employeeArray) {
    const employeeObject = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObject;
}

function createEmployeeRecords(nestedEmployeesArray) {
    let employeeRecords = [];
    for (const el of nestedEmployeesArray) {
        const obj = createEmployeeRecord(el);
        employeeRecords.push(obj);
    }
    return employeeRecords;
}

function createTimeInEvent(employeeObj, date) {
    const year = [date[0], date[1], date[2], date[3]].join("");

    const month = [date[5], date[6]].join("");
    const day = [date[8], date[9]].join("");
    const currentDate = [year, month, day].join("-");
    
    if (employeeObj.timeInEvents[0] !== null) {
        employeeObj.timeInEvents.unshift(0);
    }
    
    employeeObj.timeInEvents[0] = {
        type: "TimeIn",
        hour: parseInt([date[11], date[12]].join("") + "00"),
        date: currentDate
    }
    
    return employeeObj;
}

//createTimeInEvent(testEmployee, "2023-01-12 1928");

function createTimeOutEvent(employeeObj, date) {
    const year = [date[0], date[1], date[2], date[3]].join("");
    const month = [date[5], date[6]].join("");
    const day = [date[8], date[9]].join("");
    const currentDate = [year, month, day].join("-");

    if (employeeObj.timeOutEvents[0] !== null) {
        employeeObj.timeOutEvents.unshift(0);
    }

    employeeObj.timeOutEvents[0] = {
        type: "TimeOut",
        hour: parseInt([date[11], date[12]].join("") + "00"),
        date: currentDate
    }
    return employeeObj;
}

//createTimeOutEvent(testEmployee, "2023-01-12 1942");

function hoursWorkedOnDate(employeeObj, date) {
    //const day = parseInt([date[8], date[9]].join(""));
    const timeInMatchDate = employeeObj.timeInEvents.find(x => x.date === date);
    const timeOutMatchDate = employeeObj.timeOutEvents.find(x => x.date === date);
    const timeIn = timeInMatchDate.hour;
    const timeOut = timeOutMatchDate.hour;
    const difference = timeOut - timeIn;
    const hours = difference / 100;
    return hours;
}
hoursWorkedOnDate(testEmployee, "2023-01-13");
function wagesEarnedOnDate(employeeObj, date) {
    const hours = hoursWorkedOnDate(employeeObj, date);
    return hours * employeeObj.payPerHour;
}
//wagesEarnedOnDate(testEmployee, "2023-01-13");
function allWagesFor(employeeObj) {
    const hours = [];
    for (const el in employeeObj.timeInEvents) {
        hours.push(hoursWorkedOnDate(employeeObj, employeeObj.timeInEvents[el].date));
    }
    const totalHours = hours.reduce((accumulator, currentValue) => accumulator += currentValue);
    return totalHours * employeeObj.payPerHour;
}
allWagesFor(testEmployee);
function calculatePayroll(employeeRecordsArray) {
    let totalPay = 0;
    employeeRecordsArray.reduce((accumulator, currentObj)=> {
        totalPay += allWagesFor(currentObj);
    }, totalPay)
    return totalPay;   
}
