import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { StubTeamService } from './team.service.stub';

describe('TeamController', () => {
  let controller: TeamController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [{ provide: 'services.teams', useClass: StubTeamService }],
    }).compile();

    controller = app.get<TeamController>(TeamController);
  });

  describe('teams', () => {
    it('should return teams', () => {
      expect(controller.list()).resolves.toEqual([]);
    });
  });
});
