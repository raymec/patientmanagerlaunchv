import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PatientForm() {
  const [newPatient, setNewPatient] = useState({
    insurance: '',
    first: '', 
    last: '', 
    sex: '', 
    address: '', 
    city: '', 
    state: '', 
    zip: '', 
    nurse: '', 
    orders: '',
    notes: '',
    medhist: '',
    medlist: ''
  }); 

  useEffect(() => {
    console.log(newPatient)
  }, [newPatient])

  const router = useRouter();

  // WHEN CLICKED SENDS USER TO MANAGER FORM PAGE
  const returnToMangerPg = () => {
        router.push(
        {
          pathname: "/manager",
        },
        undefined,
        { shallow: true }
      );
  }

  //SETS PATIENT DATA
  const setPatientData = (e) => {
    const name = e.target.name; 
    setNewPatient({...newPatient, [name]: e.target.value}); 
  }

  const sendData = async (e, endPt, method) => {
    e.preventDefault(); 
    const option = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPatient)
    }

    try {
      const data = await fetch(endPt, option);
    }catch (err){
      console.log(err)
    }

    router.reload(window.location.pathname)

  }

  return (
    <form onSubmit={(e) => sendData(e, `/api/postPatient`, 'POST')} className="space-y-6">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Patient Form
            </h3>
            <p className="mt-1 text-sm text-gray-500">fill out completely</p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  onChange={(e) => setPatientData(e)}
                  type="text"
                  name="first"
                  id="first"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last"
                  className="block text-sm font-medium text-gray-700"
                  >
                  Last name
                </label>
                <input
                  onChange={(e) => setPatientData(e)}
                  type="text"
                  name="last"
                  id="last"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <div>
                  <label
                    htmlFor="sex"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sex
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="Canada"
                    onChange={(e) => setPatientData(e)}
                  >
                    <option > </option>
                    <option name="male" value="male">Male</option>
                    <option name="female" value="female">Female</option>
                    <option name="na" value="na">Decline to answer</option>
                  </select>
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setPatientData(e)}
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setPatientData(e)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setPatientData(e)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  autoComplete="postal-code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setPatientData(e)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Insurance
                </label>
                <input
                  type="text"
                  name="insurance"
                  id="insurance"
                  autoComplete="address-level1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setPatientData(e)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Assign Nurse
                </label>
                <select
                    id="nurse"
                    name="nurse"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="Canada"
                    onChange={(e) => setPatientData(e)}
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

            <div className="mb-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Medical History
              </label>
              <div className="mt-1">
                <textarea
                  id="medhist"
                  name="medhist"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="information pertaining to allergies, illnesses, physical tests, surgeries, & immunization"
                  defaultValue={""}
                  onChange={(e) => setPatientData(e)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="orders"
                className="block text-sm font-medium text-gray-700"
              >
                Medication List
              </label>
              <div className="mt-1 mb-4">
                <textarea
                  id="medlist"
                  name="medlist"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="information pertaining to drugs previously and currently being taken and their dosages"
                  defaultValue={""}
                  onChange={(e) => setPatientData(e)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Plan of Care
              </label>
              <div className="mt-1">
                <textarea
                  id="orders"
                  name="orders"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Designate type, duration, and who will be handling the POC"
                  defaultValue={""}
                  onChange={(e) => setPatientData(e)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Personal notes pertaining to patient care"
                  defaultValue={""}
                  onChange={(e) => setPatientData(e)}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-end pb-6 mr-4">
        <button
          onClick={returnToMangerPg}
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Patient
        </button>
      </div>
    </form>
  );
}
