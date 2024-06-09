import axios from "axios";

export const fetchNotes = async (filter) => {
    try
    {
        var response = await axios.get("https://localhost:7102/notes", {
            params: {
                search: filter?.search,
                sortItem: filter?.sortItem,
                sortOrder: filter?.sortOrder,
            },
        });

        return response.data.notes;
    }
    catch(e)
    {
        console.error(e);
    }
}

export const createNote = async (note) => {
    try
    {
        var response = await axios.post("https://localhost:7102/notes", note);

        return response.status;
    }
    catch(e)
    {
        console.error(e);
    }
}

export const removeNote = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:7102/notes/${id}`);
        return response.status;
    } catch (e) {
        console.error("Error sending request:", e);
    }
};

export const registerUser = async (user) => {
    try {
      console.log("Sending user data:", user); // отладочная информация
      const response = await axios.post(`https://localhost:7102/Authentication/Registration`, user);
      console.log("Server response:", response); // отладочная информация
      return response.status;
    } catch (e) {
      console.error("Error during registration:", e);
      if (e.response) {
        console.error("Response data:", e.response.data); // Печатает ответ для анализа
      }
      throw e;
    }
  };
  
  // Функция для входа
  export const loginUser = async (credentials) => {
    try {
      console.log("Sending login credentials:", credentials); // отладочная информация
      const response = await axios.post(`https://localhost:7102/Authentication/Login`, credentials);
      console.log("Server response:", response); // отладочная информация
      return response.data; // Предполагается, что ваш API возвращает токен или другие данные
    } catch (e) {
      console.error("Error during login:", e);
      if (e.response) {
        console.error("Response data:", e.response.data); // Печатает ответ для анализа
      }
      throw e;
    }
  };