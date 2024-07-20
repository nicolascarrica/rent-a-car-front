import { CustomerEditData, CustomerFormData } from "./Interface";

export const deleteItemFromDatabase = async (id: number | string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {

      if (response.status === 204) { 
        return true;
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Error parsing response JSON:', error);
        }
      } else {

        return true;
      }
    } else {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export const createCustomer = async (formData: CustomerFormData) => {
  try {
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
    return { success: false, error };
  }
};

export const updateCustomer = async (id: string, formData: Partial<CustomerEditData>) => {
  try {
    console.log('Sending data:', formData);
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: 'PATCH',
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
      console.error('Error response data:', errorData); // Log error response data
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error('Error updating user', error);
    return { success: false, error };
  }
};