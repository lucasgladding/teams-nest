import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { StubBaseService } from '../shared/base.service.stub';

describe('TeamController', () => {
  let controller: TeamController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        { provide: 'services.teams', useFactory: () => new StubBaseService() },
      ],
    }).compile();

    controller = app.get<TeamController>(TeamController);
  });

  describe('teams', () => {
    it('should return teams', () => {
      expect(controller.list()).resolves.toEqual([]);
    });

    it('should create a team', () => {
      const data = { name: 'team name ' };
      expect(controller.create(data)).resolves.toEqual([]);
    });
  });
});
