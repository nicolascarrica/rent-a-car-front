import { CarEditData, CarFormData } from "./Interface";

export const createCar = async (formData: CarFormData) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/cars', {
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

export const updateCar = async (id: string, formData: Partial<CarEditData>) => {
  try {
    console.log('Sending data:', formData);
    const response = await fetch(`http://localhost:3000/api/v1/cars/${id}`, {
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
      console.error('Error response data:', errorData);
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error('Error updating car', error);
    return { success: false, error };
  }
};

export const deleteCarFromDatabase = async (id: number | string) => {
  try {
    
    const response = await fetch(`http://localhost:3000/api/v1/cars/${id}`, {
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
