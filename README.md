---
title: EG AUTONOMOUS Video Creator
emoji: 🎥
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
---

# EG AUTONOMOUS Video Creator

An automated video creation tool for generating short-form video content. EG AUTONOMOUS Video Creator combines text-to-speech, automatic captions, background videos generated via **EG-Autonomous API**, and music to create engaging short videos from simple text inputs.

## Background Videos via EG-Autonomous
The primary source for all background videos is our custom **EG-Autonomous API** (https://eg-autonomous.vercel.app/). The system communicates with this API to dynamically generate AI videos tailored to your specific scenes.

**Tip for Video Generation:**
- You can add multiple prompts in a single scene separated by commas (e.g., `car, fast, red`).
- The generated videos are precisely **5 seconds** long.
- To avoid frozen frames, it is recommended to keep the spoken text for each scene short (under 5 seconds of speech). Alternatively, divide longer paragraphs into multiple scenes. If a scene's duration exceeds 5 seconds, the system will automatically loop the video as a fallback.

## Usage

### Environment Variables
For the system to generate videos, you must configure the following environment variables:

| key             | description                                                     | default |
| --------------- | --------------------------------------------------------------- | ------- |
| EG_AUTONOMOUS_API_KEY | Your API key for EG-Autonomous video generation | |
| LOG_LEVEL       | pino log level                                                  | info    |
| PORT            | the port the server will listen on                              | 3123    |

## Web UI

A built-in Web UI is provided to easily craft and preview your scenes.

## Features

- Generate complete short videos from text prompts
- Text-to-speech conversion
- Automatic caption generation and styling
- Background video generation via **EG-Autonomous API**
- Background music with genre/mood selection
- Serve as both REST API and Model Context Protocol (MCP) server

## How It Works

EG AUTONOMOUS takes simple text inputs and search terms, then:

1. Converts text to speech.
2. Generates accurate captions.
3. Requests a background video via **EG-Autonomous API**.
4. Composes all elements using Remotion.
5. Renders a professional-looking short video with perfectly timed captions.

## MCP Server

The server exposes an [MCP](https://github.com/modelcontextprotocol) interface. This means that AI agents can connect to it and instruct it to build videos autonomously, leveraging the EG-Autonomous API for all visual context.
