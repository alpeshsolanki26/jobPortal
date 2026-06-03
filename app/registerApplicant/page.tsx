import RegisterFormApplicant from "../components/forms/RegisterFormApplicant";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white">
            Applicant Registration
          </h1>

          <p className="text-slate-300 mt-3">
            Create your profile and start applying for jobs.
          </p>
        </div>

        <RegisterFormApplicant />
      </div>
    </div>
  );
}
