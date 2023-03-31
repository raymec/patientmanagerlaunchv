import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Example() {
  const [cred, setCred] = useState({ email: "", pass: "" });
  const [employee, setEmployee] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cred.email.trim() === "") return;
    if (cred.pass.trim() === "") return;
    const encoded = encodeURI(`${[cred.email, cred.pass]}`);

    try {
      const fetchData = await fetch(`/api/login/${encoded}`);
      const staff = await fetchData.json();
      setEmployee(staff);

      const employeeObj = {
        FIRST: staff[0].FIRST,
        LAST: staff[0].LAST,
      };
      sessionStorage.setItem("staff", JSON.stringify(employeeObj));
    } catch (err) {
      // stay on login page
      throw err;
    }
  };

  //nurse logins

  function routeTo(employee) {
    if (employee.length < 1) return;
    if (employee[0]?.ADDRESS?.includes("@emp.")) {
      router.push(
        {
          pathname: `/employee/${employee[0].FIRST}`,
        },
        undefined,
        { shallow: true }
      );
    }

    if (employee[0]?.ADDRESS?.includes("@mgr.")) {
      router.push(
        {
          pathname: `/manager`,
        },
        undefined,
        { shallow: true }
      );
    }
    // else{
    //     console.log("invalid, stay on page")
    //     do not route
    // }
  }

  useEffect(() => {
    console.log(employee);
  }, [employee]);

  useEffect(() => {
    routeTo(employee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) =>
                      setCred({ ...cred, email: e.target.value })
                    }
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setCred({ ...cred, pass: e.target.value })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  onSubmit={(e) => local(e)}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"></div>
                <div className="relative flex justify-center text-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
