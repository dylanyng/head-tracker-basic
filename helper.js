// Get the date X days prior
function daysAgo(num) {
const pastDate = new Date().setDate(_today.getDate() - num);
return msToDate(pastDate)
}

// Date: today
const _today = new Date();
// Date: 90 days prior
const _90daysAgo = daysAgo(90)
// Array to hold all dates
let allDates = [];

// Return date from milleseconds
function msToDate(ms) {
return new Date(ms)
}

// Return date without the time
function removeTime(d) {
return d.toISOString().split('T')[0];
}

// Return new object for the allDates array
function createDay(date) {
  return {
    entryDate: date,
  }
}

// LOOP through each day from _90DaysAgo to now
let loop = new Date(_90daysAgo);
while(loop <= _today) {
const addedDate = removeTime(loop);
allDates.push(createDay(addedDate));
let date = loop.setDate(loop.getDate() + 1);
}

function blkArr(dataArr) {
  const blockArray = allDates.map(x => {
    const item = dataArr.find(({ entryDate }) => entryDate === x.entryDate);
    return item ? item : x;
    })
  return blockArray;
}

module.exports = {
  blkArr: blkArr
}