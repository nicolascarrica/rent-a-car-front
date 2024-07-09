import { CustomerFormData } from "./Interface";

export const deleteItemFromDatabase = async (id: number | string) => {
  try {
    
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el elemento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const createCustomer = async (formData: CustomerFormData) => {
  try {
    console.log('Sending data:', formData);
    const response = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error('Error to create user', error);
    return { success: false, error };
  }
};
