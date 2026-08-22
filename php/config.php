<?php
declare(strict_types=1);

// LmMultichannel SDK configuration

class LmMultichannelConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "LmMultichannel",
                "slug" => "lm-multichannel",
                "version" => "0.1.1",
                "target" => "php",
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
              'name' => 'card',
              'short' => 'Rich card containing media, text and/or buttons',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'carousel',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'content',
              'req' => true,
              'short' => 'Message content.',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'fromTemplate',
              'req' => true,
              'short' => 'Content generated from a pre-defined template',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'location',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'media',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'suggestions',
              'short' => 'Quick replies / suggestion buttons (not applicable to fromTemplate)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'text',
              'short' => 'Simple text content',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'content',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                    'req' => [
                      'content' => '`reqdata`',
                    ],
                    'res' => '`body.content`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
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
              'name' => 'campaignId',
              'short' => 'Schedule grouping identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'messages',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'scheduleAt',
              'req' => true,
              'short' => 'Scheduled sending time',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'message',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
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
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                    'res' => '`body.schedule`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'message_event' => [
          'fields' => [
            [
              'name' => 'accountId',
              'req' => true,
              'short' => 'Account identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'eventId',
              'req' => true,
              'short' => 'Unique event identifier (for idempotent processing / deduplication)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'messageStatusChanged',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'on',
              'req' => true,
              'short' => 'UTC date-time when the event occurred',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'templateReviewStatusChanged',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'userMessageReceived',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'message_event',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'page_index',
                        'orig' => 'page_index',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'desc:on',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
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
                    'res' => '`body.events`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'option' => [
          'fields' => [
            [
              'name' => 'options',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'option',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                    'res' => '`body.options`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                    'res' => '`body.options`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                    'res' => '`body.options`',
                  ],
                ],
              ],
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
              'name' => 'count',
              'req' => true,
              'short' => 'Number of active schedules',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'schedule',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2026-02-01T10:00,2026-02-16T20:00',
                        'kind' => 'query',
                        'name' => 'between',
                        'orig' => 'between',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'campaign_id',
                        'orig' => 'campaign_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'Europe/Zurich',
                        'kind' => 'query',
                        'name' => 'time_zone',
                        'orig' => 'time_zone',
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
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'between',
                        'orig' => 'between',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'campaign_id',
                        'orig' => 'campaign_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'time_zone',
                        'orig' => 'time_zone',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'self' => [
          'fields' => [
            [
              'name' => 'accountId',
              'req' => true,
              'short' => 'Unique technical account identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'settings',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'self',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
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
                    'res' => '`body.account`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'self_admin' => [
          'fields' => [
            [
              'name' => 'callback',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'settings',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'self_admin',
          'op' => [
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
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
                    'res' => '`body.settings`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'template' => [
          'fields' => [
            [
              'name' => 'channelData',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'content',
              'short' => 'Message content.',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'createdOn',
              'req' => true,
              'short' => 'Date of template creation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'designerUrl',
              'short' => 'URL to the external template designer (dynamically generated if enabled)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'details',
              'short' => 'Additional details about the latest status',
              'type' => '`$STRING`',
            ],
            [
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'occurredOn',
              'req' => true,
              'short' => 'Date and time of last review status change',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'options',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'reviews',
              'short' => 'Channel-specific template reviews (keyed by channelId)',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'status',
              'req' => true,
              'short' => 'Template review lifecycle status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'template',
              'req' => true,
              'short' => 'Properties for creating a new template',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'templateId',
              'req' => true,
              'short' => 'Unique template identifier (generated by the service)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updatedOn',
              'short' => 'Date of last template update',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'variables',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'template',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                    'res' => '`body.meta`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/templates',
                  'parts' => [
                    'templates',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => [
                      'template' => '`reqdata`',
                    ],
                    'res' => '`body.template`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'page_index',
                        'orig' => 'page_index',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'desc:updatedOn!createdOn',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
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
                    'res' => '`body.templates`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'channel_id',
                        'orig' => 'channel_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
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
                ],
                [
                  'args' => [
                    'params' => [
                      [
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
                ],
                [
                  'args' => [
                    'params' => [
                      [
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
                    'res' => '`body.meta`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
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
                    'res' => '`body.reviews`',
                  ],
                ],
              ],
            ],
            'patch' => [
              'input' => 'data',
              'name' => 'patch',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
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
                    'res' => '`body.meta`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'channel_id',
                        'orig' => 'channel_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'channel_id',
                        'orig' => 'channel_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
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
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'path',
                        'orig' => 'path',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
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
              'name' => 'files',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'path',
              'req' => true,
              'short' => 'Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'req' => true,
              'short' => 'Absolute download URL with security token (expires after 15 minutes)',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'traffic_file',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
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
                    'res' => '`body.files`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'path',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'variable' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Variable description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'examples',
              'short' => 'Example values',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'formats',
              'short' => 'Type-specific constraint formats (e.g.',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ref',
              'short' => 'Optional immutable identifier for the variable (used for merge identity)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Optional type descriptor for validation constraints',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'variables',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'variable',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                    'res' => '`body.variables`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'template_id',
                        'orig' => 'template_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
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
                ],
              ],
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
