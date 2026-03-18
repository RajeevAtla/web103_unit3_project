const API_BASE = '/api/custom-items'

const handleResponse = async (response) => {
  if (!response.ok) {
    let message = 'Request failed.'

    try {
      const body = await response.json()
      message = body.error ?? message
    } catch {
      // fall back to the default message when no JSON body exists
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const getAllCustomItems = async () => {
  const response = await fetch(API_BASE)
  return handleResponse(response)
}

export const getCustomItem = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`)
  return handleResponse(response)
}

export const createCustomItem = async (payload) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return handleResponse(response)
}

export const updateCustomItem = async (id, payload) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return handleResponse(response)
}

export const deleteCustomItem = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })

  return handleResponse(response)
}
