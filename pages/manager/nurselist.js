import { useState, useEffect } from "react";
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useRouter } from "next/router";

export default function NurseList() {
  //const [data, setData] = useState({results: []});
  const [nurseList, setNurseList] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const {query} = router; 
//   const {nurseid} = query;

  const fetchNurseData = async () => {
    try {
      const response = await fetch(`/api/getAllNurses`);
      const nurseData = await response.json();
      setNurseList(nurseData);
      console.log(nurseData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNurseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // useEffect(() => {
  //   console.log(router)
  // },[])

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
          aria-label="Global"
        >

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Contact form */}
        <div className="relative isolate px-6 pt-24 sm:pt-40 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              viewBox="0 0 1155 678"
              aria-hidden="true"
              className="absolute bottom-full -left-40 -mb-48 w-[72.1875rem] transform-gpu blur-3xl sm:left-auto sm:right-1/2 sm:-mb-64"
            >
              <path
                fill="url(#d5d4d369-6b90-4398-a6aa-ab9a062d6e3c)"
                fillOpacity=".25"
                d="M317.219 518.975 203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079Z"
              />
              <defs>
                <linearGradient
                  id="d5d4d369-6b90-4398-a6aa-ab9a062d6e3c"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="overflow-hidden max-w-4xl mx-auto bg-white shadow sm:rounded-lg">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {nurseList?.map((nurse) => (
                <li key={nurse.ADDRESS} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                  <div className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900">
                          {nurse.FIRST} {nurse.LAST}</h3>
                        <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          {nurse.role}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-gray-500">{nurse.TYPE}</p>
                    </div>
                    {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={nurse.imageUrl} alt="" /> */}
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="flex w-0 flex-1">
                        <a
                        //want mini-modal that shows email address
                          href={`mailto:${nurse.ADDRESS}`}
                          className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          Email
                        </a>
                      </div>
                      <div className="-ml-px flex w-0 flex-1">
                        <a
                        //want mini-modal that shows telephone number
                          href={`tel:${nurse.NURSE}`}
                          className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-24 max-w-7xl overflow-hidden px-6 pb-20 sm:mt-40 sm:pb-24 lg:px-8">
      </footer>
    </div>
  );
}
