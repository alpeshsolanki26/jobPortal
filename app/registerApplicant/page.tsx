import RegisterFormApplicant from "../components/forms/RegisterFormApplicant";

export default function RegisterPage() { 
  return ( 
  <div className="p-10"> 
    <h1 className="text-2xl font-bold mb-5"> 
      Applicant Register 
    </h1> 
    <RegisterFormApplicant /> 
  </div> 
  ); 
}