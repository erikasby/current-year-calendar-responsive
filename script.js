// Sets all of the current day
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const numberOfDays = 42;
let currentMonthEqualsZero = 0;
let currentYearEqualsZero = 0;
const maxEventCount = 10;

// Grab HTML elements
const fullYear = document.querySelector('.full-year');
const mainMonth = document.querySelector('.main-month h1');

events = JSON.parse(sessionStorage.getItem('events'));
if (events === null) {
  events = [];
}

// sessionStorage.setItem(
//   'events',
//   JSON.stringify([
//     {
//       title: 'Zoo',
//       date: '2022-1-28',
//       startTime: '14:30',
//       endTime: '20:40',
//       type: 'meeting',
//       description: 'Everyone will meet at the hall and then go to the zoo',
//     },
//     {
//       title: 'London trip',
//       date: '2022-1-5',
//       startTime: '14:30',
//       endTime: '20:40',
//       type: 'out-of-office',
//       description:
//         'We will fly to London and call uber to drive us to the hotel',
//     },
//     {
//       title: 'Weekend show',
//       date: '2022-1-11',
//       startTime: '14:30',
//       endTime: '20:40',
//       type: 'call',
//       description: 'We will have a call on Zoom',
//     },
//   ])
// );

const renderCalendar = function () {
  if (currentMonthEqualsZero === 12) {
    currentYearEqualsZero++;
    currentMonthEqualsZero = 0;
  }
  if (currentMonthEqualsZero === -1) {
    currentYearEqualsZero--;
    currentMonthEqualsZero = 11;
  }

  // Sets new Date
  const date = new Date(
    currentYear + currentYearEqualsZero,
    currentMonth,
    currentDay
  );

  // Sets year
  let year = date.getFullYear();
  fullYear.textContent = year; // WORKS

  // Sets month index
  const month = date.getMonth();
  mainMonth.textContent = months[month + currentMonthEqualsZero]; // WORKS

  // Sets day of the month
  const day = date.getDate();

  // Sets weekday of the month
  let weekday = date.getDay();
  weekday === 0 ? (weekday = 7) : weekday;

  // Sets first day of the month
  const firstDayDate = new Date(year, month + currentMonthEqualsZero, 1);
  const firstDay = firstDayDate.getDate();
  let firstWeekday = firstDayDate.getDay();
  firstWeekday === 0 ? (firstWeekday = 7) : firstWeekday;

  // Sets last day of the month
  const lastDayDate = new Date(year, month + 1 + currentMonthEqualsZero, 0);
  const lastDay = lastDayDate.getDate();

  // Get container of all days
  const days = document.querySelector('.days');
  let fullHtml = '';
  for (let i = 1; i <= numberOfDays; i++) {
    let tempHtml = fullHtml;
    let intersect = false;
    if (
      year === currentYear &&
      month + currentMonthEqualsZero === currentMonth &&
      i === currentDay + firstWeekday - 1
    ) {
      const html = `
      <div class="day today">${i - firstWeekday + 1}</div>
      `;
      tempHtml += html;
    } else if (i >= firstWeekday && i < lastDay + firstWeekday) {
      const html = `
      <div class="day">${i - firstWeekday + 1}</div>
      `;
      tempHtml += html;
    } else {
      const html = `
      <div></div>
      `;
      tempHtml += html;
    }

    if (events !== null) {
      for (let j = 0; j < events.length; j++) {
        const dateSplitted = events[j].date.split('-');
        // console.log(
        //   `${dateSplitted[0]}-${dateSplitted[1]}-${
        //     Number(dateSplitted[2]) + firstWeekday - 1
        //   }`
        // );
        // console.log(`${year}-${month + 1 + currentMonthEqualsZero}-${i}`);
        if (
          `${dateSplitted[0]}-${dateSplitted[1]}-${
            Number(dateSplitted[2]) + firstWeekday - 1
          }` === `${year}-${month + 1 + currentMonthEqualsZero}-${i}` &&
          year === Number(dateSplitted[0]) &&
          month + 1 + currentMonthEqualsZero === Number(dateSplitted[1])
        ) {
          const html = `<div class="day ${events[j].type}">${
            i - firstWeekday + 1
          }</div>`;
          intersect = true;
          fullHtml += html;
          break;
        }
      }
    }

    if (intersect === false) {
      fullHtml = tempHtml;
      days.innerHTML = fullHtml;
    } else {
      days.innerHTML = fullHtml;
    }
  }

  days.addEventListener('click', function (e) {
    if (Number(e.target.textContent)) {
      let eventData;

      if (events !== null) {
        for (let i = 0; i < events.length; i++) {
          if (
            events[i].date ===
            `${year}-${month + 1 + currentMonthEqualsZero}-${
              e.target.textContent
            }`
          ) {
            eventData = events[i];
          }
        }
      }

      const renderEvent = function (meetingType) {
        return `
          <h1>${meetingType} Event</h1>
          <div class="delete-event">
          <label>Title</label>
          <p>${eventData.title}</p>
          <label>Date</label>
          <p id="date-information">${eventData.date}</p>
          <label>Start time</label>
          <p>${eventData.startTime}</p>
          <label>End time</label>
          <p>${eventData.endTime}</p>
          <label>Type</label>
          <p>${eventData.type}</p>
          <label>Description</label>
          <p>${eventData.description}</p>
          <button class="delete">Delete</button>
          <button class="cancel">Cancel</button>
        </div>
          `;
      };

      const renderCreateEvent = function () {
        return `
        <h1>Create Event</h1>
        <div class="create-event">
              <form class="create-event-form">
                <label for="e-title">Title</label>
                <input
                  required
                  type="text"
                  id="e-title"
                  name="e-title"
                  placeholder="Weekend show"
                />
                <label for="e-date">Date</label>
                <input
                  required
                  type="text"
                  id="e-date"
                  name="e-date"
                  placeholder="2022-05-14"
                  value="${year}-${month + 1 + currentMonthEqualsZero}-${
          e.target.textContent
        }"
        readonly
                />
                <label for="e-start-time">Start time</label>
                <input
                  required
                  type="text"
                  id="e-start-time"
                  name="e-start-time"
                  placeholder="14:30"
                />
                <label for="e-end-time">End time</label>
                <input
                  required
                  type="text"
                  id="e-end-time"
                  name="e-end-time"
                  placeholder="20:40"
                />
                <label for="e-type">Type</label>
                <select name="e-type" id="e-type">
                  <option value="meeting">Meeting</option>
                  <option value="call">Call</option>
                  <option value="out-of-office">Out of office</option>
                </select>
                <label for="e-description">Description</label>
                <textarea
                  rows="4"
                  cols="50"
                  required
                  type="text"
                  id="e-description"
                  name="e-description"
                  placeholder="Everyone will meet at the hall"
                ></textarea>
                <button class="create">Create</button>
                <button class="cancel">Cancel</button>
              </form>
            </div>
        `;
      };

      const cancelEvent = function () {
        eventsElement.innerHTML = '';
      };

      const deleteEvent = function () {
        const eDate = document.querySelector('#date-information').textContent;
        console.log(eDate);
        console.log(eventData.date);
        if (eDate === eventData.date) {
          console.log(events.length);
          for (let i = 0; i < events.length; i++) {
            if (events[i].date === eDate) {
              events.splice(i, 1);
              sessionStorage.setItem('events', JSON.stringify(events));
              events = JSON.parse(sessionStorage.getItem('events'));
              renderCalendar();
              cancelEvent();
            }
          }
          console.log(events.length);
        }
        alert('Event deleted.');
      };

      const createEvent = function (e) {
        e.preventDefault();
        const eTitle = document.querySelector('#e-title').value;
        const eDate = document.querySelector('#e-date').value;
        const eStartTime = document.querySelector('#e-start-time').value;
        const eEndTime = document.querySelector('#e-end-time').value;
        const eType = document.querySelector('#e-type').value;
        const eDescription = document.querySelector('#e-description').value;
        console.log(eTitle, eDate, eStartTime, eEndTime, eType, eDescription);
        if (
          [eTitle, eDate, eStartTime, eEndTime, eType, eDescription].every(
            (e) => e !== ''
          )
        )
          events.push({
            title: eTitle,
            date: eDate,
            startTime: eStartTime,
            endTime: eEndTime,
            type: eType,
            description: eDescription,
          });
        sessionStorage.setItem('events', JSON.stringify(events));
        events = JSON.parse(sessionStorage.getItem('events'));
        renderCalendar();
        cancelEvent();
        alert('Event created.');
      };

      const eventsElement = document.querySelector('.events');
      if (
        e.target.classList.contains('meeting') &&
        typeof Number(e.target.textContent) === 'number'
      ) {
        eventsElement.innerHTML = renderEvent('Meeting');
        const cancelButton = document.querySelector('.cancel');
        cancelButton.addEventListener('click', cancelEvent);
        const deleteButton = document.querySelector('.delete');
        deleteButton.addEventListener('click', deleteEvent);
      } else if (
        e.target.classList.contains('call') &&
        typeof Number(e.target.value) === 'number'
      ) {
        eventsElement.innerHTML = renderEvent('Call');
        const cancelButton = document.querySelector('.cancel');
        cancelButton.addEventListener('click', cancelEvent);
        const deleteButton = document.querySelector('.delete');
        deleteButton.addEventListener('click', deleteEvent);
      } else if (
        e.target.classList.contains('out-of-office') &&
        typeof Number(e.target.value) === 'number'
      ) {
        eventsElement.innerHTML = renderEvent('Out of office');
        const cancelButton = document.querySelector('.cancel');
        cancelButton.addEventListener('click', cancelEvent);
        const deleteButton = document.querySelector('.delete');
        deleteButton.addEventListener('click', deleteEvent);
      } else if (typeof Number(e.target.value) === 'number') {
        eventsElement.innerHTML = renderCreateEvent();
        const cancelButton = document.querySelector('.cancel');
        cancelButton.addEventListener('click', cancelEvent);
        const createButton = document.querySelector('.create');
        createButton.addEventListener('click', (e) => createEvent(e));
      }
    }
  });
};
renderCalendar();

const next = document.querySelector('.next');
next.addEventListener('click', function () {
  currentMonthEqualsZero++;
  renderCalendar();
});

const prev = document.querySelector('.prev');
prev.addEventListener('click', function () {
  currentMonthEqualsZero--;
  renderCalendar();
});
