import React from "react";

const Admin = async () => {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-3xl font-semibold">Welcome back!</h1>
      <p className="mt-2 text-gray-600">
        Here&apos;s what&apos;s been happening since your last visit.
      </p>
      <div className="grid gap-6 mt-6 grid-cols-2">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">New Customers</h2>
          <p className="mt-2 text-gray-600">
            Looks like you have some new customers since your last visit.
          </p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="mt-2 text-gray-600">
            Your revenue has increased since your last visit, keep up the good
            work!
          </p>
        </div>
      </div>
    </main>
  );
};

export default Admin;
