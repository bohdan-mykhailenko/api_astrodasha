import { AstroPositionGateway } from "./astro-position.gateway";
import { Module } from "@nestjs/common";

@Module({
  providers: [AstroPositionGateway],
})
export class AstroPositionModule {}
