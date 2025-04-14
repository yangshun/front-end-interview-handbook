import prune from './prune';

import { describe, expect, test } from '@jest/globals';

describe('prune', () => {
  describe('item', () => {
    test('empty tabs', () => {
      expect(
        prune({
          activeTabId: 'tab-1',
          id: 'foo',
          tabs: [],
          type: 'item',
        }),
      ).toEqual(null);
    });

    test('non-empty tabs', () => {
      expect(
        prune({
          activeTabId: 'tab-1',
          id: 'foo',
          tabs: [{ closeable: true, id: 'tab-1' }],
          type: 'item',
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
          direction: 'horizontal',
          id: 'foo',
          items: [],
          type: 'group',
        }),
      ).toEqual(null);
    });

    describe('nested empty group', () => {
      test('remove nested group', () => {
        expect(
          prune({
            direction: 'horizontal',
            id: 'foo',
            items: [
              {
                direction: 'horizontal',
                id: 'bar',
                items: [
                  {
                    direction: 'horizontal',
                    id: 'baz',
                    items: [],
                    type: 'group',
                  },
                  {
                    activeTabId: 'tab-1',
                    id: 'fooz',
                    tabs: [{ closeable: true, id: 'tab-1' }],
                    type: 'item',
                  },
                ],

                type: 'group',
              },
              {
                activeTabId: 'tab-1',
                id: 'foozx',
                tabs: [{ closeable: true, id: 'tab-1' }],
                type: 'item',
              },
            ],

            type: 'group',
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
            direction: 'horizontal',
            id: 'foo',
            items: [
              {
                direction: 'horizontal',
                id: 'bar',
                items: [
                  {
                    direction: 'horizontal',
                    id: 'baz',
                    items: [],
                    type: 'group',
                  },
                ],
                type: 'group',
              },
            ],
            type: 'group',
          }),
        ).toEqual(null);
      });

      test('remove multiple empty items', () => {
        expect(
          prune({
            direction: 'horizontal',
            id: 'foo',
            items: [
              {
                direction: 'horizontal',
                id: 'bar',
                items: [],
                type: 'group',
              },
              {
                direction: 'horizontal',
                id: 'bar',
                items: [],
                type: 'group',
              },
            ],
            type: 'group',
          }),
        ).toEqual(null);
      });
    });
  });

  describe('flatten', () => {
    test('single level', () => {
      expect(
        prune({
          direction: 'horizontal',
          id: 'foo',
          items: [
            {
              activeTabId: 'tab-1',
              id: 'qux',
              tabs: [{ closeable: true, id: 'tab-1' }],
              type: 'item',
            },
          ],

          type: 'group',
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
            direction: 'horizontal',
            id: 'a',
            items: [
              {
                activeTabId: 'tab-1',
                id: 'b',
                tabs: [{ closeable: true, id: 'tab-1' }],
                type: 'item',
              },
              {
                direction: 'horizontal',
                id: 'c',
                items: [
                  {
                    activeTabId: 'tab-2',
                    id: 'd',
                    tabs: [{ closeable: true, id: 'tab-2' }],
                    type: 'item',
                  },
                  {
                    activeTabId: 'tab-3',
                    id: 'e',
                    tabs: [{ closeable: true, id: 'tab-3' }],
                    type: 'item',
                  },
                ],
                type: 'group',
              },
            ],
            type: 'group',
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
            direction: 'horizontal',
            id: 'a',
            items: [
              {
                direction: 'horizontal',
                id: 'b',
                items: [
                  {
                    activeTabId: 'tab-1',
                    id: 'c',
                    tabs: [{ closeable: true, id: 'tab-1' }],
                    type: 'item',
                  },
                  {
                    activeTabId: 'tab-2',
                    id: 'd',
                    tabs: [{ closeable: true, id: 'tab-2' }],
                    type: 'item',
                  },
                ],
                type: 'group',
              },
              {
                direction: 'horizontal',
                id: 'e',
                items: [
                  {
                    activeTabId: 'tab-3',
                    id: 'f',
                    tabs: [{ closeable: true, id: 'tab-3' }],
                    type: 'item',
                  },
                  {
                    activeTabId: 'tab-4',
                    id: 'g',
                    tabs: [{ closeable: true, id: 'tab-4' }],
                    type: 'item',
                  },
                ],
                type: 'group',
              },
            ],
            type: 'group',
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
          direction: 'horizontal',
          id: 'foo',
          items: [
            {
              direction: 'horizontal',
              id: 'fooz',
              items: [
                {
                  activeTabId: 'tab-1',
                  id: 'qux',
                  tabs: [{ closeable: true, id: 'tab-1' }],
                  type: 'item',
                },
              ],

              type: 'group',
            },
          ],

          type: 'group',
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
        direction: 'horizontal',
        id: 'foo',
        items: [
          {
            activeTabId: 'tab-1',
            id: 'qux',
            tabs: [{ closeable: true, id: 'tab-1' }],
            type: 'item',
          },
          {
            activeTabId: 'tab-1',
            id: 'quxz',
            tabs: [{ closeable: true, id: 'tab-1' }],
            type: 'item',
          },
        ],
        type: 'group',
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
