import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be loaded!')
    }

    return data
}

export async function insertCabins(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        '/',
        '',
    )
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

    // 1. Create new cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be inserted!')
    }

    // 2. Upload image to storage
    const { error: storageError } = await supabase.storage
        .from('cabins-images')
        .upload(imageName, newCabin.image)

    // 3. Delete new cabin
    if (storageError) {
        deleteCabins(data.id)
        console.log(storageError)
        throw new Error(
            'Cabin image could not be uploaded and the cabin was not  created',
        )
    }

    return data
}

export async function deleteCabins(id) {
    const { error } = await supabase.from('cabins').delete().eq('id', id)

    if (error) {
        console.log(error)
        throw new Error('Cabin could not be deleted!')
    }
}
