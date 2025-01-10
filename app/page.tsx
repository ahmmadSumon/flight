import Image from "next/image";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        Welcome to Flight Management System
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Manage flights with ease. Register or log in to get started.
      </p>
      <div className="flex space-x-4">
        <a
          href="/register"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </a>
        <a
          href="/login"
          className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Login
        </a>
      </div>
    </main>
  );
}
