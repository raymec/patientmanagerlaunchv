import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";


export default function Modal({ open, setOpen }) {
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

  const [newOrder, setNewOrder] = useState({
    date: '',
    orders: '', 
    first: '', 
    last: '',
    address: ''
  });

  //SETS ORDER DATA
  const setOrderData = (e) => {
    const order = e.target.name; 
    setNewOrder({...newOrder, [order]: e.target.value}); 
  }

  const sendData = async (e, endPt, method) => {
    e.preventDefault(); 
    const option = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }

    try {
      const data = await fetch(endPt, option);
      await setOpen(false);
    }catch (err){
      console.log(err)
    }

    //router.reload(window.location.pathname)

  }

  return (
    <form onSubmit={(e) => sendData(e, `/api/postOrder`, 'POST')}>
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
                                Create Medicine Orders
                              </h3>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  First name
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="first"
                                    id="first"
                                    onChange={(e) => setOrderData(e)}
                                    autoComplete="given-name"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Last name
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="last"
                                    id="last"
                                    onChange={(e) => setOrderData(e)}
                                    autoComplete="family-name"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Address for delivery of order
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    onChange={(e) => setOrderData(e)}
                                    autoComplete="street-address"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Order
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <textarea
                                    type="text"
                                    name="orders"
                                    id="orders"
                                    onChange={(e) => setOrderData(e)}
                                    autoComplete="address-level2"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    placeholder="Include: name, type, and amount of medicine"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Date
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    id="date"
                                    name="date"
                                    //type="email"
                                    type="date"
                                    onChange={(e) => setOrderData(e)}
                                    autoComplete="email"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>

                              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Orders
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="orders"
                                    id="orders"
                                    onChange={(e) => setOrderData(e)}
                                    autoComplete="address-level2"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                </div>
                              </div> */}

                              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Street address
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="block w-full max-w-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div> */}

                              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  City
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

                              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 pb-4">
                                <label
                                  htmlFor="region"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  State / Province
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    type="text"
                                    name="region"
                                    id="region"
                                    autoComplete="address-level1"
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
                            //onSubmit={(e) => sendData(e, `/api/postOrder`, 'POST')}
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                            onClick={() => setOpen(false)}
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
