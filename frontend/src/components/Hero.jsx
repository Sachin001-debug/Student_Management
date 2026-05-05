//hero section for the app is here. From btn to title that features the app des
const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-300 text-black px-6">
      
      <div className="max-w-4xl text-center flex flex-col gap-6">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Track student activities with{" "}
          <span className="text-[#6E1A37]">Bidyarthi</span> platform
        </h1>

        <p className="text-sm md:text-sm text-gray-900">
          Manage attendance, performance, and student data in one powerful
          dashboard. Simplify your institution’s workflow with smart tools.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <button className="bg-[#72BAA9] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#5aa897] transition duration-300 shadow-lg">
            Get Started
          </button>

          <button className="border bg-[#D5E7B5] cursor-pointer border-none px-6 py-3 rounded-full font-semibold">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;