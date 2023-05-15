import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PatientProfile() {
  const [patientData, setPatientData] = useState([]);
  const router = useRouter();

  //RETRIEVES PATIENT DATA
  const fetchPatientData = () => {
    const patient = JSON.parse(sessionStorage.getItem("patient"));

    return fetch(`/api/getPatient/${patient}`)
      .then((res) => res.json())
      .then((data) => setPatientData(data));
  };

  const viewCharts = () => {
    router.push(
      {
        pathname: `/patientcharts/charts`,
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
      fetchPatientData()
        .catch((err) => console.log(err));
  }, []);

  if (typeof window !== "undefined") {
  return (
    <div className="bg-white">
      <main className="pb-8">
        <div className="relative isolate px-6 pb-8 pt-24 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Patient
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              All relevant information
            </p>
          </div>
          <div className="mt-4 overflow-hidden max-w-xl mx-auto bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Patient Information
                </h3>{" "}
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details</p>
              </div>
            <button
              type="button"
              className="rounded-md bg-indigo-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={viewCharts}
            >
              Charts
            </button>              
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {`${patientData[0]?.FIRST} ${patientData[0]?.LAST}`}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Sex</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {`${patientData[0]?.SEX}`}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {`${patientData[0]?.ADDRESS} ${patientData[0]?.CITY} ${patientData[0]?.STATE} ${patientData[0]?.ZIP}`}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Nurse</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {`${patientData[0]?.NURSE}`}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Plan of care
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {`${patientData[0]?.ORDERS}`}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );    
  }

}
