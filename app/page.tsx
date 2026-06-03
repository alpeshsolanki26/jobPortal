import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Navbar */}
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        <h1 className="text-3xl font-bold text-blue-400">JobPortal</h1>

        <div className="flex gap-4">
          <a
            href="/login"
            className="rounded-lg border border-white/20 px-5 py-2 hover:bg-white/10"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Next.js Job Portal
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
            Find Your
            <span className="text-blue-400"> Dream Job </span>
            Faster Than Ever
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Connect talented candidates with top companies. Apply for jobs,
            manage applications, and hire the best talent all in one platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/registerApplicant"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Register as Applicant
            </a>

            <a
              href="/register"
              className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold transition hover:bg-emerald-700"
            >
              Register as Recruiter
            </a>

            <a
              href="/login"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold hover:bg-white/10"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-8 backdrop-blur">
            <h3 className="text-4xl font-bold text-blue-400">1000+</h3>
            <p className="mt-2 text-gray-300">Active Job Listings</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-8 backdrop-blur">
            <h3 className="text-4xl font-bold text-green-400">500+</h3>
            <p className="mt-2 text-gray-300">Hiring Companies</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-8 backdrop-blur">
            <h3 className="text-4xl font-bold text-purple-400">10K+</h3>
            <p className="mt-2 text-gray-300">Registered Candidates</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 pb-24">
        <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Us?</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-8">
            <h3 className="mb-3 text-xl font-bold">Easy Job Search</h3>
            <p className="text-gray-300">
              Browse and apply for jobs with a simple and intuitive experience.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-8">
            <h3 className="mb-3 text-xl font-bold">Recruiter Dashboard</h3>
            <p className="text-gray-300">
              Post jobs, review applications, and hire the right candidate.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-8">
            <h3 className="mb-3 text-xl font-bold">Application Tracking</h3>
            <p className="text-gray-300">
              Keep track of all your job applications in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        © 2026 JobPortal. All rights reserved.
      </footer>
    </main>
  );
}
