import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error.message);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '-',
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create a new cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error.message);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload image
  const { error: uploadError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. Delete cabin if upload fails
  if (uploadError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(uploadError.message);
    throw new Error(
      'Image could not be uploaded and the cabin was not created',
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
