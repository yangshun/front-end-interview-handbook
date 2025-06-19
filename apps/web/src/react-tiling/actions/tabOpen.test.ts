import { describe, expect, test } from '@jest/globals';

import tabOpen from './tabOpen';

describe('tabOpen', () => {
  describe('root level', () => {
    test('new tab at the end', () => {
      expect(
        tabOpen(
          {
            activeTabId: '1',
            id: 'foo',
            tabs: [
              {
                closeable: true,
                id: '1',
              },
              {
                closeable: true,
                id: '2',
              },
            ],
            type: 'item',
          },
          {
            newTabId: '3',
            panelId: 'foo',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "3",
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
            {
              "closeable": true,
              "id": "3",
            },
          ],
          "type": "item",
        }
      `);
    });

    test('new tab at the start', () => {
      expect(
        tabOpen(
          {
            activeTabId: '1',
            id: 'foo',
            tabs: [
              {
                closeable: true,
                id: '1',
              },
              {
                closeable: true,
                id: '2',
              },
            ],
            type: 'item',
          },
          {
            newTabId: '3',
            panelId: 'foo',
            tabId: '1',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "3",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "3",
            },
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

    test('new tab at the middle', () => {
      expect(
        tabOpen(
          {
            activeTabId: '1',
            id: 'foo',
            tabs: [
              {
                closeable: true,
                id: '1',
              },
              {
                closeable: true,
                id: '2',
              },
            ],
            type: 'item',
          },
          {
            newTabId: '3',
            panelId: 'foo',
            tabId: '2',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "3",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "1",
            },
            {
              "closeable": true,
              "id": "3",
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

    test('new tab at non-existent tab', () => {
      expect(
        tabOpen(
          {
            activeTabId: '1',
            id: 'foo',
            tabs: [
              {
                closeable: true,
                id: '1',
              },
              {
                closeable: true,
                id: '2',
              },
            ],
            type: 'item',
          },
          {
            newTabId: '3',
            panelId: 'foo',
            tabId: '4',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "3",
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
            {
              "closeable": true,
              "id": "3",
            },
          ],
          "type": "item",
        }
      `);
    });
  });

  describe('deep level tab', () => {
    test('new tab at the end', () => {
      expect(
        tabOpen(
          {
            direction: 'horizontal',
            id: 'bar',
            items: [
              {
                activeTabId: '1',
                id: 'foo',
                tabs: [
                  {
                    closeable: true,
                    id: '1',
                  },
                  {
                    closeable: true,
                    id: '2',
                  },
                ],

                type: 'item',
              },
              {
                activeTabId: '5',
                id: 'baz',
                tabs: [
                  {
                    closeable: true,
                    id: '5',
                  },
                  {
                    closeable: true,
                    id: '6',
                  },
                ],

                type: 'item',
              },
            ],

            type: 'group',
          },
          {
            newTabId: '3',
            panelId: 'foo',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "3",
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
                {
                  "closeable": true,
                  "id": "3",
                },
              ],
              "type": "item",
            },
            {
              "activeTabId": "5",
              "fullScreen": false,
              "id": "baz",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
                {
                  "closeable": true,
                  "id": "6",
                },
              ],
              "type": "item",
            },
          ],
          "type": "group",
        }
      `);
    });

    test('new tab at the start', () => {
      expect(
        tabOpen(
          {
            direction: 'horizontal',
            id: 'bar',
            items: [
              {
                activeTabId: '1',
                id: 'foo',
                tabs: [
                  {
                    closeable: true,
                    id: '1',
                  },
                  {
                    closeable: true,
                    id: '2',
                  },
                ],

                type: 'item',
              },
              {
                activeTabId: '5',
                id: 'baz',
                tabs: [
                  {
                    closeable: true,
                    id: '5',
                  },
                  {
                    closeable: true,
                    id: '6',
                  },
                ],

                type: 'item',
              },
            ],

            type: 'group',
          },
          {
            newTabId: '3',
            panelId: 'foo',
            tabId: '1',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "3",
              "id": "foo",
              "tabs": [
                {
                  "closeable": true,
                  "id": "3",
                },
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
              "activeTabId": "5",
              "fullScreen": false,
              "id": "baz",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
                {
                  "closeable": true,
                  "id": "6",
                },
              ],
              "type": "item",
            },
          ],
          "type": "group",
        }
      `);
    });

    test('new tab at the middle', () => {
      expect(
        tabOpen(
          {
            direction: 'horizontal',
            id: 'bar',
            items: [
              {
                activeTabId: '1',
                id: 'foo',
                tabs: [
                  {
                    closeable: true,
                    id: '1',
                  },
                  {
                    closeable: true,
                    id: '2',
                  },
                ],

                type: 'item',
              },
              {
                activeTabId: '5',
                id: 'baz',
                tabs: [
                  {
                    closeable: true,
                    id: '5',
                  },
                  {
                    closeable: true,
                    id: '6',
                  },
                ],

                type: 'item',
              },
            ],

            type: 'group',
          },
          {
            newTabId: '3',
            panelId: 'foo',
            tabId: '2',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "3",
              "id": "foo",
              "tabs": [
                {
                  "closeable": true,
                  "id": "1",
                },
                {
                  "closeable": true,
                  "id": "3",
                },
                {
                  "closeable": true,
                  "id": "2",
                },
              ],
              "type": "item",
            },
            {
              "activeTabId": "5",
              "fullScreen": false,
              "id": "baz",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
                {
                  "closeable": true,
                  "id": "6",
                },
              ],
              "type": "item",
            },
          ],
          "type": "group",
        }
      `);
    });

    test('new tab at non-existent tab', () => {
      expect(
        tabOpen(
          {
            direction: 'horizontal',
            id: 'bar',
            items: [
              {
                activeTabId: '1',
                id: 'foo',
                tabs: [
                  {
                    closeable: true,
                    id: '1',
                  },
                  {
                    closeable: true,
                    id: '2',
                  },
                ],

                type: 'item',
              },
              {
                activeTabId: '5',
                id: 'baz',
                tabs: [
                  {
                    closeable: true,
                    id: '5',
                  },
                  {
                    closeable: true,
                    id: '6',
                  },
                ],

                type: 'item',
              },
            ],

            type: 'group',
          },
          {
            newTabId: '3',
            panelId: 'foo',
            tabId: '6',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "3",
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
                {
                  "closeable": true,
                  "id": "3",
                },
              ],
              "type": "item",
            },
            {
              "activeTabId": "5",
              "fullScreen": false,
              "id": "baz",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
                {
                  "closeable": true,
                  "id": "6",
                },
              ],
              "type": "item",
            },
          ],
          "type": "group",
        }
      `);
    });
  });
});
