import { describe, expect, test } from '@jest/globals';
import tabSetActive from './tabSetActive';

describe('tabSetActive', () => {
  test('first level tabs', () => {
    expect(
      tabSetActive(
        {
          id: 'foo',
          type: 'item',
          activeTabId: '1',
          tabs: [
            {
              id: '1',
              closeable: true,
            },
            {
              id: '2',
              closeable: true,
            },
          ],
        },
        {
          tabId: '2',
        },
      ),
    ).toMatchInlineSnapshot(`
      {
        "activeTabId": "2",
        "id": "foo",
        "tabs": [
          {
            "closeable": true,
            "id": "1",
          },
          {
            "closeable": true,
            "id": "2",
          },
        ],
        "type": "item",
      }
    `);
  });

  describe('deep level tabs', () => {
    test('non-specified panels', () => {
      expect(
        tabSetActive(
          {
            id: 'foo',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'bar',
                type: 'group',
                direction: 'horizontal',
                items: [
                  {
                    id: 'foo',
                    type: 'item',
                    activeTabId: '1',
                    tabs: [
                      {
                        id: '1',
                        closeable: true,
                      },
                      {
                        id: '2',
                        closeable: true,
                      },
                    ],
                  },
                  {
                    id: 'barz',
                    type: 'item',
                    activeTabId: '3',
                    tabs: [
                      {
                        id: '3',
                        closeable: true,
                      },
                      {
                        id: '4',
                        closeable: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tabId: '2',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "foo",
          "items": [
            {
              "direction": "horizontal",
              "id": "bar",
              "items": [
                {
                  "activeTabId": "2",
                  "id": "foo",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "1",
                    },
                    {
                      "closeable": true,
                      "id": "2",
                    },
                  ],
                  "type": "item",
                },
                {
                  "activeTabId": "3",
                  "id": "barz",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "3",
                    },
                    {
                      "closeable": true,
                      "id": "4",
                    },
                  ],
                  "type": "item",
                },
              ],
              "type": "group",
            },
          ],
          "type": "group",
        }
      `);
    });

    test('specified panels', () => {
      expect(
        tabSetActive(
          {
            id: 'foo',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'bar',
                type: 'group',
                direction: 'horizontal',
                items: [
                  {
                    id: 'foo',
                    type: 'item',
                    activeTabId: '1',
                    tabs: [
                      {
                        id: '1',
                        closeable: true,
                      },
                      {
                        id: '2',
                        closeable: true,
                      },
                    ],
                  },
                  {
                    id: 'barz',
                    type: 'item',
                    activeTabId: '3',
                    tabs: [
                      {
                        id: '3',
                        closeable: true,
                      },
                      {
                        id: '4',
                        closeable: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tabId: '2',
            panelId: 'barz',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "foo",
          "items": [
            {
              "direction": "horizontal",
              "id": "bar",
              "items": [
                {
                  "activeTabId": "1",
                  "id": "foo",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "1",
                    },
                    {
                      "closeable": true,
                      "id": "2",
                    },
                  ],
                  "type": "item",
                },
                {
                  "activeTabId": "3",
                  "id": "barz",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "3",
                    },
                    {
                      "closeable": true,
                      "id": "4",
                    },
                  ],
                  "type": "item",
                },
              ],
              "type": "group",
            },
          ],
          "type": "group",
        }
      `);
    });
  });

  describe('non-existing ids', () => {
    test('no such tab', () => {
      expect(
        tabSetActive(
          {
            id: 'foo',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'bar',
                type: 'group',
                direction: 'horizontal',
                items: [
                  {
                    id: 'foo',
                    type: 'item',
                    activeTabId: '1',
                    tabs: [
                      {
                        id: '1',
                        closeable: true,
                      },
                      {
                        id: '2',
                        closeable: true,
                      },
                    ],
                  },
                  {
                    id: 'barz',
                    type: 'item',
                    activeTabId: '3',
                    tabs: [
                      {
                        id: '3',
                        closeable: true,
                      },
                      {
                        id: '4',
                        closeable: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tabId: '5',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "foo",
          "items": [
            {
              "direction": "horizontal",
              "id": "bar",
              "items": [
                {
                  "activeTabId": "1",
                  "id": "foo",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "1",
                    },
                    {
                      "closeable": true,
                      "id": "2",
                    },
                  ],
                  "type": "item",
                },
                {
                  "activeTabId": "3",
                  "id": "barz",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "3",
                    },
                    {
                      "closeable": true,
                      "id": "4",
                    },
                  ],
                  "type": "item",
                },
              ],
              "type": "group",
            },
          ],
          "type": "group",
        }
      `);
    });
  });
});
