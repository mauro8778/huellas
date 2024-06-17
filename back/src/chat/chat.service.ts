import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entidades/message.entity';
import { UserEntity } from 'src/entidades/users.entity';
import { Repository } from 'typeorm';


interface Client {
    id: string,
    name: string
}

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
      ) {}
    
    private clients: Record< string, Client> = {};


    onClientConnected(client: Client){
        this.clients[ client.id ] = client;
    }

    onClientDisconnected(id: string){
        delete this.clients[id];
    }

    getClients() {
        return Object.values(this.clients)
    }

    async sendMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
        // Buscar el remitente por su ID
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
    
        // Buscar el receptor por su ID
        const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
    
        // Verificar si el remitente y el receptor existen
        if (!sender || !receiver) {
          throw new Error('Sender or receiver not found');
        }
    
        // Crear un nuevo mensaje
        const message = new Message();
        message.sender = sender;
        message.receiver = receiver;
        message.content = content;
    
        // Guardar el mensaje en la base de datos
        return await this.messageRepository.save(message);
      }
    
      async getMessages(userId: string): Promise<Message[]> {
        // Obtener todos los mensajes donde el usuario es el remitente o el receptor
        return await this.messageRepository.find({
          where: [
            { sender: { id: userId } },
            { receiver: { id: userId } }
          ],
          order: { timestamp: 'ASC' },
        });
      }

}
