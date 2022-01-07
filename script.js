const date = new Date();
// console.log(date);

// const addDayEventListener = () => {
//   const calendarDays = document.querySelectorAll('.day');
//   calendarDays.forEach((day) =>
//     day.addEventListener('click', function () {
//       console.log(day.textContent);
//     })
//   );
// };

// const formatDate = (date) => {
//   let d = new Date(date),
//     month = '' + (d.getMonth() + 1),
//     day = '' + d.getDate(),
//     year = d.getFullYear();

//   if (month.length < 2) month = '0' + month;
//   if (day.length < 2) day = '0' + day;

//   return [year, month, day].join('-');
// };

// console.log(formatDate('Fri Jan 07 2022'));

const renderCalendar = () => {
  date.setDate(1);
  //   console.log(date.getDate());

  const monthDays = document.querySelector('.days');
  //   console.log(monthDays);

  // To get last day of the current month
  // date.getFullYear() gives current year
  // 0 gives the last day of the previous month
  // date.getMonth() + 1 gives current month
  // (because 0 gave us previous month we had to give month + 1)
  // getDate() gives last day of current month

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  //   console.log(lastDay);

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  //   console.log(prevLastDay);

  const firstDayIndex = date.getDay() - 1;
  //   console.log(firstDayIndex);

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  //   console.log(lastDayIndex);

  const nextDays = 7 - lastDayIndex;
  //   console.log(nextDays);

  // prettier-ignore
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Show current month inside index.html
  document.querySelector('.month h1').innerHTML = months[date.getMonth()];

  // Show current year+month+day+day string inside index.html
  // new Date() because we set at te top of code month to 1
  document.querySelector('.full-month').innerHTML = new Date().toDateString();

  let days = '';
  // Show previous month days inside this month
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="day prev-day">${prevLastDay - x + 1}</div>`;
  }

  // Show current month days inside index.html
  for (let i = 1; i <= lastDay; i++) {
    i === new Date().getDate() && date.getMonth() === new Date().getMonth()
      ? (days += `<div class="day today">${i}</div>`)
      : (days += `<div class="day">${i}</div>`);
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-day">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

// const calendarDays = document.querySelectorAll('.day');
// calendarDays.forEach((day) =>
//   day.addEventListener('click', function () {
//     console.log(1);
//   })
// );

// Buttons
document.querySelector('.prev').addEventListener('click', function () {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
  // addDayEventListener();
});

document.querySelector('.next').addEventListener('click', function () {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  // addDayEventListener();
});

renderCalendar();
// addDayEventListener();

// console.log(date.toDateString());
