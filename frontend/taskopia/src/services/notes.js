import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7102",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchNotes = async (filter) => {
  try {
    const response = await api.get("/notes", {
      params: {
        search: filter?.search,
        sortItem: filter?.sortItem,
        sortOrder: filter?.sortOrder,
      },
      withCredentials: true // Убедитесь, что запрос отправляется с куками
    });

    return response.data.notes;
  } catch (e) {
    console.error("Error fetching notes:", e);
    throw e;
  }
}

export const createNote = async (note) => {
  try {
    const response = await api.post("/notes", note, {
      withCredentials: true // Убедитесь, что запрос отправляется с куками
    });

    return response.status;
  } catch (e) {
    console.error("Error creating note:", e);
    throw e;
  }
}

export const updateNote = async (note) => {
  try {
    const response = await api.put(`/notes/${note.id}`, note, {
      withCredentials: true // Убедитесь, что запрос отправляется с куками
    });

    return response.status;
  } catch (e) {
    console.error("Error updating note:", e);
    throw e;
  }
}

export const removeNote = async (id) => {
  try {
    const response = await api.delete(`/notes/${id}`, {
      withCredentials: true // Убедитесь, что запрос отправляется с куками
    });

    return response.status;
  } catch (e) {
    console.error("Error deleting note:", e);
    throw e;
  }
}

export const registerUser = async (user) => {
  try {
    const response = await api.post(`/Authentication/Registration`, user, {
      withCredentials: true // Убедитесь, что запрос отправляется с куками
    });
    return response.status;
  } catch (e) {
    console.error("Error during registration:", e);
    if (e.response) {
      console.error("Response data:", e.response.data);
    }
    throw e;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(`/Authentication/Login`, credentials, {
      withCredentials: true // Убедитесь, что запрос отправляется с куками
    });
    return response.data;
  } catch (e) {
    console.error("Error during login:", e);
    if (e.response) {
      console.error("Response data:", e.response.data);
    }
    throw e;
  }
}

export const fetchUsers = async () => {
  try {
    const response = await api.get("/Users", {
      withCredentials: true
    });

    return response.data;
  } catch (e) {
    console.error("Error fetching users:", e);
    throw e;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/Users/${userId}`, {
      withCredentials: true
    });

    return response.data;
  } catch (e) {
    console.error("Error deleting user:", e);
    throw e;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await api.put(`/Users/${user.id}`, user, {
      withCredentials: true
    });

    return response.data;
  } catch (e) {
    console.error("Error updating user:", e);
    throw e;
  }
};