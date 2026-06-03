import { stringbool } from "zod";
import axiosInstance from "../lib/axiosInstance";
import {API_BASE_URL } from "../lib/axiosInstance";
// =======================
// SIGNUP TYPES
// =======================

export interface EducationPayload {
  institutionName: string;
  startYear: number;
  endYear: number;
}
export interface UpdateJobPayload {
  maxApplicants: number;
  maxPositions: number;
  deadline: string;
}
export interface SignupPayload {
  email: string;
  password: string;

  // applicant | recruiter
  type: "applicant" | "recruiter";

  name: string;

  education?: EducationPayload[];

  skills?: string[];

  rating?: number;

  resume?: string;

  profile?: string;
}
export interface CreateJobPayload {
  title: string;
  maxApplicants: number;
  maxPositions: number;
  deadline: string;
  skillsets: string[];
  jobType: string;
  duration: number;
  salary: number;
}
// =======================
// REGISTER USER
// =======================

export const registerUser = async (
  payload: SignupPayload
) => {
  const response = await axiosInstance.post(
    "/auth/signup",
    payload
  );

  return response.data;
};

// =======================
// LOGIN TYPES
// =======================

export interface LoginPayload {
  email: string;
  password: string;
}

// =======================
// LOGIN USER
// =======================

export const loginUser = async (
  payload: LoginPayload
) => {
  const response = await axiosInstance.post(
    "/auth/login",
    payload
  );
  
  return response.data;
};




// =======================
// GET APPLICANTS
// =======================

export const getApplicants = async (
  token: string
) => {

  const response = await fetch(
    "https://next-training-dev-api.connectid.cloud/api/applicants",
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  
  return response.json();
};


export const getJobs = async (
  token: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/jobs`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const getJobById = async (
  token: string,
  id: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/jobs/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export const applyJob = async (
  token: string,
  jobId: string,
  sop: string
)=>{
  const response = await fetch(
    `https://next-training-dev-api.connectid.cloud/api/jobs/${jobId}/applications`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-type":"application/json",
      },
      body:JSON.stringify({
        sop,
      }),
    }
  );
  return response.json();
};


export const getMyApplications = async (
  token:string
)=>{
  const response = await fetch(
    "https://next-training-dev-api.connectid.cloud/api/applications",
    {
      method:"GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json",
      },
    }
  );
  return response.json();
};

export const getProfile = async (
  token: string
) => {
  const response = await fetch(
    "https://next-training-dev-api.connectid.cloud/api/user",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const updateProfile = async (
  token: string,
  payload: {
    name: string;
    contactNumber: string;
    bio: string;
  }
) => {
  const response = await fetch(
    "https://next-training-dev-api.connectid.cloud/api/user",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
};

export const createJob = async (
  token:string,
  payload: CreateJobPayload
)=>{
  const response = await fetch(
    `${API_BASE_URL}/jobs`,
    {
      method:"POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-TYpe":"application/json",
      },
      body: JSON.stringify({
        ...payload,
        dateOfPosting: new Date().toISOString(),
        rating: -1,
      }),
    }
  );
  return response.json();
}

export const updateJob = async (
  token: string,
  jobId: string,
  payload: UpdateJobPayload
) => {
  const response = await fetch(
    `${API_BASE_URL}/jobs/${jobId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
};


export const deleteJob = async (
  token: string,
  jobId: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/jobs/${jobId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};


export const getApplicantsList = async (
  token: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/applicants`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};


export const getJobApplications = async (
  token: string,
  jobId: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/jobs/${jobId}/applications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const updateApplicationStatus =
  async (
    token: string,
    applicationId: string,
    payload: {
      status: string;
      dateOfJoining?: string;
    }
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/applications/${applicationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return response.json();
  };

export const getUserById = async (
  token: string,
  userId: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};