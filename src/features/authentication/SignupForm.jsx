import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from './useSignUp';
import SpinnerMini from '../../ui/SpinnerMini';

function SignupForm() {
  const emailRegex = /\S+@\S+\.\S+/;
  const { signUp, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isLoading}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: emailRegex,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors.password?.message}
      >
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={reset}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {!isLoading ? 'Create new user' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
