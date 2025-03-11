"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "company":
        return <CompanySettings />;
      case "documents":
        return <Documents />;
      case "billing":
        return <Billing />;
      case "notifications":
        return <Notifications />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="flex justify-center items-center  h-fit my-24">
     
      <div className="mx-auto w-full  px-4">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          {/* Profile Sidebar */}
          <div className="">
            <div className="rounded-xl bg-white/60 p-8 shadow-sm">
              <div className="mb-6 text-center">
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GZaOIPdqUnXcRN273rZjOE1BsQrJRC.png"
                    alt="Profile"
                    className="rounded-full border-4 border-white object-cover"
                  />
                  <div className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="mb-1 text-xl font-semibold">Nathaniel Poole</h2>
                <p className="text-sm text-gray-500">Microsoft Inc.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Opportunities applied
                  </span>
                  <span className="font-medium text-amber-500">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Opportunities won
                  </span>
                  <span className="font-medium text-green-500">26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Current opportunities
                  </span>
                  <span className="font-medium">6</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View Public Profile
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="">
            <div className=" bg-white/60 p-8 shadow-sm rounded-xl">
              {/* Tabs */}
              <div className="mb-6 border-b">
                <nav className="-mb-px flex space-x-8">
                  {[
                    "account",
                    "company",
                    "documents",
                    "billing",
                    "notifications",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-1 pb-4 text-sm font-medium ${
                        activeTab === tab
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} Settings
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountSettings() {
  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            defaultValue="Nathaniel"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            defaultValue="Poole"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            defaultValue="+1800-000"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            defaultValue="nathaniel.poole@microsoft.com"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            defaultValue="Bridgeport"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State/County
          </label>
          <input
            type="text"
            id="state"
            defaultValue="WA"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-700"
          >
            Postcode
          </label>
          <input
            type="text"
            id="postcode"
            defaultValue="31005"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            defaultValue="United States"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update
        </button>
      </div>
    </form>
  );
}

function CompanySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Company Settings</h2>
      <p>Manage your company information and preferences here.</p>
    </div>
  );
}

function Documents() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Documents</h2>
      <p>View and manage your important documents here.</p>
    </div>
  );
}

function Billing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Billing</h2>
      <p>Manage your billing information and view invoices here.</p>
    </div>
  );
}

function Notifications() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <p>Configure your notification preferences here.</p>
    </div>
  );
}
