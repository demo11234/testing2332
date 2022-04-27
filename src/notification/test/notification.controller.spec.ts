import { Test } from '@nestjs/testing';
import { NotificationController } from '../notification.controller';
import { NotificationService } from '../notification.service';
import { notificationStub, userStub } from './stub/notification.stub';

jest.mock('../notification.service');

describe('AdminController', () => {
  let notificationController: NotificationController
  let notificationService: NotificationService
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [NotificationController],
      providers: [NotificationService],
    }).compile();
    notificationController = moduleRef.get<NotificationController>(NotificationController);

    notificationService = moduleRef.get<NotificationService>(NotificationService);

    jest.clearAllMocks();
  });

    describe('update', () => {
        describe('when update is called', () => {
          let result;
          beforeEach(async () => {
            result = await notificationController.update(userStub(), notificationStub());
          });
          test('it should call notificationService', () => {
            expect(notificationService.updateNotification).toBeCalledWith(userStub(), notificationStub());
          });
          test('then it should return an object', () => {
            expect(result).toEqual({success: true});
          });
        });
    });

    describe('getNotification', () => {
        describe('when getNotification is called', () => {
          let result;
          beforeEach(async () => {
            result = await notificationController.getNotification(userStub());
          });
          test('it should call notificationService', () => {
            expect(notificationService.getNotification).toBeCalledWith(userStub());
          });
          test('then it should return an object', () => {
            expect(result).toEqual({success: true});
          });
        });
    });
})