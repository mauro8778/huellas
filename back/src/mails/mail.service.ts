import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailService  {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService,){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }


  async sendMail(to: string, subject: string, text: string, html?: string) {
    if (!to) {
      this.logger.error('No recipients defined');
      throw new Error('No recipients defined');
    }

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent: ' + info.response);
    } catch (error) {
      this.logger.error('Error sending email: ' + error.message);
      throw new Error('Error sending email');
    }
  }


  async registerUserMail(userEmail: string, username: string,password: string) {
    const subject = 'Bienvenido a Huellas de Esperanza';
    const text = `Hola ${username},

    ¡Bienvenido/a a Huellas de Esperanza!

    Nos alegra mucho que te hayas unido a nuestra comunidad. En Huellas de Esperanza, trabajamos para conectar a adorables mascotas con personas llenas de amor como tú. Ahora puedes explorar y adoptar mascotas que necesitan un hogar y todo tu cariño.

    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

    Saludos cordiales,
    El equipo de Huellas de Esperanza`;

    const html = `
     <div style="border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto;">
        <p><strong>¡Hola, ${username}!</strong></p>
        <p><strong>¡Bienvenido/a a Huellas de Esperanza!</strong></p>
        <p>Nos alegra mucho que te hayas unido a nuestra comunidad. En Huellas de Esperanza, trabajamos para conectar a adorables mascotas con personas llenas de amor como tú. Ahora puedes explorar y adoptar mascotas que necesitan un hogar y todo tu cariño.</p>
        <p>Tus credenciales son: </p>
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="border: 2px solid #ff3366; padding: 10px; border-radius: 10px; margin-bottom: 10px; background: white; text-align: left; display: inline-block;">
                <p style="margin: 0;">usuario: ${userEmail}</p>
                <p style="margin: 0;">contraseña: ${password}</p>
            </div>
        </div>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
        <p>¡Saludos!</p>
        <p>El Equipo de Huellas de Esperanza</p>
    </div>`;
    this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`);
    await this.sendMail(userEmail, subject, text, html);
}
async cambioPasswordMail(userEmail: string, username: string) {
  const subject = 'Solicitud de Cambio de Contraseña - Huellas de Esperanza';
  const text = `Hola ${username},

  Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en Huellas de Esperanza. Si no solicitaste este cambio, por favor ignora este correo.

  Para cambiar tu contraseña, sigue el enlace a continuación:

  [ENLACE PARA CAMBIAR CONTRASEÑA]

  Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

  Saludos cordiales,
  El equipo de Huellas de Esperanza`;

  const html = `
  <div style="border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto;">
        <p>¡Hola, <strong>${username}</strong>!</p>
        <p>Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en Huellas de Esperanza. Si no solicitaste este cambio, por favor ignora este correo.</p>
        <p>Para cambiar tu contraseña, sigue el enlace a continuación:</p>
        <p>
          <a href="[ENLACE PARA CAMBIAR CONTRASEÑA]" style="display: inline-block; padding: 10px 20px; background: linear-gradient(to bottom, #ff3366, #ffffff); color: white; text-decoration: none; border-radius: 5px; box-shadow: 0 5px 15px rgba(255, 0, 102, 0.3); transition: all 0.3s ease;">
            Cambiar Contraseña
          </a>
        </p>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
        <p>¡Saludos!</p>
        <p>El Equipo de Huellas de Esperanza</p>
      </div>`;
  this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`);
  await this.sendMail(userEmail, subject, text, html);
}
async registershelterMail(userEmail: string, username: string,password: string) {
  const subject = 'Bienvenido a Huellas de Esperanza';
  const text = `Hola ${username},

  ¡Bienvenido/a al equipo de refugios de Huellas de Esperanza!

  Nos alegra mucho que te hayas unido a nuestra comunidad. En Huellas de Esperanza, trabajamos para conectar a adorables mascotas con personas llenas de amor como tú. A la brevedad, recibirás un correo electrónico cuando tu cuenta esté activada, y entonces podrás registrar perros y modificar tu perfil.

  Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

  Saludos cordiales,
  El equipo de Huellas de Esperanza`;

  const html = `
  <div style="border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto;">
        <p><strong>¡Hola, ${username}!</strong></p>
        <p><strong>¡Bienvenido/a a Huellas de Esperanza!</strong></p>
        <p>Nos alegra mucho que te hayas unido a nuestra comunidad. En Huellas de Esperanza, trabajamos para conectar a adorables mascotas con personas llenas de amor como tú.</p>
        <p>Hemos recibido tu solicitud y estamos procesándola. A continuación, te enviamos tus credenciales:</p> 
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="border: 2px solid #ff3366; padding: 10px; border-radius: 10px; margin-bottom: 10px; background: white; text-align: left; display: inline-block;">
                <p style="margin: 0;">Usuario: ${userEmail}</p>
                <p style="margin: 0;">Contraseña: ${password}</p>
            </div>
        </div>
        <p>A la brevedad, te enviaremos la confirmación para que tu refugio pueda comenzar a subir los perros disponibles para adopción en nuestra página.</p>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
        <p>¡Saludos!</p>
        <p>El Equipo de Huellas de Esperanza</p>
    </div>`;
  this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`);
  await this.sendMail(userEmail, subject, text, html);
}
async deleteUserMail(userEmail: string, username: string) {
    const subject = 'Bienvenido a Huellas de Esperanza';
    const text = `Hola ${username},

    Tu cuenta ha sido cerrada correctamente.
 
    Te informamos que hemos dado cumplimiento a su solicitud de acuerdo con la ley 25.326.
 
    Asimismo, te informamos que la empresa debe dar cumplimiento obligatorio el artículo 328 del Código Civil y Comercial de la Nación que obliga al guardado de información relativa a operaciones financieras.
    
    Saludos,
    Tu Empresa`;
    const html= `<div style="border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto;">
    <p><strong>¡Hola, ${username}!</strong></p>
    <p>Tu cuenta ha sido cerrada correctamente.</p>
    <p>Te informamos que hemos dado cumplimiento a tu solicitud de acuerdo con la ley 25.326.</p>
    <p>Asimismo, te informamos que la empresa debe dar cumplimiento obligatorio al artículo 328 del Código Civil y Comercial de la Nación que obliga al guardado de información relativa a operaciones financieras.</p>
    <p>¡Saludos!</p>
    <p>El Equipo de Huellas de Esperanza</p>
</div>`
  this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`);
    await this.sendMail(userEmail, subject, text,html);
}
  async deleteshelterMail(userEmail: string, username: string) {
    const subject = 'Cierre de cuenta en Huellas de Esperanza';
    const text = `Hola ${username},

    Tu cuenta ha sido cerrada correctamente.

    Te informamos que hemos dado cumplimiento a su solicitud de acuerdo con la ley 25.326.

    Asimismo, te informamos que, en cumplimiento del artículo 328 del Código Civil y Comercial de la Nación, los datos relativos a operaciones financieras serán conservados en nuestra base de datos durante un plazo de 30 días. Al término de este período, los datos serán eliminados definitivamente.

    Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.

    Saludos cordiales,
    El equipo de Huellas de Esperanza`;

    const html = `
    <div style="border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto;">
        <p><strong>¡Hola, ${username}!</strong></p>
        <p>Tu cuenta ha sido cerrada correctamente.</p>
        <p>Te informamos que hemos dado cumplimiento a tu solicitud de acuerdo con la ley 25.326.</p>
        <p>Asimismo, te informamos que la empresa debe dar cumplimiento obligatorio al artículo 328 del Código Civil y Comercial de la Nación que obliga al guardado de información relativa a operaciones financieras.</p>
        <p>¡Saludos!</p>
        <p>El Equipo de Huellas de Esperanza</p>
    </div>`;
    this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`);
    await this.sendMail(userEmail, subject, text, html);
}
  async sendShelterActivationMail(shelterEmail: string, shelterName: string) {
    const subject = 'Bienvenido a Huellas de Esperanza';
    const text = `¡Hola, ${shelterName}!

    Tu cuenta ha sido activada correctamente.
    
    Nos alegra darte la bienvenida a Huellas de Esperanza. Ahora puedes acceder a tu cuenta y disfrutar de nuestros servicios.
    
    Para iniciar sesión, haz clic en el siguiente enlace: <span id="enlace">http://example.com/login</span>
    
    Además, te proporcionaremos un instructivo detallado sobre cómo registrar a las mascotas que se encuentran disponibles para la adopción.
    
    ¡Saludos!
    El equipo de Huellas de Esperanza`;

    const html = `<div style="position: relative; border: 2px solid #ff3366; padding: 20px;background: white; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; max-width: 600px; margin: 0 auto;">
    <p>¡Hola, <strong>${shelterName}</strong>!</p>
    <p>Tu cuenta ha sido activada correctamente.</p>
    <p>Nos alegra darte la bienvenida a Huellas de Esperanza. Ahora puedes acceder a tu cuenta y disfrutar de nuestros servicios.</p>
    <p>Para iniciar sesión, haz clic en el siguiente enlace:</p>
    <p><a href="http://example.com/login" style="display: inline-block; padding: 8px 15px; margin-top: 10px; color: white; background: linear-gradient(to bottom, #ff0066, #ffffff); text-decoration: none; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 1px solid #ff3366; border-bottom: 4px solid #ff3366;">Iniciar Sesión</a></p>
    <p>Además, te proporcionaremos un instructivo detallado sobre cómo registrar a las mascotas que se encuentran disponibles para la adopción.</p>
    <p>¡Saludos!</p>
    <p>El equipo de Huellas de Esperanza</p>
</div>
`;

    this.logger.log(`Enviando correo a ${shelterEmail} con asunto "${subject}" y texto "${text}"`);
    await this.sendMail(shelterEmail, subject, text, html);
}
async sendPostulacion(sheltername: string, pet: string, username: string, userEmail: string) {
  const subject = 'Confirmación de Postulación de Adopción';
  const text = `Hola ${username},

  Nos alegra informarte que hemos registrado tu postulación para la adopción de ${pet} del refugio ${sheltername}.
  En un lapso de 72 horas, recibirás una respuesta por correo electrónico confirmando si tu solicitud ha sido aceptada o no.

  Saludos cordiales,
  El Equipo de Huellas de Esperanza`;
  
  const html = ` <div style="position: relative; border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; max-width: 600px; margin: 0 auto;">
      <p>¡Hola, <strong>${username}</strong>!</p>
      <p>Tu solicitud ha sido recibida correctamente.</p>
      <p>Nos alegra informarte que hemos registrado tu postulación para la adopción de <strong>${pet}</strong> del refugio <strong>${sheltername}</strong>.</p>
      <p>En un lapso de 72 horas, recibirás una respuesta por correo electrónico confirmando si tu solicitud ha sido aceptada o no.</p>
      <p>Mientras tanto, si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte en todo lo que necesites.</p>
      <p>¡Saludos cordiales!</p>
      <p>El Equipo de Huellas de Esperanza</p>
  </div>`;
  
  this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`);
  await this.sendMail(userEmail, subject, text, html);
}
async confirmPostulacion(userEmail: string, nombreDelPerro: string, nombreDelUsuario: string) {
  const subject = '¡Confirmación de Adopción!';
  const text = `¡Hola ${nombreDelUsuario}!\n\n¡Estamos llenos de alegría al anunciarte que tu solicitud de adopción para ${nombreDelPerro} ha sido aceptada! Es un momento emocionante para ti y para ${nombreDelPerro}, el comienzo de una nueva y hermosa aventura juntos! No dudes en contactarnos si necesitas cualquier cosa en este nuevo viaje. ¡Felicidades una vez más por esta maravillosa adopción!\n\nCon cariño, El Equipo de Huellas de Esperanza`;

  const html = `<div style="position: relative; border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; max-width: 600px; margin: 0 auto;">
      <p>¡Hola, <strong>${nombreDelUsuario}</strong>!</p>
      <p>¡Estamos llenos de alegría al anunciarte que tu solicitud de adopción para <strong>${nombreDelPerro}</strong> ha sido aceptada!</p>
      <p>Es un momento emocionante para ti y para <strong>${nombreDelPerro}</strong>, el comienzo de una nueva y hermosa aventura juntos! No dudes en contactarnos si necesitas cualquier cosa en este nuevo viaje.</p>
      <p>¡Felicidades una vez más por esta maravillosa adopción!</p>
      <p>Con cariño,</p>
      <p>El Equipo de Huellas de Esperanza</p>
  </div>`;

  this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`);
  await this.sendMail(userEmail, subject, text, html);
}


 async sendVolunteerMail(userEmail: string, shelterName: string) {
    const subject = 'Gracias por ser voluntario';
    const text = `Gracias por elegir ser voluntario. Se le informará al refugio ${shelterName} que usted es voluntario. El refugio se comunicará con usted, vía email.`;
    await this.sendMail(userEmail, subject, text);
  }

  

}
