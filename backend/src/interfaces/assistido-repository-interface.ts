import Assistido from "@/Models/Assistido"

interface IAssistidoRepository {
    create(assistido: Assistido): Promise<object>;
    findById(id: number): Promise<Assistido | null>;
    findAll(): Promise<Assistido[]>;
    updateState(id: number, assistido: Assistido): Promise<Assistido>;
}

export default IAssistidoRepository; 