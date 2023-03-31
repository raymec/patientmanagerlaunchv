import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Calendar from "../../components/calender";
import Modal from "../../components/modal"; 
import ModalSchedule from "../../components/modalSchedule"; 

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [searchPatient, setSearchPatient] = useState('')

  const router = useRouter();

  const createNewEntry = () => {
    router.push(
      {
        pathname: "/manager/patientform",
      },
      undefined,
      { shallow: true }
    );
  };

  const viewNurses = () => {
    router.push(
      {
        pathname: "/manager/nurselist",
      },
      undefined,
      { shallow: true }
    );
  };

  // searches DB for patients or by insurance
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if(searchPatient.length < 2) return; 

    router.push(
      {
        pathname: `/results/${searchPatient}`,
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <div className="isolate bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"></div>
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </nav>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <div>
                <div className="">
                  <div className="">
                    <div className="mt-5 md:col-span-2 md:mt-0">
                      <form
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="">
                              <div className="col-span-3 sm:col-span-2">
                                <label
                                  htmlFor="company-website"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Patient Manager
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                  <input
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Search for Patient"
                                    onChange={(e) => setSearchPatient(e.target.value)}
                                  />
                                  <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
                                  >
                                    Search
                                  </button>
                                  <button
                                    onClick={createNewEntry}
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    Add Patient
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* OPENS MODAL WINDOW */}
              <div className="mt-2">
                <button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 text-white bg-indigo-600"
                >
                  Create Orders
                </button>
                <button
                  onClick={() => setOpenSchedule(!open)}
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-2 mr-2"
                >
                  Create Schedule
                </button>
                <button
                  onClick={viewNurses}
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Nurse List
                </button>
              </div>
              <Calendar />
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            
          </div>
        </div>
        <Modal open={open} setOpen={setOpen} />
        <ModalSchedule openSchedule={openSchedule} setOpenSchedule={setOpenSchedule} />
      </main>
    </div>
  );
}
