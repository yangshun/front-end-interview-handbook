import { describe, expect, test } from '@jest/globals';
import prune from './prune';

describe('prune', () => {
  describe('item', () => {
    test('empty tabs', () => {
      expect(
        prune({
          id: 'foo',
          type: 'item',
          activeTabId: 'tab-1',
          tabs: [],
        }),
      ).toEqual(null);
    });

    test('non-empty tabs', () => {
      expect(
        prune({
          id: 'foo',
          type: 'item',
          activeTabId: 'tab-1',
          tabs: [{ id: 'tab-1', closeable: true }],
        }),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "tab-1",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "tab-1",
            },
          ],
          "type": "item",
        }
      `);
    });
  });

  describe('nested group', () => {
    test('empty', () => {
      expect(
        prune({
          id: 'foo',
          type: 'group',
          direction: 'horizontal',
          items: [],
        }),
      ).toEqual(null);
    });

    describe('nested empty group', () => {
      test('remove nested group', () => {
        expect(
          prune({
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
                    id: 'baz',
                    type: 'group',
                    direction: 'horizontal',
                    items: [],
                  },
                  {
                    id: 'fooz',
                    type: 'item',
                    activeTabId: 'tab-1',
                    tabs: [{ id: 'tab-1', closeable: true }],
                  },
                ],
              },
              {
                id: 'foozx',
                type: 'item',
                activeTabId: 'tab-1',
                tabs: [{ id: 'tab-1', closeable: true }],
              },
            ],
          }),
        ).toMatchInlineSnapshot(`
          {
            "direction": "horizontal",
            "id": "foo",
            "items": [
              {
                "activeTabId": "tab-1",
                "id": "bar",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-1",
                  },
                ],
                "type": "item",
              },
              {
                "activeTabId": "tab-1",
                "id": "foozx",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-1",
                  },
                ],
                "type": "item",
              },
            ],
            "type": "group",
          }
        `);
      });

      test('remove multiple levels', () => {
        expect(
          prune({
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
                    id: 'baz',
                    type: 'group',
                    direction: 'horizontal',
                    items: [],
                  },
                ],
              },
            ],
          }),
        ).toEqual(null);
      });

      test('remove multiple empty items', () => {
        expect(
          prune({
            id: 'foo',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'bar',
                type: 'group',
                direction: 'horizontal',
                items: [],
              },
              {
                id: 'bar',
                type: 'group',
                direction: 'horizontal',
                items: [],
              },
            ],
          }),
        ).toEqual(null);
      });
    });
  });

  describe('flatten', () => {
    test('single level', () => {
      expect(
        prune({
          id: 'foo',
          type: 'group',
          direction: 'horizontal',
          items: [
            {
              id: 'qux',
              type: 'item',
              activeTabId: 'tab-1',
              tabs: [{ id: 'tab-1', closeable: true }],
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "tab-1",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "tab-1",
            },
          ],
          "type": "item",
        }
      `);
    });

    describe('same direction parents', () => {
      test('single same direction child', () => {
        expect(
          prune({
            id: 'a',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'b',
                type: 'item',
                activeTabId: 'tab-1',
                tabs: [{ id: 'tab-1', closeable: true }],
              },
              {
                id: 'c',
                type: 'group',
                direction: 'horizontal',
                items: [
                  {
                    id: 'd',
                    type: 'item',
                    activeTabId: 'tab-2',
                    tabs: [{ id: 'tab-2', closeable: true }],
                  },
                  {
                    id: 'e',
                    type: 'item',
                    activeTabId: 'tab-3',
                    tabs: [{ id: 'tab-3', closeable: true }],
                  },
                ],
              },
            ],
          }),
        ).toMatchInlineSnapshot(`
          {
            "direction": "horizontal",
            "id": "a",
            "items": [
              {
                "activeTabId": "tab-1",
                "id": "b",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-1",
                  },
                ],
                "type": "item",
              },
              {
                "activeTabId": "tab-2",
                "id": "d",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-2",
                  },
                ],
                "type": "item",
              },
              {
                "activeTabId": "tab-3",
                "id": "e",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-3",
                  },
                ],
                "type": "item",
              },
            ],
            "type": "group",
          }
        `);
      });

      test('multiple same direction child', () => {
        expect(
          prune({
            id: 'a',
            type: 'group',
            direction: 'horizontal',
            items: [
              {
                id: 'b',
                type: 'group',
                direction: 'horizontal',
                items: [
                  {
                    id: 'c',
                    type: 'item',
                    activeTabId: 'tab-1',
                    tabs: [{ id: 'tab-1', closeable: true }],
                  },
                  {
                    id: 'd',
                    type: 'item',
                    activeTabId: 'tab-2',
                    tabs: [{ id: 'tab-2', closeable: true }],
                  },
                ],
              },
              {
                id: 'e',
                type: 'group',
                direction: 'horizontal',
                items: [
                  {
                    id: 'f',
                    type: 'item',
                    activeTabId: 'tab-3',
                    tabs: [{ id: 'tab-3', closeable: true }],
                  },
                  {
                    id: 'g',
                    type: 'item',
                    activeTabId: 'tab-4',
                    tabs: [{ id: 'tab-4', closeable: true }],
                  },
                ],
              },
            ],
          }),
        ).toMatchInlineSnapshot(`
          {
            "direction": "horizontal",
            "id": "a",
            "items": [
              {
                "activeTabId": "tab-1",
                "id": "c",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-1",
                  },
                ],
                "type": "item",
              },
              {
                "activeTabId": "tab-2",
                "id": "d",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-2",
                  },
                ],
                "type": "item",
              },
              {
                "activeTabId": "tab-3",
                "id": "f",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-3",
                  },
                ],
                "type": "item",
              },
              {
                "activeTabId": "tab-4",
                "id": "g",
                "tabs": [
                  {
                    "closeable": true,
                    "id": "tab-4",
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

    test('deep', () => {
      expect(
        prune({
          id: 'foo',
          type: 'group',
          direction: 'horizontal',
          items: [
            {
              id: 'fooz',
              type: 'group',
              direction: 'horizontal',
              items: [
                {
                  id: 'qux',
                  type: 'item',
                  activeTabId: 'tab-1',
                  tabs: [{ id: 'tab-1', closeable: true }],
                },
              ],
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        {
          "activeTabId": "tab-1",
          "id": "foo",
          "tabs": [
            {
              "closeable": true,
              "id": "tab-1",
            },
          ],
          "type": "item",
        }
      `);
    });
  });

  test('nothing to remove', () => {
    expect(
      prune({
        id: 'foo',
        type: 'group',
        direction: 'horizontal',
        items: [
          {
            id: 'qux',
            type: 'item',
            activeTabId: 'tab-1',
            tabs: [{ id: 'tab-1', closeable: true }],
          },
          {
            id: 'quxz',
            type: 'item',
            activeTabId: 'tab-1',
            tabs: [{ id: 'tab-1', closeable: true }],
          },
        ],
      }),
    ).toMatchInlineSnapshot(`
      {
        "direction": "horizontal",
        "id": "foo",
        "items": [
          {
            "activeTabId": "tab-1",
            "id": "qux",
            "tabs": [
              {
                "closeable": true,
                "id": "tab-1",
              },
            ],
            "type": "item",
          },
          {
            "activeTabId": "tab-1",
            "id": "quxz",
            "tabs": [
              {
                "closeable": true,
                "id": "tab-1",
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
