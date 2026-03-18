import { supabase } from '../config/supabase.js'

export const getCustomItems = async (_, res) => {
  const { data, error } = await supabase
    .from('custom_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json(data)
}

export const getCustomItemById = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('custom_items')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    const status = error.code === 'PGRST116' ? 404 : 500
    return res.status(status).json({ error: error.message })
  }

  return res.status(200).json(data)
}

export const createCustomItem = async (req, res) => {
  const { data, error } = await supabase
    .from('custom_items')
    .insert(req.body)
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(201).json(data)
}

export const updateCustomItem = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('custom_items')
    .update(req.body)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    const status = error.code === 'PGRST116' ? 404 : 500
    return res.status(status).json({ error: error.message })
  }

  return res.status(200).json(data)
}

export const deleteCustomItem = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('custom_items')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(204).send()
}
