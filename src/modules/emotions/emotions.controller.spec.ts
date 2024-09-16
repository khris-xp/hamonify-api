import { Test, TestingModule } from '@nestjs/testing';
import { EmotionsController } from './emotions.controller';

describe('EmotionsController', () => {
  let controller: EmotionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionsController],
    }).compile();

    controller = module.get<EmotionsController>(EmotionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
