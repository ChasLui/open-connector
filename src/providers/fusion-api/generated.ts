export interface FusionApiOperationDefinition {
  actionName: string;
  method: "GET" | "POST";
  path: string;
  tag: string;
  description: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  successStatuses: number[];
  pathParams: string[];
}

const rawFusionApiOperations = String.raw`[
  {
    "actionName": "cphone_nano_banana_result",
    "method": "GET",
    "path": "/v1/cphone-nano-banana/result/{sessionID}",
    "tag": "cphone-nano-banana",
    "description": "Get cphone-nano-banana task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "cphone_nano_banana_state",
    "method": "GET",
    "path": "/v1/cphone-nano-banana/state/{sessionID}",
    "tag": "cphone-nano-banana",
    "description": "Get cphone-nano-banana task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "cphone_nano_banana_submit",
    "method": "POST",
    "path": "/v1/cphone-nano-banana/submit",
    "tag": "cphone-nano-banana",
    "description": "Edit images with Nano Banana",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "Text prompt for image generation or editing",
          "examples": [
            "A beautiful landscape painting"
          ]
        },
        "model": {
          "type": "string",
          "enum": [
            "nano-banana-2",
            "nano-banana-2-2k",
            "nano-banana-2-4k",
            "gemini-3-pro-image-preview",
            "gemini-2.5-flash-image",
            "nano-banana-hd",
            "nano-banana",
            "gemini-2.5-flash-image-preview",
            "nano-banana-pro",
            "nano-banana-pro-4k"
          ],
          "default": "gemini-2.5-flash-image-preview",
          "description": "Model name to use, defaults to gemini-2.5-flash-image-preview",
          "examples": [
            "nano-banana-2"
          ]
        },
        "aspectRatio": {
          "type": "string",
          "enum": [
            "21:9",
            "1:1",
            "4:3",
            "3:2",
            "2:3",
            "5:4",
            "4:5",
            "3:4",
            "16:9",
            "9:16"
          ],
          "description": "Generated image aspect ratio",
          "examples": [
            "1:1"
          ]
        },
        "imageURLs": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1,
          "description": "List of reference image URLs for image-to-image generation or editing",
          "examples": [
            [
              "https://example.com/ref.png"
            ]
          ]
        },
        "imageSize": {
          "type": "string",
          "enum": [
            "1K",
            "2K",
            "4K"
          ],
          "description": "Generated image resolution, only supported by nano-banana-2",
          "examples": [
            "1K"
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "deepseek_ocr_recognize",
    "method": "POST",
    "path": "/v1/deepseek-ocr/action/recognize",
    "tag": "deepseek-ocr",
    "description": "Recognize text from a single image.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "imageURL": {
          "type": "string",
          "minLength": 1,
          "format": "uri",
          "description": "Publicly accessible URL of the image to recognize.",
          "examples": [
            "https://example.com/page.png"
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "Custom OCR prompt.",
          "examples": [
            "Extract all text from this page as Markdown."
          ]
        },
        "oomolApiKey": {
          "type": "string",
          "minLength": 1,
          "description": "Optional OOMOL API key that overrides the default key for this request.",
          "examples": [
            "sk-xxx"
          ]
        }
      },
      "required": [
        "imageURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "OCR recognition result.",
      "properties": {
        "text": {
          "type": "string",
          "description": "Recognized OCR text."
        },
        "inputTokens": {
          "type": "integer",
          "minimum": 0,
          "description": "Number of input tokens used by the request."
        },
        "outputTokens": {
          "type": "integer",
          "minimum": 0,
          "description": "Number of output tokens generated by the request."
        },
        "totalTokens": {
          "type": "integer",
          "minimum": 0,
          "description": "Total number of tokens used by the request."
        },
        "model": {
          "type": "string",
          "description": "Model used for OCR recognition."
        }
      },
      "required": [
        "text"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "doubao_stt_result",
    "method": "GET",
    "path": "/v1/doubao-stt/result/{sessionID}",
    "tag": "doubao-stt",
    "description": "Get doubao-stt task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "doubao_stt_state",
    "method": "GET",
    "path": "/v1/doubao-stt/state/{sessionID}",
    "tag": "doubao-stt",
    "description": "Get doubao-stt task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "doubao_stt_submit",
    "method": "POST",
    "path": "/v1/doubao-stt/submit",
    "tag": "doubao-stt",
    "description": "Convert speech to text with Doubao",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "audioURL": {
          "type": "string",
          "minLength": 1,
          "description": "Publicly accessible URL of the audio file to recognize",
          "examples": [
            "https://example.com/audio.mp3"
          ]
        },
        "format": {
          "type": "string",
          "minLength": 1,
          "description": "Audio container format, supporting raw, wav, mp3, and ogg",
          "examples": [
            "mp3"
          ]
        }
      },
      "required": [
        "audioURL",
        "format"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "doubao_text_to_image_seedream_generate",
    "method": "POST",
    "path": "/v1/doubao-text-to-image-seedream/action/generate",
    "tag": "doubao-text-to-image-seedream",
    "description": "Generate images from text with Doubao Seedream",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000,
          "description": "Text prompt for image generation",
          "examples": [
            "一只在星空下奔跑的白色独角兽"
          ]
        },
        "image": {
          "type": "string",
          "description": "Reference image URL or Base64 encoding for image-to-image generation",
          "examples": [
            "https://example.com/reference.jpg"
          ]
        },
        "size": {
          "anyOf": [
            {
              "type": "string",
              "enum": [
                "1K",
                "2K",
                "4K",
                "1k",
                "2k",
                "4k"
              ],
              "description": "Descriptive size supporting 1K, 2K, and 4K resolutions",
              "examples": [
                "2K"
              ]
            },
            {
              "type": "object",
              "properties": {
                "width": {
                  "type": "integer",
                  "exclusiveMinimum": 0,
                  "description": "Image width in pixels",
                  "examples": [
                    2048
                  ]
                },
                "height": {
                  "type": "integer",
                  "exclusiveMinimum": 0,
                  "description": "Image height in pixels",
                  "examples": [
                    2048
                  ]
                }
              },
              "required": [
                "width",
                "height"
              ]
            }
          ],
          "default": "2048x2048",
          "description": "Image size, supporting descriptive sizes (1K/2K/4K) or explicit width and height in pixels"
        },
        "multiple": {
          "type": "string",
          "enum": [
            "disabled",
            "auto"
          ],
          "default": "disabled",
          "description": "Whether to enable multi-image generation mode; auto lets the model decide",
          "examples": [
            "disabled"
          ]
        },
        "maxCount": {
          "type": "number",
          "minimum": 1,
          "maximum": 15,
          "default": 1,
          "description": "Maximum number of images to generate in one request, only effective in multi-image mode",
          "examples": [
            1
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": true,
          "description": "Whether to add a watermark",
          "examples": [
            true
          ]
        },
        "optionsnew": {
          "type": "string",
          "enum": [
            "standard",
            "fast"
          ],
          "default": "standard",
          "description": "Generation mode: standard prioritizes quality, fast prioritizes speed",
          "examples": [
            "standard"
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "doubao_tts_result",
    "method": "GET",
    "path": "/v1/doubao-tts/result/{sessionID}",
    "tag": "doubao-tts",
    "description": "Get doubao-tts task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "doubao_tts_state",
    "method": "GET",
    "path": "/v1/doubao-tts/state/{sessionID}",
    "tag": "doubao-tts",
    "description": "Get doubao-tts task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "doubao_tts_submit",
    "method": "POST",
    "path": "/v1/doubao-tts/submit",
    "tag": "doubao-tts",
    "description": "Convert text to speech with Doubao",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Text content to synthesize into speech, up to 100,000 characters",
          "examples": [
            "你好，欢迎使用豆包语音合成服务。"
          ]
        },
        "voice": {
          "type": "string",
          "minLength": 1,
          "description": "Speaker ID specifying the voice used for synthesized audio",
          "examples": [
            "zh_female_vv_uranus_bigtts"
          ]
        }
      },
      "required": [
        "text",
        "voice"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "fal_aura_sr_result",
    "method": "GET",
    "path": "/v1/fal-aura-sr/result/{sessionID}",
    "tag": "fal-aura-sr",
    "description": "Get fal-aura-sr task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_aura_sr_state",
    "method": "GET",
    "path": "/v1/fal-aura-sr/state/{sessionID}",
    "tag": "fal-aura-sr",
    "description": "Get fal-aura-sr task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_aura_sr_submit",
    "method": "POST",
    "path": "/v1/fal-aura-sr/submit",
    "tag": "fal-aura-sr",
    "description": "Image super-resolution upscaling",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "imageURL": {
          "type": "string",
          "minLength": 1,
          "description": "URL of the image to upscale with super resolution",
          "examples": [
            "https://example.com/low-res-image.png"
          ]
        }
      },
      "required": [
        "imageURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "fal_nano_banana_2_result",
    "method": "GET",
    "path": "/v1/fal-nano-banana-2/result/{sessionID}",
    "tag": "fal-nano-banana-2",
    "description": "Get fal-nano-banana-2 task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_nano_banana_2_state",
    "method": "GET",
    "path": "/v1/fal-nano-banana-2/state/{sessionID}",
    "tag": "fal-nano-banana-2",
    "description": "Get fal-nano-banana-2 task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_nano_banana_2_submit",
    "method": "POST",
    "path": "/v1/fal-nano-banana-2/submit",
    "tag": "fal-nano-banana-2",
    "description": "Generate or edit images with Nano Banana 2",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "Text prompt for image generation or editing",
          "examples": [
            "A vibrant cyberpunk cityscape at dusk"
          ]
        },
        "imageURLs": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1,
          "maxItems": 14,
          "description": "List of reference image URLs for image-to-image generation or editing",
          "examples": [
            [
              "https://example.com/reference-image.png"
            ]
          ]
        },
        "numImages": {
          "type": "integer",
          "minimum": 1,
          "maximum": 4,
          "default": 1,
          "description": "Number of images to generate",
          "examples": [
            1
          ]
        },
        "aspectRatio": {
          "type": "string",
          "enum": [
            "auto",
            "21:9",
            "16:9",
            "3:2",
            "4:3",
            "5:4",
            "1:1",
            "4:5",
            "3:4",
            "2:3",
            "9:16"
          ],
          "default": "auto",
          "description": "Generated image aspect ratio",
          "examples": [
            "auto"
          ]
        },
        "outputFormat": {
          "type": "string",
          "enum": [
            "jpeg",
            "png",
            "webp"
          ],
          "default": "png",
          "description": "Output image file format",
          "examples": [
            "png"
          ]
        },
        "safetyTolerance": {
          "type": "string",
          "enum": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ],
          "default": "4",
          "description": "Content safety tolerance level, where 1 is the strictest and 6 is the loosest",
          "examples": [
            "4"
          ]
        },
        "seed": {
          "type": "integer",
          "description": "Random seed used to reproduce results with the same input",
          "examples": [
            42
          ]
        },
        "resolution": {
          "type": "string",
          "enum": [
            "0.5K",
            "1K",
            "2K",
            "4K"
          ],
          "default": "1K",
          "description": "Generated image resolution",
          "examples": [
            "1K"
          ]
        },
        "limitGenerations": {
          "type": "boolean",
          "default": true,
          "description": "Whether to restrict each prompt round to a single valid result",
          "examples": [
            true
          ]
        },
        "enableWebSearch": {
          "type": "boolean",
          "description": "Whether to enable web-search-enhanced generation",
          "examples": [
            false
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "fal_nano_banana_pro_result",
    "method": "GET",
    "path": "/v1/fal-nano-banana-pro/result/{sessionID}",
    "tag": "fal-nano-banana-pro",
    "description": "Get fal-nano-banana-pro task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_nano_banana_pro_state",
    "method": "GET",
    "path": "/v1/fal-nano-banana-pro/state/{sessionID}",
    "tag": "fal-nano-banana-pro",
    "description": "Get fal-nano-banana-pro task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_nano_banana_pro_submit",
    "method": "POST",
    "path": "/v1/fal-nano-banana-pro/submit",
    "tag": "fal-nano-banana-pro",
    "description": "Edit images with Nano Banana Pro",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "Text prompt for image generation or editing",
          "examples": [
            "A futuristic cityscape at night"
          ]
        },
        "imageUrls": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "maxItems": 3,
          "description": "List of reference image URLs for image-to-image generation or editing",
          "examples": [
            [
              "https://example.com/ref.png"
            ]
          ]
        },
        "aspectRatio": {
          "type": "string",
          "enum": [
            "21:9",
            "16:9",
            "3:2",
            "4:3",
            "5:4",
            "1:1",
            "4:5",
            "3:4",
            "2:3",
            "9:16"
          ],
          "default": "1:1",
          "description": "Generated image aspect ratio",
          "examples": [
            "1:1"
          ]
        },
        "outputFormat": {
          "type": "string",
          "enum": [
            "png",
            "jpeg",
            "webp",
            "jpg"
          ],
          "default": "png",
          "description": "Output image file format",
          "examples": [
            "png"
          ]
        },
        "resolution": {
          "type": "string",
          "enum": [
            "1K",
            "2K",
            "4K"
          ],
          "default": "1K",
          "description": "Generated image resolution",
          "examples": [
            "1K"
          ]
        },
        "numImages": {
          "type": "number",
          "minimum": 1,
          "maximum": 8,
          "default": 1,
          "description": "Number of images to generate",
          "examples": [
            1
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "fal_nano_banana_result",
    "method": "GET",
    "path": "/v1/fal-nano-banana/result/{sessionID}",
    "tag": "fal-nano-banana",
    "description": "Get fal-nano-banana task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_nano_banana_state",
    "method": "GET",
    "path": "/v1/fal-nano-banana/state/{sessionID}",
    "tag": "fal-nano-banana",
    "description": "Get fal-nano-banana task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_nano_banana_submit",
    "method": "POST",
    "path": "/v1/fal-nano-banana/submit",
    "tag": "fal-nano-banana",
    "description": "Edit images with Nano Banana",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "description": "Text prompt for image generation or editing",
          "examples": [
            "A beautiful landscape painting"
          ]
        },
        "imageURLs": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1,
          "description": "List of reference image URLs for image-to-image generation or editing",
          "examples": [
            [
              "https://example.com/ref.png"
            ]
          ]
        },
        "numImages": {
          "type": "integer",
          "minimum": 1,
          "description": "Number of images to generate",
          "examples": [
            1
          ]
        },
        "outputFormat": {
          "type": "string",
          "enum": [
            "jpeg",
            "png",
            "webp"
          ],
          "description": "Output image file format",
          "examples": [
            "png"
          ]
        },
        "aspectRatio": {
          "type": "string",
          "enum": [
            "21:9",
            "1:1",
            "4:3",
            "3:2",
            "2:3",
            "5:4",
            "4:5",
            "3:4",
            "16:9",
            "9:16"
          ],
          "description": "Generated image aspect ratio",
          "examples": [
            "1:1"
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "fal_remove_background_result",
    "method": "GET",
    "path": "/v1/fal-remove-background/result/{sessionID}",
    "tag": "fal-remove-background",
    "description": "Image with background removed",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "image": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string",
                  "description": "URL of the image after background removal",
                  "examples": [
                    "https://fal.media/files/output/abc123.png"
                  ]
                },
                "content_type": {
                  "type": "string",
                  "description": "Image MIME type",
                  "examples": [
                    "image/png"
                  ]
                },
                "file_name": {
                  "anyOf": [
                    {
                      "type": "string",
                      "description": "Output filename",
                      "examples": [
                        "output.png"
                      ]
                    },
                    {
                      "type": "null",
                      "description": "Output filename",
                      "examples": [
                        "output.png"
                      ]
                    }
                  ],
                  "description": "Output filename"
                },
                "file_size": {
                  "anyOf": [
                    {
                      "type": "number",
                      "description": "File size in bytes",
                      "examples": [
                        204800
                      ]
                    },
                    {
                      "type": "null",
                      "description": "File size in bytes",
                      "examples": [
                        204800
                      ]
                    }
                  ],
                  "description": "File size in bytes"
                },
                "width": {
                  "type": "number",
                  "description": "Image width in pixels",
                  "examples": [
                    1024
                  ]
                },
                "height": {
                  "type": "number",
                  "description": "Image height in pixels",
                  "examples": [
                    768
                  ]
                }
              },
              "required": [
                "url",
                "content_type",
                "file_name",
                "file_size",
                "width",
                "height"
              ],
              "description": "Information about the image after background removal"
            }
          },
          "required": [
            "image"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_remove_background_state",
    "method": "GET",
    "path": "/v1/fal-remove-background/state/{sessionID}",
    "tag": "fal-remove-background",
    "description": "Get fal-remove-background task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "fal_remove_background_submit",
    "method": "POST",
    "path": "/v1/fal-remove-background/submit",
    "tag": "fal-remove-background",
    "description": "Remove image backgrounds with the Fal.ai BRIA model",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "imageURL": {
          "type": "string",
          "minLength": 1,
          "description": "URL of the image whose background should be removed",
          "examples": [
            "https://example.com/photo.jpg"
          ]
        }
      },
      "required": [
        "imageURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "file_upload_abort_multipart_upload",
    "method": "POST",
    "path": "/v1/file-upload/action/abort-multipart-upload",
    "tag": "file-upload",
    "description": "Abort multipart upload",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "uploadID": {
          "type": "string",
          "minLength": 1,
          "description": "Multipart upload ID to abort",
          "examples": [
            "upload-abc123"
          ]
        },
        "key": {
          "type": "string",
          "minLength": 1,
          "description": "Storage path of the S3 object",
          "examples": [
            "file-upload/user-id/file-id/photo.png"
          ]
        }
      },
      "required": [
        "uploadID",
        "key"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "file_upload_complete_multipart_upload",
    "method": "POST",
    "path": "/v1/file-upload/action/complete-multipart-upload",
    "tag": "file-upload",
    "description": "Complete multipart upload",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "uploadID": {
          "type": "string",
          "minLength": 1,
          "description": "Multipart upload ID",
          "examples": [
            "upload-abc123"
          ]
        },
        "key": {
          "type": "string",
          "minLength": 1,
          "description": "Storage path of the S3 object",
          "examples": [
            "file-upload/user-id/file-id/photo.png"
          ]
        },
        "parts": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "partNumber": {
                "type": "number",
                "minimum": 1,
                "maximum": 10000,
                "description": "Part number",
                "examples": [
                  1
                ]
              },
              "etag": {
                "type": "string",
                "minLength": 1,
                "description": "ETag value of the part",
                "examples": [
                  "\"abc123def456\""
                ]
              }
            },
            "required": [
              "partNumber",
              "etag"
            ]
          },
          "maxItems": 10000,
          "description": "List of uploaded part information",
          "examples": [
            [
              {
                "partNumber": 1,
                "etag": "\"abc123\""
              }
            ]
          ]
        }
      },
      "required": [
        "uploadID",
        "key",
        "parts"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "file_upload_create_multipart_upload",
    "method": "POST",
    "path": "/v1/file-upload/action/create-multipart-upload",
    "tag": "file-upload",
    "description": "Initialize multipart upload",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "fileSuffix": {
          "type": "string",
          "minLength": 1,
          "description": "File suffix, mutually exclusive with filename",
          "examples": [
            "png"
          ]
        },
        "filename": {
          "type": "string",
          "minLength": 1,
          "description": "Full filename, mutually exclusive with fileSuffix and preferred when provided",
          "examples": [
            "photo.png"
          ]
        },
        "fileSize": {
          "type": "number",
          "minimum": 1,
          "maximum": 524288000,
          "description": "File size in bytes, up to 500 MB",
          "examples": [
            10485760
          ]
        }
      },
      "required": [
        "fileSize"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "file_upload_generate_presigned_url",
    "method": "POST",
    "path": "/v1/file-upload/action/generate-presigned-url",
    "tag": "file-upload",
    "description": "Generate a presigned URL for file upload",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "fileSuffix": {
          "type": "string",
          "minLength": 1,
          "description": "File suffix, mutually exclusive with filename",
          "examples": [
            "png"
          ]
        },
        "filename": {
          "type": "string",
          "minLength": 1,
          "description": "Full filename, mutually exclusive with fileSuffix and preferred when provided",
          "examples": [
            "photo.png"
          ]
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "file_upload_generate_presigned_urls",
    "method": "POST",
    "path": "/v1/file-upload/action/generate-presigned-urls",
    "tag": "file-upload",
    "description": "Generate a presigned URL for multipart upload parts",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "uploadID": {
          "type": "string",
          "minLength": 1,
          "description": "Multipart upload ID",
          "examples": [
            "upload-abc123"
          ]
        },
        "key": {
          "type": "string",
          "minLength": 1,
          "description": "Storage path of the S3 object",
          "examples": [
            "file-upload/user-id/file-id/photo.png"
          ]
        },
        "partNumbers": {
          "type": "array",
          "items": {
            "type": "number",
            "minimum": 1,
            "maximum": 10000
          },
          "maxItems": 10000,
          "description": "List of part numbers for which to generate presigned URLs",
          "examples": [
            [
              1,
              2,
              3
            ]
          ]
        }
      },
      "required": [
        "uploadID",
        "key",
        "partNumbers"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "jina_reader_read",
    "method": "POST",
    "path": "/v1/jina-reader/action/read",
    "tag": "jina-reader",
    "description": "Read and extract URL content",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "URL": {
          "type": "string",
          "description": "Webpage URL whose content should be fetched",
          "examples": [
            "https://example.com/article"
          ]
        },
        "format": {
          "type": "string",
          "enum": [
            "markdown",
            "html",
            "text",
            "screenshot",
            "pageshot"
          ],
          "description": "Output content format",
          "examples": [
            "markdown"
          ]
        },
        "engine": {
          "type": "string",
          "enum": [
            "direct",
            "browser",
            "cf-browser-rendering"
          ],
          "description": "Rendering engine type: direct for static fetching and browser for dynamic rendering",
          "examples": [
            "browser"
          ]
        },
        "jsonResponse": {
          "type": "boolean",
          "description": "Whether to return the result in JSON format",
          "examples": [
            true
          ]
        },
        "timeout": {
          "type": "number",
          "description": "Page load wait timeout in seconds",
          "examples": [
            30
          ]
        },
        "tokenLimit": {
          "type": "number",
          "description": "Maximum number of tokens to return",
          "examples": [
            2000
          ]
        },
        "useReaderLMV2": {
          "type": "boolean",
          "description": "Whether to use the ReaderLM-v2 model for HTML-to-Markdown conversion",
          "examples": [
            false
          ]
        },
        "selectorOnly": {
          "type": "string",
          "description": "Only extract content matching this CSS selector",
          "examples": [
            "article, .main-content"
          ]
        },
        "selectorWait": {
          "type": "string",
          "description": "Wait for the element matching this CSS selector before extraction",
          "examples": [
            ".dynamic-list"
          ]
        },
        "selectorNone": {
          "type": "string",
          "description": "Remove elements matching this CSS selector before extraction",
          "examples": [
            "nav, footer, .ads"
          ]
        },
        "removeAllImages": {
          "type": "boolean",
          "description": "Whether to remove all images from the output",
          "examples": [
            true
          ]
        },
        "withLinkSummary": {
          "type": "string",
          "enum": [
            "true",
            "all"
          ],
          "description": "Generate a link summary section at the end; true includes only button links, all includes every link",
          "examples": [
            "true"
          ]
        },
        "withImageSummary": {
          "type": "string",
          "enum": [
            "true",
            "all"
          ],
          "description": "Generate an image summary section at the end",
          "examples": [
            "true"
          ]
        }
      },
      "required": [
        "URL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "jina_reader_search",
    "method": "POST",
    "path": "/v1/jina-reader/action/search",
    "tag": "jina-reader",
    "description": "Search web content",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "content": {
          "type": "string",
          "minLength": 1,
          "description": "Search query keywords",
          "examples": [
            "2024 年诺贝尔物理学奖获得者"
          ]
        },
        "engine": {
          "type": "string",
          "enum": [
            "direct"
          ],
          "description": "Search engine type",
          "examples": [
            "direct"
          ]
        },
        "jsonResponse": {
          "type": "boolean",
          "description": "Whether to return search results in JSON format",
          "examples": [
            true
          ]
        },
        "withFavicons": {
          "type": "boolean",
          "description": "Whether to include website icons in the result",
          "examples": [
            true
          ]
        },
        "googleLocal": {
          "type": "string",
          "enum": [
            "US",
            "CA",
            "MX",
            "GB",
            "DE",
            "FR",
            "GP",
            "CN",
            "IN",
            "BR",
            "AU",
            "RU",
            "IT",
            "ES",
            "KR",
            "NL",
            "CH",
            "SE",
            "IE",
            "SG",
            "IL",
            "SA",
            "AE",
            "ZA"
          ],
          "description": "Restrict the geographic location of search results using an ISO country code",
          "examples": [
            "US"
          ]
        },
        "hostLanguage": {
          "type": "string",
          "enum": [
            "en",
            "es",
            "fr",
            "de",
            "ja",
            "zh-cn",
            "hi",
            "pt",
            "it",
            "ko",
            "nl",
            "ar",
            "sv",
            "iw",
            "af",
            "ru"
          ],
          "description": "Preferred language for search results",
          "examples": [
            "en"
          ]
        },
        "pageIndex": {
          "type": "number",
          "minimum": 1,
          "description": "Page number for search results",
          "examples": [
            1
          ]
        },
        "noCache": {
          "type": "boolean",
          "description": "Whether to bypass cache and fetch the latest result",
          "examples": [
            false
          ]
        }
      },
      "required": [
        "content"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "oomol_tts_ng_generate",
    "method": "POST",
    "path": "/v1/oomol-tts-ng/action/generate",
    "tag": "oomol-tts-ng",
    "description": "Generate speech audio",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "qwen3-tts-instruct-flash",
            "qwen3-tts-flash",
            "qwen3-tts-vc-2026-01-22"
          ],
          "default": "qwen3-tts-flash",
          "description": "Model name.",
          "examples": [
            "qwen3-tts-flash"
          ]
        },
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Text content to synthesize into speech.",
          "examples": [
            "你好，欢迎使用千问语音合成服务。"
          ]
        },
        "voice": {
          "type": "string",
          "minLength": 1,
          "default": "Cherry",
          "description": "Preset voice name or cloned voice ID.",
          "examples": [
            "Cherry"
          ]
        },
        "languageType": {
          "type": "string",
          "enum": [
            "Auto",
            "Chinese",
            "English",
            "German",
            "Italian",
            "Portuguese",
            "Spanish",
            "Japanese",
            "Korean",
            "French",
            "Russian"
          ],
          "description": "Language type of the text.",
          "examples": [
            "Auto"
          ]
        },
        "instructions": {
          "type": "string",
          "minLength": 1,
          "description": "Speech performance control instruction, only available for instruct models.",
          "examples": [
            "Speak faster with an upbeat tone."
          ]
        },
        "optimizeInstructions": {
          "type": "boolean",
          "description": "Whether to optimize speech performance instructions, only available for instruct models.",
          "examples": [
            true
          ]
        }
      },
      "required": [
        "text"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "audioURL": {
          "type": "string",
          "description": "Temporary URL of the generated audio"
        },
        "expiresAt": {
          "type": "number",
          "description": "Expiration time of the audio URL"
        }
      },
      "required": [
        "audioURL"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "oomol_tts_result",
    "method": "GET",
    "path": "/v1/oomol-tts/result/{sessionID}",
    "tag": "oomol-tts",
    "description": "Get oomol-tts task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "oomol_tts_state",
    "method": "GET",
    "path": "/v1/oomol-tts/state/{sessionID}",
    "tag": "oomol-tts",
    "description": "Get oomol-tts task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "oomol_tts_submit",
    "method": "POST",
    "path": "/v1/oomol-tts/submit",
    "tag": "oomol-tts",
    "description": "Convert text to audio",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Text content to synthesize into speech, up to 100,000 characters",
          "examples": [
            "你好，欢迎使用 OOMOL 语音合成服务。"
          ]
        },
        "voice": {
          "type": "string",
          "minLength": 1,
          "description": "Speaker ID specifying the voice used for synthesized audio",
          "examples": [
            "zh_female_vv_uranus_bigtts"
          ]
        }
      },
      "required": [
        "text",
        "voice"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "openai_image_async_result",
    "method": "GET",
    "path": "/v1/openai-image-async/result/{sessionID}",
    "tag": "openai-image-async",
    "description": "Get asynchronous OpenAI image generation result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "openai_image_async_submit",
    "method": "POST",
    "path": "/v1/openai-image-async/submit",
    "tag": "openai-image-async",
    "description": "Submit asynchronous OpenAI image generation requests, including gpt-image-2 image creation.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 32000,
          "description": "Text prompt for image generation",
          "examples": [
            "A minimalist product photo of a ceramic mug on a walnut table"
          ]
        },
        "model": {
          "type": "string",
          "minLength": 1,
          "description": "OpenAI image model name",
          "examples": [
            "gpt-image-2"
          ]
        },
        "background": {
          "type": "string",
          "enum": [
            "transparent",
            "opaque",
            "auto"
          ],
          "description": "Background mode",
          "examples": [
            "auto"
          ]
        },
        "moderation": {
          "type": "string",
          "enum": [
            "auto",
            "low"
          ],
          "description": "Content moderation strictness",
          "examples": [
            "auto"
          ]
        },
        "n": {
          "type": "integer",
          "minimum": 1,
          "maximum": 10,
          "description": "Number of images to generate",
          "examples": [
            1
          ]
        },
        "output_compression": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "description": "JPEG or WebP output compression level"
        },
        "output_format": {
          "type": "string",
          "enum": [
            "png",
            "jpeg",
            "webp"
          ],
          "description": "Output image format",
          "examples": [
            "png"
          ]
        },
        "partial_images": {
          "type": "integer",
          "minimum": 0,
          "maximum": 3,
          "description": "Number of partial images for streaming responses",
          "examples": [
            2
          ]
        },
        "quality": {
          "type": "string",
          "enum": [
            "auto",
            "high",
            "medium",
            "low",
            "hd",
            "standard"
          ],
          "description": "Image quality",
          "examples": [
            "medium"
          ]
        },
        "size": {
          "type": "string",
          "pattern": "^(auto|[1-9][0-9]*x[1-9][0-9]*)$",
          "description": "Output image size. For GPT Image 2, use auto or WIDTHxHEIGHT. Official constraints: largest dimension <= 3840, width and height multiples of 16, longest side at most 3x the shortest side, and total pixels between 655360 and 8294400 inclusive.",
          "examples": [
            "1536x1152",
            "1024x1024",
            "auto"
          ]
        },
        "user": {
          "type": "string",
          "minLength": 1,
          "description": "End-user identifier",
          "examples": [
            "user-123"
          ]
        }
      },
      "required": [
        "prompt"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "prompt": "A minimalist product photo of a ceramic mug on a walnut table",
          "model": "gpt-image-2",
          "output_format": "png",
          "quality": "medium",
          "size": "1024x1024"
        }
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "openai_image_edit_async_result",
    "method": "GET",
    "path": "/v1/openai-image-edit-async/result/{sessionID}",
    "tag": "openai-image-edit-async",
    "description": "Get asynchronous OpenAI image edit result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "openai_image_edit_async_submit",
    "method": "POST",
    "path": "/v1/openai-image-edit-async/submit",
    "tag": "openai-image-edit-async",
    "description": "Submit asynchronous OpenAI image edit requests, including gpt-image-2 image editing.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 32000,
          "description": "Text prompt for image editing",
          "examples": [
            "Replace the mug color with matte black and keep everything else unchanged"
          ]
        },
        "model": {
          "type": "string",
          "minLength": 1,
          "description": "OpenAI image model name",
          "examples": [
            "gpt-image-2"
          ]
        },
        "background": {
          "type": "string",
          "enum": [
            "transparent",
            "opaque",
            "auto"
          ],
          "description": "Background mode",
          "examples": [
            "auto"
          ]
        },
        "n": {
          "type": "integer",
          "minimum": 1,
          "maximum": 10,
          "description": "Number of images to generate",
          "examples": [
            1
          ]
        },
        "output_compression": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "description": "JPEG or WebP output compression level"
        },
        "output_format": {
          "type": "string",
          "enum": [
            "png",
            "jpeg",
            "webp"
          ],
          "description": "Output image format",
          "examples": [
            "png"
          ]
        },
        "partial_images": {
          "type": "integer",
          "minimum": 0,
          "maximum": 3,
          "description": "Number of partial images for streaming responses",
          "examples": [
            2
          ]
        },
        "quality": {
          "type": "string",
          "enum": [
            "auto",
            "high",
            "medium",
            "low",
            "hd",
            "standard"
          ],
          "description": "Image quality",
          "examples": [
            "medium"
          ]
        },
        "size": {
          "type": "string",
          "pattern": "^(auto|[1-9][0-9]*x[1-9][0-9]*)$",
          "description": "Output image size. For GPT Image 2, use auto or WIDTHxHEIGHT. Official constraints: largest dimension <= 3840, width and height multiples of 16, longest side at most 3x the shortest side, and total pixels between 655360 and 8294400 inclusive.",
          "examples": [
            "1536x1152",
            "1024x1024",
            "auto"
          ]
        },
        "user": {
          "type": "string",
          "minLength": 1,
          "description": "End-user identifier",
          "examples": [
            "user-123"
          ]
        },
        "images": {
          "type": "array",
          "minItems": 1,
          "maxItems": 16,
          "description": "Reference images to edit or compose from",
          "items": {
            "type": "object",
            "properties": {
              "image_url": {
                "type": "string",
                "anyOf": [
                  {
                    "format": "uri",
                    "pattern": "^https?://"
                  },
                  {
                    "pattern": "^data:image/[^;,]+;base64,.+"
                  }
                ],
                "description": "Publicly accessible image URL or base64-encoded image data URL"
              },
              "file_id": {
                "type": "string",
                "minLength": 1,
                "description": "OpenAI file ID"
              }
            },
            "additionalProperties": false,
            "anyOf": [
              {
                "required": [
                  "image_url"
                ]
              },
              {
                "required": [
                  "file_id"
                ]
              }
            ],
            "not": {
              "required": [
                "image_url",
                "file_id"
              ]
            }
          },
          "examples": [
            [
              {
                "image_url": "https://example.com/source.png"
              }
            ]
          ]
        },
        "mask": {
          "type": "object",
          "properties": {
            "image_url": {
              "type": "string",
              "anyOf": [
                {
                  "format": "uri",
                  "pattern": "^https?://"
                },
                {
                  "pattern": "^data:image/[^;,]+;base64,.+"
                }
              ],
              "description": "Publicly accessible image URL or base64-encoded image data URL"
            },
            "file_id": {
              "type": "string",
              "minLength": 1,
              "description": "OpenAI file ID"
            }
          },
          "additionalProperties": false,
          "anyOf": [
            {
              "required": [
                "image_url"
              ]
            },
            {
              "required": [
                "file_id"
              ]
            }
          ],
          "not": {
            "required": [
              "image_url",
              "file_id"
            ]
          },
          "description": "Mask image reference for partial edits"
        }
      },
      "required": [
        "prompt",
        "images"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "model": "gpt-image-2",
          "prompt": "Replace the mug color with matte black and keep everything else unchanged",
          "images": [
            {
              "image_url": "https://example.com/source.png"
            }
          ],
          "output_format": "png",
          "quality": "medium",
          "size": "1024x1024"
        }
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "pdf_transform_epub_result",
    "method": "GET",
    "path": "/v1/pdf-transform-epub/result/{sessionID}",
    "tag": "pdf-transform-epub",
    "description": "Get pdf-transform-epub task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "pdf_transform_epub_state",
    "method": "GET",
    "path": "/v1/pdf-transform-epub/state/{sessionID}",
    "tag": "pdf-transform-epub",
    "description": "Get pdf-transform-epub task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "pdf_transform_epub_submit",
    "method": "POST",
    "path": "/v1/pdf-transform-epub/submit",
    "tag": "pdf-transform-epub",
    "description": "Convert a PDF to EPUB format",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "pdfURL": {
          "type": "string",
          "minLength": 1,
          "format": "uri",
          "description": "Publicly accessible URL of the PDF file to convert",
          "examples": [
            "https://example.com/book.pdf"
          ]
        },
        "model": {
          "type": "string",
          "enum": [
            "gundam"
          ],
          "default": "gundam",
          "description": "OCR model name",
          "examples": [
            "gundam"
          ]
        },
        "includesFootnotes": {
          "type": "boolean",
          "default": true,
          "description": "Whether to include footnote content",
          "examples": [
            true
          ]
        },
        "ignorePdfErrors": {
          "type": "boolean",
          "default": true,
          "description": "Whether to ignore PDF parsing errors so the whole file can still be output",
          "examples": [
            true
          ]
        },
        "ignoreOcrErrors": {
          "type": "boolean",
          "default": true,
          "description": "Whether to ignore OCR recognition errors",
          "examples": [
            true
          ]
        },
        "ocrWorkers": {
          "type": "integer",
          "minimum": 1,
          "maximum": 4,
          "default": 1,
          "description": "Number of parallel OCR worker threads",
          "examples": [
            1
          ]
        },
        "inlineLatex": {
          "type": "boolean",
          "default": true,
          "description": "Whether to inline LaTeX formulas into the content",
          "examples": [
            true
          ]
        },
        "oomolApiKey": {
          "type": "string",
          "description": "OOMOL API key, optionally overriding the default key",
          "examples": [
            "sk-xxx"
          ]
        },
        "filename": {
          "type": "string",
          "description": "Output filename, optional",
          "examples": [
            "my-book"
          ]
        }
      },
      "required": [
        "pdfURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "pdf_transform_markdown_result",
    "method": "GET",
    "path": "/v1/pdf-transform-markdown/result/{sessionID}",
    "tag": "pdf-transform-markdown",
    "description": "Get pdf-transform-markdown task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "pdf_transform_markdown_state",
    "method": "GET",
    "path": "/v1/pdf-transform-markdown/state/{sessionID}",
    "tag": "pdf-transform-markdown",
    "description": "Get pdf-transform-markdown task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "pdf_transform_markdown_submit",
    "method": "POST",
    "path": "/v1/pdf-transform-markdown/submit",
    "tag": "pdf-transform-markdown",
    "description": "Convert a PDF to Markdown format",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "pdfURL": {
          "type": "string",
          "minLength": 1,
          "format": "uri",
          "description": "Publicly accessible URL of the PDF file to convert",
          "examples": [
            "https://example.com/document.pdf"
          ]
        },
        "model": {
          "type": "string",
          "enum": [
            "gundam"
          ],
          "default": "gundam",
          "description": "OCR model name",
          "examples": [
            "gundam"
          ]
        },
        "includesFootnotes": {
          "type": "boolean",
          "default": true,
          "description": "Whether to include footnote content",
          "examples": [
            true
          ]
        },
        "ignorePdfErrors": {
          "type": "boolean",
          "default": true,
          "description": "Whether to ignore PDF parsing errors so the whole file can still be output",
          "examples": [
            true
          ]
        },
        "ignoreOcrErrors": {
          "type": "boolean",
          "default": true,
          "description": "Whether to ignore OCR recognition errors",
          "examples": [
            true
          ]
        },
        "ocrWorkers": {
          "type": "integer",
          "minimum": 1,
          "maximum": 4,
          "default": 1,
          "description": "Number of parallel OCR worker threads",
          "examples": [
            1
          ]
        },
        "oomolApiKey": {
          "type": "string",
          "description": "OOMOL API key, optionally overriding the default key",
          "examples": [
            "sk-xxx"
          ]
        },
        "inlineLatex": {
          "type": "boolean",
          "default": true,
          "description": "Whether to inline LaTeX formulas into Markdown",
          "examples": [
            true
          ]
        },
        "filename": {
          "type": "string",
          "description": "Output filename, optional",
          "examples": [
            "my-document"
          ]
        }
      },
      "required": [
        "pdfURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_asr_filetrans_result",
    "method": "GET",
    "path": "/v1/qwen-asr-filetrans/result/{sessionID}",
    "tag": "qwen-asr-filetrans",
    "description": "Get Qwen ASR file transcription task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Completed transcription data including taskID, transcriptionURL, usage, and transcription details."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "qwen_asr_filetrans_state",
    "method": "GET",
    "path": "/v1/qwen-asr-filetrans/state/{sessionID}",
    "tag": "qwen-asr-filetrans",
    "description": "Get Qwen ASR file transcription task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible states returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "qwen_asr_filetrans_submit",
    "method": "POST",
    "path": "/v1/qwen-asr-filetrans/submit",
    "tag": "qwen-asr-filetrans",
    "description": "Submit a long-audio speech recognition task with Qwen ASR file transcription",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "fileURL": {
          "type": "string",
          "format": "uri",
          "description": "Publicly accessible URL of the audio file to transcribe.",
          "examples": [
            "https://example.com/audio.mp3"
          ]
        },
        "language": {
          "type": "string",
          "enum": [
            "zh",
            "yue",
            "en",
            "ja",
            "de",
            "ko",
            "ru",
            "fr",
            "pt",
            "ar",
            "it",
            "es",
            "hi",
            "id",
            "th",
            "tr",
            "uk",
            "vi",
            "cs",
            "da",
            "fil",
            "fi",
            "is",
            "ms",
            "no",
            "pl",
            "sv"
          ],
          "description": "Audio language. Leave unspecified when the language is unknown or the audio is multilingual.",
          "examples": [
            "zh"
          ]
        },
        "enableITN": {
          "type": "boolean",
          "default": false,
          "description": "Whether to enable inverse text normalization for Chinese and English audio.",
          "examples": [
            false
          ]
        },
        "enableWords": {
          "type": "boolean",
          "default": false,
          "description": "Whether to return word-level timestamps.",
          "examples": [
            true
          ]
        },
        "channelID": {
          "type": "array",
          "items": {
            "type": "integer",
            "minimum": 0
          },
          "minItems": 1,
          "default": [
            0
          ],
          "description": "Audio channel indexes to transcribe, starting from 0.",
          "examples": [
            [
              0
            ]
          ]
        }
      },
      "required": [
        "fileURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_doc_turbo_analyze",
    "method": "POST",
    "path": "/v1/qwen-doc-turbo/action/analyze",
    "tag": "qwen-doc-turbo",
    "description": "Analyze documents with Tongyi Qianwen",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "docURLs": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uri"
          },
          "minItems": 1,
          "maxItems": 10,
          "description": "Array of document URLs to process, supporting PDF, Word, Excel, and other formats",
          "examples": [
            [
              "https://example.com/report.pdf"
            ]
          ]
        },
        "instruction": {
          "type": "string",
          "minLength": 1,
          "maxLength": 9000,
          "description": "Document analysis instruction describing the extraction requirements",
          "examples": [
            "提取文档中所有产品型号和对应价格"
          ]
        },
        "text": {
          "type": "string",
          "minLength": 1,
          "maxLength": 9000,
          "description": "Plain text content, mutually exclusive with docURLs mode",
          "examples": [
            "产品 A 价格 100 元，产品 B 价格 200 元"
          ]
        },
        "systemPrompt": {
          "type": "string",
          "default": "You are a helpful assistant.",
          "description": "System prompt that sets the model role and behavior",
          "examples": [
            "You are a helpful assistant."
          ]
        },
        "fileParsingStrategy": {
          "type": "string",
          "enum": [
            "auto",
            "fast",
            "quality"
          ],
          "default": "auto",
          "description": "File parsing strategy: auto selects automatically, fast parses quickly, and quality prioritizes parsing quality",
          "examples": [
            "auto"
          ]
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_image_edit_plus_edit",
    "method": "POST",
    "path": "/v1/qwen-image-edit-plus/action/edit",
    "tag": "qwen-image-edit-plus",
    "description": "Edit images with Tongyi Wanxiang",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "qwen-image-edit-max",
            "qwen-image-edit-plus",
            "qwen-image-edit"
          ],
          "default": "qwen-image-edit-plus",
          "description": "Model name",
          "examples": [
            "qwen-image-edit-plus"
          ]
        },
        "imageURLs": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1,
          "maxItems": 3,
          "description": "Array of input image URLs, supporting 1 to 3 images",
          "examples": [
            [
              "https://example.com/photo.png"
            ]
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 800,
          "description": "Editing instruction describing changes to the image",
          "examples": [
            "把背景替换为海滩场景"
          ]
        },
        "generateImageCount": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6,
          "default": 1,
          "description": "Number of images to generate",
          "examples": [
            1
          ]
        },
        "negativePrompt": {
          "type": "string",
          "maxLength": 500,
          "description": "Negative prompt describing content to avoid",
          "examples": [
            "模糊，低画质，畸形"
          ]
        },
        "size": {
          "type": "string"
        },
        "promptExtend": {
          "type": "boolean",
          "default": true,
          "description": "Whether to enable intelligent prompt rewriting",
          "examples": [
            true
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add a watermark",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Random seed; fixed seeds can reproduce results",
          "examples": [
            42
          ]
        }
      },
      "required": [
        "imageURLs",
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_image_generate",
    "method": "POST",
    "path": "/v1/qwen-image/action/generate",
    "tag": "qwen-image",
    "description": "Generate images with Tongyi Qianwen",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "qwen-image-2.0",
            "qwen-image-2.0-pro"
          ],
          "default": "qwen-image-2.0",
          "description": "Model name",
          "examples": [
            "qwen-image-2.0"
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 800,
          "description": "Text prompt for image generation",
          "examples": [
            "一只在雪地里奔跑的狐狸，电影感，真实摄影"
          ]
        },
        "negativePrompt": {
          "type": "string",
          "maxLength": 500,
          "description": "Negative prompt describing content to avoid",
          "examples": [
            "低画质，模糊，畸形"
          ]
        },
        "size": {
          "type": "string"
        },
        "n": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6,
          "default": 1,
          "description": "Number of images to generate, supporting 1 to 6 images",
          "examples": [
            1
          ]
        },
        "promptExtend": {
          "type": "boolean",
          "default": true,
          "description": "Whether to enable intelligent prompt rewriting",
          "examples": [
            true
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add a watermark",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Random seed; fixed seeds can reproduce results",
          "examples": [
            42
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_mt_image_result",
    "method": "GET",
    "path": "/v1/qwen-mt-image/result/{sessionID}",
    "tag": "qwen-mt-image",
    "description": "Get qwen-mt-image task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "qwen_mt_image_state",
    "method": "GET",
    "path": "/v1/qwen-mt-image/state/{sessionID}",
    "tag": "qwen-mt-image",
    "description": "Get qwen-mt-image task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "qwen_mt_image_submit",
    "method": "POST",
    "path": "/v1/qwen-mt-image/submit",
    "tag": "qwen-mt-image",
    "description": "Image machine translation",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "imageURL": {
          "type": "string",
          "minLength": 1,
          "description": "Publicly accessible URL of the image to translate",
          "examples": [
            "https://example.com/menu.jpg"
          ]
        },
        "sourceLang": {
          "type": "string",
          "enum": [
            "auto",
            "zh",
            "en",
            "ko",
            "ja",
            "ru",
            "es",
            "fr",
            "pt",
            "it",
            "de",
            "vi"
          ],
          "default": "auto",
          "description": "Source language; auto enables automatic detection",
          "examples": [
            "auto"
          ]
        },
        "targetLang": {
          "type": "string",
          "enum": [
            "zh",
            "en",
            "ko",
            "ja",
            "ru",
            "es",
            "fr",
            "pt",
            "it",
            "vi",
            "ms",
            "th",
            "id",
            "ar"
          ],
          "description": "Target language",
          "examples": [
            "en"
          ]
        },
        "domainHint": {
          "type": "string",
          "maxLength": 2000,
          "description": "Domain prompt describing the translation style; English is recommended",
          "examples": [
            "E-commerce product description"
          ]
        },
        "sensitivities": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "maxItems": 50,
          "description": "Sensitive word filter list; exact matches are skipped during translation",
          "examples": [
            [
              "LOGO",
              "Brand Name"
            ]
          ]
        },
        "terminologies": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "src": {
                "type": "string",
                "description": "Source-language term",
                "examples": [
                  "接口"
                ]
              },
              "tgt": {
                "type": "string",
                "description": "Target-language term",
                "examples": [
                  "API"
                ]
              }
            },
            "required": [
              "src",
              "tgt"
            ]
          },
          "maxItems": 50,
          "description": "Terminology override list specifying translations for specific words",
          "examples": [
            [
              {
                "src": "接口",
                "tgt": "API"
              }
            ]
          ]
        },
        "skipImgSegment": {
          "type": "boolean",
          "description": "Whether to skip image subject segmentation and translate all text when skipped",
          "examples": [
            false
          ]
        }
      },
      "required": [
        "imageURL",
        "targetLang"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "cosyvoice_tts_generate",
    "method": "POST",
    "path": "/v1/cosyvoice-tts/action/generate",
    "tag": "cosyvoice-tts",
    "description": "Generate speech audio with CosyVoice TTS.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "anyOf": [
            {
              "const": "cosyvoice-v3.5-plus",
              "description": "CosyVoice v3.5 Plus model."
            },
            {
              "const": "cosyvoice-v3.5-flash",
              "description": "CosyVoice v3.5 Flash model."
            },
            {
              "const": "cosyvoice-v3-plus",
              "description": "CosyVoice v3 Plus model."
            },
            {
              "const": "cosyvoice-v3-flash",
              "description": "CosyVoice v3 Flash model."
            },
            {
              "const": "cosyvoice-v2",
              "description": "CosyVoice v2 model."
            }
          ],
          "default": "cosyvoice-v3-flash",
          "description": "Speech synthesis model. Different models support different voices.",
          "examples": [
            "cosyvoice-v3-flash"
          ]
        },
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Text content to synthesize into speech. SSML and LaTeX are supported.",
          "examples": [
            "我家的后面有一个很大的园。"
          ]
        },
        "voice": {
          "type": "string",
          "minLength": 1,
          "description": "Voice name, cloned voice ID, or voice design name compatible with the selected model.",
          "examples": [
            "longanyang"
          ]
        },
        "format": {
          "type": "string",
          "enum": [
            "mp3",
            "pcm",
            "wav",
            "opus"
          ],
          "description": "Audio encoding format.",
          "examples": [
            "wav"
          ]
        },
        "sampleRate": {
          "type": "integer",
          "enum": [
            8000,
            16000,
            22050,
            24000,
            44100,
            48000
          ],
          "description": "Audio sample rate in Hz.",
          "examples": [
            24000
          ]
        },
        "volume": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100,
          "description": "Audio volume. Use 50 for standard volume.",
          "examples": [
            50
          ]
        },
        "rate": {
          "type": "number",
          "minimum": 0.5,
          "maximum": 2,
          "description": "Speech rate. Use 1.0 for standard speed.",
          "examples": [
            1
          ]
        },
        "bitRate": {
          "type": "integer",
          "minimum": 6,
          "maximum": 510,
          "description": "Audio bit rate in kbps. Only opus format supports this field.",
          "examples": [
            32
          ]
        },
        "pitch": {
          "type": "number",
          "minimum": 0.5,
          "maximum": 2,
          "description": "Speech pitch. Use 1.0 for natural pitch.",
          "examples": [
            1
          ]
        },
        "enableSSML": {
          "type": "boolean",
          "description": "Whether to enable SSML parsing.",
          "examples": [
            false
          ]
        },
        "wordTimestampEnabled": {
          "type": "boolean",
          "description": "Whether to include word-level timestamps.",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 65535,
          "description": "Random seed used for generation.",
          "examples": [
            42
          ]
        },
        "languageHints": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "zh",
              "en",
              "fr",
              "de",
              "ja",
              "ko",
              "ru",
              "pt",
              "th",
              "id",
              "vi"
            ],
            "description": "Target language hint."
          },
          "maxItems": 1,
          "description": "Target language hints. The current API recommends passing at most one value.",
          "examples": [
            [
              "zh"
            ]
          ]
        },
        "instruction": {
          "type": "string",
          "minLength": 1,
          "description": "Instruction that controls dialect, emotion, role, or other synthesis style.",
          "examples": [
            "Use a natural and friendly conversational style."
          ]
        },
        "enableAIGCTag": {
          "type": "boolean",
          "description": "Whether to add an invisible AIGC tag to the generated audio.",
          "examples": [
            false
          ]
        },
        "AIGCPropagator": {
          "type": "string",
          "minLength": 1,
          "description": "ContentPropagator value for the invisible AIGC tag.",
          "examples": [
            "oomol"
          ]
        },
        "AIGCPropagateID": {
          "type": "string",
          "minLength": 1,
          "description": "PropagateID value for the invisible AIGC tag.",
          "examples": [
            "propagate-123"
          ]
        },
        "hotFix": {
          "type": "object",
          "description": "Text hotfix configuration for pronunciation and replacement.",
          "properties": {
            "pronunciation": {
              "type": "array",
              "items": {
                "type": "object",
                "additionalProperties": {
                  "type": "string",
                  "minLength": 1,
                  "description": "Replacement value."
                },
                "description": "Pronunciation mapping."
              },
              "description": "Custom pronunciation mappings."
            },
            "replace": {
              "type": "array",
              "items": {
                "type": "object",
                "additionalProperties": {
                  "type": "string",
                  "minLength": 1,
                  "description": "Replacement value."
                },
                "description": "Text replacement mapping."
              },
              "description": "Text replacement mappings."
            }
          }
        },
        "enableMarkdownFilter": {
          "type": "boolean",
          "description": "Whether to enable Markdown filtering.",
          "examples": [
            false
          ]
        }
      },
      "required": [
        "text",
        "voice"
      ],
      "allOf": [
        {
          "if": {
            "required": [
              "bitRate"
            ],
            "properties": {
              "format": {
                "not": {
                  "const": "opus"
                }
              }
            }
          },
          "then": false
        },
        {
          "if": {
            "anyOf": [
              {
                "required": [
                  "AIGCPropagator"
                ]
              },
              {
                "required": [
                  "AIGCPropagateID"
                ]
              }
            ],
            "properties": {
              "enableAIGCTag": {
                "not": {
                  "const": true
                }
              }
            }
          },
          "then": false
        }
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Generated CosyVoice TTS audio information.",
      "properties": {
        "requestID": {
          "type": "string",
          "description": "Unique request identifier."
        },
        "finishReason": {
          "type": "string",
          "description": "Reason the generation stopped."
        },
        "audioData": {
          "type": "string",
          "description": "Base64 encoded audio data."
        },
        "audioURL": {
          "type": "string",
          "description": "Temporary URL for the generated audio."
        },
        "audioID": {
          "type": "string",
          "description": "Generated audio information ID."
        },
        "expiresAt": {
          "type": "number",
          "description": "Expiration timestamp for the audio URL."
        },
        "usage": {
          "type": "object",
          "description": "Character usage information.",
          "properties": {
            "characters": {
              "type": "number",
              "description": "Billable character count for this request."
            }
          }
        }
      },
      "required": [
        "requestID"
      ],
      "anyOf": [
        {
          "required": [
            "audioData"
          ]
        },
        {
          "required": [
            "audioURL"
          ]
        }
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_tts_generate",
    "method": "POST",
    "path": "/v1/qwen-tts/action/generate",
    "tag": "qwen-tts",
    "description": "Generate speech audio",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "qwen3-tts-instruct-flash",
            "qwen3-tts-flash",
            "qwen3-tts-vc-2026-01-22"
          ],
          "default": "qwen3-tts-flash",
          "description": "Model name.",
          "examples": [
            "qwen3-tts-flash"
          ]
        },
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Text content to synthesize into speech.",
          "examples": [
            "你好，欢迎使用千问语音合成服务。"
          ]
        },
        "voice": {
          "type": "string",
          "minLength": 1,
          "default": "Cherry",
          "description": "Preset voice name or cloned voice ID.",
          "examples": [
            "Cherry"
          ]
        },
        "languageType": {
          "type": "string",
          "enum": [
            "Auto",
            "Chinese",
            "English",
            "German",
            "Italian",
            "Portuguese",
            "Spanish",
            "Japanese",
            "Korean",
            "French",
            "Russian"
          ],
          "description": "Language type of the text.",
          "examples": [
            "Auto"
          ]
        },
        "instructions": {
          "type": "string",
          "minLength": 1,
          "description": "Speech performance control instruction, only available for instruct models.",
          "examples": [
            "Speak faster with an upbeat tone."
          ]
        },
        "optimizeInstructions": {
          "type": "boolean",
          "description": "Whether to optimize speech performance instructions, only available for instruct models.",
          "examples": [
            true
          ]
        }
      },
      "required": [
        "text"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "audioURL": {
          "type": "string",
          "description": "Temporary URL of the generated audio"
        },
        "expiresAt": {
          "type": "number",
          "description": "Expiration time of the audio URL"
        }
      },
      "required": [
        "audioURL"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_voice_design_create",
    "method": "POST",
    "path": "/v1/qwen-voice-design/action/create",
    "tag": "qwen-voice-design",
    "description": "Create a Qwen voice design voice and return preview audio.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "targetModel": {
          "anyOf": [
            {
              "const": "qwen3-tts-vd-2026-01-26",
              "description": "Qwen voice design TTS model."
            }
          ],
          "default": "qwen3-tts-vd-2026-01-26",
          "description": "Speech synthesis model that drives the designed voice.",
          "examples": [
            "qwen3-tts-vd-2026-01-26"
          ]
        },
        "voicePrompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "description": "Voice description. Only Chinese and English are supported.",
          "examples": [
            "A calm middle-aged male news anchor with a deep magnetic voice and steady pacing."
          ]
        },
        "previewText": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1024,
          "description": "Text used for preview audio.",
          "examples": [
            "各位听众朋友，大家好，欢迎收听晚间新闻。"
          ]
        },
        "preferredName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 16,
          "pattern": "^[A-Za-z0-9_]+$",
          "description": "Short voice name. Only letters, numbers, and underscores are allowed.",
          "examples": [
            "announcer"
          ]
        },
        "language": {
          "anyOf": [
            {
              "const": "zh",
              "description": "Chinese."
            },
            {
              "const": "en",
              "description": "English."
            },
            {
              "const": "de",
              "description": "German."
            },
            {
              "const": "it",
              "description": "Italian."
            },
            {
              "const": "pt",
              "description": "Portuguese."
            },
            {
              "const": "es",
              "description": "Spanish."
            },
            {
              "const": "ja",
              "description": "Japanese."
            },
            {
              "const": "ko",
              "description": "Korean."
            },
            {
              "const": "fr",
              "description": "French."
            },
            {
              "const": "ru",
              "description": "Russian."
            }
          ],
          "default": "zh",
          "description": "Language tendency used for voice design.",
          "examples": [
            "zh"
          ]
        },
        "sampleRate": {
          "anyOf": [
            {
              "const": 8000,
              "description": "8 kHz sample rate."
            },
            {
              "const": 16000,
              "description": "16 kHz sample rate."
            },
            {
              "const": 24000,
              "description": "24 kHz sample rate."
            },
            {
              "const": 48000,
              "description": "48 kHz sample rate."
            }
          ],
          "default": 24000,
          "description": "Preview audio sample rate.",
          "examples": [
            24000
          ]
        },
        "responseFormat": {
          "anyOf": [
            {
              "const": "pcm",
              "description": "PCM audio."
            },
            {
              "const": "wav",
              "description": "WAV audio."
            },
            {
              "const": "mp3",
              "description": "MP3 audio."
            },
            {
              "const": "opus",
              "description": "Opus audio."
            }
          ],
          "default": "wav",
          "description": "Preview audio format.",
          "examples": [
            "wav"
          ]
        }
      },
      "required": [
        "voicePrompt",
        "previewText",
        "preferredName"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Created voice design voice and preview audio information.",
      "properties": {
        "voice": {
          "type": "string",
          "description": "Created voice name."
        },
        "targetModel": {
          "type": "string",
          "enum": [
            "qwen3-tts-vd-2026-01-26"
          ],
          "description": "Speech synthesis model that drives the designed voice."
        },
        "previewAudio": {
          "type": "object",
          "description": "Preview audio data.",
          "properties": {
            "data": {
              "type": "string",
              "description": "Base64 encoded preview audio data."
            },
            "sampleRate": {
              "type": "number",
              "description": "Preview audio sample rate."
            },
            "responseFormat": {
              "type": "string",
              "enum": [
                "pcm",
                "wav",
                "mp3",
                "opus"
              ],
              "description": "Preview audio format."
            }
          },
          "required": [
            "data"
          ]
        },
        "requestId": {
          "type": "string",
          "description": "Upstream request ID."
        }
      },
      "required": [
        "voice",
        "targetModel",
        "previewAudio",
        "requestId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_voice_design_generate",
    "method": "POST",
    "path": "/v1/qwen-voice-design/action/generate",
    "tag": "qwen-voice-design",
    "description": "Generate speech audio using a Qwen voice design voice.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Text content to synthesize into speech.",
          "examples": [
            "今天天气怎么样？"
          ]
        },
        "voice": {
          "type": "string",
          "minLength": 1,
          "description": "Voice name created by Qwen voice design.",
          "examples": [
            "qwen-tts-vd-announcer-voice-20251201102800-a1b2"
          ]
        },
        "model": {
          "anyOf": [
            {
              "const": "qwen3-tts-vd-2026-01-26",
              "description": "Qwen voice design TTS model."
            }
          ],
          "default": "qwen3-tts-vd-2026-01-26",
          "description": "Speech synthesis model for the voice design voice.",
          "examples": [
            "qwen3-tts-vd-2026-01-26"
          ]
        }
      },
      "required": [
        "text",
        "voice"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Generated voice design TTS audio information.",
      "properties": {
        "audioURL": {
          "type": "string",
          "description": "Temporary URL for the generated audio."
        },
        "expiresAt": {
          "type": "number",
          "description": "Expiration timestamp for the audio URL."
        },
        "requestId": {
          "type": "string",
          "description": "Upstream request ID."
        }
      },
      "required": [
        "audioURL",
        "requestId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_voice_design_list",
    "method": "POST",
    "path": "/v1/qwen-voice-design/action/list",
    "tag": "qwen-voice-design",
    "description": "List Qwen voice design voices.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "pageIndex": {
          "type": "integer",
          "minimum": 0,
          "maximum": 200,
          "default": 0,
          "description": "Page index.",
          "examples": [
            0
          ]
        },
        "pageSize": {
          "type": "integer",
          "exclusiveMinimum": 0,
          "default": 10,
          "description": "Number of voices per page.",
          "examples": [
            10
          ]
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "description": "Paginated voice design voice list.",
      "properties": {
        "pageIndex": {
          "type": "number",
          "description": "Page index."
        },
        "pageSize": {
          "type": "number",
          "description": "Number of voices per page."
        },
        "totalCount": {
          "type": "number",
          "description": "Total number of matched voices."
        },
        "voices": {
          "type": "array",
          "description": "Voice list.",
          "items": {
            "type": "object",
            "description": "Voice design voice information.",
            "properties": {
              "voice": {
                "type": "string",
                "description": "Voice name."
              },
              "targetModel": {
                "type": "string",
                "enum": [
                  "qwen3-tts-vd-2026-01-26"
                ],
                "description": "Speech synthesis model that drives the designed voice."
              },
              "language": {
                "type": "string",
                "enum": [
                  "zh",
                  "en",
                  "de",
                  "it",
                  "pt",
                  "es",
                  "ja",
                  "ko",
                  "fr",
                  "ru"
                ],
                "description": "Language code."
              },
              "voicePrompt": {
                "type": "string",
                "description": "Voice description."
              },
              "previewText": {
                "type": "string",
                "description": "Preview text."
              },
              "createdAt": {
                "type": "string",
                "description": "Voice creation time."
              },
              "updatedAt": {
                "type": "string",
                "description": "Voice update time."
              }
            },
            "required": [
              "voice",
              "targetModel"
            ]
          }
        },
        "requestId": {
          "type": "string",
          "description": "Upstream request ID."
        }
      },
      "required": [
        "pageIndex",
        "pageSize",
        "totalCount",
        "voices",
        "requestId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_voice_design_query",
    "method": "POST",
    "path": "/v1/qwen-voice-design/action/query",
    "tag": "qwen-voice-design",
    "description": "Get details for a Qwen voice design voice.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "voice": {
          "type": "string",
          "minLength": 1,
          "description": "Voice name.",
          "examples": [
            "qwen-tts-vd-announcer-voice-20251201102800-a1b2"
          ]
        }
      },
      "required": [
        "voice"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Voice design voice information.",
      "properties": {
        "voice": {
          "type": "string",
          "description": "Voice name."
        },
        "targetModel": {
          "type": "string",
          "enum": [
            "qwen3-tts-vd-2026-01-26"
          ],
          "description": "Speech synthesis model that drives the designed voice."
        },
        "language": {
          "type": "string",
          "enum": [
            "zh",
            "en",
            "de",
            "it",
            "pt",
            "es",
            "ja",
            "ko",
            "fr",
            "ru"
          ],
          "description": "Language code."
        },
        "voicePrompt": {
          "type": "string",
          "description": "Voice description."
        },
        "previewText": {
          "type": "string",
          "description": "Preview text."
        },
        "createdAt": {
          "type": "string",
          "description": "Voice creation time."
        },
        "updatedAt": {
          "type": "string",
          "description": "Voice update time."
        },
        "requestId": {
          "type": "string",
          "description": "Upstream request ID."
        }
      },
      "required": [
        "voice",
        "targetModel",
        "requestId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_voice_design_delete",
    "method": "POST",
    "path": "/v1/qwen-voice-design/action/delete",
    "tag": "qwen-voice-design",
    "description": "Delete a Qwen voice design voice.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "voice": {
          "type": "string",
          "minLength": 1,
          "description": "Voice name.",
          "examples": [
            "qwen-tts-vd-announcer-voice-20251201102800-a1b2"
          ]
        }
      },
      "required": [
        "voice"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Deleted voice design voice information.",
      "properties": {
        "voice": {
          "type": "string",
          "description": "Deleted voice name."
        },
        "requestId": {
          "type": "string",
          "description": "Upstream request ID."
        }
      },
      "required": [
        "voice",
        "requestId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "qwen_voice_cloning_create",
    "method": "POST",
    "path": "/v1/qwen-voice-cloning/action/create",
    "tag": "qwen-voice-cloning",
    "description": "Create a Qwen voice cloning voice and return a preview audio URL.",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "targetModel": {
          "type": "string",
          "enum": [
            "qwen3-tts-vc-realtime-2026-01-15",
            "qwen3-tts-vc-realtime-2025-11-27",
            "qwen3-tts-vc-2026-01-22"
          ],
          "default": "qwen3-tts-vc-2026-01-22",
          "description": "Speech synthesis model that drives the cloned voice.",
          "examples": [
            "qwen3-tts-vc-2026-01-22"
          ]
        },
        "preferredName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 16,
          "description": "Short voice name used to identify the cloned voice.",
          "examples": [
            "guanyu"
          ]
        },
        "audioData": {
          "type": "string",
          "minLength": 1,
          "description": "Source audio data for cloning. Use a data URL or a public HTTPS URL.",
          "examples": [
            "data:audio/mpeg;base64,AAAA"
          ]
        },
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Transcript matching the source audio content.",
          "examples": [
            "你好，欢迎使用声音复刻服务。"
          ]
        },
        "previewText": {
          "type": "string",
          "minLength": 1,
          "description": "Text used to generate the preview audio.",
          "examples": [
            "你好，欢迎使用声音复刻服务。"
          ]
        },
        "language": {
          "type": "string",
          "enum": [
            "zh",
            "en",
            "de",
            "it",
            "pt",
            "es",
            "ja",
            "ko",
            "fr",
            "ru"
          ],
          "description": "Language of the source audio.",
          "examples": [
            "zh"
          ]
        }
      },
      "required": [
        "preferredName",
        "audioData",
        "previewText"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Created cloned voice and preview audio information.",
      "properties": {
        "voiceId": {
          "type": "string",
          "description": "Created cloned voice ID."
        },
        "targetModel": {
          "type": "string",
          "enum": [
            "qwen3-tts-vc-realtime-2026-01-15",
            "qwen3-tts-vc-realtime-2025-11-27",
            "qwen3-tts-vc-2026-01-22"
          ],
          "description": "Speech synthesis model that drives the cloned voice."
        },
        "audioURL": {
          "type": "string",
          "description": "Temporary URL for the generated preview audio."
        },
        "expiresAt": {
          "type": "number",
          "description": "Expiration timestamp for the preview audio URL."
        },
        "requestId": {
          "type": "string",
          "description": "Upstream request ID."
        }
      },
      "required": [
        "voiceId",
        "targetModel",
        "audioURL",
        "requestId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "seedance_video_result",
    "method": "GET",
    "path": "/v1/seedance-video/result/{sessionID}",
    "tag": "seedance-video",
    "description": "Query a Seedance video generation task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "description": "Seedance video generation result data.",
              "properties": {
                "taskId": {
                  "type": "string",
                  "description": "Upstream task ID"
                },
                "model": {
                  "type": "string",
                  "description": "Model used for the task"
                },
                "videoURL": {
                  "type": "string",
                  "description": "Generated video URL"
                },
                "lastFrameURL": {
                  "type": "string",
                  "description": "Generated last-frame image URL"
                },
                "seed": {
                  "type": "number",
                  "description": "Seed used for this request"
                },
                "resolution": {
                  "type": "string",
                  "enum": [
                    "480p",
                    "720p",
                    "1080p"
                  ],
                  "description": "Generated video resolution"
                },
                "ratio": {
                  "type": "string",
                  "enum": [
                    "16:9",
                    "4:3",
                    "1:1",
                    "3:4",
                    "9:16",
                    "21:9",
                    "adaptive"
                  ],
                  "description": "Generated video aspect ratio"
                },
                "duration": {
                  "type": "number",
                  "description": "Generated video duration in seconds"
                },
                "frames": {
                  "type": "number",
                  "description": "Generated video frame count"
                },
                "framesPerSecond": {
                  "type": "number",
                  "description": "Generated video frame rate"
                },
                "generateAudio": {
                  "type": "boolean",
                  "description": "Whether the generated video includes synchronized audio"
                },
                "tools": {
                  "type": "array",
                  "description": "Tools used by the model",
                  "items": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "web_search"
                        ],
                        "description": "Tool type",
                        "examples": [
                          "web_search"
                        ]
                      }
                    },
                    "required": [
                      "type"
                    ]
                  }
                },
                "safetyIdentifier": {
                  "type": "string",
                  "description": "Unique end-user identifier"
                },
                "serviceTier": {
                  "type": "string",
                  "description": "Service tier used to process the task"
                },
                "executionExpiresAfter": {
                  "type": "number",
                  "description": "Task expiration threshold in seconds"
                },
                "createdAt": {
                  "type": "number",
                  "description": "Task creation time"
                },
                "updatedAt": {
                  "type": "number",
                  "description": "Task update time"
                },
                "usage": {
                  "type": "object",
                  "description": "Token usage",
                  "properties": {
                    "completionTokens": {
                      "type": "number",
                      "description": "Token count charged for the output video"
                    },
                    "totalTokens": {
                      "type": "number",
                      "description": "Total token count consumed by this request"
                    },
                    "toolUsage": {
                      "type": "object",
                      "description": "Tool usage information",
                      "properties": {
                        "webSearch": {
                          "type": "number",
                          "description": "Number of web search tool calls"
                        }
                      }
                    }
                  }
                }
              },
              "required": [
                "taskId",
                "model",
                "videoURL"
              ]
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "seedance_video_state",
    "method": "GET",
    "path": "/v1/seedance-video/state/{sessionID}",
    "tag": "seedance-video",
    "description": "Get a Seedance video generation task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "seedance_video_submit",
    "method": "POST",
    "path": "/v1/seedance-video/submit",
    "tag": "seedance-video",
    "description": "Generate videos with Doubao Seedance",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "doubao-seedance-2-0-260128",
            "doubao-seedance-2-0-fast-260128"
          ],
          "default": "doubao-seedance-2-0-260128",
          "description": "Video generation model",
          "examples": [
            "doubao-seedance-2-0-260128"
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000,
          "description": "Video generation prompt",
          "examples": [
            "一只小猫在窗边晒太阳，镜头缓慢推进。"
          ]
        },
        "images": {
          "type": "array",
          "maxItems": 9,
          "default": [],
          "description": "Reference, first-frame, or last-frame images",
          "items": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "minLength": 1,
                "description": "Image URL, Base64-encoded data, or asset ID",
                "examples": [
                  "https://example.com/image.png"
                ]
              },
              "role": {
                "type": "string",
                "enum": [
                  "first_frame",
                  "last_frame",
                  "reference_image"
                ],
                "default": "first_frame",
                "description": "Image role",
                "examples": [
                  "first_frame"
                ]
              }
            },
            "required": [
              "url"
            ]
          }
        },
        "videos": {
          "type": "array",
          "maxItems": 3,
          "default": [],
          "description": "Reference videos. Only reference_video is supported.",
          "items": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "minLength": 1,
                "description": "Video URL or asset ID",
                "examples": [
                  "https://example.com/video.mp4"
                ]
              },
              "role": {
                "type": "string",
                "enum": [
                  "reference_video"
                ],
                "default": "reference_video",
                "description": "Video role",
                "examples": [
                  "reference_video"
                ]
              }
            },
            "required": [
              "url"
            ]
          }
        },
        "audios": {
          "type": "array",
          "maxItems": 3,
          "default": [],
          "description": "Reference audio files. Only reference_audio is supported.",
          "items": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "minLength": 1,
                "description": "Audio URL, Base64-encoded data, or asset ID",
                "examples": [
                  "https://example.com/audio.mp3"
                ]
              },
              "role": {
                "type": "string",
                "enum": [
                  "reference_audio"
                ],
                "default": "reference_audio",
                "description": "Audio role",
                "examples": [
                  "reference_audio"
                ]
              }
            },
            "required": [
              "url"
            ]
          }
        },
        "returnLastFrame": {
          "type": "boolean",
          "default": false,
          "description": "Whether to return the generated video's last-frame image",
          "examples": [
            false
          ]
        },
        "executionExpiresAfter": {
          "type": "integer",
          "minimum": 3600,
          "maximum": 259200,
          "description": "Task expiration threshold in seconds",
          "examples": [
            172800
          ]
        },
        "generateAudio": {
          "type": "boolean",
          "default": true,
          "description": "Whether the generated video should include synchronized audio",
          "examples": [
            true
          ]
        },
        "tools": {
          "type": "array",
          "description": "Tools the model may call",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "web_search"
                ],
                "description": "Tool type",
                "examples": [
                  "web_search"
                ]
              }
            },
            "required": [
              "type"
            ]
          }
        },
        "safetyIdentifier": {
          "type": "string",
          "minLength": 1,
          "maxLength": 64,
          "description": "Unique end-user identifier",
          "examples": [
            "user-123"
          ]
        },
        "resolution": {
          "type": "string",
          "enum": [
            "480p",
            "720p",
            "1080p"
          ],
          "default": "720p",
          "description": "Video resolution",
          "examples": [
            "720p"
          ]
        },
        "ratio": {
          "type": "string",
          "enum": [
            "16:9",
            "4:3",
            "1:1",
            "3:4",
            "9:16",
            "21:9",
            "adaptive"
          ],
          "default": "adaptive",
          "description": "Generated video aspect ratio",
          "examples": [
            "adaptive"
          ]
        },
        "duration": {
          "anyOf": [
            {
              "type": "integer",
              "const": -1,
              "description": "Let the model choose the duration automatically."
            },
            {
              "type": "integer",
              "minimum": 4,
              "maximum": 15,
              "description": "Explicit video duration in seconds."
            }
          ],
          "default": 5,
          "description": "Video duration in seconds. Use -1 to let the model choose automatically.",
          "examples": [
            5
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": -1,
          "maximum": 4294967295,
          "description": "Random seed",
          "examples": [
            42
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add a watermark",
          "examples": [
            false
          ]
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "text_to_epub_illustrate_generate",
    "method": "POST",
    "path": "/v1/text-to-epub-illustrate/action/generate",
    "tag": "text-to-epub-illustrate",
    "description": "Generate illustrations for EPUB content",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000,
          "description": "Text prompt for image generation",
          "examples": [
            "一只在星空下奔跑的白色独角兽"
          ]
        },
        "image": {
          "type": "string",
          "description": "Reference image URL or Base64 encoding for image-to-image generation",
          "examples": [
            "https://example.com/reference.jpg"
          ]
        },
        "size": {
          "anyOf": [
            {
              "type": "string",
              "enum": [
                "1K",
                "2K",
                "4K",
                "1k",
                "2k",
                "4k"
              ],
              "description": "Descriptive size supporting 1K, 2K, and 4K resolutions",
              "examples": [
                "2K"
              ]
            },
            {
              "type": "object",
              "properties": {
                "width": {
                  "type": "integer",
                  "exclusiveMinimum": 0,
                  "description": "Image width in pixels",
                  "examples": [
                    2048
                  ]
                },
                "height": {
                  "type": "integer",
                  "exclusiveMinimum": 0,
                  "description": "Image height in pixels",
                  "examples": [
                    2048
                  ]
                }
              },
              "required": [
                "width",
                "height"
              ]
            }
          ],
          "default": "2048x2048",
          "description": "Image size, supporting descriptive sizes (1K/2K/4K) or explicit width and height in pixels"
        },
        "multiple": {
          "type": "string",
          "enum": [
            "disabled",
            "auto"
          ],
          "default": "disabled",
          "description": "Whether to enable multi-image generation mode; auto lets the model decide",
          "examples": [
            "disabled"
          ]
        },
        "maxCount": {
          "type": "number",
          "minimum": 1,
          "maximum": 15,
          "default": 1,
          "description": "Maximum number of images to generate in one request, only effective in multi-image mode",
          "examples": [
            1
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": true,
          "description": "Whether to add a watermark",
          "examples": [
            true
          ]
        },
        "optionsnew": {
          "type": "string",
          "enum": [
            "standard",
            "fast"
          ],
          "default": "standard",
          "description": "Generation mode: standard prioritizes quality, fast prioritizes speed",
          "examples": [
            "standard"
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "tinify_png_shrink_compress",
    "method": "POST",
    "path": "/v1/tinify-png-shrink/action/compress",
    "tag": "tinify-png-shrink",
    "description": "Compress PNG images with the Tinify API",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "imageURL": {
          "type": "string",
          "minLength": 1,
          "description": "URL of the original image to compress, supporting PNG, JPEG, and WebP formats",
          "examples": [
            "https://example.com/photo.png"
          ]
        }
      },
      "required": [
        "imageURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Business result of the synchronous action.",
      "additionalProperties": true
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "wanx_i2v_video_result",
    "method": "GET",
    "path": "/v1/wanx-i2v-video/result/{sessionID}",
    "tag": "wanx-i2v-video",
    "description": "Query first-frame-to-video task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "string",
              "description": "Upstream task ID"
            },
            "videoURL": {
              "type": "string",
              "description": "Generated video URL"
            },
            "origPrompt": {
              "type": "string",
              "description": "Original prompt"
            },
            "actualPrompt": {
              "type": "string",
              "description": "Effective prompt"
            },
            "duration": {
              "type": "number",
              "description": "Billable duration in seconds"
            },
            "outputVideoDuration": {
              "type": "number",
              "description": "Output video duration in seconds"
            },
            "resolution": {
              "type": "string",
              "enum": [
                "720P",
                "1080P"
              ],
              "description": "Output video resolution"
            },
            "audio": {
              "type": "boolean",
              "description": "Whether the output video contains audio"
            }
          },
          "required": [
            "taskId",
            "videoURL",
            "resolution",
            "audio"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_i2v_video_state",
    "method": "GET",
    "path": "/v1/wanx-i2v-video/state/{sessionID}",
    "tag": "wanx-i2v-video",
    "description": "Get wanx-i2v-video task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_i2v_video_submit",
    "method": "POST",
    "path": "/v1/wanx-i2v-video/submit",
    "tag": "wanx-i2v-video",
    "description": "Generate videos from the first frame with Tongyi Wanxiang",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "wan2.6-i2v-flash",
            "wan2.6-i2v"
          ],
          "default": "wan2.6-i2v-flash",
          "description": "Model name",
          "examples": [
            "wan2.6-i2v-flash"
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1500,
          "description": "Video generation prompt",
          "examples": [
            "一只橘猫在窗台上伸懒腰，阳光洒满房间"
          ]
        },
        "imageURL": {
          "type": "string",
          "minLength": 1,
          "description": "First-frame image URL or Base64-encoded data",
          "examples": [
            "https://example.com/first-frame.png"
          ]
        },
        "negativePrompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 500,
          "description": "Negative prompt describing content to avoid",
          "examples": [
            "低画质，模糊，抖动"
          ]
        },
        "audio": {
          "type": "boolean",
          "default": true,
          "description": "Whether to generate video with audio; only flash models support disabling audio",
          "examples": [
            false
          ]
        },
        "audioURL": {
          "type": "string",
          "format": "uri",
          "description": "Custom audio file URL, used only when audio is needed",
          "examples": [
            "https://example.com/audio.mp3"
          ]
        },
        "duration": {
          "type": "integer",
          "minimum": 2,
          "maximum": 15,
          "default": 5,
          "description": "Output video duration in seconds",
          "examples": [
            5
          ]
        },
        "resolution": {
          "type": "string",
          "enum": [
            "720P",
            "1080P"
          ],
          "default": "1080P",
          "description": "Output video resolution",
          "examples": [
            "1080P"
          ]
        },
        "promptExtend": {
          "type": "boolean",
          "default": true,
          "description": "Whether to enable intelligent prompt rewriting",
          "examples": [
            true
          ]
        },
        "shotType": {
          "type": "string",
          "enum": [
            "single",
            "multi"
          ],
          "description": "Shot type, effective when intelligent prompt rewriting is enabled",
          "examples": [
            "multi"
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add an AI-generated watermark",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Random seed; fixed seeds can reproduce results",
          "examples": [
            42
          ]
        }
      },
      "required": [
        "imageURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "wanx_image_result",
    "method": "GET",
    "path": "/v1/wanx-image/result/{sessionID}",
    "tag": "wanx-image",
    "description": "Get wanx-image task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_image_state",
    "method": "GET",
    "path": "/v1/wanx-image/state/{sessionID}",
    "tag": "wanx-image",
    "description": "Get wanx-image task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_image_submit",
    "method": "POST",
    "path": "/v1/wanx-image/submit",
    "tag": "wanx-image",
    "description": "Generate and edit images with Tongyi Wanxiang AI",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "wan2.6-image"
          ],
          "default": "wan2.6-image",
          "description": "Model name",
          "examples": [
            "wan2.6-image"
          ]
        },
        "mode": {
          "type": "string",
          "enum": [
            "image-edit",
            "interleave"
          ],
          "default": "image-edit",
          "description": "Image generation mode: image-edit for image editing, interleave for mixed text-image layout",
          "examples": [
            "image-edit"
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2000,
          "description": "Positive prompt describing the desired generated image content",
          "examples": [
            "生成一只在花园中奔跑的金毛犬"
          ]
        },
        "imageURLs": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uri"
          },
          "minItems": 0,
          "maxItems": 4,
          "description": "Array of input image URLs; edit mode requires 1-4 images, interleave mode allows 0-1 images",
          "examples": [
            [
              "https://example.com/input.png"
            ]
          ]
        },
        "negativePrompt": {
          "type": "string",
          "maxLength": 500,
          "description": "Negative prompt describing content to avoid",
          "examples": [
            "低画质，模糊，畸形"
          ]
        },
        "size": {
          "type": "string"
        },
        "n": {
          "type": "integer",
          "minimum": 1,
          "maximum": 4,
          "default": 4,
          "description": "Number of images to generate: 1-4 in edit mode, fixed at 1 in interleave mode",
          "examples": [
            1
          ]
        },
        "maxImages": {
          "type": "integer",
          "minimum": 1,
          "maximum": 5,
          "description": "Maximum number of generated images in mixed-layout mode, only effective in interleave mode",
          "examples": [
            3
          ]
        },
        "promptExtend": {
          "type": "boolean",
          "default": true,
          "description": "Whether to enable intelligent prompt rewriting, only effective in edit mode",
          "examples": [
            true
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add an AI-generated watermark",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Random seed; fixed seeds can reproduce results",
          "examples": [
            42
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "wanx_kf2v_video_result",
    "method": "GET",
    "path": "/v1/wanx-kf2v-video/result/{sessionID}",
    "tag": "wanx-kf2v-video",
    "description": "Get wanx-kf2v-video task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "description": "The task is completed.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "completed"
              ],
              "description": "Task state."
            },
            "data": {
              "type": "object",
              "additionalProperties": true,
              "description": "Task result data."
            }
          },
          "required": [
            "state",
            "data"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_kf2v_video_state",
    "method": "GET",
    "path": "/v1/wanx-kf2v-video/state/{sessionID}",
    "tag": "wanx-kf2v-video",
    "description": "Get wanx-kf2v-video task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_kf2v_video_submit",
    "method": "POST",
    "path": "/v1/wanx-kf2v-video/submit",
    "tag": "wanx-kf2v-video",
    "description": "Generate videos from keyframes with Tongyi Wanxiang",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "wan2.2-kf2v-flash",
            "wanx2.1-kf2v-plus"
          ],
          "default": "wan2.2-kf2v-flash",
          "description": "Model name",
          "examples": [
            "wan2.2-kf2v-flash"
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 800,
          "description": "Text prompt describing the video transition process",
          "examples": [
            "镜头从平视逐渐上升，展现城市全景"
          ]
        },
        "firstFrameURL": {
          "type": "string",
          "format": "uri",
          "description": "First-frame image URL, which determines the video aspect ratio",
          "examples": [
            "https://example.com/first-frame.png"
          ]
        },
        "lastFrameURL": {
          "type": "string",
          "format": "uri",
          "description": "Last-frame image URL, used with the first frame to generate a transition video",
          "examples": [
            "https://example.com/last-frame.png"
          ]
        },
        "negativePrompt": {
          "type": "string",
          "maxLength": 500,
          "description": "Negative prompt describing content to avoid",
          "examples": [
            "低画质，模糊"
          ]
        },
        "template": {
          "type": "string",
          "description": "Video effect template name; prompt and last frame are not required when using a template",
          "examples": [
            "hanfu-1"
          ]
        },
        "resolution": {
          "type": "string",
          "enum": [
            "480P",
            "720P",
            "1080P"
          ],
          "default": "720P",
          "description": "Generated video resolution tier",
          "examples": [
            "720P"
          ]
        },
        "promptExtend": {
          "type": "boolean",
          "default": true,
          "description": "Whether to enable intelligent prompt rewriting",
          "examples": [
            true
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add a watermark",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Random seed; fixed seeds can reproduce results",
          "examples": [
            42
          ]
        }
      },
      "required": [
        "firstFrameURL"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "wanx_r2v_video_result",
    "method": "GET",
    "path": "/v1/wanx-r2v-video/result/{sessionID}",
    "tag": "wanx-r2v-video",
    "description": "Query reference-to-video task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "string",
              "description": "Upstream task ID"
            },
            "videoURL": {
              "type": "string",
              "description": "Generated video URL"
            },
            "origPrompt": {
              "type": "string",
              "description": "Original prompt"
            },
            "duration": {
              "type": "number",
              "description": "Total billable duration in seconds"
            },
            "inputVideoDuration": {
              "type": "number",
              "description": "Total input reference video duration in seconds"
            },
            "outputVideoDuration": {
              "type": "number",
              "description": "Output video duration in seconds"
            },
            "size": {
              "type": "string",
              "enum": [
                "1280*720",
                "720*1280",
                "960*960",
                "1088*832",
                "832*1088",
                "1920*1080",
                "1080*1920",
                "1440*1440",
                "1632*1248",
                "1248*1632"
              ],
              "description": "Output video resolution"
            },
            "resolution": {
              "type": "string",
              "enum": [
                "720P",
                "1080P"
              ],
              "description": "Output video resolution tier"
            },
            "audio": {
              "type": "boolean",
              "description": "Whether the output video contains audio"
            }
          },
          "required": [
            "taskId",
            "videoURL",
            "resolution",
            "audio"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_r2v_video_state",
    "method": "GET",
    "path": "/v1/wanx-r2v-video/state/{sessionID}",
    "tag": "wanx-r2v-video",
    "description": "Get wanx-r2v-video task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_r2v_video_submit",
    "method": "POST",
    "path": "/v1/wanx-r2v-video/submit",
    "tag": "wanx-r2v-video",
    "description": "Generate videos from reference assets with Tongyi Wanxiang",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "model": {
          "type": "string",
          "enum": [
            "wan2.6-r2v-flash",
            "wan2.6-r2v"
          ],
          "default": "wan2.6-r2v-flash",
          "description": "Model name",
          "examples": [
            "wan2.6-r2v-flash"
          ]
        },
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1500,
          "description": "Video generation prompt; use identifiers such as character1 to reference characters",
          "examples": [
            "character1 在咖啡馆里和 character2 开心聊天。"
          ]
        },
        "referenceURLs": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1,
          "maxItems": 5,
          "description": "Array of reference image or video URLs, ordered from character1 to characterN",
          "examples": [
            [
              "https://example.com/character1.mp4",
              "https://example.com/character2.png"
            ]
          ]
        },
        "negativePrompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 500,
          "description": "Negative prompt describing content to avoid",
          "examples": [
            "低分辨率，错误，最差质量"
          ]
        },
        "size": {
          "type": "string",
          "enum": [
            "1280*720",
            "720*1280",
            "960*960",
            "1088*832",
            "832*1088",
            "1920*1080",
            "1080*1920",
            "1440*1440",
            "1632*1248",
            "1248*1632"
          ],
          "default": "1920*1080",
          "description": "Output video resolution; explicit width and height are required",
          "examples": [
            "1920*1080"
          ]
        },
        "duration": {
          "type": "integer",
          "minimum": 2,
          "maximum": 10,
          "default": 5,
          "description": "Output video duration in seconds",
          "examples": [
            5
          ]
        },
        "shotType": {
          "type": "string",
          "enum": [
            "single",
            "multi"
          ],
          "description": "Shot type: single for a single shot, multi for multiple shots",
          "examples": [
            "multi"
          ]
        },
        "audio": {
          "type": "boolean",
          "default": true,
          "description": "Whether to generate video with audio; only flash models support disabling audio",
          "examples": [
            false
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add an AI-generated watermark",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Random seed; fixed seeds can reproduce results",
          "examples": [
            42
          ]
        }
      },
      "required": [
        "prompt",
        "referenceURLs"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  },
  {
    "actionName": "wanx_t2v_video_result",
    "method": "GET",
    "path": "/v1/wanx-t2v-video/result/{sessionID}",
    "tag": "wanx-t2v-video",
    "description": "Query text-to-video task result",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "string",
              "description": "Upstream task ID"
            },
            "videoURL": {
              "type": "string",
              "description": "Generated video URL"
            },
            "origPrompt": {
              "type": "string",
              "description": "Original prompt"
            },
            "duration": {
              "type": "number",
              "description": "Total billable duration in seconds"
            },
            "inputVideoDuration": {
              "type": "number",
              "default": 0,
              "description": "Input video duration, fixed at 0 for text-to-video"
            },
            "outputVideoDuration": {
              "type": "number",
              "description": "Output video duration in seconds"
            },
            "size": {
              "type": "string",
              "enum": [
                "1280*720",
                "720*1280",
                "960*960",
                "1088*832",
                "832*1088",
                "1920*1080",
                "1080*1920",
                "1440*1440",
                "1632*1248",
                "1248*1632"
              ],
              "description": "Output video resolution"
            },
            "resolution": {
              "type": "string",
              "enum": [
                "720P",
                "1080P"
              ],
              "description": "Output video resolution tier"
            },
            "audio": {
              "type": "boolean",
              "description": "Whether the output video contains audio"
            }
          },
          "required": [
            "taskId",
            "videoURL",
            "resolution",
            "audio"
          ]
        },
        {
          "type": "object",
          "description": "The task is processing.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "processing"
              ],
              "description": "Task state."
            },
            "progress": {
              "type": "number",
              "description": "Task progress."
            }
          },
          "required": [
            "state",
            "progress"
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      202,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_t2v_video_state",
    "method": "GET",
    "path": "/v1/wanx-t2v-video/state/{sessionID}",
    "tag": "wanx-t2v-video",
    "description": "Get wanx-t2v-video task state",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "sessionID": {
          "type": "string",
          "description": "Session ID",
          "example": "01936c8e-7890-7abc-def0-123456789abc"
        }
      },
      "required": [
        "sessionID"
      ]
    },
    "outputSchema": {
      "anyOf": [
        {
          "anyOf": [
            {
              "type": "object",
              "description": "The task is completed.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "completed"
                  ],
                  "description": "Task state."
                }
              },
              "required": [
                "state"
              ]
            },
            {
              "type": "object",
              "description": "The task is processing.",
              "properties": {
                "state": {
                  "type": "string",
                  "enum": [
                    "processing"
                  ],
                  "description": "Task state."
                },
                "progress": {
                  "type": "number",
                  "description": "Task progress."
                }
              },
              "required": [
                "state",
                "progress"
              ]
            }
          ]
        },
        {
          "type": "object",
          "description": "The task was not found.",
          "properties": {
            "state": {
              "type": "string",
              "enum": [
                "not_found"
              ],
              "description": "Task state."
            },
            "error": {
              "type": "string",
              "description": "Error message."
            }
          },
          "required": [
            "state",
            "error"
          ]
        }
      ],
      "description": "Possible results returned by this action."
    },
    "successStatuses": [
      200,
      404
    ],
    "pathParams": [
      "sessionID"
    ]
  },
  {
    "actionName": "wanx_t2v_video_submit",
    "method": "POST",
    "path": "/v1/wanx-t2v-video/submit",
    "tag": "wanx-t2v-video",
    "description": "Generate text-to-video videos with Tongyi Wanxiang",
    "inputSchema": {
      "type": "object",
      "description": "Input parameters for this action.",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1500,
          "description": "Video generation prompt",
          "examples": [
            "一只橘猫在暖阳下慢慢转头看向镜头，镜头语言自然流畅。"
          ]
        },
        "negativePrompt": {
          "type": "string",
          "minLength": 1,
          "maxLength": 500,
          "description": "Negative prompt describing content to avoid",
          "examples": [
            "低分辨率，错误，最差质量"
          ]
        },
        "audioURL": {
          "type": "string",
          "minLength": 1
        },
        "size": {
          "type": "string",
          "enum": [
            "1280*720",
            "720*1280",
            "960*960",
            "1088*832",
            "832*1088",
            "1920*1080",
            "1080*1920",
            "1440*1440",
            "1632*1248",
            "1248*1632"
          ],
          "default": "1920*1080",
          "description": "Output video resolution; explicit width and height are required",
          "examples": [
            "1920*1080"
          ]
        },
        "duration": {
          "type": "integer",
          "minimum": 2,
          "maximum": 15,
          "default": 5,
          "description": "Output video duration in seconds",
          "examples": [
            5
          ]
        },
        "promptExtend": {
          "type": "boolean",
          "default": true,
          "description": "Whether to enable intelligent prompt rewriting",
          "examples": [
            true
          ]
        },
        "shotType": {
          "type": "string",
          "enum": [
            "single",
            "multi"
          ],
          "description": "Shot type: single for a single shot, multi for multiple shots",
          "examples": [
            "multi"
          ]
        },
        "watermark": {
          "type": "boolean",
          "default": false,
          "description": "Whether to add an AI-generated watermark",
          "examples": [
            false
          ]
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Random seed; fixed seeds can reproduce results",
          "examples": [
            42
          ]
        }
      },
      "required": [
        "prompt"
      ]
    },
    "outputSchema": {
      "type": "object",
      "description": "Task submission result.",
      "properties": {
        "sessionId": {
          "type": "string",
          "description": "Task session ID."
        }
      },
      "required": [
        "sessionId"
      ]
    },
    "successStatuses": [
      200
    ],
    "pathParams": []
  }
]`;

export const fusionApiOperations = JSON.parse(rawFusionApiOperations) as FusionApiOperationDefinition[];
