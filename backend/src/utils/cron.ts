import cron from 'node-cron';
import AvisoRepository from '../Repositories/AvisoRepository';

const avisoRepository = new AvisoRepository();
const DELETE_OLDER_THAN_DAYS = 7;

// Exclui avisos mais antigos que 7 dias, à meia-noite todos os dias
cron.schedule('0 0 * * *', async () => {
  const date = new Date();
  date.setDate(date.getDate() - DELETE_OLDER_THAN_DAYS);

  try {
    await avisoRepository.deleteOlderThan(date);
    console.log('Avisos antigos excluídos com sucesso');
  } catch (error) {
    console.error('Erro ao excluir avisos antigos:', error);
  }
});
