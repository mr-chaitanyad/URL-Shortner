import Navbar from "../components/Navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          URL Shortener
        </h1>

        <p className="text-gray-600 text-xl">
          Create Short URLs & Track Analytics
        </p>

      </div>
    </>
  );
}

export default Home;