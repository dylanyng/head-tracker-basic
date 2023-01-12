// Set date picker to current date
const date = document.getElementById('datepicker');
date.value = new Date().toISOString().split('T')[0].slice(0, 10);

const popUp = document.getElementById('popup2');
const popUpDate = document.getElementById('details-date');
const popUpType = document.getElementById('details-type');
const popUpNotes = document.getElementById('details-notes');

// Event delegation for blocks
const allLogs = document.getElementById("id-timeline");
allLogs.addEventListener('click', function(e) {
    // Reformat date: 'YYYY-MM-DD' => 'MM-DD-YYYY'
    function formatDate(date) {
        return date.slice(5, 10) + '-' + (date.split('').splice(0, 4)).join('');
    }

    const target = e.target;
    const date = target.dataset['attackDate'];
    const displayDate = formatDate(date);
    const type = target.dataset['attackType'];
    const notes = (target.dataset['attackNotes']) !== "" ? (target.dataset['attackNotes']) : "No notes for this entry...";

    // Allow pop up to show if entry exists for that day
    if(target.matches('div') && date !== undefined) {
        showPopup(date, displayDate, type, notes);
    }
});

// Show block pop up with details
function showPopup(date, displayDate, type, notes) {
    popUp.style.display = 'flex';
    popUpDate.innerText = displayDate;
    popUpType.innerText = type;
    popUpNotes.innerText = notes;

    const deleteButton = document.getElementById("delete-entry");
    deleteButton.addEventListener('click', function() {
        deleteEntry(date, type, notes)
    });
}

// Hide block pop up
function hidePopup() {
    popUp.style.display = 'none';
}

async function deleteEntry(date, type, notes){
    try {
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'entryDateS': date,
                'attackTypeS': type,
                'entryNotesS': notes
            })
          })
        const data = await response.json()
        location.reload()

    } catch(err) {
        console.log(err)
    }
}