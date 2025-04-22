import { describe, expect, test } from 'vitest';

import panelSplit from './panelSplit';

describe('panelSplit', () => {
  describe('same direction as parent', () => {
    test('new panel after', () => {
      const newPanels = panelSplit(
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
              activeTabId: '3',
              id: 'baz',
              tabs: [
                {
                  closeable: true,
                  id: '3',
                },
                {
                  closeable: true,
                  id: '4',
                },
              ],
              type: 'item',
            },
          ],
          type: 'group',
        },
        {
          direction: 'horizontal',
          newPanelOrder: 'after',
          newTabId: '5',
          panelId: 'foo',
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
              "collapsible": true,
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
              activeTabId: '3',
              id: 'baz',
              tabs: [
                {
                  closeable: true,
                  id: '3',
                },
                {
                  closeable: true,
                  id: '4',
                },
              ],
              type: 'item',
            },
          ],
          type: 'group',
        },
        {
          direction: 'horizontal',
          newPanelOrder: 'before',
          newTabId: '5',
          panelId: 'foo',
        },
      );

      expect(newPanels).toMatchInlineSnapshot(`
        {
          "direction": "horizontal",
          "id": "bar",
          "items": [
            {
              "activeTabId": "5",
              "collapsible": true,
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
              activeTabId: '3',
              id: 'baz',
              tabs: [
                {
                  closeable: true,
                  id: '3',
                },
                {
                  closeable: true,
                  id: '4',
                },
              ],
              type: 'item',
            },
          ],
          type: 'group',
        },
        {
          direction: 'vertical',
          newPanelOrder: 'after',
          newTabId: '5',
          panelId: 'foo',
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
                  "fullScreen": false,
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
                  "collapsible": true,
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
              "fullScreen": false,
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
              activeTabId: '3',
              id: 'baz',
              tabs: [
                {
                  closeable: true,
                  id: '3',
                },
                {
                  closeable: true,
                  id: '4',
                },
              ],
              type: 'item',
            },
          ],
          type: 'group',
        },
        {
          direction: 'vertical',
          newPanelOrder: 'before',
          newTabId: '5',
          panelId: 'foo',
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
                  "collapsible": true,
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
                  "fullScreen": false,
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
              "fullScreen": false,
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
            activeTabId: '3',
            id: 'baz',
            tabs: [
              {
                closeable: true,
                id: '3',
              },
              {
                closeable: true,
                id: '4',
              },
            ],
            type: 'item',
          },
        ],
        type: 'group',
      },
      {
        direction: 'horizontal',
        newPanelOrder: 'before',
        newTabId: '5',
        panelId: 'xxx',
      },
    );

    expect(newPanels).toMatchInlineSnapshot(`
      {
        "direction": "horizontal",
        "id": "bar",
        "items": [
          {
            "activeTabId": "1",
            "fullScreen": false,
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
            "fullScreen": false,
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
