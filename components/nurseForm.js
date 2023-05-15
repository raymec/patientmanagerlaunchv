import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


const NurseForm = ({setEditPatient, editPatient}) => {
  const router = useRouter();

    const handleChange = (e) => {
      const name = e.target.name;
      setEditPatient({...editPatient, [name]: e.target.value}); 
    }

    const handleSubmit = async (e, endPt, method) => {
      e.preventDefault(); 

      const option = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPatient)
      }
      const employee = JSON.parse(sessionStorage.getItem('staff'));
      try {
        await fetch(endPt, option);
        await router.push(
          {
            pathname: `/employee/${employee.FIRST}`,
          },
          undefined,
          { shallow: true }
        );
      }catch (err){
        console.log(err)
      }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, `/api/put/${editPatient.ID}`, 'PUT')} className="space-y-6">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Patient Information
              </h3>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              {/* <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FIRST"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="FIRST"
                    id="FIRST"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={editPatient.FIRST}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LAST"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="LAST"
                    id="LAST"
                    autoComplete="family-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={editPatient.LAST}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <div>
                    <label
                      htmlFor="SEX"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sex
                    </label>
                    <select
                      id="SEX"
                      name="SEX"
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      defaultValue={editPatient.SEX}
                      onChange={(e) => handleChange(e)}
                    >
                      <option> </option>
                      <option name="SEX" value="male">
                        Male
                      </option>
                      <option name="SEX" value="female" selected>
                        Female
                      </option>
                      <option name="SEX" value="na">
                        Decline to answer
                      </option>
                    </select>
                  </div>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="ADDRESS"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    name="ADDRESS"
                    id="ADDRESS"
                    autoComplete="street-address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.ADDRESS}
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="CITY"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="CITY"
                    id="CITY"
                    autoComplete="address-level2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.CITY}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="STATE"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="STATE"
                    id="STATE"
                    autoComplete="address-level1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.STATE}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="ZIP"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP / Postal code
                  </label>
                  <input
                    type="text"
                    name="ZIP"
                    id="ZIP"
                    autoComplete="postal-code"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.ZIP}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="INSURANCE"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Insurance
                  </label>
                  <input
                    type="text"
                    name="INSURANCE"
                    id="INSURANCE"
                    autoComplete="address-level1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.INSURANCE}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="NURSE"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nurse Assigned
                  </label>
                  <select
                      id="NURSE"
                      name="NURSE"
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      defaultValue={editPatient.NURSE}
                      onChange={(e) => handleChange(e)}
                    >
                      <option name="Jackie" value="Jackie">Jackie</option>
                      <option name="Mitchell" value="Mitchell">Mitchell</option>
                      <option name="Sam" value="Sam">Sam</option>
                      <option name="Max" value="Max">Max</option>
                      <option name="Ellen" value="Ellen">Ellen</option>
                    </select>
                </div>
              </div> */}

              <div>
                <label
                  htmlFor="MEDHIST"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medical History
                </label>
                <div className="mt-1">
                  <textarea
                    id="MEDHIST"
                    name="MEDHIST"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="information pertaining to allergies, illnesses, physical tests, surgeries, & immunization"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.MEDHIST}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="MEDLIST"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medicine List
                </label>
                <div className="mt-1">
                  <textarea
                    id="MEDLIST"
                    name="MEDLIST"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="information pertaining to drugs previously and currently being taken and their dosages"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.MEDLIST}
                  />
                </div>
              </div>

              {/* <div>
                <label
                  htmlFor="ORDERS"
                  className="block text-sm font-medium text-gray-700"
                >
                  Plan of Care
                </label>
                <div className="mt-1">
                  <textarea
                    id="ORDERS"
                    name="ORDERS"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Designate type, duration, and who will be handling the POC"
                    onChange={(e) => handleChange(e)} 
                    defaultValue={editPatient.ORDERS}
                  />
                </div>
              </div> */}

              <div>
                <label
                  htmlFor="NOTES"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <div className="mt-1">
                  <textarea
                    id="NOTES"
                    name="NOTES"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Personal notes pertaining to patient care"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editPatient.NOTES}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          {/* <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button> */}
          <button
            //onSubmit={(e) => handleSubmit(e, `/api/edit/${editPatient}`, 'PUT')}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update
          </button>
        </div>
      </form>
    )
}

export default NurseForm;