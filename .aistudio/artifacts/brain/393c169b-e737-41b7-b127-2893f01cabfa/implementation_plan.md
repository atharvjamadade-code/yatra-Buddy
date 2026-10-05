# Yatra Buddy - Showcase Video Prompt & Scene Architecture

Comprehensive blueprint and prompt engineering suite for Gemini's video generation models (including Veo and multimodal generative video pipelines) to produce a 16:9 cinematic live-action documentary trailer explaining all five tabs and offline capabilities of Yatra Buddy.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters have been confirmed based on your responses:
> - **Visual Style**: Cinematic live-action documentary with sleek phone UI overlays and ambient lighting.
> - **Aspect Ratio**: 16:9 widescreen landscape optimized for YouTube, product decks, and keynote presentations.
> - **Scope & Narrative**: Complete feature tour showcasing all 5 tabs (Home, Buddy, Guides, Community, SOS) alongside on-device offline AI and country embassy integration.

---

## 1. Overview & Core Concept

- **The Narrative Arc**: Follows a solo foreign traveler arriving in India amidst bustling streets, patchy cellular connectivity, aggressive touts, and unfamiliar languages. The traveler pulls out **Yatra Buddy**, operating in airplane mode, seamlessly resolving every challenge across the 5 core tabs.
- **Target Audience**: International tourists, backpackers, travel content creators, and tech showcase viewers.
- **Key Value Prop Delivered in Video**: Instant offline confidence—zero mobile data, zero scams, complete safety, and 24/7 consular protection.

---

## 2. Video Experience & Visual Design

### Cinematography & Lighting
- **Camera Aesthetic**: 35mm anamorphic lens look, shallow depth of field (`f/1.8`), soft natural golden hour lighting, cinematic film grain, 24fps cadence.
- **Color Palette**: Rich warm ochres, saffron, deep atmospheric slate, and vivid street colors of Delhi, Jaipur, and Varanasi balanced with sleek dark-mode UI overlays.
- **Audio & Sound Design**: Ambient street soundscape (distant temple bells, auto-rickshaw murmurs, chai kettle whistles) transitioning into clean UI haptic chimes and a calm, friendly English voiceover.

### Scene-by-Scene Storyboard Sequence

```
┌────────────────────────────────────────────────────────────────────────┐
│                        YATRA BUDDY VIDEO STORYBOARD                    │
└────────────────────────────────────────────────────────────────────────┘
  Scene 1 (0:00-0:10): The Arrival & The Problem
  ├── Visual: Traveler at Delhi Airport exit, noisy crowd, "No Service" status.
  └── UI Overlay: Country selection modal (US/UK/Canada flag + Embassy linked).

  Scene 2 (0:10-0:20): Screen 1 - Home & Survival Essentials
  ├── Visual: Traveler taps "100% Offline" pill, scrolls safety essentials.
  └── UI Overlay: Quick tiles (Visa, Phrasebook, Scam Shield, Emergency).

  Scene 3 (0:20-0:35): Screen 2 - The Offline AI Buddy in Action
  ├── Visual: Outside New Delhi Railway Station, taxi driver claiming hotel closed.
  └── UI Overlay: Traveler types in Buddy chat: "Driver says hotel is closed".
      Instant vetted retrieval response + official source citation banner.

  Scene 4 (0:35-0:50): Screen 3 - Guides (Visa, Phrasebook & Scam Shield)
  ├── Visual A: Traveler holds phone up to auto-rickshaw driver in giant flashcard.
  │   Displaying "Meter se chaliye" in huge glowing Devanagari text.
  └── Visual B: Visa checklist checkoffs & Scam Shield warning cards.

  Scene 5 (0:50-1:05): Screen 4 - Community Wire & P2P Mesh
  ├── Visual: Cafe rooftop in Varanasi, reading tips from fellow backpackers.
  └── UI Overlay: Upvoting helpful tips and drafting a new offline trail advisory.

  Scene 6 (1:05-1:20): Screen 5 - SOS Emergency & Consular Lifeline
  ├── Visual: Dusk falls on a mountain road; traveler accesses SOS tab.
  └── UI Overlay: Bilingual "I Need Help" card, 112 dialer trigger, and direct
      24/7 Diplomatic Embassy hotline with offline GPS coordinates.
```

---

## 3. Key Product Decisions & Delivery Plan

### Structure of the Prompts Provided to the User
1. **Master All-in-One Generation Prompt**: A single dense, hyper-detailed prompt designed for end-to-end video synthesis.
2. **Modular Scene-by-Scene Prompt Suite (6 Prompts)**: Granular prompts for each scene with exact camera angles, lighting conditions, focal lengths, actor movements, and on-screen UI overlays, enabling multi-clip generation and timeline stitching.
3. **Accompanying Voiceover Script & Audio Production Cues**: Timed narration script to record or generate with Gemini / Google Cloud TTS.

---

## 4. Technical Architecture of Video Prompts

```
┌─────────────────────────────────────────────────────────┐
│                 GEMINI VIDEO PROMPT SYSTEM               │
├─────────────────────────┬───────────────────────────────┤
│ Subject & Action        │ Foreign tourist using phone   │
│ Environment & Setting   │ Authentic Indian travel spots │
│ Camera & Optics         │ 35mm anamorphic, tracking pan │
│ Lighting & Atmosphere   │ Golden hour, cinematic film   │
│ UI Overlay Fidelity     │ Pixel-accurate Yatra Buddy UI │
│ Technical Constraints   │ 16:9, 4K, 24fps, photoreal    │
└─────────────────────────┴───────────────────────────────┘
```
