import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperController } from './developer.controller';
import { StubBaseService } from '../shared/base.service.stub';

describe('DeveloperController', () => {
  let controller: DeveloperController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeveloperController],
      providers: [
        {
          provide: 'services.developers',
          useFactory: () => new StubBaseService(),
        },
      ],
    }).compile();

    controller = app.get<DeveloperController>(DeveloperController);
  });

  describe('developers', () => {
    it('should return developers', () => {
      expect(controller.list()).resolves.toEqual([]);
    });

    it('should create a developer', () => {
      const data = { name: 'developer name' };
      expect(controller.create(data)).resolves.toEqual(data);
    });
  });
});
