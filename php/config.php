<?php
declare(strict_types=1);

// LmMultichannel SDK configuration

class LmMultichannelConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "LmMultichannel",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.linkmobility.com/v1",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "content" => [],
                    "message" => [],
                    "message_event" => [],
                    "option" => [],
                    "schedule" => [],
                    "self" => [],
                    "self_admin" => [],
                    "template" => [],
                    "traffic" => [],
                    "traffic_file" => [],
                    "variable" => [],
                ],
            ],
            "entity" => [
        'content' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'card',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'carousel',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'content',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'fromTemplate',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'location',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'media',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'suggestions',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'text',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
          ],
          'name' => 'content',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/templates/{templateId}/content',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'content',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.content`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates/{templateId}/content',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'content',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.content`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'template',
              ],
            ],
          ],
        ],
        'message' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'campaignId',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'messages',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'scheduleAt',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'message',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/messages',
                  'parts' => [
                    'messages',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/messages/{messageId}/schedule',
                  'parts' => [
                    'messages',
                    '{id}',
                    'schedule',
                  ],
                  'rename' => [
                    'param' => [
                      'messageId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'schedule',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/messages/{messageId}/schedule',
                  'parts' => [
                    'messages',
                    '{id}',
                    'schedule',
                  ],
                  'rename' => [
                    'param' => [
                      'messageId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'schedule',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'remove',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'message_event' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'accountId',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'eventId',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'messageStatusChanged',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'on',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'templateReviewStatusChanged',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'userMessageReceived',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 5,
            ],
          ],
          'name' => 'message_event',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'page_index',
                        'orig' => 'page_index',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'desc:on',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/messages/{messageId}/events',
                  'parts' => [
                    'messages',
                    '{id}',
                    'events',
                  ],
                  'rename' => [
                    'param' => [
                      'messageId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'page_index',
                      'page_size',
                      'sort',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'option' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'options',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
          ],
          'name' => 'option',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/templates/{templateId}/options',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'options',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates/{templateId}/options',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'options',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/templates/{templateId}/options',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'options',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'update',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'template',
              ],
            ],
          ],
        ],
        'schedule' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'count',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
          ],
          'name' => 'schedule',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => '2026-02-01T10:00,2026-02-16T20:00',
                        'kind' => 'query',
                        'name' => 'between',
                        'orig' => 'between',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'campaign_id',
                        'orig' => 'campaign_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'Europe/Zurich',
                        'kind' => 'query',
                        'name' => 'time_zone',
                        'orig' => 'time_zone',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/schedules:count',
                  'parts' => [
                    'schedules:count',
                  ],
                  'select' => [
                    'exist' => [
                      'between',
                      'campaign_id',
                      'time_zone',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'between',
                        'orig' => 'between',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'campaign_id',
                        'orig' => 'campaign_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'time_zone',
                        'orig' => 'time_zone',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/schedules',
                  'parts' => [
                    'schedules',
                  ],
                  'select' => [
                    'exist' => [
                      'between',
                      'campaign_id',
                      'time_zone',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'remove',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'self' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'accountId',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'settings',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
          ],
          'name' => 'self',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/self',
                  'parts' => [
                    'self',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'self_admin' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'callback',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'settings',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
          ],
          'name' => 'self_admin',
          'op' => [
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/self/settings',
                  'parts' => [
                    'self',
                    'settings',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'update',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'template' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'channelData',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'content',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'createdOn',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'designerUrl',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'details',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'meta',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
                'patch' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
              ],
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'occurredOn',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'options',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'reviews',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'template',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'templateId',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'updatedOn',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'variables',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 13,
            ],
          ],
          'name' => 'template',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/templates/{templateId}/meta',
                  'parts' => [
                    'templates',
                    '{id}',
                    'meta',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'meta',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/templates',
                  'parts' => [
                    'templates',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.template`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'create',
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'page_index',
                        'orig' => 'page_index',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'desc:updatedOn!createdOn',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates',
                  'parts' => [
                    'templates',
                  ],
                  'select' => [
                    'exist' => [
                      'page_index',
                      'page_size',
                      'sort',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'channel_id',
                        'orig' => 'channel_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates/{templateId}/reviews/{channelId}',
                  'parts' => [
                    'templates',
                    '{id}',
                    'reviews',
                    '{channel_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'channelId' => 'channel_id',
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'channel_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates/{templateId}',
                  'parts' => [
                    'templates',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.template`',
                  ],
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates/{templateId}/meta',
                  'parts' => [
                    'templates',
                    '{id}',
                    'meta',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'meta',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 2,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates/{templateId}/reviews',
                  'parts' => [
                    'templates',
                    '{id}',
                    'reviews',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'review',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 3,
                ],
              ],
              'key$' => 'load',
            ],
            'patch' => [
              'input' => 'data',
              'name' => 'patch',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/templates/{templateId}/meta',
                  'parts' => [
                    'templates',
                    '{id}',
                    'meta',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'meta',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'patch',
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'channel_id',
                        'orig' => 'channel_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/templates/{templateId}/reviews/{channelId}',
                  'parts' => [
                    'templates',
                    '{id}',
                    'reviews',
                    '{channel_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'channelId' => 'channel_id',
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'channel_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/templates/{templateId}',
                  'parts' => [
                    'templates',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'remove',
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'channel_id',
                        'orig' => 'channel_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/templates/{templateId}/reviews/{channelId}',
                  'parts' => [
                    'templates',
                    '{id}',
                    'reviews',
                    '{channel_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'channelId' => 'channel_id',
                      'templateId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'channel_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'update',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'review',
              ],
            ],
          ],
        ],
        'traffic' => [
          'fields' => [],
          'name' => 'traffic',
          'op' => [
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'path',
                        'orig' => 'path',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/traffic/files/{path}',
                  'parts' => [
                    'traffic',
                    'files',
                    '{path}',
                  ],
                  'select' => [
                    'exist' => [
                      'path',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'remove',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'file',
              ],
            ],
          ],
        ],
        'traffic_file' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'files',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'path',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'traffic_file',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/traffic/files',
                  'parts' => [
                    'traffic',
                    'files',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'path',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/traffic/files/{path}',
                  'parts' => [
                    'traffic',
                    'files',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'path' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'variable' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'description',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'examples',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'formats',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'ref',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'type',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'variables',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 6,
            ],
          ],
          'name' => 'variable',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/templates/{templateId}/variables',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'variables',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/templates/{templateId}/variables',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'variables',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/templates/{templateId}/variables',
                  'parts' => [
                    'templates',
                    '{template_id}',
                    'variables',
                  ],
                  'rename' => [
                    'param' => [
                      'templateId' => 'template_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'template_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'update',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'template',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return LmMultichannelFeatures::make_feature($name);
    }
}
