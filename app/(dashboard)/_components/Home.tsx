
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Your Miro Clone</span>
        </h1>
        <p className="mt-3 text-2xl">
          Collaborate, visualize, and create like never before.
        </p>
        <div className="mt-6">
          <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Try for Free
          </a>
          <a href="#" className="ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            See Demo
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
