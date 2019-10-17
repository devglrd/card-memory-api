import { Get, Controller, UseGuards, Res, Post, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  root(@Res() res: Response): Response {
    return res.send({
      message: ' Welcome to Nest api',
    });
  }

  @Post('/pseudo')
  async setPseudo(@Res() res: Response, @Req() body: { body: { pseudo } }) {
    const user = await this.appService.setPseudo(body.body.pseudo);
    return res.send({
      user,
    });
  }

  @Post('/pseudo/update/:token')
  async updateScore(@Param() params, @Res() res: Response, @Req() body: { body: { round } }) {
    const user = await this.appService.update(params.token, body.body.round);
    return res.send({
      user,
    });
  }

  @Get('/pseudo')
  async all(@Res() res: Response) {
    const all = await this.appService.getAll();
    return res.send({
      users: all,
    });
  }
}
