import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

// todo: setup test double for the service

describe('TeamController', () => {
  let controller: TeamController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamService],
    }).compile();

    controller = app.get<TeamController>(TeamController);
  });

  describe('teams', () => {
    it('should return teams', () => {
      expect(controller.list()).toEqual([]);
    });
  });
});
