import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentController } from './assignment.controller';
import { StubBaseService } from '../shared/base.service.stub';

describe('AssignmentController', () => {
  let controller: AssignmentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentController],
      providers: [
        {
          provide: 'services.assignments',
          useFactory: () => new StubBaseService(),
        },
      ],
    }).compile();

    controller = app.get<AssignmentController>(AssignmentController);
  });

  describe('assignments', () => {
    it('should return assignments', () => {
      expect(controller.list()).resolves.toEqual([]);
    });

    it('should create a assignment', () => {
      const data = {
        developer_id: '1234',
        team_id: '5678',
        starts_on: new Date(),
      };
      expect(controller.create(data)).resolves.toEqual(data);
    });
  });
});
