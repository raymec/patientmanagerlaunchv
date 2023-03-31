import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Form from '../../../components/Form'

export default function Example() {
  const [editPatient, setEditPatient] = useState({
    INSURANCE: '',
    FIRST: '', 
    LAST: '', 
    SEX: '', 
    ADDRESS: '', 
    CITY: '', 
    STATE: '', 
    ZIP: '', 
    NURSE: '', 
    ORDERS: '', 
    NOTES: '', 
    ID: '',
    MEDHIST: '',
    MEDLIST: ''
  });

  const router = useRouter(); 

  const returnToMangerPg = () => {
    router.push(
      {
        pathname: "/manager",
      },
      undefined,
      { shallow: true }
    );
  };
  
  useEffect(() => {
    if(window !== 'undefined'){
      const patient = JSON.parse(sessionStorage.getItem('patient')); 
      setEditPatient(patient); 
    }
  }, [])

  useEffect(() => {
    console.log(editPatient)
  }, [editPatient])

  return (
    <div className="bg-white">
      <main className="overflow-hidden">
        {/* Header */}
        <div className="">
          <div className="py-24 lg:py-16"></div>
        </div>

        <section
          className="relative bg-white"
          aria-labelledby="contact-heading"
        >
          <div
            className="absolute h-1/2 w-full"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative bg-white shadow-xl">
              <div className="grid grid-cols-1">

                {/* Contact form */}
                <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                  {typeof window && 
                  <Form setEditPatient={setEditPatient} editPatient={editPatient} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8"></div>
      </footer>
    </div>
  );
}
