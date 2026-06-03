import ApplicantNavbar from "../components/ApplicantNavbar";

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ApplicantNavbar />

      <main className="p-6">{children}</main>
    </div>
  );
}
