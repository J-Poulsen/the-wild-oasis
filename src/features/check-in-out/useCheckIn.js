import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-in', isPaid: true }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: () => {
      toast.error('An error occurred while checking in');
    },
  });

  return { checkIn, isCheckingIn };
}
