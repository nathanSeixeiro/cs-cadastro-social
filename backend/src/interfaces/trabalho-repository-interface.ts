import Trabalho from './../Models/Trabalho';

interface ITrabalhoRepository {
  create(trabalho: Trabalho): Promise<Trabalho>;
  findById(id: number): Promise<Trabalho | null>;
  findAll(): Promise<Trabalho[]>;
  update(id: number, Trabalho: Trabalho): Promise<Trabalho>;
  delete(id: number): Promise<void>;
}

export default ITrabalhoRepository;
