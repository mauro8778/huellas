import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleService } from './google.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('google')
@Controller()
export class GoogleController {

  private readonly FRONT_URL = process.env.FRONT_URL
  
  constructor(private readonly googleService: GoogleService) {}

  @Get('google')
  async googleAuth(@Res() res: Response): Promise<void> {
    const url = this.googleService.getGoogleAuthURL();
    res.redirect(url);
  }

  @Get('google/callback')
  async googleAuthCallback(@Query('code') code: string, @Res() res: Response): Promise<void> {
    try {
      const tokens = await this.googleService.handleGoogleCallback(code);
      /* const redirectUrl = `${this.FRONT_URL}?tokens=${encodeURIComponent(JSON.stringify(tokens))}`; */
      const redirectUrl = `${this.FRONT_URL}`;
      res.redirect(redirectUrl);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
