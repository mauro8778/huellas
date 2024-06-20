import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { Auth0Guard } from 'src/guards/auth0.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entidades/users.entity';

@Controller()
export class GoogleController {
  private readonly FRONT_URL = process.env.FRONT_URL;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'), Auth0Guard)
  async googleLoginRedirect(@Req() req, @Res() res): Promise<any> {
    const accessToken = req.auth0Token;

    const { user } = <any>req;

    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!existingUser) {
      try {
        let userID: string;

        const newUser1 = new UserEntity();
        newUser1.name = user.firstName;
        newUser1.last_name = user.lastName;
        newUser1.email = user.email;
        newUser1.imgUrl = user.picture;

        const newUser = this.userRepository.create(newUser1);

        userID = newUser.id;

        await this.userRepository.save(newUser);

        const newMetadata = { ...newUser, userID };

        await axios.post(
          `${process.env.AUTH0_MGMT_API_URL}users`,
          {
            email: user.email,
            password: user.email,
            connection: 'Username-Password-Authentication',
            user_metadata: newMetadata,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      } catch (error) {
        throw new BadRequestException('Error creating user');
      }
      try {
        const response = await axios.post(
          `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
          {
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_MGMT_API_AUDIENCE,
            grant_type: 'password',
            username: user.email,
            password: user.email,
            scope: 'openid profile email',
          },
        );

        const { access_token, id_token } = response.data;

        const redirectUrl = `http://localhost:3001/AUTH/callback?access_token=${access_token}&id_token=${id_token}`;
        return res.redirect(redirectUrl);
      } catch (error) {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      try {
        const response = await axios.post(
          `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
          {
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_MGMT_API_AUDIENCE,
            grant_type: 'password',
            username: user.email,
            password: user.email,
            scope: 'openid profile email',
          },
        );

        const { access_token, id_token } = response.data;

        const redirectUrl = `http://localhost:3001/AUTH/callback?access_token=${access_token}&id_token=${id_token}`;
        return res.redirect(redirectUrl);
      } catch (error) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }
}
