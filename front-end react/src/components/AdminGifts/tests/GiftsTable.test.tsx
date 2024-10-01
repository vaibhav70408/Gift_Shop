import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GiftsTable from "../GiftsTable";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";

const mockStore = configureMockStore([]);

describe("GiftsTable", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      gifts: { gifts: [] },
    });
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <GiftsTable />
      </Provider>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders correct number of rows when gifts are present", () => {
    store = mockStore({
      gifts: {
        gifts: [
          {
            giftId: "1",
            giftName: "Test Gift 1",
            giftPrice: 20,
            giftImageUrl: "test1.jpg",
            giftDetails: "Test details for gift 1",
          },
          {
            giftId: "2",
            giftName: "Test Gift 2",
            giftPrice: 30,
            giftImageUrl: "test2.jpg",
            giftDetails: "Test details for gift 2",
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <GiftsTable />
      </Provider>
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe((store.getState() as any).gifts.gifts.length + 1);
  });

  it("does not render edit and delete buttons when no gifts are present", () => {
    render(
      <Provider store={store}>
        <GiftsTable />
      </Provider>
    );

    const editButtons = screen.queryAllByRole("button", { name: "Edit" });
    const deleteButtons = screen.queryAllByRole("button", { name: "Delete" });

    expect(editButtons).toHaveLength(0);
    expect(deleteButtons).toHaveLength(0);
  });

  it("renders edit and delete buttons when gifts are present", () => {
    store = mockStore({
      gifts: {
        gifts: [
          {
            giftId: "1",
            giftName: "Test Gift 1",
            giftPrice: 20,
            giftImageUrl: "test1.jpg",
            giftDetails: "Test details for gift 1",
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <GiftsTable />
      </Provider>
    );

    const editButtons = screen.queryAllByRole("button", { name: "Edit" });
    const deleteButtons = screen.queryAllByRole("button", { name: "Delete" });

    expect(editButtons).toHaveLength(0);
    expect(deleteButtons).toHaveLength(0);
  });
  it("displays correct image and information for each gift", () => {
    const giftsData = [
      {
        giftId: "1",
        giftName: "Test Gift 1",
        giftPrice: 20,
        giftImageUrl: "test1.jpg",
        giftDetails: "Test details for gift 1",
      },
      {
        giftId: "2",
        giftName: "Test Gift 2",
        giftPrice: 30,
        giftImageUrl: "test2.jpg",
        giftDetails: "Test details for gift 2",
      },
    ];

    store = mockStore({
      gifts: { gifts: giftsData },
    });

    render(
      <Provider store={store}>
        <GiftsTable />
      </Provider>
    );

    const images = screen.getAllByAltText(/Test Gift/);
    const names = screen.getAllByText(/Test Gift/);
    const prices = screen.getAllByText(/₹/);
    const descriptions = screen.getAllByText(/Test details for gift/);

    expect(images).toHaveLength(giftsData.length);
    expect(names).toHaveLength(giftsData.length);
    expect(prices).toHaveLength(giftsData.length);
    expect(descriptions).toHaveLength(giftsData.length);
  });
});
