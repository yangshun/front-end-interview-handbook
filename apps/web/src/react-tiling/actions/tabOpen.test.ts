import { describe, expect, test } from '@jest/globals';
import tabOpen from './tabOpen';

describe('tabOpen', () => {
  describe('root level', () => {
    test('new tab at the end', () => {
      expect(
        tabOpen(
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
            panelId: 'foo',
            newTabId: '3',
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
            panelId: 'foo',
            tabId: '1',
            newTabId: '3',
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
            panelId: 'foo',
            tabId: '2',
            newTabId: '3',
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
            panelId: 'foo',
            tabId: '4',
            newTabId: '3',
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
                id: 'baz',
                type: 'item',
                activeTabId: '5',
                tabs: [
                  {
                    id: '5',
                    closeable: true,
                  },
                  {
                    id: '6',
                    closeable: true,
                  },
                ],
              },
            ],
          },
          {
            panelId: 'foo',
            newTabId: '3',
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
                id: 'baz',
                type: 'item',
                activeTabId: '5',
                tabs: [
                  {
                    id: '5',
                    closeable: true,
                  },
                  {
                    id: '6',
                    closeable: true,
                  },
                ],
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '1',
            newTabId: '3',
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
                id: 'baz',
                type: 'item',
                activeTabId: '5',
                tabs: [
                  {
                    id: '5',
                    closeable: true,
                  },
                  {
                    id: '6',
                    closeable: true,
                  },
                ],
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '2',
            newTabId: '3',
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
                id: 'baz',
                type: 'item',
                activeTabId: '5',
                tabs: [
                  {
                    id: '5',
                    closeable: true,
                  },
                  {
                    id: '6',
                    closeable: true,
                  },
                ],
              },
            ],
          },
          {
            panelId: 'foo',
            tabId: '6',
            newTabId: '3',
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
