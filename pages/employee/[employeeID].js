import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Calendar from "../../components/calender";
import Modal from "../../components/modal";
import ModalSchedule from "../../components/modalSchedule";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [searchPatient, setSearchPatient] = useState("");

  const router = useRouter();

  

  // searches DB for patients or by insurance
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchPatient.length < 2) return;

    const nurse = JSON.parse(sessionStorage.getItem('staff'));
    const searchItems = [nurse.FIRST, searchPatient];

    router.push(
      {
        pathname: `/results/nurseResults/${searchItems}`,
      },
      undefined,
      { shallow: true }
    );
  };

  const logout = () => {
    sessionStorage.removeItem("staff"); 
    router.push(
      {
        pathname: "/login",
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="isolate bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"></div>
      <div className="px-6 pt-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              WELCOME
            </h2>
          </div>
          {typeof window !== "undefined" ? (
              <button
                type="button"
                className="-m-2.5 bg- flex items-center justify-center rounded-md p-2.5 text-white bg-indigo-700 focus"
                onClick={logout}
              >
                Log out
              </button>
            ) : (
              ""
            )}
        </div>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <div>
                <div className="">
                  <div className="">
                    <div className="mt-5 md:col-span-2 md:mt-0">
                      <form onSubmit={(e) => handleSubmit(e)}>
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
                                    placeholder="Search Patient"
                                    onChange={(e) =>
                                      setSearchPatient(e.target.value)
                                    }
                                  />
                                  <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    Search
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
              
              {/* <div>
                
                <button
                  onClick={() => setOpenSchedule(!open)}
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create Schedule
                </button>
              </div> */}
              <Calendar />
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"></div>
        </div>
        <Modal open={open} setOpen={setOpen} />
        <ModalSchedule
          openSchedule={openSchedule}
          setOpenSchedule={setOpenSchedule}
        />
      </main>
    </div>
  );
}
