import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AstroPositionModule } from "./astro-position/astro-position.module";

@Module({
  imports: [AstroPositionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
