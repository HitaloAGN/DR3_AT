import axios from 'axios';

export async function searchCEP(cep) {
  try {
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length !== 8) {
      throw new Error('CEP inválido');
    }

    const response = await axios.get(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
      success: true,
      data: {
        street: response.data.logradouro,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Erro ao buscar CEP'
    };
  }
}