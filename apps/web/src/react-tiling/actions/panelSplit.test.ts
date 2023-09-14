import { describe, expect, test } from '@jest/globals';
import panelSplit from './panelSplit';

describe('panelSplit', () => {
  describe('same direction as parent', () => {
    test('new panel after', () => {
      const newPanels = panelSplit(
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
        {
          direction: 'horizontal',
          panelId: 'foo',
          newPanelOrder: 'after',
          newTabId: '5',
        },
      );

      expect(newPanels).toMatchInlineSnapshot(`
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
              "activeTabId": "5",
              "id": "0",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
              ],
              "type": "item",
            },
            {
              "activeTabId": "3",
              "id": "baz",
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
        }
      `);
    });

    test('new panel before', () => {
      const newPanels = panelSplit(
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
        {
          direction: 'horizontal',
          panelId: 'foo',
          newPanelOrder: 'before',
          newTabId: '5',
        },
      );

      expect(newPanels).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "5",
              "id": "1",
              "tabs": [
                {
                  "closeable": true,
                  "id": "5",
                },
              ],
              "type": "item",
            },
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
              "id": "baz",
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
        }
      `);
    });
  });

  describe('different direction as parent', () => {
    test('new panel after', () => {
      const newPanels = panelSplit(
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
        {
          direction: 'vertical',
          panelId: 'foo',
          newPanelOrder: 'after',
          newTabId: '5',
        },
      );

      expect(newPanels).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "direction": "vertical",
              "id": "foo",
              "items": [
                {
                  "activeTabId": "1",
                  "id": "2",
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
                  "activeTabId": "5",
                  "id": "3",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "5",
                    },
                  ],
                  "type": "item",
                },
              ],
              "type": "group",
            },
            {
              "activeTabId": "3",
              "id": "baz",
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
        }
      `);
    });

    test('new panel before', () => {
      const newPanels = panelSplit(
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
        {
          direction: 'vertical',
          panelId: 'foo',
          newPanelOrder: 'before',
          newTabId: '5',
        },
      );

      expect(newPanels).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "direction": "vertical",
              "id": "foo",
              "items": [
                {
                  "activeTabId": "5",
                  "id": "5",
                  "tabs": [
                    {
                      "closeable": true,
                      "id": "5",
                    },
                  ],
                  "type": "item",
                },
                {
                  "activeTabId": "1",
                  "id": "4",
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
              ],
              "type": "group",
            },
            {
              "activeTabId": "3",
              "id": "baz",
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
        }
      `);
    });
  });

  test('non-existing panel', () => {
    const newPanels = panelSplit(
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
      {
        direction: 'horizontal',
        panelId: 'xxx',
        newPanelOrder: 'before',
        newTabId: '5',
      },
    );

    expect(newPanels).toMatchInlineSnapshot(`
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
            "id": "baz",
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
      }
    `);
  });
});
