import request from 'supertest';
import app from '../src/index';

describe('Theme API Router', () => {
  const adminEndpoint = '/admin';
  const themeId = 1;
  const mockThemes = {
    themeId: 101,
    themeName: 'Wooden Frame',
    themeDetails: 'Decorate with pictures you love.',
    themePrice: 10,
  };

  describe('Fetching all themes', () => {
    it('GET /admin/themes should return all themes', async () => {
      const response = await request(app).get(`${adminEndpoint}/themes`);
      expect(response.status).toBe(200);
    });
  });

  describe('Creating theme ', () => {
    it('POST /admin/addTheme should return 400 with mock data', async () => {
      const response = await request(app).post(`${adminEndpoint}/addTheme`).send(mockThemes);
      expect(response.status).toBe(400);
    });
  });

  describe('Fetching theme with specific theme id', () => {
    it('GET /admin/getTheme/:themeid should return 500', async () => {
      const response = await request(app).get(`${adminEndpoint}/getTheme/${themeId}`);
      expect(response.status).toBe(500);
    });
  });

  describe('Updating theme with specific theme id', () => {
    it('PUT /admin/editTheme/:themeid should return 400 with mock data', async () => {
      const response = await request(app).put(`${adminEndpoint}/editTheme/${themeId}`).send(mockThemes);
      expect(response.status).toBe(400);
    });
  });

  describe('Deleting Theme with specific theme id', () => {
    it('DELETE /admin/deleteTheme/:themeid should return 500', async () => {
      const response = await request(app).delete(`${adminEndpoint}/deleteTheme/${themeId}`);
      expect(response.status).toBe(500);
    });
  });
});
