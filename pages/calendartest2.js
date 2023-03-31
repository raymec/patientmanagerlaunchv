import { Fragment } from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


// const days = [
//   { date: '30', dayname: 'Mon', events: [] },
//   { date: '2021-12-28', events: [] },
//   { date: '2021-12-29', events: [] },
//   { date: '2021-12-30', events: [] },
//   { date: '2021-12-31', events: [] },
//   { date: '2022-01-01', isCurrentMonth: true, events: [] },
//   { date: '2022-01-02', isCurrentMonth: true, events: [] },
//   {
//     date: '2022-01-03',
//     isCurrentMonth: true,
//     events: [
//       { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
//       { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
//     ],
//   },
  // { date: '2022-01-04', isCurrentMonth: true, events: [] },
  // { date: '2022-01-05', isCurrentMonth: true, events: [] },
  // { date: '2022-01-06', isCurrentMonth: true, events: [] },
  // {
  //   date: '2022-01-07',
  //   isCurrentMonth: true,
  //   events: [{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-01-08T18:00', href: '#' }],
  // },
  // { date: '2022-01-08', isCurrentMonth: true, events: [] },
  // { date: '2022-01-09', isCurrentMonth: true, events: [] },
  // { date: '2022-01-10', isCurrentMonth: true, events: [] },
  // { date: '2022-01-11', isCurrentMonth: true, events: [] },
  // {
  //   date: '2022-01-12',
  //   isCurrentMonth: true,
  //   isToday: true,
  //   events: [{ id: 6, name: "Sam's birthday party", time: '2PM', datetime: '2022-01-25T14:00', href: '#' }],
  // },
  // { date: '2022-01-13', isCurrentMonth: true, events: [] },
  // { date: '2022-01-14', isCurrentMonth: true, events: [] },
  // { date: '2022-01-15', isCurrentMonth: true, events: [] },
  // { date: '2022-01-16', isCurrentMonth: true, events: [] },
  // { date: '2022-01-17', isCurrentMonth: true, events: [] },
  // { date: '2022-01-18', isCurrentMonth: true, events: [] },
  // { date: '2022-01-19', isCurrentMonth: true, events: [] },
  // { date: '2022-01-20', isCurrentMonth: true, events: [] },
  // { date: '2022-01-21', isCurrentMonth: true, events: [] },
  // {
  //   date: '2022-01-22',
  //   isCurrentMonth: true,
  //   isSelected: true,
  //   events: [
  //     { id: 4, name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
  //     { id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
  //   ],
  // },
  // { date: '2022-01-23', isCurrentMonth: true, events: [] },
  // { date: '2022-01-24', isCurrentMonth: true, events: [] },
  // { date: '2022-01-25', isCurrentMonth: true, events: [] },
  // { date: '2022-01-26', isCurrentMonth: true, events: [] },
  // { date: '2022-01-27', isCurrentMonth: true, events: [] },
  // { date: '2022-01-28', isCurrentMonth: true, events: [] },
  // { date: '2022-01-29', isCurrentMonth: true, events: [] },
  // { date: '2022-01-30', isCurrentMonth: true, events: [] },
  // { date: '2022-01-31', isCurrentMonth: true, events: [] },
  // { date: '2022-02-01', events: [] },
  // { date: '2022-02-02', events: [] },
  // {
  //   date: '2022-02-03',
  //   events: [{ id: 7, name: 'Cinema with friends', time: '9PM', datetime: '2022-02-04T21:00', href: '#' }],
  // },
  // { date: '2022-02-04', events: [] },
  // { date: '2022-02-05', events: [] },
  // { date: '2022-02-06', events: [] },
  // //added
  // { date: '2022-02-07', events: [] },
//]

//const selectedDay = days.find((day) => day.isSelected)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dateToday = new Date();
const currentMonth = dateToday.getMonth(); //0-11; month names Jan=0
const currentYear = dateToday.getFullYear();

const getDaysinMonth = function(month, year) {
  const monthIndex = month; //0-11 to match date.getMonth() that uses 0-11
  const names = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
  const date = new Date(year, monthIndex, 1);
  let result = [];


  //pad beginning of array if month does not start on Sun
  const offset = date.getDay(); //3
  const last = new Date(year, monthIndex, 0).getDate();
  let laster = last - (offset - 1);
  for(let i = offset-1; i >= 0; --i){
    const Day = new Object();
    Day.date = laster; 
    //Day.name = 0;
    Day.dateActual = `${year}-${month}-${Day.date}`;
    Day.isCurrentMonth = false;
    result.push(Day);
    laster++;
  }

  //month matching objects created
  while (date.getMonth() == monthIndex) {
    const Day = new Object();

    Day.date = date.getDate();
    Day.name = names[date.getDay()];
    Day.dateActual = `${year}-${month+1}-${Day.date}`;
    Day.isCurrentMonth = true;
    result.push(Day);
    date.setDate(date.getDate() + 1);
  }
  return result;
}


//const days = [{date: '', name: '', isCurrentMonth: '',}]
const days = getDaysinMonth(currentMonth, currentYear);

//handler function to take in array of events
// const eventHandler = () => {
//   const events = [];
// };


//GRAB EVENTS FROM DB and APPEND TO EXISTING DAY OBJECT with matching DATE column
// events: [
//        { id: 4, name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
//       { id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
//     ],
//ORDERID	      DATE	      ORDERS	      FIRST	  LAST
//488932202690	2023-03-21	test orderx2	test10	10test
//PSEUDOCODE
//0. pass array days to event get function
//1. find object whose dateActual matches DATE
//2. push order or orders into matching object in the event array


export default function Calendar() {
  const [orderList, setOrderList] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const {query} = router;


  const fetchOrderData = async () => {
    try {
      const response = await fetch(`/api/getOrders`);
      const orderData = await response.json();
      setOrderList(orderData);
      //console.log(orderData);
      
      //orderList.forEach(order => events.push(order));

    } catch (err) {
      //console.log(err);
    }
  }

  //console.log(events);
  // function showEvents(event){
  //   for(let i = 0; i < events.length; ++i){
  //     console.log(event[0]);
  //   }
  // }
  

//   const fetchOrderData = (eventHandler) => {
//     fetch(`/api/getOrders`)
//     .then(res => {return res.json()})
//     .then(data => {
//         let a = [];
//         a.push(data);
//         eventHandler(a);
//     });
// }

  

  useEffect(() => {
    fetchOrderData();
    //orderList.forEach(order => events.push(order.DATE));
  },[])



  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime="">{monthNames[currentMonth]} {currentYear}</time>
        </h1>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">Sun {orderList.length}</span>
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">Mon</span>
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">Tue</span>
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">Wed</span>
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">Thu</span>
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">Fri</span>
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">Sat</span>
          </div>
        </div>

        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">

          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days?.map((day) => (
              <div
                key={day.date}
                className={classNames(day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                  'relative py-2 px-3'
                )}
              >
                <span>{day.name} </span>
                <time
                  //dateTime={day.date}
                  className={
                    day.isToday
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                      : undefined
                  }
                >
                  {day.date}
                </time>
                {orderList.length > 0 && (
                  <ol className="mt-2">
                    {orderList?.map((orders) => (
                      <li key={orders.ID}>
                        <a href="" className="group flex">
                          <p className={classNames(day.dateActual === `${orders.DATE}` ? "flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600" : undefined)}>
                            {/* {orders.ORDERS} */}orders here
                          </p>
                          <time
                            dateTime={orders.DATE}
                            className={classNames(day.dateActual === `${orders.DATE}` ? "ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block" : undefined)}
                          >
                            {/* {orders.FIRST} */}first last
                          </time>
                        </a>
                      </li>
                    ))}
                    {/* {day.events.length > 2 && <li className="text-gray-500">+ {day.events.length - 2} more</li>} */}
                  </ol>
                )}
              </div>
            ))}
          </div>

          {/* <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isToday && 'text-indigo-600',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500',
                  'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                    'ml-auto'
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span key={event.id} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div> */}

        </div>
      </div>
      {/* {selectedDay?.events.length > 0 && (
        <div className="py-10 px-4 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.events.map((event) => (
              <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time dateTime={event.datetime} className="mt-2 flex items-center text-gray-700">
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )} */}
    </div>
  )
}
