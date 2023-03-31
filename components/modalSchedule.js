import { Fragment, useRef, useState, useEffect, use } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ openSchedule, setOpenSchedule }) {
  const cancelButtonRef = useRef(null);

  // const fetchData = async () => {
  //   try {
  //       const response = await fetch('/api/addPatient');
  //       const data = await response.json()
  //       console.log(data)
  //   }catch(err){
  //       console.log(err)
  //   }
  // }

  const [newSched, setNewSched] = useState({
    date: '',
    time: '', 
    first: '', 
    last: '',
    nurse: ''
  });

  //SETS SCHEDULE DATA
  const setSchedData = (e) => {
    const sched = e.target.name; 
    setNewSched({...newSched, [sched]: e.target.value}); 
  }

  const sendData = async (e, endPt, method) => {
    e.preventDefault(); 
    const option = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSched)
    }

    try {
      const data = await fetch(endPt, option);
      await setOpenSchedule(false); 
    }catch (err){
      console.log(err)
    }

    //router.reload(window.location.pathname)

  }

  return (
    <form onSubmit={(e) => sendData(e, `/api/postSched`, 'POST')}>
    <Transition.Root show={openSchedule} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenSchedule}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="mt-2">
                      <form className="space-y-8 divide-y divide-gray-200">
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                            <div>
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Create Visitation Schedule
                              </h3>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Insurance Number
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                </div>
                              </div> */}

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  First name
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="first"
                                    id="first"
                                    onChange={(e) => setSchedData(e)}
                                    autoComplete="family-name"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Last name
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    id="last"
                                    name="last"
                                    type="text"
                                    onChange={(e) => setSchedData(e)}
                                    autoComplete="email"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Nurse for visit
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <select
                                    type="nurse"
                                    name="nurse"
                                    id="nurse"
                                    onChange={(e) => setSchedData(e)}
                                    autoComplete="address-level2"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  >
                                  <option > </option>
                    <option name="Jackie" value="Jackie">Jackie A.</option>
                    <option name="Mitchell" value="Mitchell">Mitchell O.</option>
                    <option name="Sam" value="Sam">Sam B.</option>
                    <option name="Max" value="Max">Max S.</option>
                    <option name="Ellen" value="Ellen">Ellen B.</option>
                                  </select>
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Date
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    onChange={(e) => setSchedData(e)}
                                    autoComplete="address-level2"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Time
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="time"
                                    name="time"
                                    id="time"
                                    onChange={(e) => setSchedData(e)}
                                    autoComplete="street-address"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>

                              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Notes
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                </div>
                              </div> */}

                            </div>
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                            //onClick={() => setOpen(false)}
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                            onClick={() => setOpenSchedule(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </form>
  );
}
