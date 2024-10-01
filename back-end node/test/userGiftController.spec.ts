import { Request, Response } from 'express';
import selectGift from '../src/controller/userGiftsController';
import { selectedGift } from '../src/services/userGiftsService';

jest.mock('../src/services/userGiftsService', () => ({
  selectedGifts: jest.fn(),
}));

describe('selectGift Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: { gift: 'test gift' } };
    res = { sendStatus: jest.fn(), json: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call selectedGifts function with session and data', () => {
    const session: any = { cart: { items: [] } };
    req.session = session;

    selectGift(req as Request, res as Response);

    expect(selectedGift).toHaveBeenCalledWith(session, req.body);
  });

  it('should send status 201 and success message on successful selection', () => {
    const session: any = { cart: { items: [] } };
    req.session = session;

    selectGift(req as Request, res as Response);

    expect(res.sendStatus).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: 'Gift Selected !' }); 
  });
});