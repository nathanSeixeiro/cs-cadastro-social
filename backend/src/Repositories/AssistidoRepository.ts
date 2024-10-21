// import Endereco from "../Models/Endereco";
// import Assistido from "../Models/Assistido";
// import IAssistidoRepository from "../interfaces/assistido-repository-interface";
// import { prisma } from "../utils/prisma"
// import Trabalho from "../Models/Trabalho";
// import Familia from "../Models/Familia";
// import InformacaoMedica from "../Models/InformacaoMedica";

// class AssistidoRepository implements IAssistidoRepository {
//     async create(assistido: Assistido): Promise<object> {
//         const newAssistido = await prisma.assistido.create({
//             data: {


//             }
//         });
//         return newAssistido
//     }

//     async findById(id: number): Promise<Assistido | null> {
//         const assistido = await prisma.assistido.findUnique({
//             where: { id },
//         });
//         return assistido as Assistido | null;
//     };

//     async findAll(): Promise<Assistido[]> {
//         const assistidos = await prisma.assistido.findMany();
//         return assistidos;
//     }

//     async updateState(id: number, assistido: Assistido): Promise<[Assistido, Endereco, Trabalho, InformacaoMedica, Familia]>{
//         const updateState = await prisma.assistido.update({
//             where: { id },
//             data: {
//                 ativo: assistido.ativo
//             }
//         });
//         return {
//             ...updateState,
//             endereco: assistido.endereco,
//             trabalhos: assistido.trabalhos,
//             informacoes_medicas: assistido.informacoes_medicas,
//             familia: assistido.familia
//         };
//     }
// }

// export default AssistidoRepository