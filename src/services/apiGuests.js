import supabase from './supabase';

export async function getGuests() {
  const { data, error } = await supabase.from('guests').select('*');

  if (error) {
    console.error('Guests could not be loaded:', error.message);
    throw new Error('Guests could not be loaded:', error.message);
  }

  return data;
}
