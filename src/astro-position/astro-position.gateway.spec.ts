import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { Socket, io } from "socket.io-client";

import { AstroPositionGateway } from "./astro-position.gateway";


async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  return testingModule.createNestApplication();
}

describe("AstroPositionGateway", () => {
  let gateway: AstroPositionGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeAll(async () => {
    // Instantiate the app
    app = await createNestApp(AstroPositionGateway);
    // Get the gateway instance from the app instance
    gateway = app.get<AstroPositionGateway>(AstroPositionGateway);
    // Create a new client that will interact with the gateway
    ioClient = io("http://localhost:3000", {
      autoConnect: false,
      transports: ["websocket", "polling"],
    });

    app.listen(3000);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it('should emit "pong" on "ping"', async () => {
    ioClient.connect();
    ioClient.emit("ping", "Hello world!");
    await new Promise<void>((resolve) => {
      ioClient.on("connect", () => {
        console.log("connected");
      });
      ioClient.on("pong", (data) => {
        expect(data).toBe("Hello world!");
        resolve();
      });
    });
    ioClient.disconnect();
  });
});
