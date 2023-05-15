import { useState, useEffect } from "react";

export default function Charts() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [patientChart, setPatientChart] = useState([]);

  //RETRIEVES PATIENT CHARTS
  const fetchPatientChart = () => {
    const patient = JSON.parse(sessionStorage.getItem("patient"));

    return fetch(`/api/getPatient/${patient}`)
      .then((res) => res.json())
      .then((data) => setPatientChart(data));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchPatientChart()
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <main>
        {/* Contact form */}
        <div className="relative isolate px-6 pt-24 sm:pt-40 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
          </div>
          <div className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Charts
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              All relevant information
            </p>
          </div>
          <div className="overflow-hidden max-w-4xl mx-auto bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Patient Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Details</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                </div>
                <div className="mt-8 flow-root">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr className="divide-x divide-gray-200">
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Medical History
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Medications
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                            >
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {patientChart?.map((chart) => (
                            <tr
                              key={chart.ID}
                              className="divide-x divide-gray-200"
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                                {chart.FIRST} {chart.LAST}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {chart.MEDHIST}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {chart.MEDLIST}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                                {chart.NOTES}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-24 max-w-7xl overflow-hidden px-6 pb-20 sm:mt-40 sm:pb-24 lg:px-8">
      </footer>
    </div>
  );
}
