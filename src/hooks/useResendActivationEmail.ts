
import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";

interface Email {
  email: string;
}

const resendActivationEmail = async (data: Email) => {
   
  const response = await apiClient.post("/auth/users/resend_activation/", data);
  
  if (response.status === 204) { 
    return response.data;
  }
  
  if (response.data) {
    throw new Error(response.data.detail);
  }
  
  throw new Error('Error resending activation email');
};

export const useResendActivationEmail = () => {
    const navigate = useNavigate();

  return useMutation({
    mutationFn: resendActivationEmail,
    onSuccess: () => {
    navigate("/resend_activation");
      },
    onError: (error: any) => {
      console.error("Error resending activation email:", error);
    },
  });
};
