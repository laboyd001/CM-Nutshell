import eventsAPI from "./api-events"
import putOnDOM from "./DOMPopulator"


function clearData() {
  let eventDataResults = document.getElementById("event__results");
  eventDataResults.innerHTML = "";
}


function eventsGenerator() {
  clearData()
  let fetchUserId = sessionStorage.getItem("user_id")
  let allEvents = eventsAPI.getData(fetchUserId)

  Promise.all([allEvents]).then((alldata) => {
    alldata.forEach((currentEvent) => {
      putOnDOM.intialEvents(currentEvent)
    })
    $("#add__event__button").click(function () {
      submitEventForm()
    })
    deleteEvent()
  })
}


function submitEventForm() {
  let eventFormTitleEl = document.getElementById("add__event__title")
  let eventFormLocationEl = document.getElementById("add__event__location")
  let eventFormDateEl = document.getElementById("add__event__date")
  let eventFormSynopsisEl = document.getElementById("add__event__synopsis")
  let sessionUserId = sessionStorage.getItem("user_id");
  console.log("session id:", sessionUserId)

  // create a new object within the journalEntries array
  let newObject = { title: eventFormTitleEl.value, date: eventFormDateEl.value, synopsis: eventFormSynopsisEl.value, location: eventFormLocationEl.value, user_id: +sessionUserId }
  eventsAPI.saveData(newObject).then(() => {
    console.log("new object", newObject);
    clearData();
  }).then(() => eventsGenerator())
}

function deleteEvent() {
  // the following selects all delete buttons
  let deleteEventBtns = document.querySelectorAll(".delete__button")
  // the following adds the event listener to delete the entry
  deleteEventBtns.forEach((button) => {
    $(button).click(function () {
      eventsAPI.deleteEntry(button.id)
    })
  })
}


export default eventsGenerator
