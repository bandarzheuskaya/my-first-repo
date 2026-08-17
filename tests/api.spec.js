import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Тестирование API Restful-booker", { tag: "@api" }, () => {
  const baseURL = "https://restful-booker.herokuapp.com";

  const bookingData = {
    firstname: "Amala",
    lastname: "Ratna",
    totalprice: 546,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-09-01",
      checkout: "2026-09-10",
    },
    additionalneeds: "Breakfast",
  };

  let bookingId;
  let authToken;

  test("Создание бронирования", async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("bookingid");
    expect(body.booking).toEqual(bookingData);

    bookingId = body.bookingid;
  });

  test("Получение информации о бронировании", async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(bookingData);
  });

  test("Обновление бронирования", async ({ request }) => {
    const tokenResponse = await request.post(`${baseURL}/auth`, {
      data: { username: "admin", password: "password123" },
    });
    expect(tokenResponse.status()).toBe(200);
    const token = await tokenResponse.json();
    authToken = token.token;

    const updatedData = {
      ...bookingData,
      firstname: "Giselle",
      lastname: "Carter",
      totalprice: 1789,
    };

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
      data: updatedData,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual(updatedData);
  });

  test("Удаление бронирования", async ({ request }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
    });

    expect(response.status()).toBe(201);

    const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
});
