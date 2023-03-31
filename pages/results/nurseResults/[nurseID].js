
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Results() {
  const [data, setData] = useState({ results: [], patient: {} });
  const [editSchedule, setEditSchedule] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { nurseID } = query;

  //stores patient id in session storage
  const viewPatientProfile = (patientID) => {
    sessionStorage.setItem("patient", JSON.stringify(patientID));
    router.push({ pathname: `/patientprofile/${patientID}` }, undefined, {
      shallow: true,
    });
  };

  const storePatientInfo = (ID) => {
    setEditSchedule(true);

    const findPatient = data.results.find((result) => result.ID === ID);
    sessionStorage.setItem("patient", JSON.stringify(findPatient));

    router.push(
      {
        pathname: `/employee/edit/${ID}`,
      },
      undefined,
      { shallow: true }
    );
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/nurseSearch/${nurseID}`);
      const patients = await res.json();

      setData({ ...data, results: patients });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="min-h-full bg-white">
        <header className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between"></div>
        </header>
      <div className="min-h-full bg-white">
        <div className="bg-white">
          <main>
            {/* Hero section */}
            <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
              <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:px-8">
                <div>
                  <div className="px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                          Patients
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                          Truncated Patient list for brevity
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 flow-root">
                      <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                  Insurance
                                </th>
                                <th
                                  scope="col"
                                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                >
                                  First Name
                                </th>
                                <th
                                  scope="col"
                                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                >
                                  Last name
                                </th>
                                <th
                                  scope="col"
                                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                                >
                                  Sex
                                </th>
                                <th
                                  scope="col"
                                  className="relative py-3.5 pl-3 pr-6 sm:pr-0"
                                >
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {data?.results?.map((result, index) => (
                                <tr key={result.FIRST + index}>
                                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {result?.INSURANCE}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {result.FIRST}
                                  </td>
                                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {result.LAST}
                                  </td>
                                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {result.SEX}
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                    <a
                                      onClick={() =>
                                        viewPatientProfile(result.ID)
                                      }
                                      className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                                    >
                                      PROFILE
                                    </a>
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                    <span
                                      onClick={() =>
                                        storePatientInfo(result.ID)
                                      }
                                      className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                                    >
                                      Edit
                                    </span>
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
        </div>
      </div>
      </div>
    </>
  );
}
