import supabase from './supabase'

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be loaded!')
    }

    return data
}

export async function insertCabins(newCabin) {
    const { data, error } = await supabase
        .from('cabins')
        .insert([newCabin])
        .select()

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be inserted!')
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
