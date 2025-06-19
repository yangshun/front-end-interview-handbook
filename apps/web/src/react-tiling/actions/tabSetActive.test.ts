import { describe, expect, test } from '@jest/globals';

import tabSetActive from './tabSetActive';

describe('tabSetActive', () => {
  test('first level tabs', () => {
    expect(
      tabSetActive(
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
          tabId: '2',
        },
      ),
    ).toMatchInlineSnapshot(`
      {
        "activeTabId": "2",
        "collapsed": false,
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
            direction: 'horizontal',
            id: 'foo',
            items: [
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
                    id: 'barz',
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
            ],

            type: 'group',
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
                  "collapsed": false,
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
            direction: 'horizontal',
            id: 'foo',
            items: [
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
                    id: 'barz',
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
            ],

            type: 'group',
          },
          {
            panelId: 'barz',
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
            direction: 'horizontal',
            id: 'foo',
            items: [
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
                    id: 'barz',
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
            ],

            type: 'group',
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
