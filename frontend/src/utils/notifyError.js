export const notifyError = (error) => {
    const { statusCode, message } = error.graphQLErrors[0];
    alert(`Error al crear una persona: ${message}`);
}