import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const totalBookings = bookings.length;
  const totalSales = bookings.reduce((acc, stay) => acc + stay.totalPrice, 0);
  const totalCheckIns = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title='Bookings'
        value={totalBookings}
        color='blue'
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title='Sales'
        value={formatCurrency(totalSales)}
        color='green'
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title='Check-ins'
        value={totalCheckIns}
        color='indigo'
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title='Occupancy rate'
        value={Math.round(occupation * 100) + '%'}
        color='yellow'
      />
    </>
  );
}

export default Stats;
