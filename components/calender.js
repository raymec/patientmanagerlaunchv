import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateToday = new Date();
const currentMonth = dateToday.getMonth(); //0-11; month names Jan=0
const currentYear = dateToday.getFullYear();

const padZero = function (num) {
  let temp = "" + num;
  if (num < 10) {
    temp = "0" + num;
  }
  return temp;
};

const getDaysinMonth = function (month, year) {
  const monthIndex = month; //0-11 to match date.getMonth() that uses 0-11
  const monthpaddedprev = padZero(month);
  const monthpaddedcurr = padZero(month + 1);
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(year, monthIndex, 1);
  let result = [];

  //pad beginning of array if month does not start on Sun
  const offset = date.getDay(); //3
  const last = new Date(year, monthIndex, 0).getDate();
  let laster = last - (offset - 1);
  for (let i = offset - 1; i >= 0; --i) {
    const Day = new Object();
    Day.date = padZero(laster);
    //Day.name = 0;
    Day.dateActual = `${year}-${monthpaddedprev}-${Day.date}`;
    Day.isCurrentMonth = false;
    Day.eventful = [];
    result.push(Day);
    laster++;
  }

  //month matching objects created
  while (date.getMonth() == monthIndex) {
    const Day = new Object();

    Day.date = padZero(date.getDate());
    Day.name = names[date.getDay()];
    Day.dateActual = `${year}-${monthpaddedcurr}-${Day.date}`;
    Day.isCurrentMonth = true;
    Day.eventful = [];
    result.push(Day);
    date.setDate(date.getDate() + 1);
  }
  return result;
};

const days = getDaysinMonth(currentMonth, currentYear);

export default function Calendar() {
  const [orderList, setOrderList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const { query } = router;
  let eventide = [];

  const fetchOrderData = async () => {
    try {
      const response = await fetch(`/api/getOrders`);
      const orderData = await response.json();
      setOrderList(orderData);
      console.log(orderData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchScheduleData = async () => {
    try {
      const response = await fetch(`/api/getSchedules`);
      const scheduleData = await response.json();
      setScheduleList(scheduleData);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchOrderData().then(() => fetchScheduleData());
  }, []);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime="">
            {monthNames[currentMonth]} {currentYear}
          </time>
        </h1>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">
              Sun {orderList.length}
            </span>
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
            {days?.map((day, idx) => (
              <div
                key={day.date + `${idx}${idx}react-key`}
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                  "relative py-2 px-3"
                )}
              >
                <span>{day.name} </span>
                <time
                  //dateTime={day.date}
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {day.date}
                </time>
                {orderList.length > 0 && (
                  <ol className="mt-2">
                    {orderList.map((orders, index) => (
                      <li key={`orderkey${index}`}>
                        <a href="" className="group flex">
                          <p
                            className={classNames(
                              day.dateActual == `${orders.DATE}`
                                ? "flex-auto truncate font-medium text-red-500 group-hover:text-indigo-600 text-left"
                                : "hidden"
                            )}
                          >
                            {orders.ORDERS}
                          </p>
                          <time
                            dateTime={orders.DATE}
                            className={classNames(
                              day.dateActual == `${orders.DATE}`
                                ? "ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                : "hidden"
                            )}
                          >
                            {`${orders.LAST}`}
                          </time>
                        </a>
                      </li>
                    ))}
                  </ol>
                )}

                {scheduleList.length > 0 && (
                  <ol className="mt-2">
                    {scheduleList.map((sched, index) => (
                      <li key={`schedulekey${index}`}>
                        <a href="" className="group flex">
                          <p
                            className={classNames(
                              day.dateActual == `${sched.DATE}`
                                ? "flex-auto truncate font-medium text-red-500 group-hover:text-indigo-600 text-left"
                                : "hidden"
                            )}
                          >
                            {sched.TIME}
                          </p>
                          <time
                            dateTime={sched.DATE}
                            className={classNames(
                              day.dateActual == `${sched.DATE}`
                                ? "ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                : "hidden"
                            )}
                          >
                            {`${sched.LAST} ${sched.NURSE}`}
                          </time>
                        </a>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
