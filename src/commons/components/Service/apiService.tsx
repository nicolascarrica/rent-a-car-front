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