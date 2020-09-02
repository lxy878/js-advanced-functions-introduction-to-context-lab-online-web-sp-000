// Your code here

function createEmployeeRecord(array){
  const keys = ['firstName', 'familyName', 'title', 'payPerHour', 'timeInEvents', 'timeOutEvents'];
  const newRecord = keys.reduce((records, key, index)=>{
    records[key] = array.length > index ? array[index]:[];
    return records;
  }, {});
  return newRecord;
}


function createEmployeeRecords(array2d){
  return array2d.map(array => createEmployeeRecord(array), []);
}

function createTimeInEvent(record, date){
  // fix
  const timeIn = date.split(' ');
  const newObj = {
    'type': 'TimeIn',
    'hour': parseInt(timeIn[1]),
    'date': timeIn[0]
  }
  record.timeInEvents.push(newObj);
  return record;
}

function createTimeOutEvent(record, date){
  // fix
  const timeOut = date.split(' ');
  const newObj = {
    'type': 'TimeOut',
    'hour': parseInt(timeOut[1]),
    'date': timeOut[0]
  }
  record.timeOutEvents.push(newObj);
  return record;
}

function hoursWorkedOnDate(record, date){
  const iTimeIn = record.timeInEvents.findIndex(timeIn => timeIn.date === date);
  const iTimeOut = record.timeInEvents.findIndex(timeOut => timeOut.date === date);
  return  (iTimeIn>=0 && iTimeOut>=0) ? (record.timeOutEvents[iTimeOut].hour - record.timeInEvents[iTimeIn].hour)/100:0;
}

function wagesEarnedOnDate(record, date){
  const hours = hoursWorkedOnDate(record, date);
  return record.payPerHour * hours;
}

function allWagesFor(record){
  const allDates = record.timeOutEvents.map(timeOut => timeOut.date, []);
  return allDates.reduce((sum, date) => sum + wagesEarnedOnDate(record, date) , 0)
}

function findEmployeeByFirstName(records, firstName){
  return records.find(record => record.firstName === firstName);
}

function calculatePayroll(records){
  return records.reduce((sum, record) => sum+allWagesFor(record),0);
}
