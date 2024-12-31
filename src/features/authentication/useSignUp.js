import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log('User signed up:', user);
      toast.success(
        'Account created successfully, please check your email to verify your account',
      );
    },
  });

  return { signUp, isLoading };
}
